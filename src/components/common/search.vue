<template  >
	<div style="display: inline-block;">
		<p class="listItem" v-for="item in cateObj">{{item.name}}</p>
	</div>
	
</template>

<script>
	
	export default{
		
		data : function(){
			
			return{
				cateObj:[],
				
			}
		},
		components: {
		   
		},
		mounted(){
			
			
		},
		created: function() {
			this.getCategory();
			
		},
		methods:{
			//获取首页顶部分类
  			getCategory(){
  				let data={};
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getCategory,data,this.getCategoryBack);
  				
  			},
  			getCategoryBack(data){
				console.log(data)
  				this.cateObj=data.result;
  			},
			//点击分类
  			getDetailNex(index,id){
  				window.location.href=API_HOST+'weixin/product/productCategoryDetail?pcatId='+id+'&memberId='+this.getCookie("memberId");
  				
  			},
		},
		
		
	}
</script>

<style lang="scss" scoped>
	.listItem{
			font-size: .30rem;
			line-height: .64rem;
			margin: 0 .20rem;
			color: #333;
			vertical-align: text-top;
			display: inline-block;
		}
	
</style>