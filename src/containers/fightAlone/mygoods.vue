<template>
	<div class="myGoods">
		<div class="goods-top">
			<ul >
				<li v-bind:class="{ 'special': searchObj.status==undefined || searchObj.status==''}" @click="getdetailOne">全部订单</li>
				<li v-bind:class="{ 'special': searchObj.status=='0'}" @click="getdetailTwo">待拼团</li>
				<li v-bind:class="{ 'special': searchObj.status=='1'}" @click="getdetailThree">拼团成功</li>
				<li v-bind:class="{ 'special': searchObj.status=='2'}" @click="getdetailFour">拼团失败</li>
				<li v-bind:class="{ 'special': searchObj.status=='3'}" @click="getdetailFive">待支付</li>
			</ul>
		</div>
		<div class=" goods-detail" v-for="item in curObj">
			<div class="top">
				<p>
					<span class="left" v-show="item.isOwner==1">发起了拼团 ({{item.time}})</span>
					<span class="left" v-show="item.isOwner!=1">参与了拼团 ({{item.time}})</span>
					<span class="right" v-show="item.isSuccess==2 && item.payStatus!=0">拼团失败</span>
					<span class="right" v-show="item.isSuccess==0 && item.payStatus!=0">待拼团</span>
					<span class="right" v-show="item.isSuccess==1 && item.payStatus!=0">拼团成功</span>
					<span class="right" v-show="item.payStatus==0">待支付</span>
				</p>
			</div>
			<div class="goods-name">
				<div class="food" @click="getDetail(item.togetherRecordId,getMemberId,item.payStatus,item.isSuccess,item.togetherId)">
					<p class="fodImg">
						<img :src="item.productImage"/>
					</p>
					<p class="fodName">{{item.productName}}
						<br />
						
						<span>￥{{item.price}}</span><br />
						<!--<span style="margin-left: .50rem;">优惠券：￥{{item.couponFee}}</span>-->
						<span style="color: #949494; font-size: .24rem; line-height: 0;" v-show="item.score!=''">{{item.score}}</span>
					</p>
				</div>
			</div>
			<div class="headImg">
				<div class="headImg-list" >
					<ul>
						<li v-for="(itemSon,index) in item.joinMemberData" v-if="index<6" >
							<img :src="itemSon.memberLogo" />
						</li>
						
						<li v-show="item.joinMemberData.length>6"> 
							<img :src="smallImg" />
						</li>
					</ul>
					<p>{{item.joinMemberData.length}}人与你拼团</p>
				</div>
			</div>
			<div class="bot">
				<div v-show="item.isSuccess==1 && item.payStatus!=0" class="detail" @click="getDetail(item.togetherRecordId,getMemberId)">订单详情</div>
				<div v-show="item.isSuccess!=2 && item.payStatus!=0" class="fried" @click="getFriend(item.togetherRecordId,getMemberId)">邀请好友拼团</div>
				<div v-show="item.isSuccess==2 && item.payStatus!=0" class="fried" @click="goDetail(item.productId)">重新拼团</div>
				<div v-show="item.payStatus==0" class="fried" @click="goOrder(item.togetherJoinRecordId)">去支付</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name:'a',
		data : function() {
			return{
				useImg:'/static/images/use.jpg',
				iconImg:'/static/images/pinicon.png',
				goodsImg:'/static/images/goodsImg.png',
				headImg:'/static/images/headImg.png',
				smallImg:'/static/images/small.png',
				curObj:[],
				getMemberId:this.$route.query.memberId,
		        searchObj:{
		        	staus:' ',
		        },
		        isMore:true,
		        pageObj:{
					page:1,
				},
				shareData : {
					'title': "我们一起来拼团吧",
					'description': "我的拼团订单",
					'url': "",
					'picURL': "http://ol-h5-preview.olquan.cn/static/images/pinpin.png",
					'hide':true,
					'share':false
				}
				
				
			}
		},
		created: function() {
			this.$store.commit('documentTitle','我的拼团');
			this.getList({});
			console.log(this.searchObj.status)	
			
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
			
		},
		methods:{
			getList(){
				this.setCookie('number','')
				let data={
					//memberId:this.$route.query.memberId,
					status:this.searchObj.status,
					page:1,
	  				rows:20,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.togetherJoinRecordList,data,this.getListBack);
//				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.togetherJoinRecordList,data,this.getListBack,this);
			},
			getListBack(data){
				if(data.result){
					this.curObj=data.result;
					
				}else{
					this.curObj=[]
				}
				console.log(this.curObj)
				console.log(this.shareData);
				this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'fightAlone/mygoods');
				//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'fightAlone/mygoods');
				//console.log(data)
				//console.log(this.curObj[0].isSuccess)
				this.addWeixinShare();//微信分享 	
			},
			handleScroll () {
  			  var height=document.body.scrollHeight;
  				//console.log(height)
			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//				console.log(this.scrollTop)
			  var windowH=window.innerHeight;
			  if(this.scrollTop + windowH >=height-200){
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	  					page:this.pageObj.page+1,
	  					rows:20,
	  					//memberId:this.$route.query.memberId,
						status:this.searchObj.status
	  				};
	  				this.pageObj.page=this.pageObj.page+1
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.togetherJoinRecordList,data,this.getListMoreBack);
	 			}
			  }
	 			
			},
			getListMoreBack(data){
				if(data.result.length<20){
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
			getdetailOne(){
				this.searchObj.status='';
				this.getList({});
				this.isMore=true;
				this.pageObj.page=1;
			},
			getdetailTwo(){
				this.searchObj.status='0';
				this.getList({});
				this.isMore=true;
				this.pageObj.page=1;
			},
			getdetailThree(){
				this.searchObj.status='1';
				this.getList({});
				this.isMore=true;
				this.pageObj.page=1;
			},
			getdetailFour(){
				this.searchObj.status='2';
				this.getList({});
				this.isMore=true;
				this.pageObj.page=1;
			},
			getdetailFive(){
				this.searchObj.status='3';
				this.getList({});
				this.isMore=true;
				this.pageObj.page=1;
			},
			getDetail(id,memberId,payStatus,isSuccess,togetherId){
				if(payStatus==0){
					console.log(payStatus)
				}else{
					this.$router.push({path:'/order/detail/id/'+id+'?memberId='+memberId});
				}
			},
			getFriend(id,memberId){
				console.log(memberId)
				this.$router.push({path:'/order/partake/id/'+id+'?memberId='+memberId});
			},
			goDetail(id){
				window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id+'&memberId='+this.$route.query.memberId

			},
			//点击去支付
			goOrder(id){
				console.log(id)
				this.$router.push({path:'/fightAlone/ordersure/ordersure/id/'+id+'?memberId='+this.$route.query.memberId});
				//window.location.href=CUR_URLBACK+'fightAlone/ordersure/id/'+id+'?memberId='+this.$route.query.memberId;
			},
				//微信分享 
		  addWeixinShare:function(){
			var data = {                 
				"url":location.href,
				"callback":'',
		    };
		   console.log(location.href)
		    
		    this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);			
		  },
		  shareBack:function(data){
//		  	console.log("data")
//		  	console.log(data)
			if(data.result=='fail'){
				this.shareData.share=true;
			}
	      	//console.log()
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
.myGoods{
	.goods-top{
		border-top: 0.01rem solid #f2f2f2;
		
		ul{
			padding: 0 .24rem;
			color: #999;
			line-height: .90rem;
			background: #fff;
			display: flex;
			display: -moz-flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
			font-weight: 700;
			-webkit-justify-content:space-between;
			justify-content:space-between;
			-moz-box-pack:space-between;
			-webkit--moz-box-pack:space-between;
			font-size: .26rem;
			.special{
				color: #e50f72;
				border-bottom: .01rem solid #e50f72;
			}
		}
	}
	.goods-detail{
		margin-bottom: .10rem;
		background: #fff;
		.top{
			font-size: .26rem;
			line-height: .76rem;
			border-bottom: .01rem solid #f2f2f2;
			p{
				padding: 0 .24rem;
				overflow: hidden;
				.left{
					float: left;
					i{
						font-style: normal;
						color: #ff0101;
					}
				}
				.right{
					float: right;
					color: #f8348b;
				}
			}
		}
	}
	.goods-name{
		.food{
			padding:  .24rem;
			overflow: hidden;
			border-bottom: .01rem solid #f2f2f2;
			.fodImg{
				height: 1.40rem;
				width: 1.40rem;
				border-radius: .05rem;
				float: left;
				display: flex;
				display:-webkit-box;
				display: -webkit-flex;
				display: -moz-box;
				display: -moz-flex;
				display: -ms-flexbox;
				-webkit-box-pack: center;
			    -moz-box-pack: center;
			    -ms-flex-align:center;/* IE 10 */
			    -webkit-align-items: center;
			    -moz-align-items: center;
			    align-items: center;
				img{
					display: block;
					
					width: 100%;
				}
				
			}
			.fodName{
				float: left;
				width: 70%;
				margin-left: .24rem;
				font-size: .26rem;
				line-height: .38rem;
				word-wrap: break-word;
				span{
					line-height: .66rem;
				}
			}
		}
	}
	.headImg{
		font-size: .20rem;
		
		.headImg-list{
			overflow: hidden;
			padding: .14rem .24rem;
			border-bottom: .01rem solid #f2f2f2;
			ul{
				float: left;
				overflow: hidden;
				line-height: .66rem;
				li{
					float: left;
					height: .45rem;
					width: .45rem;
					border-radius: 50%;
					margin-right:.10rem ;
					img{
						display: block;
						height: 100%;
						vertical-align: middle;
						width: 100%;
						border-radius: 50%;
					}
				}
			}
			p{
				float: right;
				color: #666666;
				line-height: .46rem;
				font-weight: 700;
				font-size: .24rem;
			}
		}
	}
	.bot{
		height: 1.10rem;
		position: relative;
		.detail{
			width: 1.20rem;
			height: .68rem;
			color: #a2a2a2;
			border: 0.01rem solid #a2a2a2;
			font-size: .24rem ;
			line-height: .70rem;
			text-align: center;
			border-radius: 0.05rem;
			right: 2.08rem;
			top: 50%;
			margin-top: -.25rem;
			position: absolute;
		}
		.fried{
			width: 1.60rem;
			height: .68rem;
			color: #fffefe;
			border: 0.01rem solid #ff3893;
			font-size: .24rem ;
			line-height: .70rem;
			text-align: center;
			background: #ff3893;
			border-radius: 0.05rem;
			position: absolute;
			right: .24rem;
			top: 50%;
			margin-top: -.25rem;
		}
	}
}
</style>