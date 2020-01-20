<template>
  <div class="products-list">
    <div class="deal-need-login" v-if="!canOrder">
      <img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png" alt="登录查看" />
      <p>请登录后查看详细团购优惠</p>
      <el-button class="btn" round @click="handleLogin">立即登录</el-button>
    </div>

    <ul class="detail-list" v-else>
      <list-item v-for="(item, index) of list" :key="index" :info="item"></list-item>
    </ul>
  </div>
</template>

<script>
import ListItem from './ListItem';
export default {
  name: 'DetailList',
  components: {
    ListItem
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    login: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  computed: {
    canOrder () {
      return this.login && this.list.length > 0;
    }
  },
  methods: {
    handleLogin () {
      this.$router.push('/login');
    }
  }
};
</script>
