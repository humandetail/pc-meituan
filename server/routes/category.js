/**
 * 分类信息控制器
 */

import Router from 'koa-router'
import axios from '../utils/axios';
import config from '../config/config';

const router = new Router({
  prefix: '/category'
});


/**
 * 获取面包屑导航
 * @param { string } city
 */
router.get('/crumbs', async (ctx) => {
  const {
    status,
    data: {
      areas,
      types
    }
  } = await axios.get(`${config.API_BASE_URL}/categroy/crumbs`, { // 需要注意一下他的接口地址是拼错的
    params: {
      city: (ctx.query.city || '北京').replace('市', '')
    }
  });

  if (status === 200) {
    ctx.body = {
      areas,
      types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
});

export default router;
