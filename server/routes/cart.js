/**
 * 购物车控制器
 */

import Router from 'koa-router';
import axios from '../utils/axios';
import config from '../config/config';

const router = new Router({
  prefix: '/cart'
});

export default router;
