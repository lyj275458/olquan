<template>
	<div class="myCoupon">
		<div class="couponDetail">
			<img :src="curObj.mainImg" />
		</div>
		<div class="couponList" v-for="(item,index) in curObj.dtos" >
			<div class="couponGet">
				<p style="background: url(../../../static/images/havenone.png) no-repeat center;background-size:1.40rem .42rem ;" v-show="item.vaildNum==0 && item.receivedStatus==1" @click="getGoodDetail(item.productId)">已领完</p>
				<p v-show="item.receivedStatus ==1 && item.vaildNum!=0" @click="getCouponId(item.couponId,index)">点击领取</p>
				<p style="background: url(../../../static/images/havenone.png) no-repeat center;background-size:1.40rem .42rem ;" v-show="item.receivedStatus ==2" @click="getGoodDetail(item.productId)">已领取</p>
				<p v-show="item.receivedStatus ==3" @click="getGoodDetail(item.productId)" style="background: url(../../../static/images/getted.png) no-repeat center;background-size:1.40rem .42rem ;color: #d0006c;">立即使用</p>
			</div>
			<div class="coupon" @click="getGoodDetail(item.productId)">
				<div class="couponDescribe">
					<div class="money"><span>￥</span>{{item.amount}}</div>
					<div class="describe">
						<div class="couponName">{{item.title}}</div>
						<div class="getCoupon">
							<span>剩余{{item.vaildNum}}张</span>
							
							
						</div>
					</div>
				</div>
				<div class="couponTime">
					有效期：{{item.startTime}} 至 {{item.endTime}}
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data : function() {
			return{
				curObj:[],
				shareData : {
					'title': "",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':false
				},
				isAndroid:'',
				isiOS:'',
				curTargetS:0,
			}
		},
		created: function() {
			
			this.getCouponList();
			this.browserRedirect();
      		this.showPhone();
		},
		components: {
			
		},
		mounted(){
			
		},
		methods:{
			getCouponList(){
			 	let data={
					//memberId:this.$route.query.memberId,
					activityId:this.$route.params.id
				}
			 	this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getActivityInfo,data,this.getCouponListBack,this);
			},
			getCouponListBack(data){
				console.log(data)
				this.curObj=data.result;
				if(this.iPhone){
		        	console.log(1)
					if(tsApp.getClientBrowser()!='wx'){
						if(this.isAndroid){
							OLquan.activeShare(this.curObj.shareTitle,this.curObj.shareDescription,this.curObj.shareIcon,this.curObj.name)
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/hdfx"+this.curObj.shareTitle+'&'+this.curObj.shareDescription+'&'+this.curObj.shareIcon+'&'+this.curObj.name
		
						}
					}else{
						this.$store.commit('documentTitle',data.result.name);
						this.shareData.title=this.curObj.shareTitle;
						this.shareData.description=this.curObj.shareDescription;
						this.shareData.picURL=this.curObj.shareIcon;
						this.shareData.url="https://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'coupon/getcoupon/id/'+this.curObj.activityId);
						//this.shareData.url="https://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'coupon/getcoupon/id/'+this.curObj.activityId);
						console.log(this.shareData);
						this.addWeixinShare();//微信分享 
					}
				}
			},
			//点击已领取
			getProduct(productId,canUse){
				if(canUse==1){
					this.getGoodDetail(productId);
				}else{
					console.log(1)
				}
			},
			//点击立即使用
			getGoodDetail(productId){
				let data={
					productId:productId,
					//memberId:this.$route.query.memberId,
					uutype:1
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.productDetail,data,this.getGoodDetailBack,this);
//				
			},
			getGoodDetailBack(data){
				console.log(data)
				if(this.iPhone){
		        	if(tsApp.getClientBrowser()=='wx'){
		        		if(data.result.type==11 || data.result.type==12){
		        			window.location.href=CUR_URLBACK+'index/goodsDetali/id/'+data.result.togetherId+'?isLimit=0'
		        			
		        		}else if(data.result.type==4 || data.result.type==9){
							this.$router.push({path:'/demo/iscroll/id/'+data.result.productId});
						}else{
		        			window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+data.result.productId
		        		}
		        	}else{
						if(this.isAndroid){
							OLquan.toModules(data.result.productId)
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/cpxq"+data.result.productId;//点击商品详情
						}
					}
				}else{
					window.location.href=CUR_URLBACK+'index/newIndex'
				}
				
			},
			//点击立即领取
			getCouponId(id,index){
				console.log(index)
				this.curTargetS=index;
				let data={
					//memberId:this.$route.query.memberId,
					couponId:id
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.receiveCoupon,data,this.getCouponIdBack,this);
			},
			getCouponIdBack(data){
				console.log(data)
				this.$toast(data.message);
				if(data.code==0){
					this.$set(this.curObj.dtos[this.curTargetS],'vaildNum',this.curObj.dtos[this.curTargetS].vaildNum-1);
					if(this.curObj.dtos[this.curTargetS].isCanUse==0){
						this.$set(this.curObj.dtos[this.curTargetS],'receivedStatus',2);
					}else{
						this.$set(this.curObj.dtos[this.curTargetS],'receivedStatus',3);
					}
					
				}
			},
			//获取手机
	        showPhone(){
				var u = navigator.userAgent;
				this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	//				console.log('是否是Android：'+this.isAndroid);
	//				console.log('是否是iOS：'+this.isiOS);
			},
			//PC和移动端判断
			browserRedirect() {
		      var sUserAgent = navigator.userAgent.toLowerCase();
		      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		      var bIsAndroid = sUserAgent.match(/android/i) == "android";
		      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	
		      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		        this.iPhone=true
		        //console.log( this.iPhone);
	
		      } else {
		      	this.Pc=true
		        //console.log(this.Pc);
		      }
		    },
			//微信分享 
		    addWeixinShare:function(){
				var data = {                 
					"url":location.href,
					"callback":'',
			    };
			   //console.log(location.href)
			    
			    this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);			
			},
		    shareBack:function(data){
				//调用共用的分享接口
				if(data.result=='fail'){
					this.shareData.share=true;
				}
				//console.log(JSON.stringify(data.result))
				this.wxShareFun(data.result,this.shareData);
				//this.locationWx(data);
			},
		}
		
	}
</script>

<style lang="scss" scoped>
	.myCoupon{
		padding-bottom: .20rem;
		.couponDetail{
			background: #fff;
			font-size: .24rem;
			line-height: .85rem;
			img{
				display: block;
				width: 100%;
			}
			ul{
				display: flex;
				display:-webkit-box;
			    display: -moz-box;
			    display: -moz-flex;
			    display: -ms-flexbox;
			    display: -webkit-flex;
				-webkit-justify-content:space-around;
				justify-content:space-around;
				-moz-box-pack:space-around;
				-webkit--moz-box-pack:space-around;
				
			}
		}
		.couponList{
			background: #f2f2f2;
			padding: .20rem .20rem 0;
			position: relative;
			.couponGet{
				p{
					width: 1.40rem;
					line-height: .42rem;
					height: .42rem;
					text-align: center;
					font-size: .24rem;
					color: #fff;
					background: url(../../../dist/static/images/getting.png);
					background-size:1.40rem .42rem ;
					position: absolute;
					right: 0.48rem;
					bottom: .8rem;
					z-index: 222;
				}
			}
			.coupon{
				background: url(../../../static/images/dihong.png);
				background-size: 7.10rem 2.33rem;
				height: 2.33rem;
				width: 7.10rem;
				.couponDescribe{
					display: flex;
					display:-webkit-box;
				    display: -moz-box;
				    display: -moz-flex;
				    display: -ms-flexbox;
				    display: -webkit-flex;
					-webkit-justify-content:flex-start;
					justify-content:flex-start;
					-moz-box-pack:flex-start;
					-webkit--moz-box-pack:flex-start;
					.money{
						width: 2.00rem;
						color: #ed0276;
						line-height: 1.60rem;
						font-size: .60rem;
						text-align: center;
						font-weight: 600;
						span{
							font-size: .30rem;
							font-weight: normal;
						}
					}
					.describe{
						-webkit-box-flex: 1;
					    -webkit-flex: 1;
					    -ms-flex: 1;
					    flex: 1;
						margin-left: .20rem;
						padding-top: .28rem;
						font-size: .24rem;
						.couponName{
							color: #333;
							width: 4.70rem;
							line-height: .32rem;
							height: .64rem;
							overflow: hidden;
						}
						.getCoupon{
							margin-top: .28rem;
							color: #666;
							width: 4.00rem;
							
							
						}
					}
				}
				.couponTime{
					font-size: .24rem;
					color: #333;
					margin-left: .24rem;
					margin-top: 0.2rem;
				}
			}
		}
	}
</style>