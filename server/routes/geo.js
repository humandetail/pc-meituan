/**
 * 位置信息控制器
 */

import Router from 'koa-router'
import axios from '../utils/axios';
import config from '../config/config';

const router = new Router({
  prefix: '/geo'
});

/**
 * 获取用户所在城市
 */
router.get('/getPosition', async (ctx) => {
  const {
    status,
    data: {
      province, city
    }
  } = await axios.get(`${config.API_BASE_URL}/geo/getPosition`);

  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
});

// 获取菜单栏
router.get('/menu', async (ctx) => {
  const {
    status,
    data: {
      menu
    }
  } = await axios.get(`${config.API_BASE_URL}/geo/menu`);

  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }

});

/**
 * 获取省份信息
 */
router.get('/province', async (ctx) => {
  const {
    status,
    data: {
      province
    }
  } = await axios.get(`${config.API_BASE_URL}/geo/province`);

  if (status === 200) {
    ctx.body = {
      province
    }
  } else {
    ctx.body = {
      province: ''
    }
  }

});

/**
 * 获取省份下面的城市信息
 */
router.get('/province/:id', async (ctx) => {
  const {
    status,
    data: {
      city
    }
  } = await axios.get(`${config.API_BASE_URL}/geo/province/${ctx.params.id}`);

  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }

});

// 获取所有城市
router.get('/city', async (ctx) => {
  const {
    status,
    data: {
      city
    }
  } = await axios.get(`${config.API_BASE_URL}/geo/city`);

  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
});

// 获取热门城市
router.get('/hotCity', async (ctx) => {
  const {
    status,
    data: {
      hots
    }
  } = await axios.get(`${config.API_BASE_URL}/geo/hotCity`);

  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
});

export default router;
