import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import UserModel from '../models/users';
import CryptoJS from 'crypto-js';

passport.use(new LocalStrategy(async function (username, password, done) {
  let where = {
    username
  };

  let res = await UserModel.findOne(where);

  if (res != null) {
    if (res.password == CryptoJS.MD5(password)) {
      return done(null, res);
    } else {
      return done(null, false, '用户名或密码错误');
    }
  } else {
    return done(null, false, '用户名或密码错误');
  }
}));

passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});

export default passport;
