<template>
<div class="wrap comImg newPeople" > 
	<x-img v-for="item in dataList" :src="item.img" :default-src="defaultSrc" ></x-img>
</div>
</template>
<script>
import { XImg } from 'vux'
export default {	
	props: {
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
		//立即下单
		goShopping:function(){
			 try{
				let source = this.urlParam("source")		
				if(source=="youx"){
					appNative.gotoAppointment();
				}else{
					location.href='http://a.app.qq.com/o/simple.jsp?pkgname=tsou.uxuan.user'
				}
			}catch(error){
			 	this.Toast('调用原生方法异常！')
			}
		},
	},
	components: {
	   XImg
	}
	
}
</script>

<style lang="less" scoped>
	
</style>