<template>
  <el-row class="product-info">
    <el-col :span="16" class="left">
      <h3 class="product-name">
        {{ info.name }}
      </h3>
      <div class="info">
        <el-rate
          v-model="rate"
          disabled
          class="rate"
          disabled-void-color="#ccc"
        >
        </el-rate>
        <span class="score">{{ rate }}分</span>
        <span class="price">人均￥{{ info.biz_ext.cost }}</span>
      </div>
      <div class="address">
        <p>地址：{{ info.address }}</p>
        <p>电话：{{ info.tel }}</p>
      </div>
    </el-col>
    <el-col :span="8" class="right">
      <div class="product-img">
        <img :src="info.photos[curIdx].url" class="img">
      </div>
      <ul class="img-nav">
        <li v-for="(item, index) of info.photos" :key="index" class="item" @click="changeImage(index)">
          <img :src="item.url" class="img">
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ProductInfo',

  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  computed: {
    rate () {
      return Number(this.info.biz_ext.rating)
    }
  },

  data () {
    return {
      curIdx: 0
    }
  },

  methods: {
    changeImage (index) {
      this.curIdx = index;
    }
  }
}
</script>
