<template>
  <div class="search-wrapper">
    <div class="search-block">
      <el-input
        placeholder="搜索商家或地点"
        v-model="keyword"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="search-suggest" v-show="show">
      <div class="no-input" v-show="!keyword">
        <h6 class="title">热门搜索</h6>
        <div class="hotwords">
          <a
            :href="'/products?keyword=' + item.name"
            class="hotword-lk"
            v-for="item of hotPlace"
            :key="item.name"
          >{{ item.name }}</a>
        </div>
      </div>
      <div class="has-input" v-show="keyword">
        <ul class="suggest-list">
          <li
            class="suggest-list-item"
            v-for="(item, index) of searchList"
            :key="index"
          >
            <a
            :href="'/products?keyword=' + item.name"
              class="lk"
            >{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-hotwords">
      <a
        :href="'/products?keyword=' + item.name"
        class="search-hotword-lk"
        v-for="item of hotPlace"
        :key="item.name"
      >{{ item.name }}</a>
    </div>
  </div>
</template>

<script>
import utils from '@/assets/js/utils';

export default {
  name: 'HeaderSearch',

  data () {
    return {
      show: false,
      keyword: '',
      searchList: []
    }
  },

  computed: {
    hotPlace () {
      return this.$store.state.home.hotPlace.slice(0, 6);
    }
  },

  methods: {
    handleFocus () {
      this.show = true;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },

    handleBlur () {
      this.timer = setTimeout(() => {
        this.show = false;
      }, 100);
    },

    handleInput: utils.debounce(async function () {
      let city = this.$store.state.geo.position.city.replace('市', '');

      // 清空搜索列表
      this.searchList = [];

      if (this.keyword.length) {
        let {
          status,
          data: {
            top
          }
        } = await this.$axios.get('/search/top', {
          params: {
            city,
            input: this.keyword
          }
        });

        // 只取十个结果
        this.searchList = top.slice(0, 10);
      }
    }, 100)
  }
}
</script>
