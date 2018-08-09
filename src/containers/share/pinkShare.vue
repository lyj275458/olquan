<template>
	<div class="bugSuper">
		<!--<button class="tag-read" :data-clipboard-text="tel" @click="copy">立即阅读</button>-->
		<div class="imgdetail" v-html="curObj.content" style="width: 100%;" v-show="memberlevel">
			<p style="width: 100%;">{{curObj.content}}</p>
		</div>
		<div class="imgdetail" v-html="curObj.inviteContent" style="width: 100%;"  v-show="!memberlevel">
			<p style="width: 100%;">{{curObj.inviteContent}}</p>
		</div>
		<div class="sureBut">
			<div class="outDiv">
				<p v-show="memList.levelCode!='supervisor'" @click="openShow">点击立即开通店主</p>
				<!--<p v-show="memList.levelCode=='supervisor'" @click="yaoqing">立即邀请</p>-->
			</div>
			
		</div>
		<div class="backImg" v-show="chooseBag" @click="colseShow"></div>
		<div class="chooseBag" v-show="chooseBag">
			<div class="outBag">
				<div class="bagImg">
					<img :src="moreSaleImg" />
				</div>
				<div class="bagName">
					<p style="margin-bottom: .36rem;">开通店主大礼包</p>
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
		<div class="yaoqingImg" v-show="isPinkSure">
			<div class="shareDiv">
				<!--<div class="colseImg" @click="colseShow">
					<img class="close" :src="colseImg"/>
				</div>-->
				<div class="shareImgS">
					<img :src="smileImg" />
				</div>
				<div class="shareDetail">
					<p>亲爱的{{memList.nickName}}</p>
				</div>
				<div class="detailName">
					<p>您已经开通过店主无需再次开通！</p>
				</div>
				<div class="sureShare">
					<div class="shareSure">
						<p @click="getPinkIndex">去商城逛逛</p>
					</div>
				</div>
			</div>
		</div>
		<div class="yaoqingImg" v-show="isPinkSureGet">
			<div class="shareDiv" style="height: 4.60rem;">
				<!--<div class="colseImg" @click="colseShow">
					<img class="close" :src="colseImg"/>
				</div>-->
				<div class="shareImgS">
					<img :src="bigSmileImg" />
				</div>
				<div class="shareDetail">
					<p>亲爱的{{memList.nickName}}</p>
				</div>
				<div class="detailName">
					<p>您的店主即将到期，为了保障您的店主特权，请及时续费，以免影响使用！</p>
				</div>
				<div class="sureShare">
					<div class="shareSure">
						<p @click="getPinklong">马上续费</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Clipboard from 'clipboard';
	export default {
		
		data : function(){
			return{
				memList:[],
				curObj:[],
				moreSaleImg:'/static/images/goodsImg.png',
				colseImg:'/static/images/colse.png',
				shareImg:'/static/images/share.png',
				shareSuperImg:'/static/images/shareSuper.png',
				smileImg:'/static/images/smile.png',
				bigSmileImg:'/static/images/bigsmile.png',
				addSelect:0,
				isCanBuy:-1,
				chooseBag:false,
				bagId:0,
				shareIMg:false,
				isPinkSure:false,
				memberlevel:false,
				isPinkSureGet:false,
				time:'',
				shareData : {
					'title': "OL圈 试用中心",
					'description': "开通店主立项6大特权及超值店主礼包。",
					'url': "",
					'picURL': "https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/aaa.png",
					'hide':true,
					'share':false
				},
				tel:15658160809,
			}
		},
		components: {
		    Clipboard,
		},
		created: function() {
			
			this.getMember();
			this.getGiftBag();
			this.setCookie('inviteCode',this.$route.query.inviteId)
			
			
		},
		mounted(){
			
			window.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			// copy(){
			// 	var clipboard = new Clipboard('.tag-read')  
		 //        clipboard.on('success', e => {  
		 //         // console.log('复制成功')  
		 //          this.$toast('复制成功');
		 //          // 释放内存  
		 //          clipboard.destroy()  
		 //        })  
		 //        clipboard.on('error', e => {  
		 //          // 不支持复制  
		 //          //console.log('该浏览器不支持自动复制')  
		 //          this.$toast('复制失败');
		 //          // 释放内存  
		 //          clipboard.destroy()  
		 //        })  
			// },
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
				this.shareData.title="您的好友"+this.memList.nickName+"邀请您开通OL圈店主！";
				//console.log(this.getCookie("memberId"))
				if(data.result.levelCode=='white' || data.result.levelCode=='golden'){
					this.shareData.share=true;
				}
				//this.shareData.url="https://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'supervisor/buySuper');				
				this.shareData.url=USE_URL+"weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'share/pinkShare?inviteId='+this.memList.accountNo);
				
				
				//console.log(this.getNomoreObj.store)
				this.moreWeixinShare();//微信分享 
				this.time=this.memList.validTime.split("至")[1];
				if(data.result.isGetStoreCommission==1){
					this.memberlevel=false;
				}else{
					this.memberlevel=true;
				}
				if(data.result.isGetStoreCommission==1 && data.result.isShowRenewButton==0){
					this.isPinkSure=true;
				}else{
					this.isPinkSure=false;
				}
				if(data.result.isShowRenewButton!=0){
					this.isPinkSureGet=true;
				}else{
					this.isPinkSureGet=false;
				}
				if(data.result.isGetStoreCommission==1){
					this.$store.commit('documentTitle','邀请店主');
				}else{
					this.$store.commit('documentTitle','申请店主');
				}
					
			},
			getGiftBag(){
				let data={
					//memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.newGiftbags,data,this.getGiftBagBack,this);
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
				//console.log(this.moreSaleImg)
				
			},
			getBagId(index,id,canBuy){
				this.addSelect=index;
				this.moreSaleImg=this.curObj.gifts[index].bagImage;
				this.bagId=id;
				this.isCanBuy=canBuy;
				
				
			},
			getPinkIndex(){
		    	window.location.href=CUR_URLBACK+'index/pinkIndex';
		    },
		    getPinklong(){
		    	window.location.href=USE_URL+'weixin/member/renewConfirmOrder';
		    },
			getOrder(){
				if(this.isCanBuy==0){
					this.$toast('库存不足');
				}else{
					let data={
						bagId:this.bagId,
						
					}
					localStorage.setItem('pinkIdObj',JSON.stringify(data))
					localStorage.setItem('inviteCode',this.$route.query.inviteId)
	  				//let ObjObj=JSON.parse(localStorage.getItem("pinkIdObj"))
	  				//console.log(this.bagId);
	  				//this.$router.push({path:'/fightAlone/ordersure/pinkorder?memberId='+this.$route.query.memberId+'&inviteId='+this.$route.query.inviteId});
	  				window.location.href=CUR_URLBACK+'fightAlone/ordersure/pinkorder?inviteId='+this.$route.query.inviteId;
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
			padding-bottom: 1.5rem;
			border-radius: .08rem;
		}
		.sureBut{
			position: fixed;
			width: 100%;
			
			bottom: 0rem;
			background: #fff;
			
			.outDiv{
				padding: .40rem .30rem;
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
				height: 3.90rem;
				background: #fff;
				border-radius: .10rem;
				/*padding-top: .30rem;*/
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
					height: .84rem;
					img{
						display: inline-block;
						width: 1.68rem;
						height: 1.68rem;
						margin-top: -.84rem;
					}
				}
				.shareDetail{
					width: 100%;
					text-align: center;
					font-size: 0;
					margin-top: .48rem;
					max-height: .64rem;
					p{
						display: inline-block;
						font-size: .32rem;
						width: 3.7rem;
						color: #E50F72;
						line-height: .32rem;
						
					}
				}
				.detailName{
					
					text-align: center;
					font-size: 0;
					margin-top: .28rem;
					p{
						display: inline-block;
						font-size:.28rem;
						line-height: .32rem;
						width: 5.10rem;
						color: #333;
					}
				}
				.sureShare{
					margin-top: .54rem;
					width: 100%;
					background: #fff;
					.shareSure{
						padding: 0 .24rem;
						p{
							width: 100%;
							background: #E50F72;
							border-radius: .44rem;
							color: #FFF;
							font-size: .32rem;
							text-align: center;
							line-height: .88rem;
						}
					}
				}
			}
		}
	}

</style>