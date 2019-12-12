<template>
  <div class="top-bar">
    <el-row class="header-content" :gutter="0">
      <el-col :span="5">
        <header-position></header-position>
      </el-col>
      <el-col :span="5">
        <header-user></header-user>
      </el-col>
      <el-col :span="14">
        <header-nav></header-nav>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeaderPosition from './Sub/Position';
import HeaderUser from './Sub/User';
import HeaderNav from './Sub/Nav';

export default {
  name: 'HeaderBar',
  components: {
    HeaderPosition,
    HeaderUser,
    HeaderNav
  }
}
</script>
