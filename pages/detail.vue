<template>
  <div class="page-detail">
    <crumbs :name="keyword" :type="type"></crumbs>
    <product-info :info="product"></product-info>
    <h2 class="sub-title">商家团购及优惠</h2>
    <product-list :list="list" :login="login"></product-list>
  </div>
</template>

<script>
import Crumbs from '@/components/Main/Sub/Crumbs';
import ProductInfo from '@/components/Main/Detail/Info';
import ProductList from '@/components/Main/Detail/List';

export default {
  components: {
    Crumbs,
    ProductInfo,
    ProductList
  },

  async asyncData (ctx) {
    let {
      keyword,
      type
    } = ctx.query;

    if (!keyword || !type) {
			return {
				keyword: '',
				type: '',
				product: {},
				list: [],
				login: false
			}
    }

    let {
      status,
      data: {
        product,
        more: list,
        login
      }
    } = await ctx.$axios.get('/search/products', {
      params: {
        keyword,
        type,
        city: ctx.store.state.geo.position.city
      }
    });

    if (status === 200) {
      return {
        keyword,
        type,
        product,
        list,
        login
      }
    } else {
			return {
				keyword: '',
				type: '',
				product: {},
				list: [],
				login: false
			}
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/detail/index.scss';
</style>
