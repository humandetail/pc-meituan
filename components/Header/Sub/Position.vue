<template>
  <div class="position">
    <i class="el-icon-location"></i>
    <span class="current-city">
      {{ $store.state.geo.position.city }}
    </span>
    <el-button class="change-city" size="mini" @click="handleBtnClick">切换城市</el-button>
    <div class="near-cities">
      [
      <a href="#" class="city-guess">佛山</a>
      <a href="#" class="city-guess">顺德</a>
      <a href="#" class="city-guess">南沙</a>
      ]
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderPosition',

  methods: {
    handleBtnClick () {
      this.$router.push('/changeCity');
    }
  }
}
</script>
