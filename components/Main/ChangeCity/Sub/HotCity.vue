<template>
  <el-row class="row hot-city-row">
    <el-col :span="2">热门城市：</el-col>
    <el-col :span="22">
      <span
        class="hot-city-lk"
        v-for="item of hotCity"
        :key="item.id"
        :data-id="item.id"
      >
        {{ item.name === '市辖区' ? item.province : item.name }}
      </span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HotCity',

  data () {
    return {
      hotCity: []
    }
  },

  async mounted () {
    let {
      status,
      data: {
        hots
      }
    } = await this.$axios.get('/geo/hotCity');

    if (status === 200 && hots.length > 0) {
      this.hotCity = hots;
    } else {
      this.hotCity = [];
    }
  }
}
</script>
