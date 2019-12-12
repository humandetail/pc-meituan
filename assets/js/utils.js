let utils = {
  /**
   * 获取滚动条距离
   * getScrollOffset
   *
   * @returns { Object } 返回一个包含垂直和水平方向滚动条的距离的对象
   *
   * 常规：
   *   window.pageXOffset/pageYOffset
   * IE9/IE8及以下：
   *   document.documentElement.scrollLeft/scrollTop
   *   document.body.scrollLeft/scrollTop
   * 不常见：(不用这个)
   *   window.scrollX/scrollY
   */
  getScrollOffset: function () {
    if (window.pageXOffset) { // 如果window.pageXOffset存在，则使用
      return {
        left: window.pageXOffset,
        top: window.pageYOffset
      };
    } else {
      // 由于document.documentElement.scrollLeft与document.body.scrollLeft有下面这种现象
      // 一个有值，另一个为0
      // 所以可以将两者相加来取值
      return {
        left: document.documentElement.scrollLeft + document.body.scrollLeft,
        top: document.documentElement.scrollTop + document.body.scrollTop
      }
    }
  },

  /**
   * 元素到浏览器左上角的距离
   * getElementDocPosition
   *
   * @param { Object } el 需要查询的元素节点
   * @returns { Object } 返回一个包含了Left和Top距离的对象
   *
   * scrollLeft/scrollTop
   */
  getElementDocPosition: function (el) {
    var parentNode = el.offsetParent, // 最近的，有定位属性的祖先元素
        left = el.offsetLeft,
        top = el.offsetTop;

    while (parentNode) { // 如果存在父级定位元素，则加上父级定位元素的offset值
      left += parentNode.offsetLeft;
      top += parentNode.offsetTop;
      parentNode = parentNode.offsetParent;
    }

    return {
      left: left,
      top: top
    }
  },

  /**
   * 获取元素计算样式
   * getStyles
   *
   * @param { Object } elem 需要获取样式的节点
   * @param { String } [prop] 可选，样式属性
   * @returns { Object | Number } 返回一个样式集合或是某个属性的样式
   *
   * window.getComputedStyle(元素, 伪类)
   * IE8及以下：
   *   elem.currentStyle
   */
  getStyles: function (elem, prop) {
    var styles;
    if (window.getComputedStyle) {
      styles = window.getComputedStyle(elem, null);
    } else { // IE8及以下
      styles = elem.currentStyle;
    }

    if (prop) {
      return parseInt(styles[prop]);
    } else {
      return styles;
    }
  },

  /**
   * 获取鼠标位置相对于文档的坐标
   * getPagePos
   *
   * @requires getScrollOffset 需要依赖getScrollOffset这个函数来获取滚动条距离
   *
   * @param { Object } ev 事件对象
   * @returns { Object } 返回一个坐标对象
   *
   * 鼠标相对于可视窗口的坐标 + 滚动条距离 - 文档偏移量 = 鼠标位置相对于文档的坐标
   * 之所以要减去文档偏移量是因为某些浏览器会有文档偏移量，哪怕是设置了margin: 0
   *
   */
  getPagePos: function (ev) {
    var e = ev || window.event;
    // 获取鼠标相对于可视窗口的坐标
    var clientX = e.clientX,
        clientY = e.clientY;
    // 获取滚动条距离
    var scrollOffset = utils.getScrollOffset(),
        scrollLeft = scrollOffset.left,
        scrollTop = scrollOffset.top;
    // 获取文档偏移量，如果不存在，就给0，不影响计算
    var offsetX = document.documentElement.offsetLeft || 0,
        offsetY = document.documentElement.offsetTop || 0;

    return {
      x: clientX + scrollLeft - offsetX,
      y: clientY + scrollTop - offsetY
    };
  },

  /**
   * 判断点P是否在三角形ABC内部
   * 点位于三角形三条边的同一侧
   */
  pointInTriangle: function (A, B, C, P) {
    function vec (a, b) {
      return {
        x: b.x - a.x,
        y: b.y - a.y
      }
    }

    function vecProduct (v1, v2) {
      return v1.x * v2.y - v2.x * v1.y;
    }

    function sameSymbols (a, b) {
      return (a ^ b) >= 0;
    }

    var PA = vec(P, A),
        PB = vec(P, B),
        PC = vec(P, C),
        R1 = vecProduct(PA, PB),
        R2 = vecProduct(PB, PC),
        R3 = vecProduct(PC, PA);

    return sameSymbols(R1, R2) && sameSymbols(R2, R3);
  },
  /**
   * 函数防抖
   * debounce
   * 对于在事件被触发n秒后再执行的回调 -> 延迟执行
   * 如果在这n秒内再触发事件，重新开始计时
   *
   * @param { function } fn 需要防抖的函数
   * @param { number } delay 延迟时间
   * @param { boolean } triggerNow 是否立即执行该函数
   * @returns { function } 返回一个经过防抖处理的函数
   */
  debounce: function (fn, delay, triggerNow) {
    var t = null;

    var debounced = function () {

      var _self = this,
          args = arguments;

      if (t) { // 如果计时器存在，则清除计时器
        clearTimeout(t);
      }

      if (triggerNow) { // 立即是立即执行
        var exec = !t;

        t = setTimeout(function () { // 设置计时器
          t = null;
        }, delay);

        if (exec) { // 首次执行时，t为null, exec则为true
          fn.apply(_self, args);
        }
      } else { // 非立即执行，则设置计时器，延时执行
        t = setTimeout(function () {
          fn.apply(_self, args);
        }, delay);
      }
    }

    debounced.remove = function () {
      clearTimeout(t);
      t = null;
    }

    return debounced;
  },

  /**
   * 函数节流
   * throttle
   * 减少连续触发的函数的触发次数，delay时间内只执行一次
   * 如：函数原本每隔1毫秒执行一次，经过处理后就变成每隔delay时间才执行
   *
   * @param { function } fn 需要节流的函数
   * @param { number } delay 函数触发的间隔时间
   * @return { function } 返回一个经过节流处理的函数
   */
  throttle: function (fn, delay) {
    var t = null,
        beginTime = new Date().getTime();

    return function () {
      var _self = this,
          args = arguments,
          currentTime = new Date().getTime();

      clearTimeout(t); // 先清除计时器

      if (currentTime - beginTime >= delay) { // 当前时间 - 上一次触发时间 >= 设置的间隔时间，则允许触发
        fn.apply(_self, args);
        beginTime = currentTime; // 重置开始时间
      } else { // 未满足条件，则不触发
        t = setTimeout(function () {
          fn.apply(_self, args);
        }, delay);
      }
    }
  }
}

export default utils;
