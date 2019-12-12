<template>
  <div class="search-bar">
    <el-row class="header-content" :gutter="0">
      <el-col :span="6">
        <header-logo></header-logo>
      </el-col>
      <el-col :span="11">
        <header-search></header-search>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeaderLogo from './Sub/Logo';
import HeaderSearch from './Sub/Search';

export default {
  name: 'SearchBar',
  components: {
    HeaderLogo,
    HeaderSearch
  }
}
</script>
