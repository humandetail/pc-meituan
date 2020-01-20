<template>
  <div class="user-entry">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      [<a class="logout" href="javascript:;" @click="handleLogout">退出</a>]
    </template>
    <template v-else>
      <nuxt-link class="login" to="/login">立即登录</nuxt-link>
      <nuxt-link class="register" to="register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'HeaderUser',
  data () {
    return {
      user: ''
    }
  },

  methods: {
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
      this.user = user;
    }
  }
}
</script>
