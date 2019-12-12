<template>
  <div class="section-content">
    <div class="list" v-if="listType === 'hasStyle'">
      <template v-for="(item, index) of list">
        <has-style-card :key="index" :item="item"></has-style-card>
      </template>
    </div>
  </div>
</template>

<script>
import HasStyleCard from './HasStyleCard';

export default {
  name: 'HomeSectionContent',
  components: {
    HasStyleCard
  },
  props: {
    listType: {
      type: String,
      default () {
        return '';
      }
    },
    list: {
      type: Array,
      default () {
        return [];
      }
    }
  }
}
</script>
