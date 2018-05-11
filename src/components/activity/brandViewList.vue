<template>
<div class="wrap brandViewListBox"  v-show="list.length"> 
	<h4>推荐商户</h4>
	<ul>
		<li v-for="item in list"  @click.prevent="onItemClick(item)">
			<h5>{{item.title}}</h5>
			<p>{{item.address}}</p>
		</li>

	</ul>
</div>
</template>
<script>

export default {	
	props: {
    list: {
      type: Array,
      default: []
    }
  },
	data : function() {
		return {
			
			
		}
	},
	created() {
		
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
	.brandViewListBox{
		h4{background-color: #f8f8f8;height: .84rem;line-height: .84rem;font-size: .28rem;text-indent: .25rem; color: #1e1e1e; margin-top: .15rem;}
		h5{font-size: .28rem;color: #000;padding: .1rem 0;}
		li{border-bottom: 1px solid #f0f0f0; padding:10px 24px;}
		p{font-size: .24rem;color: #999;line-height: .3rem;}
	}
</style>