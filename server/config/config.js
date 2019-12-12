/**
 * 配置文件
 */

export default {
  // 接口路径
  API_BASE_URL: 'http://cp-tools.cn',
  API_SIGN: 'b735ab0b3e46d12ec07336ec5195a95f',
  // MongoDb配置
  dbs: 'mongodb://127.0.0.1:27017/meituan',
  // Redis配置
  reids: {
    get host () {
      return '127.0.0.1';
    },

    get port () {
      return 6379;
    }
  },
  // 邮件服务器配置
  smtp: {
    get host () {
      return 'smtp.qq.com';
    },

    get user () {
      return '512412344@qq.com';
    },

    get pass () {
      return '';
    },

    get code () { // 生成随机验证码，返回一个函数
      return () => {
        return Math.random().toString(16).slice(2, 8).toUpperCase();
      }
    },

    get expire () { // 验证码有效时间
      return () => {
        return new Date().getTime() + 60 * 1000;
      }
    }
  }
}
