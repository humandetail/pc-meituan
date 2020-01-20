<template>
  <el-container class="page-register">
    <el-header class="header">
      <el-row class="page-content">
        <el-col :span="20">
          <nuxt-link to="/" class="logo">
            <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="Logo">
          </nuxt-link>
        </el-col>
        <el-col :span="4">
          <div class="has-account">
            已有美团账号？
            <el-button class="btn-login" size="small">登陆</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main">
      <div class="page-content">
        <el-form
          ref="form"
          :model="formData" label-width="80px"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="formData.code" maxlength="6"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" :loading="sent" @click="handleSendCode">{{ statusMsg }}</el-button>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" type="password" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input v-model="formData.repassword" type="password" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">同意以下协议并注册</el-button>
          </el-form-item>
          <el-form-item v-if="errorMsg">
            <span style="color: red">{{ errorMsg }}</span>
          </el-form-item>
          <el-form-item>
            <a href="#" class="protocol">《美团网用户协议》</a>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer class="footer">
      <div class="copyright">
        @meituan.com 京ICP证070791号 京公网安备11010502025545号
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  layout: 'blank',
  data () {
    return {
      sent: false,
      timer: null,
      statusMsg: '发送验证码',
      errorMsg: '',
      formData: {
        username: '',
        email: '',
        code: '',
        password: '',
        repassword: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            triggle: 'blur'
          },
          {
            min: 8,
            max: 16,
            message: '用户名长度在8~16个字符',
            triggle: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            triggle: 'blur'
          },
          {
            validator (rule, value, cb) {
              if (value === '') {
                cb(new Error('请输入邮箱'));
              } else if (!(/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(value))){
                cb(new Error('请输入正确的邮箱地址'));
              } else {
                cb();
              }
            }
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            triggle: 'blur'
          },
          {
            min: 6,
            max: 6,
            message: '请输入正确的验证码',
            triggle: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            triggle: 'blur'
          },
          {
            min: 8,
            max: 16,
            message: '密码长度在8~16个字符',
            triggle: 'blur'
          }
        ],
        repassword: [
          {
            required: true,
            message: '请输入密码',
            triggle: 'blur'
          },
          {
            validator: (rule, value, cb) => {
              if (value !== this.formData.password) {
                cb('两次密码不一致');
              } else {
                cb();
              }
            }
          }
        ]
      }
    }
  },

  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios.post('/users/register', this.formData).then(({ status, data }) => {
            if (status === 200) {
              if (data && data.code === 0) {
                location.href = '/'
              } else {
                this.errorMsg = data.msg;
              }
            } else {
              this.errorMsg = '服务器出错，错误码为：' + status
            }

            setTimeout(() => {
              this.errorMsg = '';
            }, 3000)
          });
        }
      });
    },

    handleSendCode () {
      let usernameErrMsg,
          emialErrMsg;

      if (this.timer) {
        return false;
      }

      this.$refs.form.validateField('username', err => {
        usernameErrMsg = err;
      });
      if (usernameErrMsg) {
        return;
      }

      this.$refs.form.validateField('email', err => {
        emialErrMsg = err;
      });

      if (!usernameErrMsg && !emialErrMsg) {
        this.$axios.post('/users/verify', {
          username: encodeURIComponent(this.formData.username),
          email: this.formData.email
        }).then(({ status, data }) => {
          if (status === 200 && data && data.code === 0) {
            let count = 60;

            this.statusMsg = `${count --}秒后重新发送`;
            this.sent = true;

            this.timer = setInterval(() => {
              this.statusMsg = `${count --}秒后重新发送`;
              if (count === 0) {
                clearInterval(this.timer);
                this.timer = null;
                this.statusMsg = '发送验证码';
                this.sent = false
              }
            }, 1000);
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/register.scss'
</style>
