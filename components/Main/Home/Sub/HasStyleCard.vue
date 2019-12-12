<template>
  <el-card
    :body-style="{ padding: '0px' }"
    class="has-style-card"
    shadow="never"
  >
    <div class="img-box">
      <img :src="item.img" class="image" :alt="item.name" />
    </div>
    <div>
      <h4 class="title">{{ item.title }}</h4>
      <div class="bottom clearfix">
        <span class="price">
          <span class="rmb">￥</span>{{ item.price }}
        </span>
        <span class="address" v-if="item.adname">{{ item.adname }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'HasStyleCard',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
