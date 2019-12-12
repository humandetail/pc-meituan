<template>
  <div class="category-nav">
    <h2 class="title">全部分类</h2>
    <nav class="nav"
      @mouseenter="handleNavMouseEnter"
      @mouseleave="handleNavMouseLeave"
    >
      <ul class="nav-list"
          ref="list"
      >
        <li
          class="nav-item"
          :class="{current: current === item.type}"
          v-for="item of $store.state.home.menu"
          :key="item.type"
          :data-kind="item.type"
          @mouseenter="handleMouseEnter"
        >
          <i class="icon" :class="item.type"></i>
          <span class="nav-text">
            <nuxt-link to="" class="lk">{{ item.name }}</nuxt-link>
          </span>
          <span class="arrow"></span>
        </li>
      </ul>
      <div
        v-show="showSub"
        class="detail"
        @mouseenter="handleDetailEnter"
        @mouseleave="handleDetailLeave"
      >
        <div class="sub-menu"
          v-if="kind"
        >
          <template
            v-for="(item, idx) of curDetail.child"
          >
            <h4 :key="idx">{{ item.title }}</h4>
            <nuxt-link
              v-for="childItem of item.child"
              :key="childItem"
              class="sub-lk"
              to="#"
            >
              {{ childItem }}
            </nuxt-link>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import utils from '@/assets/js/utils.js';

export default {
  name: 'Category',

  data () {
    return {
      kind: '',
      current: '',
      timer: null,
      isFirst: true, // 是否第一次进入
      inDetail: false, // 是否在子菜单内部
      showSub: false, // 控制子菜单容器显示与否
      // 坐标
      topLeftPoint: {x: 0, y: 0},
      bottomLeftPoint: {x: 0, y: 0},
      pointArr: []
    }
  },

  computed: {
    curDetail () {
      return (this.$store.state.home.menu.filter((item) => {
        return this.kind === item.type;
      }))[0];
    }
  },

  methods: {
    // 鼠标进入Nav事件
    handleNavMouseEnter () {
      // 给文档添加监听事件
      this.docMoveFn = utils.throttle(this.collectCoor.bind(this), 16);
      document.addEventListener('mousemove', this.docMoveFn, false);
    },

    // 鼠标离开Nav事件
    handleNavMouseLeave () {
      this.showSub = false;
      this.current = '';
      this.kind = '';
      document.removeEventListener('mousemove', this.docMoveFn, false);
    },

    handleDetailEnter () {
      this.inDetail = true;
    },

    handleDetailLeave () {
      this.inDetail = false;
    },

    // 列表item鼠标滑动切换事件
    handleMouseEnter (e) {
      const target = e.target,
            kind = target.dataset.kind.toLowerCase();

      let pointArrLen = this.pointArr.length,
          cPoint = this.pointArr[pointArrLen - 2] || { x: 0, y: 0 },
          pPoint = this.pointArr[pointArrLen - 1] || { x: 0, y: 0 };

      let inTriangle = utils.pointInTriangle(this.topLeftPoint, this.bottomLeftPoint, cPoint, pPoint);

      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (!this.isFirst) { // 判断是否为第一次切换
        if (inTriangle) { // 判断P点是否在三角形ABC内
          this.timer = setTimeout(() => {
            if (this.inDetail) { // 如果当前鼠标在子菜单内部则return
              return;
            }
            this.addCurrent(kind);
            this.timer = null;
          }, 300);
        } else {
          this.addCurrent(kind);
        }
      } else {
        this.addCurrent(kind);
        this.isFirst = false;
      }

      this.showSub = true;
    },

    // 设置当前显示的子菜单
    addCurrent (kind) {
      this.current = kind;
      this.kind = kind;
    },

    // 坐标收集
    collectCoor (ev) {
      let e = ev || window.event,
          pagePos = utils.getPagePos(e);

      this.pointArr.push(pagePos);

      if (this.pointArr.length > 2) {
        this.pointArr.shift();
      }
    },

    getListPoint () {
      const oList = this.$refs.list;

      let w = utils.getStyles(oList, 'width'),
          h = utils.getStyles(oList, 'height'),
          pagePos = utils.getElementDocPosition(oList);

      this.topLeftPoint = {
        x: w + pagePos.left,
        y: pagePos.top
      };
      this.bottomLeftPoint = {
        x: w + pagePos.left,
        y: h + pagePos.top
      };
    }
  },

  mounted () {
    this.getListPoint();
  }
}
</script>
