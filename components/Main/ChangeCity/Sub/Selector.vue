<template>
  <el-row class="row selector-row">
    <el-col class="label">按省份选择：</el-col>
    <el-col class="selector">
      <el-select
        v-model="provinceValue"
        placeholder="省份"
        @change="provinceChanged"
      >
        <el-option
          v-for="item in province"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col class="selector">
      <el-select
        v-model="cityValue"
        :disabled="cityDisabled"
        placeholder="城市"
        @change="cityChanged"
      >
        <el-option
          v-for="item in cities"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col class="label">直接搜索：</el-col>
    <el-col class="selector">
      <el-select
        class="search"
        v-model="searchValue"
        filterable
        remote
        reserve-keyword
        placeholder="请输入城市中文或拼音"
        :remote-method="handleSearch"
        :loading="loading">
        <el-option
          v-for="item in searchList"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
import utils from '@/assets/js/utils';

export default {
  name: 'CitySelector',

  data () {
    return {
      province: [],
      provinceValue: '',
      cities: [],
      cityValue: '',
      cityDisabled: true,
      searchList: [],
      searchValue: '',
      loading: true,
      allCities: []
    }
  },

  methods : {
    async getProvince () {
      if (this.province.length <= 0) {
        let {
          status,
          data: {
            province
          }
        } = await this.$axios.get('/geo/province');

        if (status === 200 && province.length > 0) {
          this.province = province;
        } else {
          this.province = [];
        }
      }
    },

    async getCities (pId) {
      this.cities = [];

      let {
        status,
        data: {
          city
        }
      } = await this.$axios.get('/geo/province/' + pId);

      if (status === 200 && city.length > 0) {
        this.cities = city;
      }
    },

    provinceChanged (newVal) {
      if (newVal != '') {
        this.cityDisabled = false;
        this.getCities(newVal);
      } else {
        this.cityDisabled = true;
      }
    },

    cityChanged (newVal) {
      console.log(newVal);
      console.log(this.cities.find(item => item.id === newVal))
    },

    handleSearch: utils.debounce(async function (query) {
      if (query === '') {
        return;
      }
      this.loading = true;
      if (this.allCities.length) {
        this.searchList = this.allCities.filter(item => item.name.indexOf(query) != -1);
      } else {
        let {
          status,
          data: {
            city
          }
        } = await this.$axios.get('/geo/city');

        if (status === 200) {
          this.allCities = city;

          this.searchList = this.allCities.filter(item => item.name.indexOf(query) != -1);
        } else {
          this.searchList = [];
        }
      }
      this.loading = false;
    }, 300)
  },

  async mounted () {
    await this.getProvince();
  }
}
</script>
