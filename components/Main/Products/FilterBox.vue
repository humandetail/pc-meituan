<template>
  <div class="filter-box">
    <!-- <el-row class="types">
      <el-col :span="2">分类</el-col>
      <el-col :span="22"></el-col>
    </el-row> -->
    <!-- Types的数据不全，这一块就不做了 -->
    <el-row class="areas row">
      <el-col :span="1">
        <span class="name">区域</span>
      </el-col>
      <el-col :span="2" class="selected-box">
        <span class="selected">全部</span>
      </el-col>
      <el-col :span="21">
        <el-dropdown
          class="mod-list"
          v-for="item of areas"
          :key="item.type"
        >
          <span class="el-dropdown-link mod-item">
            {{ item.type }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(mod, index) of item.module"
              :key="index"
            ><span>{{ mod }}</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'FilterBox',

  props: {
    types: {
      type: Array,
      default () {
        return []
      }
    },

    areas: {
      type: Array,
      default () {
        return [];
      }
    }
  }
}
</script>
