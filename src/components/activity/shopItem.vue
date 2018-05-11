<template>
<div> 
	<ul class="activityShopItem">
		<li v-for="item in dataList">
			<img :src='item.img' @click.prevent="onItemClick(item)"/>
			
			<h4>{{item.shopName}}</h4>
			<p class="info">{{item.info}}</p>
			<p class="price textCenter">
				￥<em>{{item.price}}</em>起
			</p>
			<p class="btn textCenter" :class="{ 'btnRed': type==2 }">
				<span @click.prevent="onItemClick(item)">立即购买</span>
			</p>
		</li>
		
	</ul>
</div>
</template>
<script>

export default {	
	props: {
	type:{
		type:String,
		default:'1'
	},
    dataList: {
      type: Array,
      default: []
    }
  },
	data : function() {
		return {
			defaultSrc:'/static/images/default.png'
		}
	},
	created() {
		//设置页面标题
		console.log(this.$props.dataList)

		
	},
	methods :{	
		onItemClick (item) {
	      this.goShop(item.shopId)
	    }
	},
	components: {
	 
	}
	
}
</script>

<style lang="less" scoped>
	.activityShopItem li{width: 50%;float: left;box-sizing:border-box;padding: .2rem;
		h4{font-size: .32rem; color: #0d0304;padding: .15rem 0;text-align: center;}
		.info{font-size: .24rem;color: #9d9d9b;line-height: .3rem;}
		.price{color: #d40915;font-size: .24rem;padding: .25rem 0;
			em{font-size: .34rem;font-style: normal;font-weight: 500;}
		}
		.btn{font-size: .28rem;
			span{padding: .15rem .2rem;background-color: #000;color: #fff;display: inline-block;border-radius: .06rem;}
		}
		.btnRed span{background-color: #ec6773;}
	}
</style>