<template>
  <div class="login-card">
    <div class="avatar">
      <img :src="userInfo.avatar" alt="头像" class="avatar-img">
    </div>
    <p class="user-name">
      Hi！你好
      <span class="name" v-if="userInfo.user">{{ userInfo.user }}</span>
    </p>
    <template v-if="!userInfo.user">
      <el-button class="btn btn-register" round @click="handleRegister">注册</el-button>
      <el-button class="btn btn-login" round @click="handleLogin">立即登陆</el-button>
    </template>
    <template v-else>
      <el-button class="btn btn-logout" round @click="handleLogout">退出登陆</el-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'LoginCard',

  data () {
    return {
      userInfo: {
        avatar: '//s0.meituan.net/bs/fe-web-meituan/e350c4a/img/avatar.jpg',
        user: ''
      }
    }
  },

  methods: {
    handleLogin () {
      this.$router.push('/login');
    },

    handleRegister () {
      this.$router.push('/register');
    },

    async handleLogout () {
      let {
        status,
        data: {
          code
        }
      } = await this.$axios.post('/users/logout');

      if (status === 200 && code === 0) {
        alert('Bye~');
        location.href = '/';
      } else {
        alert('出错了~');
      }
    }
  },

  async mounted () {
    let {
      status,
      data: {
        user
      }
    } = await this.$axios.get('/users/getUser');

    if (status === 200) {
      this.userInfo.user = user;
    }
  }
}
</script>
