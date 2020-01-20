<template>
  <el-container>
    <el-header height="auto">
      <page-header></page-header>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="auto">
      <page-footer></page-footer>
    </el-footer>
  </el-container>
</template>

<script>

import PageHeader from '@/components/Header/Index';
import pageFooter from '@/components/Footer/Index';

export default {
  components: {
    PageHeader,
    pageFooter
  }
}
</script>
