<template>
  <div class="link-bar">
    <el-row class="home-container">
      <el-col :span="19" :offset="5">
        <ul class="link-list">
          <li
            class="link-item"
            :class="item.name"
            v-for="item of linkData"
            :key="item.name"
          >
            <nuxt-link
              to="#"
              class="lk"
            >{{ item.text }}</nuxt-link>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HeaderLinks',

  data () {
    return {
      linkData: [
        {
          link: '#',
          name: 'takeout',
          text: '美团外卖'
        },
        {
          link: '#',
          name: 'movie',
          text: '猫眼电影'
        },
        {
          link: '#',
          name: 'hotel',
          text: '美团酒店'
        },
        {
          link: '#',
          name: 'apartment',
          text: '民宿/公寓'
        },
        {
          link: '#',
          name: 'business',
          text: '商家入驻'
        },
        {
          link: '#',
          name: 'public',
          text: '美团公益'
        },
      ]
    }
  }
}
</script>
