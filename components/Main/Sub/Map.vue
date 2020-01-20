<template>
  <div class="common-map">
    <div class="map-container" ref="container"></div>
  </div>
</template>

<script>
export default {
  name: 'CommonMap',

  props: {
    point: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      ak: "SQWLDB62H0f1OvUw7upiZhhl6IebAqM1"
    }
  },

  mounted () {
    let _self = this;

    window.onmapload = function () {
      let map = new BMap.Map(_self.$refs.container),
          point = new BMap.Point(..._self.point);

      map.centerAndZoom(point, 15);

      let marker = new BMap.Marker(point);        // 创建标注
      map.addOverlay(marker);
      map.enableScrollWheelZoom(true);
    }

    let url = 'http://api.map.baidu.com/api?v=2.0&ak='+_self.ak+'&callback=onmapload',
        oScript = document.createElement('script');

    oScript.charset = 'utf-8';
    oScript.src = url;
    document.head.appendChild(oScript);
  }
}
</script>
