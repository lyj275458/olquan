<template>
	<div class="goEvery">
		<div class="link">
			<img :src="linkImg" @click='showGotrue'/>
			<div class="goMore" v-show="showGo">
				<p @click="getIndex">首页</p>
				<p @click="getCar">购物车</p>
				<p @click="getMindIndex">个人中心</p>
				<!--<p @click="getUseMore">试用</p>-->
			</div>
		</div>
		<div class="goFortop" v-show="showTop">
			<img :src="goTopImg" @click="gotoTop"/>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	export default{
		
		data : function(){
			
			return{
				goodImg:'/static/images/goodsImg.png',
				linkImg:'/static/images/link.png',
				goTopImg:'/static/images/goTop.png',
				showGo:false,
				showTop:false,
				showMember:false,
				
			}
		},
		components: {
		    $
		},
		mounted(){
			window.addEventListener('scroll', this.getTopScroll);
			
		},
		created: function() {
			//this.getMember();
			console.log(this.getCookie("memberId"))
		},
		methods:{
			//获取会员信息
			getMember(){
				let data={
//					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				if(data.result.isGetStoreCommission){
					this.showMember=true;
				}else{
					this.showMember=false;
				}
			},
			showGotrue(){
				this.showGo=!this.showGo
			},
			getIndex(){
				window.location.href=CUR_URLBACK+'index/pinkIndex';
			},
			getUseMore(){
//				this.$router.push({path:'/try/center?memberId='+this.getCookie("memberId")});
				window.location.href=CUR_URLBACK+'try/newCenter';
			},
			getMindIndex(){
				window.location.href=USE_URL+'weixin/member/membercore';
			},
			getCar(){
				window.location.href=CUR_URLBACK+'shopcar/ordercar';
			},
			//点击回到顶部
			gotoTop(){
				$('html,body').animate({scrollTop:0},1000);
			},
			getTopScroll(){
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(scrollTop)
				if(scrollTop>600){
					this.showTop=true;
				}else{
					this.showTop=false;
				}
			},
		},
		destroyed () {
		  window.removeEventListener('scroll', this.handleScroll)
		},
		
	}
</script>

<style lang="scss" scoped>
	.goEvery{
		.link{
			position: fixed;
			bottom: 2.50rem;
			right: 0.50rem;
			width: .70rem;
			z-index: 222;
			img{
				display: block;
				width: .60rem;
				height: .60rem;
			}
		}
		.goMore{
			font-size: .26rem;
			width: 1.70rem;
			background: #f0f0f0;
			position: fixed;
			right: .30rem;
			padding-left: .30rem;
			bottom: 3.20rem;
			z-index: 222;
			p{
				line-height: .56rem;
				border-bottom: 0.01rem solid #f2f2f2;
			}
		}
		.goFortop{
			position: fixed;
			bottom: 1.80rem;
			right: .60rem;
			z-index: 222;
			img{
				display: block;
				width: .60rem;
				height: .60rem;
			}
		}
	}
	
</style>