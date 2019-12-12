<template>
  <div class="user-entry">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      [<nuxt-link class="logout" to="/logout">退出</nuxt-link>]
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
  }
}
</script>
