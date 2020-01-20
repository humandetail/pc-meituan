import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'nodemailer';
import User from '../models/users';
import Passport from '../utils/passport';
import EmailConfig from '../config/config';
import axios from '../utils/axios';
import CryptoJS from 'crypto-js';

let router = new Router({
  prefix: '/users'
});

let Store = new Redis().client;

// 发送验证码
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemail: ${username}`, 'expire');

  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证码请求过于频繁，1分钟内只能验证一次'
    }
    return false;
  }

  let transporter = nodeMailer.createTransport({
    host: EmailConfig.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: EmailConfig.smtp.user,
      pass: EmailConfig.smtp.pass
    }
  });

  let recvInfo = {
    code: EmailConfig.smtp.code(),
    expire: EmailConfig.smtp.expire,
    email: ctx.request.body.email,
    user: ctx.request.body.username
  };

  let mailOptions = {
    from: `"认证邮件" <${EmailConfig.smtp.user}>`,
    to: recvInfo.email,
    subject: '《美团网》注册验证码',
    html: `您在美团网申请的注册码是：${recvInfo.code}`
  };

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log('error');
    } else {
      Store.hmset(`nodemail: ${recvInfo.user}`, 'code', recvInfo.code, 'expire', recvInfo.expire, 'email', recvInfo.email);
    }
  });

  ctx.body = {
    code: 0,
    msg: '验证码已发送，有效时间为1分钟'
  }
});

// 用户注册
router.post('/register', async (ctx, next) => {
  let {
    username,
    email,
    code,
    password,
    repassword
  } = ctx.request.body;

  if (code) { // 检测验证码
    const saveCode = await Store.hget(`nodemail: ${username}`, 'code'),
          saveExpire = await Store.hget(`nodemail: ${username}`, 'expire');

    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        };
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证不正确，请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '验证不正确，请填写正确的验证码'
    }
  }

  if (password !== repassword) {
    ctx.body = {
      code: -1,
      msg: '两次密码不一致，请重新尝试'
    }
    return;
  }

  username = encodeURIComponent(username); // 格式化用户名

  let user = await User.find({
    username
  });

  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户已存在'
    }
    return;
  }

  // 创建新用户
  const addNewUser = await User.create({
    username,
    password: CryptoJS.MD5(password),
    email
  });

  if (addNewUser) {
    let res = await axios.post('/users/login', {
      username,
      password,
    });

    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功！',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: res.data.msg
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败，请重新尝试'
    }
  }
});

// 用户登陆
router.post('/login', async (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user);
      } else {
        ctx.body = {
          code: -1,
          msg: info
        }
      }
    }
  })(ctx, next);
});

// 退出登陆
router.post('/logout', async (ctx, next) => {
  await ctx.logout();
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户信息
router.get('/getUser', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    const {
      username,
      email
    } = await ctx.session.passport.user;

    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
});


export default router;
