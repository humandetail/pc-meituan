<template>
  <li class="item">
    <div class="product-img">
      <nuxt-link :to="{ path: 'detail', query: {keyword: info.name, type: info.module}}">
        <img :src="info.img" :alt="info.name" class="img">
      </nuxt-link>
    </div>
    <h3 class="product-name">
      <nuxt-link :to="{ path: 'detail', query: {keyword: info.name, type: info.module}}">
        {{ info.name }}
      </nuxt-link>
    </h3>
    <div class="eval-info">
      <el-rate
        v-model="info.rate"
        disabled
        class="rate"
        disabled-void-color="#ccc"
      >
      </el-rate>
      <span class="score">{{ info.rate }}分</span>
      <span class="comment">{{ info.comment }}人评论</span>
    </div>
    <div class="address">
      {{ info.address }}
      <a href="javascript:;" class="btn-map">
        <i class="icon el-icon-location"></i>
        查看地图
      </a>
    </div>
    <div class="price-box">
      人均
      <span class="rmb">￥</span>
      <span class="price">{{ info.price }}</span>
      起
    </div>
  </li>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
