<template>
  <div class="banner-wrapper">
    <link-bar></link-bar>
    <div class="home-container">
      <category></category>
      <div class="m-life">
        <el-row class="m-life-row">
          <el-col class="life-carousel">
            <swiper></swiper>
          </el-col>
          <el-col class="life-pic"></el-col>
          <el-col class="life-login">
            <login-card></login-card>
          </el-col>
        </el-row>
        <el-row class="m-life-row">
          <el-col class="life-hotel"></el-col>
          <el-col class="life-music"></el-col>
          <el-col class="life-coop"></el-col>
          <el-col class="life-download">
            <download-card></download-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import LinkBar from './Sub/LinkBar';
import Category from './Sub/Category';
import Swiper from './Sub/Swiper';
import LoginCard from './Sub/LoginCard';
import DownloadCard from './Sub/DownloadCard';
export default {
  name: 'HomeBanner',
  components: {
    LinkBar,
    Category,
    Swiper,
    LoginCard,
    DownloadCard
  }
}
</script>
