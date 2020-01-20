<template>
  <div class="alphabet-container">
    <el-row class="row alphabet-row">
      <el-col class="label">按拼音首字母选择：</el-col>
      <el-col class="letter-bar">
        <a
          class="letter"
          v-for="item of blocks"
          :key="item.name"
          :href="'#block-' + item.name"
        >{{ item.name }}</a>
      </el-col>
    </el-row>

    <div class="alphabet-content">
      <dl
        v-for="item of blocks"
        :key="item.name"
        :id="'block-' + item.name"
        class="alphabet-list"
      >
        <dt class="letter">{{ item.name }}</dt>
        <dd
          v-for="city of item.cities"
          :key="city.id"
          class="city"
        >
          {{ city.name }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import jspy from 'js-pinyin';

export default {
  name: 'Alphabet',
  data () {
    return {
      blocks: []
    }
  },

  async mounted () {
    let {
      status,
      data: {
        city
      }
    } = await this.$axios.get('/geo/city');

    let blocks = [];

    if (status === 200 && city.length > 0) {
      // 数据整理
      // {
      //   A: [],
      //   B: []
      // }
      let firstLetter,
          letterPos,
          temp = {};

      city.forEach((item) => {
        firstLetter = jspy.getFullChars(item.name).toUpperCase().slice(0, 1);
        letterPos = firstLetter.charCodeAt(0);

        if (letterPos >= 65 && letterPos <= 90) { // 65 -> 90 为 A-Z
          if (!temp[firstLetter]) {
            temp[firstLetter] = [];
          }
          temp[firstLetter].push(item);
        }
      });

      for (let [key, value] of Object.entries(temp)) {
        blocks.push({
          name: key,
          cities: value
        });
      }
      blocks.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
      this.blocks = blocks;
    }
  }
}
</script>
