<template>
  <nav class="nav-wrapper">
    <ul class="nav-list">
      <li class="nav-item has-child">
        <nuxt-link class="nav-item-lk" to="/my">我的美团</nuxt-link>
        <ul class="nav-item-my drop-list">
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">我的订单</nuxt-link>
          </li>
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">我的收藏</nuxt-link>
          </li>
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">抵用券</nuxt-link>
          </li>
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">账户设置</nuxt-link>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-item-lk" to="/my">手机APP</nuxt-link>
      </li>
      <li class="nav-item has-child">
        <nuxt-link class="nav-item-lk" to="/my">商家中心</nuxt-link>
        <ul class="nav-item-center drop-list">
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">美团餐饮商户中心</nuxt-link>
          </li>
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">登录商家中心</nuxt-link>
          </li>
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">美团智能收银</nuxt-link>
          </li>
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">我想合作</nuxt-link>
          </li>
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">手机免费开店</nuxt-link>
          </li>
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">商家申请开票</nuxt-link>
          </li>
        </ul>
      </li>
      <li class="nav-item has-child">
        <nuxt-link class="nav-item-lk" to="/my">美团规则</nuxt-link>
        <ul class="nav-item-rules drop-list">
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">规则中心</nuxt-link>
          </li>
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">规则目录</nuxt-link>
          </li>
          <li class="drop-list-item">
            <nuxt-link class="drop-list-item-lk" to="#">规则评议院</nuxt-link>
          </li>
        </ul>
      </li>
      <li class="nav-item has-child">
        <nuxt-link class="nav-item-lk" to="/my">网站导航</nuxt-link>
        <div class="nav-item-site drop-list">
          <el-row :gutter="20" class="row">
            <el-col :span="6" class="col">
              <dl class="jiulv">
                <dt>酒店旅游</dt>
                <dd><a href="#">国际机票</a></dd>
                <dd><a href="#">火车票</a></dd>
                <dd><a href="#">榛果民宿</a></dd>
                <dd><a href="#">经济型酒店</a></dd>
                <dd><a href="#">主题酒店</a></dd>
                <dd><a href="#">商务酒店</a></dd>
                <dd><a href="#">公寓</a></dd>
                <dd><a href="#">豪华酒店</a></dd>
                <dd><a href="#">客栈</a></dd>
                <dd><a href="#">青年旅社</a></dd>
                <dd><a href="#">度假酒店</a></dd>
                <dd><a href="#">别墅</a></dd>
                <dd><a href="#">农家院</a></dd>
              </dl>
            </el-col>
            <el-col :span="5" class="col">
              <dl class="food">
                <dt>吃美食</dt>
                <dd><a href="#">烤鱼</a></dd>
                <dd><a href="#">特色小吃</a></dd>
                <dd><a href="#">烧烤</a></dd>
                <dd><a href="#">自助餐</a></dd>
                <dd><a href="#">火锅</a></dd>
                <dd><a href="#">代金券</a></dd>
              </dl>
            </el-col>
            <el-col :span="4" class="col">
              <dl class="movie">
                <dt>看电影</dt>
                <dd><a href="#">热映电影</a></dd>
                <dd><a href="#">热门影院</a></dd>
                <dd><a href="#">热映电影口碑榜</a></dd>
                <dd><a href="#">最受期待电影</a></dd>
                <dd><a href="#">国内票房榜</a></dd>
                <dd><a href="#">北美票房榜</a></dd>
                <dd><a href="#">电影排行榜</a></dd>
              </dl>
            </el-col>
            <el-col :span="9" class="col">
              <dl class="app">
                <dt>手机应用</dt>
                <dd>
                  <a href="https://i.meituan.com/mobile/down/meituan" target="_blank">
                    <img class="appicon" src="//s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png" title="美团app" alt="美团app" />
                  </a>
                </dd>
                <dd>
                  <a href="https://waimai.meituan.com/mobile/download/default" target="_blank">
                    <img class="appicon" src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png" title="外卖app" alt="外卖app" />
                  </a>
                </dd>
                <dd>
                  <a href="https://phoenix.meituan.com/app/" target="_blank">
                    <img class="appicon" src="//s0.meituan.net/bs/fe-web-meituan/404d350/img/appicons/zhenguo.png" title="榛果app" alt="榛果app" />
                  </a>
                </dd>
                <dd>
                  <a href="https://www.dianping.com/events/m/index.htm" target="_blank">
                    <img class="appicon" src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png" title="点评app" alt="点评app" />
                  </a>
                </dd>
                <dd>
                  <a href="https://maoyan.com/app" target="_blank">
                    <img class="appicon" src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png" title="猫眼app" alt="猫眼app" />
                  </a>
                </dd>
              </dl>
            </el-col>
          </el-row>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HeaderNav'
}
</script>
