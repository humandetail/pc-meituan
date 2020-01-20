<template>
	<li
		v-if="info.photos.length"
		class="detail-item">
		<dl class="section">
			<dd>
				<img
					:src="info.photos[0].url"
					:alt="info.photos[0].title" />
			</dd>
			<dd>
				<h4>{{ info.name }}</h4>
				<p>
					<span v-if="info.biz_ext && info.biz_ext.ticket_ordering">
						剩余：{{ Number(info.biz_ext.ticket_ordering) }}
					</span>
					<span v-if="info.deadline">
						截止日期： {{ info.deadline}}
					</span>
				</p>
				<p>
					<span class="price">
						{{ Number(info.biz_ext.cost) }}
					</span>
					<sub>
						门店价 {{ Number(info.biz_ext.cost )}}
					</sub>
				</p>
			</dd>
			<dd>
				<el-button
          class="btn"
				  round
				  @click="createCart">
					立即抢购
				</el-button>
			</dd>
		</dl>
	</li>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  methods: {
    async createCart () {
      let {
        status,
        data: {
          code,
          id
        }
      } = await this.$axios.post('/cart/createCart', {
        id: Math.random().toString().slice(3, 9),
        detail: {
          name: this.info.name,
          price: this.info.biz_ext.cost,
          imgs: this.info.photos
        }
      });

      if (status === 200 && code === 0) {
        location.href = `/cart/?id=${id}`;
      } else {
        console.log('error');
      }
    }
  }
}
</script>
