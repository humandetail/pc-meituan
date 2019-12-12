<template>
  <div class="header">
    <header-bar></header-bar>
    <search-bar></search-bar>
  </div>
</template>

<script>
import HeaderBar from './HeaderBar';
import SearchBar from './SearchBar';

export default {
  name: 'Header',
  components: {
    HeaderBar,
    SearchBar
  }
}
</script>

<style lang="scss">
@import '~/assets/css/header.scss';
</style>
