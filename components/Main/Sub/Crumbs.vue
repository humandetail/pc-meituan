<template>
  <div class="crumb">
    <el-breadcrumb class="crumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">美团</el-breadcrumb-item>
      <el-breadcrumb-item v-if="type">{{ type }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="name">{{ name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Crumbs',

  props: {
    type: {
      type: String,
      default () {
        return ''
      }
    },
    name: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>
