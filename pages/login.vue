<template>
  <el-container class="page-login">
    <el-header class="header" height="auto">
      <nuxt-link to="/" class="site-logo">
        <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="Logo">
      </nuxt-link>
    </el-header>
    <el-main class="main">
      <el-row>
        <el-col :span="16">
          <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt="美团网" width="480" height="370" />
        </el-col>
        <el-col :span="8">
          <el-form
            ref="form"
            :model="formData"
            :rules="rules"
            class="login-form"
          >
            <el-form-item class="custom-row">
              <span class="text">账号登录</span>
            </el-form-item>
            <el-form-item v-if="errorMsg">
              <span style="color: red">{{ errorMsg }}</span>
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                v-model="formData.username"
                maxlength="16"
                prefix-icon="el-icon-user"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formData.password"
                type="password"
                maxlength="16"
                prefix-icon="el-icon-lock"
                placeholder="密码"
              >
              </el-input>
            </el-form-item>
            <el-form-item class="custom-row">
              <a href="#" class="forgot lk">忘记密码？</a>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" class="btn-login">登录</el-button>
            </el-form-item>
            <el-form-item class="custom-row">
              <span class="text">还没有账号？</span>
              <nuxt-link to="/register" class="lk">免费注册</nuxt-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer class="footer" height="auto">
      <div class="site-info-nav cf">
        <ul class="clearfix list">
          <li class="first"><a rel="nofollow" href="https://about.meituan.com/about.html">关于美团</a></li>
          <li><a rel="nofollow" href="https://zhaopin.meituan.com/">加入我们</a></li>
          <li><a rel="nofollow" href="http://emis.meishi.meituan.com/merchantsSettled">商家入驻</a></li>
          <li><a rel="nofollow" href="https://www.meituan.com/help/faq">帮助中心</a></li>
          <li class="last"><a href="http://meituan.com/mobile">美团手机版</a></li>
        </ul>
      </div>
      <div class="copyright">
        <p>
            ©<span>2019</span>
            <a href="https://www.meituan.com">美团网团购</a>
            meituan.com
            <a href="http://www.miibeian.gov.cn/" target="_blank">京ICP证070791号</a>
            京公网安备11010502025545号
        </p>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  layout: 'blank',

  data () {
    return {
      errorMsg: '',
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: {
          required: true,
          message: '请输入用户名',
          triggle: 'blur'
        },
        password: {
          required: true,
          message: '请输入密码',
          triggle: 'blur'
        }
      }
    }
  },

  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios.post('/users/login', this.formData).then(({ status, data }) => {
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
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/login.scss'
</style>
