<template>
  <div class="page-cart">
	  <el-row>
	  	<el-col
	  		v-if="cartList.length"
	  		:span="24"
	  		class="m-cart">
	  		<cart-list :cart-data="cartList" />
	  		<p>
	  			应付金额：<em class="money">￥{{ total }}</em>
	  		</p>
	  		<div class="post">
	  			<el-button type="primary" @click="handleSubmit">
	  				提交订单
	  			</el-button>
	  		</div>
	  	</el-col>
	  	<el-col
	  		v-else
	  		:span="24"
	  		class="empty">
	  		购物车为空
	  	</el-col>
	  </el-row>
  </div>
</template>

<script>
import CartList from '@/components/Main/Cart/List';
export default {
  components: {
    CartList
  },
  computed: {
		total: function() {
			let total = 0;
			this.cartList.forEach(item => {
				total += item.price * item.count
			})

			return total;
		}
	},

  async asyncData (ctx) {
    let id = ctx.query.id;

    if (!id) {
      return {
				cartList: [{
					name: '',
					price: '',
					count: 0
				}],
				cartNo: ctx.query.id
			}
    }

    let {
      status,
      data: {
        code,
        data: {
          name,
          price
        }
      }
    } = await ctx.$axios.post('/cart/getCart', {
      id
    });

    if (status === 200 && code === 0 && name) {
      return {
				cartList: [{
					name,
					price,
					count: 1
				}],
				cartNo: ctx.query.id
			}
    }
  },

  methods: {
    handleSubmit () {
      alert('功能没做');
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/cart.scss';
</style>
