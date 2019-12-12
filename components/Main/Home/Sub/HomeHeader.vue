<template>
  <div class="home-header" :style="backStyle">
    <h2 class="title">{{ title }}</h2>
    <ul
      class="menus"
      @mouseover="handleEnter"
    >
      <li
        class="menu-item"
        :class="{ current: item.type === current }"
        :data-kind="item.type"
        v-for="(item, index) of menus"
        :key="index"
      >{{ item.name }}</li>
    </ul>
    <nuxt-link
      class="all-link"
      v-if="allLink"
      :to="allLink"
    >
      <span>全部</span>
      <i class="el-icon-arrow-right"></i>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',

  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    },
    current: {
      type: String,
      default () {
        return ''
      }
    },
    menus: {
      type: Array,
      default () {
        return ''
      }
    },
    allLink: {
      type: String,
      default () {
        return ''
      }
    },
    backStyle: {
      type: String,
      default () {
        return 'background-color: rgb(190, 164, 116); background-image: linear-gradient(to right, rgb(194, 176, 142) 3%, rgb(190, 164, 116) 100%);'
      }
    }
  },

  methods: {
    handleEnter (ev) {
      const e = ev || window.event,
            tar = e.target || e.srcElement,
            kind = tar.dataset.kind;

      if (kind) {
        if (kind !== this.current) {
          this.$emit('changeKind', kind);
        }
      }
    }
  }
}
</script>
