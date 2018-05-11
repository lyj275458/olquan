<template>
	<div class="bugSuper">
		<div class="imgdetail" v-html="curObj.content" style="width: 100%;" v-show="memList.levelCode=='supervisor'">
			<p style="width: 100%;">{{curObj.content}}</p>
		</div>
		<div class="imgdetail" v-html="curObj.inviteContent" style="width: 100%;" v-show="memList.levelCode!='supervisor'">
			<p style="width: 100%;">{{curObj.inviteContent}}</p>
		</div>
		<div class="sureBut">
			<div class="outDiv">
				<p v-show="memList.levelCode!='supervisor'" @click="openShow">立即申请</p>
				<p v-show="memList.levelCode=='supervisor'" @click="yaoqing">立即邀请</p>
			</div>
			
		</div>
		<div class="backImg" v-show="chooseBag" @click="colseShow"></div>
		<div class="chooseBag" v-show="chooseBag">
			<div class="outBag">
				<div class="bagImg">
					<img :src="moreSaleImg" />
				</div>
				<div class="bagName">
					<p style="margin-bottom: .36rem;">选择督导礼包</p>
					<p>￥{{curObj.totalFee}}</p>
				</div>
				<div class="colseImg" @click="colseShow">
					<img class="close" :src="colseImg"/>
				</div>
				
				<ul class="bagMore">
					<li v-for="(item,index) in curObj.gifts" v-bind:class="{ 'speciLi': index==addSelect}" @click="getBagId(index,item.bagId,item.bagCanBuy)">
						{{item.bagName}}
					</li>
					
				</ul>
				<div class="sureChoose" @click="getOrder">确定</div>
			</div>
			
		</div>
		<div class="yaoqingImg" v-show="shareIMg" @click="colseShare">
			<div class="shareDiv">
				<div class="colseImg" @click="colseShow">
					<img class="close" :src="colseImg"/>
				</div>
				<div class="shareImgS">
					<img :src="shareSuperImg" />
				</div>
				<div class="shareDetail">
					<p>点击右上角，分享给您的好友，邀请开通督导！</p>
				</div>
				<div class="sureShare">
					<div class="shareSure">
						<p>确定</p>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	
	export default {
		
		data : function(){
			return{
				memList:[],
				curObj:[],
				moreSaleImg:'/static/images/goodsImg.png',
				colseImg:'/static/images/colse.png',
				shareImg:'/static/images/share.png',
				shareSuperImg:'/static/images/shareSuper.png',
				addSelect:0,
				isCanBuy:-1,
				chooseBag:false,
				bagId:0,
				shareIMg:false,
				shareData : {
					'title': "OL圈 试用中心",
					'description': "试,是一种态度。每日10,20点限量开抢！",
					'url': "",
					'picURL': "http://ol-site.olquan.com/plug/mobile/img/logoo.jpg",
					'hide':true,
					'share':false
				},
			}
		},
		components: {
		    
		},
		created: function() {
			this.$store.commit('documentTitle','试用中心');
			this.getMember();
			this.getGiftBag()
		},
		mounted(){
			
			window.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			openShow(){
				this.chooseBag=true;
			},
			colseShow(){
				this.chooseBag=false;
			},
			//获取会员信息
			getMember(){
				let data={
					//memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				this.memList=data.result
				this.setCookie('memberId',data.result.id)
				console.log(this.getCookie("memberId"))
				if(this.memList.levelCode=='supervisor'){
					this.$store.commit('documentTitle','邀请督导');
				}else{
					this.$store.commit('documentTitle','申请督导');
				}
					
			},
			getGiftBag(){
				let data={
					//memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getGiftBag,data,this.getGiftBagBack,this);
			},
			yaoqing(){
				this.shareIMg=true;
			},
			colseShare(){
				this.shareIMg=false;
			},
			getGiftBagBack(data){
				this.curObj=data.result;
				this.moreSaleImg=data.result.gifts[0].bagImage;
				this.isCanBuy=data.result.gifts[0].bagCanBuy;
				this.bagId=data.result.gifts[0].bagId;
				this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'supervisor/buySuper');				
				//this.shareData.url=USE_URL+"weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'supervisor/buySuper');
				this.shareData.title=this.curObj.shareTitle;
				this.shareData.description=this.curObj.shareDesc;
				this.shareData.picURL=this.curObj.shareLogo;
				//console.log(this.getNomoreObj.store)
				this.moreWeixinShare();//微信分享 
				//console.log(this.moreSaleImg)
				
			},
			getBagId(index,id,canBuy){
				this.addSelect=index;
				this.moreSaleImg=this.curObj.gifts[index].bagImage;
				this.bagId=id;
				this.isCanBuy=canBuy;
				
				
			},
			getOrder(){
				if(this.isCanBuy==0){
					this.$toast('库存不足');
				}else if(this.memList.isGetStoreCommission==0){
					this.$toast('您还不是粉领，请先升级粉领');
				}else{
					let data={
						bagId:this.bagId,
						
					}
					localStorage.setItem('bagIdObj',JSON.stringify(data))
	  				let ObjObj=JSON.parse(localStorage.getItem("bagIdObj"))
	  				console.log(this.bagId);
	  				//this.$router.push({path:'/fightAlone/ordersure/superorder?memberId='+this.$route.query.memberId});
	  				window.location.href=CUR_URLBACK+'fightAlone/ordersure/superorder?memberId='+this.$route.query.memberId;
				}
			},
			//微信分享 
			moreWeixinShare:function(){
				var data = {                 
					"url":location.href,
					"callback":'',
				};
			  // console.log(location.href)
			    
			    this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);			
			},
			shareBack:function(data){
				//调用共用的分享接口
				//console.log(JSON.stringify(data.result))
				this.wxShareFun(data.result,this.shareData);
				//this.locationWx(data);
			},
		},
		destroyed () {
		  window.removeEventListener('scroll', this.handleScroll)
		},
	}
</script>

<style lang="scss" scoped>
	.bugSuper{
		min-height: 100%;
		
		background: #fff;
		img{
			pointer-events: none;
		}
		.imgdetail{
			padding-bottom: 1.40rem;
			border-radius: .08rem;
		}
		.sureBut{
			position: fixed;
			left: 0;
			width: 100%;
			background: #fff;
			bottom: 0rem;
			.outDiv{
				padding: 0 .30rem .50rem;
				p{
					width: 100%;
					background: #E50F72;
					font-size: .36rem;
					text-align: center;
					border-radius: 0.08rem;
					color: #fff;
					line-height: .90rem;
				}
			}
			
		}
		.backImg{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.25);
			z-index: 11;
		}
		.chooseBag{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			z-index: 13;
			.outBag{
				min-height: 2.96rem;
				padding-bottom: .98rem;
				position: relative;
				.bagImg{
					position: absolute;
					left: .24rem;
					top: -0.46rem;
					
					width: 1.64rem;
					height: 1.64rem;
					img{
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.bagName{
					font-size: .28rem;
					padding-left: 2.12rem;
					color: #333;
					padding-top: .32rem;
				}
				.colseImg{
					position: absolute;
					right: .24rem;
					top: .24rem;
					img{
						display: block;
						height: .32rem;
						width: .32rem;
					}
				}
				.normal{
					color: #999999;
					font-size: .24rem;
					padding-left: .24rem;
					margin-top: .50rem;
				}
				.bagMore{
					padding: 0 .24rem;
					overflow: hidden;
					margin-top: .60rem;
					li{
						float: left;
						border: 0.01rem solid #eaeaea;
						color: #666;
						padding: .12rem .24rem;
						font-size: .24rem;
						border-radius: .06rem;
						margin-right: .20rem;
						margin-bottom: .20rem;
					}
					.speciLi{
						border: 0.01rem solid #DA3176;
						color: #DA3176;
					}
				}
				.sureChoose{
					width: 100%;
					position: fixed;
					left: 0;
					bottom: 0;
					background: #DA3176;
					color: #FFF;
					font-size: .36rem;
					text-align: center;
					line-height: .98rem;
				}
			}
		}
		.yaoqingImg{
			background: rgba(0,0,0,.6rem);
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			.shareDiv{
				width: 5.60rem;
				height: 4.10rem;
				background: #fff;
				padding-top: .30rem;
				position: fixed;
				top: 3.84rem;
				left: 50%;
				margin-left: -2.80rem;
				.colseImg{
					position: absolute;
					right: .24rem;
					top: .24rem;
					img{
						display: block;
						height: .32rem;
						width: .32rem;
					}
				}
				.shareImgS{
					text-align: center;
					width: 100%;
					img{
						display: inline-block;
						width: 1.36rem;
						height: 1.41rem;
					}
				}
				.shareDetail{
					width: 100%;
					text-align: center;
					p{
						display: inline-block;
						font-size: .26rem;
						width: 3.7rem;
						height: .64rem;
						line-height: .32rem;
						color: #333;
					}
				}
				.sureShare{
					margin-top: .54rem;
					width: 100%;
					background: #fff;
					.shareSure{
						padding: 0 1.06rem;
						p{
							width: 100%;
							background: #E50F72;
							border-radius: .06rem;
							color: #FFF;
							font-size: .30rem;
							text-align: center;
							line-height: .70rem;
						}
					}
				}
			}
		}
	}

</style>