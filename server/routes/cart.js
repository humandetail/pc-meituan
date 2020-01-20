/**
 * 购物车控制器
 */

import Router from 'koa-router';
import axios from '../utils/axios';
import Cart from '../models/cart';
import md5 from 'crypto-js/md5';

const router = new Router({
  prefix: '/cart'
});

// 创建购物车
router.post('/createCart', async (ctx) => {
  if (!ctx.isAuthenticated()){
    ctx.body = {
      code: -1,
      msg: '请先登录'
    }
  } else {
    let time = new Date(),
        cartNo = md5(Math.random() * 1000 + time).toString(),
        { id, detail } = ctx.request.body;

    let cart = new Cart({
      id,
      detail,
      cartNo,
      user: ctx.session.passport.user,
      time
    });

    let res = await cart.save();

    if (res) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '操作失败'
      }
    }
  }
});

// 获取购物车信息
router.post('/getCart', async (ctx) => {
  let { id } = ctx.request.body,
      res = await Cart.findOne({
        cartNo: id
      });

  if (res) {
    ctx.body = {
      code: 0,
      data: res.detail[0]
    }
  } else {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
});

export default router;
