<template>
	<div class="personal">
		<div class="perTop" @click="getMyGrow">
			<div class="personalImg">
				<img :src="memList.logo"/>
			</div>
			<div class="personalName">
				{{memList.nickName}}
			</div>
			<div class="personalLevel">
				<p>
					{{memList.levelName}}
				</p>
				<p style="margin-left: .12rem;" v-show="memList.partnerLevel!=null">{{memList.partnerLevel}}</p>
				<p style="margin-left: .12rem;" v-show="memList.isCityPartner==1">城市合伙人</p>
				<p style="margin-left: .12rem;" v-show="memList.isBrandPartner==1">品牌合伙人</p>
			</div>
			<div class="getGrow">
				<img :src="mineRowImg"/>
			</div>
		</div>
		<div class="renewGet" v-show="memList.isShowRenewButton!=0">
			<div class="getDate">您的粉领会员将于{{time}}到期</div>
			<div class="goRenew" @click="getRenew">立即续费</div>
		</div>
		<div class="useNavTab">
			<div class="navTab">
				<p @click="getWaitPay">
					<img :src="daiPayImg"/>
					<span>待付款</span>
					<i class="severalNum" v-show="orderList.waitPayCount!=0">{{orderList.waitPayCount}}</i>
				</p>
				
			</div>
			<div class="navTab">
				<p @click="getWaitSend">
					<img :src="waitSongImg"/>
					<span>待配送</span>
					<i class="severalNum" v-show="orderList.waitSendCount!=0">{{orderList.waitSendCount}}</i>
				</p>
			</div>
			<div class="navTab">
				<p style="border-right: none;" @click="getWaitConfirm">
					<img :src="waitShouImg"/>
					<span>待收货</span>
					<i class="severalNum" v-show="orderList.waitConfirmCount!=0">{{orderList.waitConfirmCount}}</i>
				</p>
			</div>
			<div class="navTab">
				<p @click="getWaitComment">
					<img :src="waitPingImg"/>
					<span>待评价</span>
					<i class="severalNum" v-show="orderList.waitCommentCount!=0">{{orderList.waitCommentCount}}</i>
				</p>
			</div>
			<div class="navTab">
				<p @click="getWaitRefund">
					<img :src="shouhouImg"/>
					<span>售后服务</span>
					<i class="severalNum" v-show="orderList.waitRefundCount!=0">{{orderList.waitRefundCount}}</i>
				</p>
			</div>
			<div class="navTab">
				<p style="border-right: none; " @click="getOrderList">
					<img :src="orderListImg"/>
					<span>全部订单</span>
				</p>
			</div>
		</div>
		<div class="useNavTab">
			<div class="navTab">
				<p @click="getMyPacket">
					<img :src="myPagektImg"/>
					<span>我的钱包</span>
				</p>
			</div>
			<div class="navTab">
				<p @click="getTryUes">
					<img :src="myTryUesImg"/>
					<span>我的试用</span>
					<i class="severalNum" v-show="orderList.freeUseCount!=0">{{orderList.freeUseCount}}</i>
				</p>
			</div>
			<div class="navTab">
				<p @click="getMyPin">
					<img :src="myPinImg"/>
					<span>我的拼团</span>
				</p>
			</div>
			<div class="navTab">
				<p @click="getMyCoupon">
					<img :src="myCoupinImg"/>
					<span>我的优惠券</span>
				</p>
			</div>
			<div class="navTab">
				<p @click="getMycelect">
					<img :src="mycelectImg"/>
					<span>我的收藏</span>
				</p>
			</div>
			<div class="navTab" v-show="memList.levelCode!='white'">
				<p @click="getMycode">
					<img :src="myBookImg"/>
					<span>推广海报</span>
				</p>
			</div>
			<div class="navTab" v-show="memList.levelCode!='white' &&  memList.levelCode!='golden' && memList.isShowRenewButton==0">
				<p @click="getInvitedPink">
					<img :src="myInvitedImg"/>
					<span>邀请粉领</span>
				</p>
			</div>
			<div class="navTab"  v-show="memList.isShowRenewButton!=0">
				<p @click="getRenew">
					<img :src="myInvitedImg"/>
					<span>粉领续费</span>
				</p>
			</div>
			<div class="navTab">
				<p @click="getMyQuan">
					<img :src="myQuanImg"/>
					<span>粉圈</span>
				</p>
			</div>
			<div class="navTab" v-show="memList.levelCode!='white' &&  memList.levelCode!='golden' && memList.levelCode!='store'">
				<p @click="getBaoBiao">
					<img :src="userIcon06Img"/>
					<span>报表中心</span>
				</p>
			</div>
			<div class="navTab" v-show="memList.partnerLevel!=null || memList.isCityPartner==1 || memList.isBrandPartner==1">
				<p class="getPartner">
					<img :src="myPartentImg"/>
					<span>合伙人</span>
				</p>
			</div>
			<div class="navTab">
				<p @click="getSetUp">
					<img :src="mySetupImg"/>
					<span>设置</span>
				</p>
			</div>
			<div class="navTab">
				<p @click="getMyHelp">
					<img :src="myHelpImg"/>
					<span>帮助中心</span>
				</p>
			</div>
			<div class="navTab" v-show="memList.isPhysicalStore==1">
				<p @click="getSK">
					<img :src="user_skImg"/>
					<span>收款二维码</span>
				</p>
			</div>
			<div class="navTab" v-show="memList.levelCode!='white' &&  memList.levelCode!='golden'">
				<p @click="getSuper">
					<img :src="userHuaImg"/>
					<span v-show="memList.levelCode=='store'">申请督导</span>
					<span v-show="memList.levelCode!='store'">邀请督导</span>
				</p>
			</div>
		</div>
		
		<div class="getBottom">
			<div class="getIndex" @click="goIndex">
				<div class="top">
					<img :src="index01Img" />
				</div>
				<div class="bot">首页</div>
			</div>
			<div class="getIndex" @click="getIndex">
				<div class="top">
					<img :src="cartImg" />
				</div>
				<div class="bot">购物车</div>
				<div class="cartNum" v-show="cartNum>0">{{cartNum}}</div>
			</div>
			<div class="getIndex" @click="getFind">
				<div class="top">
					<img :src="findImg" />
				</div>
				<div class="bot">发现</div>
			</div>
			<div class="getIndex" @click="getkefu">
				<div class="top">
					<img :src="serviceImg" />
				</div>
				<div class="bot">客服</div>
			</div>
			<div class="getIndex">
				<div class="top">
					<img :src="myImg" />
				</div>
				<div class="bot" style="color: #000;">我的</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	
	export default {
		
		data : function(){
			return{
				perBackImg:'/static/images/perBack.png',
				index01Img:'/static/images/icon-index.png',
				cartImg:'/static/images/icon-cart.png',
				findImg:'/static/images/icon-find.png',
				serviceImg:'/static/images/icon-service.png',
				myImg:'/static/images/icon-my02.png',
				mineRowImg:'/static/images/mineRow.png',
				daiPayImg:'/static/images/daiPay.png',
				waitSongImg:'/static/images/waitSong.png',
				waitShouImg:'/static/images/waitShou.png',
				waitPingImg:'/static/images/waitPing.png',
				shouhouImg:'/static/images/shouhou.png',
				orderListImg:'/static/images/orderList.png',
				myPagektImg:'/static/images/myPagekt.png',
				myTryUesImg:'/static/images/myTryUes.png',
				myPinImg:'/static/images/myPin.png',
				myCoupinImg:'/static/images/myCoupin.png',
				mycelectImg:'/static/images/mycelect.png',
				myBookImg:'/static/images/myBook.png',
				myInvitedImg:'/static/images/myInvited.png',
				myQuanImg:'/static/images/myQuan.png',
				myPartentImg:'/static/images/myPartent.png', 
				mySetupImg:'/static/images/mySetup.png', 
				userIcon06Img:'/static/images/user-icon06.png', 
				myHelpImg:'/static/images/myHelp.png',  
				user_skImg:'/static/images/user_sk.png',
				userHuaImg:'/static/images/user-hua.png', 
				memList:[],
				orderList:[],
				cartNum:'',
				showMember:false,
				time:'',
				
				
			}
		},
		components: {
		    
		},
		created: function() {
			if(this.$route.query.memberId=='undefined'){
				this.$route.query.memberId='';
			}
			this.$store.commit('documentTitle','个人中心');
			this.getMember();
			this.getcartNum();
			this.orderCount();
		},
		mounted(){
			
			window.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			//获取会员信息
			orderCount(){
				let data={
					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.orderCount,data,this.orderCountBack,this);
			},
			orderCountBack(data){
				this.orderList=data.result;
			},
			//待付款
			getWaitPay(){
				
				window.location.href=USE_URL+'ol/order.html?type=1&status=0';
			},
			//待配送
			getWaitSend(){
				window.location.href=USE_URL+'ol/order.html?type=1&status=1';
			},
			//待收货
			getWaitConfirm(){
				window.location.href=USE_URL+'ol/order.html?type=1&status=2';
			},
			//待评价
			getWaitComment(){
				window.location.href=USE_URL+'ol/order.html?type=1&status=3';
			},
			//售后服务
			getWaitRefund(){
				window.location.href=USE_URL+'ol/order.html?type=1&status=4';
			},
			//全部订单
			getOrderList(){
				window.location.href=USE_URL+'ol/order.html?type=1&status=';
				
			},
			//我的钱包
			getMyPacket(){
				window.location.href=USE_URL+'weixin/member/wallet';
			},
			//我的试用
			getTryUes(){
				window.location.href=USE_URL+'weixin/member/freeUseCore';
			},
			//我的拼团
			getMyPin(){
				window.location.href=CUR_URLBACK+'fightAlone/mygoods';
			},
			//我的优惠券
			getMyCoupon(){
				window.location.href=CUR_URLBACK+'coupon/mycoupon';
			},
			//我的收藏
			getMycelect(){
				window.location.href=USE_URL+'ol/myCollection.html?htmlRoot='+CUR_URLBACK;
			},
			//我的推广海报
			getMycode(){
				window.location.href=USE_URL+'mobile/weixin/member/memberTwoCode2?memberId='+this.$route.query.memberId;
			},
			//邀请粉领
			getInvitedPink(){
				
				this.$router.push({path:'/supervisor/buyPink'});
			},
			
			//我的粉圈
			getMyQuan(){
				window.location.href=USE_URL+'weixin/member/fans';
			},
			//我的报表
			getBaoBiao(){
				window.location.href=USE_URL+'weixin/member/supervisorAmountRecord';
			},
			//合伙人
			getPartner(){
				window.location.href=USE_URL+'weixin/partner/partner';
			},
			//设置
			getSetUp(){
				window.location.href=USE_URL+'weixin/member/set';
			},
			//帮助中心
			getMyHelp(){
				window.location.href=USE_URL+'weixin/helpinfo/toListVM';
			},
			//收款二维码
			getSK(){
				window.location.href=USE_URL+'weixin/member/storeTwocode';
			},
			//申请 邀请督导
			getSuper(){
				this.$router.push({path:'/supervisor/buySuper'});
			},
			//续费
			getRenew(){
				window.location.href=USE_URL+'weixin/member/renewConfirmOrder';
			},
			//我的成长
			getMyGrow(){
				this.$router.push({path:'/mine/myGrow'});
			},
			//获取会员信息
			getMember(){
				let data={
					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				this.memList=data.result;
				this.time=this.memList.validTime.split("至")[1];
				if(data.result.isGetStoreCommission){
					this.showMember=true;
				}else{
					this.showMember=false;
				}
			},
			//获取购物车产品数量
			getcartNum(){
				let data={
					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.totalNum,data,this.getcartNumBack);
			},
			getcartNumBack(data){
				//console.log(data)
				this.cartNum=data.result;
			},
			//点击首页
			goIndex(){
				if(this.showMember){
					window.location.href=CUR_URLBACK+'index/pinkIndex';
				}else{
					window.location.href=CUR_URLBACK+'index/newIndex';
				}
			},
			//跳转购物车
			getIndex(){
				window.location.href=CUR_URLBACK+'shopcar/ordercar';
			},
			getFind(){
				window.location.href="http://live-weixin.olquan.cn"
			},
			//点击客服
			getkefu(){
				window.location.href='https://kefu.easemob.com/webim/im.html?tenantId=40231&ticket=false';	
			},
//			getMindIndex(){
//				window.location.href=USE_URL+'weixin/member/membercore?mmm='+this.$route.query.memberId;
//			},
		},
		destroyed () {
		  window.removeEventListener('scroll', this.handleScroll)
		},
	}
</script>

<style lang="scss" scoped>
	.personal{
		
		img{
			pointer-events:none;
		}
		/*background: #F6F6F6;*/
		padding-bottom: 1.00rem;
		.perTop{
			background: url(../../../static/images/perBack.png) no-repeat;
			background-size: 100% 1.82rem ;
			height: 1.82rem;
			width: 100%;
			position: relative;
			.personalImg{
				position: absolute;
				width: 1.08rem;
				height: 1.08rem;
				left: .24rem;
				border-style: solid;
				border-width: .06rem;
				border-color: rgba(255,255,255,.5);
				border-radius: 50%;
				top:50%;
				margin-top:-.60rem;
				img{
					display: block;
					width: 1.08rem;
					background: #fff;
					height: 1.08rem;
					border-radius: 50%;
					
				}
			}
			.personalName{
				font-size: .28rem;
				color: #fff;
				position: absolute;
				left: 1.70rem;
				top: .50rem;
			}
			.personalLevel{
				position: absolute;
				width: auto;
				left: 1.70rem;
				top: .98rem;
				font-size: 0;
				P{
					display: inline-block;
					padding: .08rem;
					
					font-size: .24rem;
					color: #EE1C7D;
					text-align: center;
					
					border-radius: .06rem;
					background-color: rgba(255,255,255,.5);
				}
				
			}
			.getGrow{
				position: absolute;
				width: .16rem;
				height: .28rem;
				right: .24rem;
				top: 50%;
				margin-top: -.08rem;
				img{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
		.renewGet{
			height: .98rem;
			line-height: .98rem;
			font-size: .24rem;
			background: #fff;
			position: relative;
			margin-bottom: .20rem;
			.getDate{
				padding: 0 .24rem;
			}
			.goRenew{
				position: absolute;
				right: .24rem;
				top: 50%;
				margin-top: -.24rem;
				height: .48rem;
				line-height: .48rem;
				text-align: center;
				width: 1.40rem;
				background: #DF3C82;
				color: #fff;
				border-radius: .48rem;
				
			}
		}
		.useNavTab{
			margin-bottom: .20rem;
			display: flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
		    display: -moz-flex;
			-webkit-justify-content:flex-start;
			justify-content:flex-start;
			-moz-box-pack:flex-start;
			-webkit--moz-box-pack:flex-start;
			flex-wrap:wrap;
			-webkit-flex-wrap:wrap;
		    -webkit-box-lines:multiple;
		    -moz-flex-wrap:wrap;
		    border-top: 0.01rem solid #EBEBEB;
		    .navTab{
		    	width: 33.33%;
		    	background: #fff;
		    	
		    	p{
		    		height: 1.32rem;
		    		border-bottom: 0.01rem solid #EBEBEB;
		    		border-right:  0.01rem solid #EBEBEB;
		    		font-size: 0;
		    		position: relative;
					img{
						width: .44rem;
						height: .44rem;
						display: block;
						position: absolute;
						top: .32rem;
						left: 50%;
						margin-left: -.22rem;
					}
					span{
						width: 100%;
						position: absolute;
						font-size: .24rem;
						display: block;
						top: .88rem;
		    		    color: #333;
						text-align: center;
					}
					.severalNum{
						display: block;
						font-style: normal;
						position: absolute;
						top: .20rem;
						left: 1.35rem;
						width: .28rem;
						height: .28rem;
						text-align: center;
						line-height: .28rem;
						font-size: .16rem;
						border-radius: 50%;
						color: #fff;
						background: #DF3C82;
					}
		    	}
		    }
		}
		
		.getBottom{
			border-top: 0.01rem solid #e1e1e1;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #f7f7f7;
			height: .85rem;
			padding-top: .15rem;
			width: 100%;
			z-index: 99999;
			display: flex;
			display:-webkit-box;
			display: -webkit-flex;
			display: -moz-box;
			display: -moz-flex;
			display: -ms-flexbox;
			.getIndex{
				width: 20%;
				font-size: .18rem;
				text-align: center;
				position: relative;
				color: #b2b2b2;
				.cartNum{
					width:.26rem;
					height: .26rem;
					font-size: .16rem;
					background: #E5006E;
					line-height: .26rem;
					/*padding-top: .06rem;*/
					color: #fff;
					position: absolute;
					border-radius: 50%;
					right: 0.25rem;
					top: 0;
				}
				.top{
					position: relative;
					height: .50rem;
					img{
						display: block;
						position: absolute;
						left: 50%;
						margin-left: -.22rem;
						height: .44rem;
						width: .44rem;
					}
				}
			}
		}
	}

</style>