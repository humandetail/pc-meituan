<template>
  <div class="products-list">
    <div class="sort-group clearfix">
      <div class="sort-item current">智能排序</div>
      <div class="sort-item">价格排序</div>
      <div class="sort-item">人气最高</div>
      <div class="sort-item">评价最高</div>
    </div>
    <ul class="list">
      <template v-for="item of list">
        <product-item :key="item.location" :info="item"></product-item>
      </template>
    </ul>
  </div>
</template>

<script>
import ProductItem from './Sub/Item';
export default {
  name: 'ProductsList',
  components: {
    ProductItem
  },
  props: {
    list: {
      type: Array,
      default () {
        return [];
      }
    }
  }
}
</script>
