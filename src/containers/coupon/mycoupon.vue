<template>
	<div class="myCoupon">
		<div class="couponDetail">
			<ul>
				<li v-bind:class="{ 'special': index===addSelect}" v-for="(item,index) in couponStatus" @click="getCoupon(index)">{{item}}</li>
				
			</ul>
		</div>
		<div class="couponList">
			<div class="coupon" v-for="(item,index) in curObj" v-bind:class="{ 'couponSpecial': addSelect!=0}" @click="useCoupon(item.productId)">
				<div class="couponDescribe">
					<div class="money" v-show="status==1"><span>￥</span>{{item.price}}</div>
					<div class="money" style="color: #333;" v-show="status!=1"><span>￥</span>{{item.price}}</div>
					<div class="describe">
						<div class="couponName">{{item.title}}</div>
						<div class="getCoupon">
							
							<span v-show="status==2">已使用</span>
							<span v-show="status==3">已过期</span>
							<p v-show="status==1 && item.isCanUse==1">立即使用</p>
						</div>
					</div>
				</div>
				<div class="couponTime" v-show="status!=2">
					有效期：{{item.startDate}} 至 {{item.endDate}}
				</div>
				<div class="couponTime" v-show="status==2">
					使用时间：{{item.useDate}}
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data : function() {
			return{
				couponStatus:['未使用','已使用','已过期'],
				addSelect:0,
				status:1,
				curObj:[],
				isMore:true,
		        pageObj:{
					page:1,
				},
				shareData : {
					'title': "",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':true
				},
			}
		},
		created: function() {
			this.$store.commit('documentTitle','我的优惠券');
			this.getList();
		},
		components: {
			
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
			this.addWeixinShare();
		},
		methods:{
			//获取我的优惠券
			getList(){
				let data={
					//memberId:this.$route.query.memberId,
					status:this.status,
					page:1,
					rows:20
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.myCoupons,data,this.getListBack,this);
			},
			getListBack(data){
				console.log(data);
				this.curObj=data.result.data;
			},
			//获取不同状态优惠券
			getCoupon(index){
				this.addSelect=index;
				this.status=index+1;
				this.isMore=true;
				this.pageObj.page=1;
				let data={
					//memberId:this.$route.query.memberId,
					status:this.status,
					page:1,
					rows:20
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.myCoupons,data,this.getCouponBack,this);
			},
			getCouponBack(data){
				//console.log(data)
				this.curObj=data.result.data;
			},
			//下拉加载更多优惠券
			handleScroll () {
  			  var height=document.body.scrollHeight;
  				//console.log(height)
			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(this.scrollTop)
			  var windowH=window.innerHeight;
			  if(this.scrollTop + windowH >=height-200){
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	  					page:this.pageObj.page+1,
	  					rows:20,
	  					//memberId:this.$route.query.memberId,
						status:this.status,
	  				};
	  				this.pageObj.page=this.pageObj.page+1
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.myCoupons,data,this.getListMoreBack);
	 			}
			  }
	 			
			},
			getListMoreBack(data){
				if(data.result.data.length<20){
					this.isMore=false;
					this.showTrue=true;
				}else{
					this.isMore=true;
				}
				
				
				for(let i=0; i<data.result.length; i++){
					this.curObj.push(data.result[i])
				}
				//console.log(this.curObj)
			
			},
			//点击立即使用优惠券
			useCoupon(productId){
				console.log(productId)
				if(this.status==1){
					let data={
						productId:productId,
						//memberId:this.$route.query.memberId,
						uutype:1
					}
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.productDetail,data,this.useCouponBack,this);
				}else{
					console.log(1)
				}
			},
			useCouponBack(data){
				console.log(data)
				if(data.result.type==11 || data.result.type==12){
					this.$router.push({path:'/index/goodsDetali/id/'+data.result.togetherId+'?memberId='+this.$route.query.memberId+'&isLimit=0'});
				}else if(data.result.type==4 || data.result.type==9){
					this.$router.push({path:'/demo/iscroll/id/'+data.result.productId});
				}else{
					window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+data.result.productId+'&memberId='+this.$route.query.memberId
				}
			},
			destroyed () {
			  window.removeEventListener('scroll', this.handleScroll);
			},
			//微信分享 
			addWeixinShare:function(){
				var data = {                 
					"url":location.href,
					"callback":'',
				};
			  // console.log(location.href)
			    
			    this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);			
			},
			shareBack:function(data){
				//调用共用的分享接口
				//alert(JSON.stringify(this.shareData))
				console.log(this.shareData)
				//console.log(JSON.stringify(data.result))
				this.wxShareFun(data.result,this.shareData);
				//this.locationWx(data);
			},
		}
		
		
	}
</script>

<style lang="scss" scoped>
	.myCoupon{
		padding-top: .85rem;
		.couponDetail{
			background: #fff;
			font-size: .24rem;
			position: fixed;
			z-index: 22;
			width: 100%;
			top: 0;
			left: 0;
			line-height: .85rem;
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
				.special{
					border-bottom: .03rem solid #e50f72;
					color: #e50f72;
				}
			}
		}
		.couponList{
			background: #f2f2f2;
			padding: .20rem;
			
			.coupon{
				background: url(../../../static/images/dihong.png);
				background-size: 7.10rem 2.33rem;
				height: 2.33rem;
				width: 7.10rem;
				margin-bottom: .20rem;
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
						width: 2.20rem;
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
							position: relative;
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
								right: .22rem;
								top: -50%;
								margin-top: -.12rem
							}
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
			.couponSpecial{
				background: url(../../../static/images/dihei.png) no-repeat;
				background-size: 7.10rem 2.33rem;
			}
		}
	}
</style>