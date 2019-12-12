<template>
  <div class="login-card">
    <div class="avatar">
      <img :src="userInfo.avatar" alt="头像" class="avatar-img">
    </div>
    <p class="user-name">
      Hi！你好
      <span class="name" v-if="userInfo.userName">{{ userName }}</span>
    </p>
    <template v-if="!userInfo.userName">
      <el-button class="btn btn-register" round>注册</el-button>
      <el-button class="btn btn-login" round>立即登陆</el-button>
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
        userName: ''
      }
    }
  }
}
</script>
