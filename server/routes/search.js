/**
 * 搜索控制器
 */

import Router from 'koa-router'
import axios from '../utils/axios';
import config from '../config/config';

const router = new Router({
  prefix: '/search'
});

/**
 * 获取推荐信息
 * @param { string } input  当前输入的关键字
 * @param { string } city 当前城市
 */
router.get('/top', async (ctx) => {
  const {
    status,
    data: {
      top
    }
  } = await axios.get(`${config.API_BASE_URL}/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city
    }
  });

  if (status === 200) {
    ctx.body = {
      top
    }
  } else {
    ctx.body = {
      top: []
    }
  }
});

/**
 * 获取热门景点
 * @param { string } city 当前城市
 */
router.get('/hotPlace', async (ctx) => {
  const {
    status,
    data: {
      result
    }
  } = await axios.get(`${config.API_BASE_URL}/search/hotPlace`, {
    params: {
      city: ctx.query.city
    }
  });

  if (status === 200) {
    ctx.body = {
      result
    }
  } else {
    ctx.body = {
      result: []
    }
  }
});

/**
 * 获取关键字搜索结果
 * @param { string } keyword  搜索关键字
 * @param { string } city 当前城市
 */
router.get('/resultsByKeywords', async (ctx) => {
  const {
    status,
    data: {
      count,
      pois
    }
  } = await axios.get(`${config.API_BASE_URL}/search/resultsByKeywords`, {
    params: {
      city: ctx.query.city,
      keyword: ctx.query.keyword
    }
  });

  if (status === 200) {
    ctx.body = {
      count,
      pois
    }
  } else {
    ctx.body = {
      count: 0,
      pois: []
    }
  }
});

// 获取产品信息
router.get('/products', async (ctx) => {
  const {
    status,
    data: {
      product,
      more
    }
  } = await axios.get(`${config.API_BASE_URL}/search/products`, {
    params: {
      city: ctx.query.city || '北京',
      keyword: ctx.query.keyword || '旅游'
    }
  });

  if (status === 200) {
    ctx.body = {
      product,
      // 这里需要登陆获取
			more: ctx.isAuthenticated() ? more : [],
			login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: [],
			login: ctx.isAuthenticated()
    }
  }
});

export default router;
