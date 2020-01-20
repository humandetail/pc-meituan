<template>
  <div class="page-products">
    <crumbs :name="keyword"></crumbs>
    <el-container>
      <el-main>
        <filter-box :types="types" :areas="areas"></filter-box>
        <products-list :list="list"></products-list>
      </el-main>
      <el-aside width="230px" style="margin-left: 10px">
        <common-map :point="point"></common-map>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Crumbs from '@/components/Main/Sub/Crumbs';
import FilterBox from '@/components/Main/Products/FilterBox';
import ProductsList from '@/components/Main/Products/List';
import CommonMap from '@/components/Main/Sub/Map';

export default {
  components: {
    Crumbs,
    FilterBox,
    ProductsList,
    CommonMap
  },

  data () {
    return {
      keyword: '',
      list: [],
      types: [],
      areas: [],
      point: []
    }
  },

  async asyncData (ctx) {
    let keyword = ctx.query.keyword,
        city = ctx.store.state.geo.position.city;

    let {
      status: status1,
      data: {
        count,
        pois
      }
    } = await ctx.$axios.get('/search/resultsByKeywords', {
      params: {
        city,
        keyword
      }
    });

    let {
      status: status2,
      data: {
        areas,
        types
      }
    } = await ctx.$axios.get('/category/crumbs', {
      params: {
        city
      }
    });

    if (status1 === 200 && count > 0 && status2 === 200) {
      return {
        list: pois.filter((item) => item.photos.length).map((item) => {
          return {
            img: item.photos[0].url, // 图片
            name: item.name, // 名称
            comment: Math.floor(Math.random() * 10000), // 敏感信息第三方接口没提供
            rate: Number(item.biz_ext.rating), // 评分
            price: Number(item.biz_ext.cost), // 价格
            address: item.address, // 地址
            location: item.location,
						module: item.type.split(';')[0]
          }
        }),
        keyword: city.replace('市', '') + keyword,
        areas: areas.filter((item) => item.type !== '').slice(0, 5),
        types: types.filter((item) => item.type !== '').slice(0, 5),
        point: (pois.find((item) => item.location).location || '').split(',')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/products/index.scss'
</style>
