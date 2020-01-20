<template>
  <div class="page-change-city">
    <city-selector></city-selector>
    <hot-city></hot-city>
    <alphabet></alphabet>
  </div>
</template>

<script>
import CitySelector from './Sub/Selector';
import HotCity from './Sub/HotCity';
import Alphabet from './Sub/Alphabet';
export default {
  name: 'ChangeCity',
  components: {
    CitySelector,
    HotCity,
    Alphabet
  }
}
</script>

<style lang="scss">
@import '@/assets/css/changeCity/index.scss';
</style>
