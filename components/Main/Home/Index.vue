<template>
  <div class="page-home">
    <home-banner />

    <div class="home-container">
      <div class="home-section">
        <home-header
          :title="hasStyle.title"
          :current="hasStyle.current"
          :menus="hasStyle.menus"
          :backStyle="hasStyle.backStyle"
          :allLink="hasStyle.allLink"
          @changeKind="changeStyleKind"
        ></home-header>
        <home-section-content
          :list="hasStyle.list[hasStyle.current]"
          listType="hasStyle"
          v-loading="hasStyle.loading"
        ></home-section-content>
      </div>
    </div>
  </div>
</template>

<script>
import HomeBanner from './Banner/Index';
import HomeHeader from './Sub/HomeHeader';
import HomeSectionContent from './Sub/SectionContent';

export default {
  name: 'Home',
  components: {
    HomeBanner,
    HomeHeader,
    HomeSectionContent
  },
  data () {
    return {
      hasStyle: {
        title: '有格调',
        backStyle: 'background-color: rgb(190, 164, 116); background-image: linear-gradient(to right, rgb(194, 176, 142) 3%, rgb(190, 164, 116) 100%);',
        allLink: '#',
        current: 'all',
        menus: [
          {
            name: '全部',
            type: 'all',
          },
          {
            name: '约会聚餐',
            type: 'date',
          },
          {
            name: '丽人SPA',
            type: 'spa',
          },
          {
            name: '电影演出',
            type: 'movie',
          },
          {
            name: '品质出游',
            type: 'travel',
          }
        ],
        list: {
          all: [],
          date: [],
          spa: [],
          movie: [],
          travel: []
        },
        keyword: {
          all: '旅游',
          date: '下午茶',
          spa: 'spa',
          movie: '电影',
          travel: '景点'
        },
        loading: true
      }
    }
  },
  methods: {
    async changeStyleKind (kind) {
      await this.getHasStyleInfo(kind);
      this.hasStyle.current = kind;
    },

    async getHasStyleInfo (kind) {
      if (this.hasStyle.list[kind].length > 0) {
        return;
      }

      this.hasStyle.loading = true;

      let {
        status,
        data: {
          count,
          pois
        }
      } = await this.$axios.get('/search/resultsByKeywords', {
        params: { // 这里没有接口文档，随机搜索个景点信息
          keyword: this.hasStyle.keyword[kind],
          city: this.$store.state.geo.position.city
        }
      });

      if (status === 200 && count > 0) {
        let res = pois.filter((item) => item.photos.length).map((item) => {
          return {
            title: item.name,
            pos: item.type.split(';')[0],
            price: item.biz_ext.cost.length ? item.biz_ext.cost : '暂无',
            img: item.photos[0].url,
            adname: item.adname.length ? item.adname : '',
            url: '#'
          }
        });
        this.hasStyle.list[kind] = res.slice(0, 9);
      } else {
        this.hasStyle.list[kind] = [];
      }

      this.hasStyle.loading = false;
    }
  },


  async mounted () {
    await this.getHasStyleInfo(this.hasStyle.current);
  }
}
</script>

<style lang="scss">
@import '~/assets/css/home/index.scss';
</style>
