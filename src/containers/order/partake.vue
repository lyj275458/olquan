<template>
	<div class="partake">
		<div class="sucess">
			<img :src='successImg'/>
			<span>支付成功</span>
		</div>
		<div class="goodsdetail" @click="getGoods(curObj.togetherId)">
			<div class="goods-l">
				<img :src='curObj.productImage' />
			</div>
			<div class="goods-r">
				{{curObj.productName}}
				<p class="bot">
					<span class="top"> &nbsp;{{curObj.count}}人团·已拼{{curObj.joinCount}}件</span><br />
					<span class="xia"><i>￥{{curObj.togetherPrice}}</i> 拼团省{{curObj.economizePrice}}元</span>
				</p>
			</div>
		</div>
		<ul class="list">
			<li v-for="item in curObj.productTags"><img :src='chooseImg'/>{{item}}</li>
			
		</ul>
		<div class="name">
			<ul class="name-list">
				<li v-for="item in curObj.joinMemberData">
					<img :src="item.memberLogo"/>
					<img :src="speImg"  class="special" v-show="item.isOwner==1"/>
				</li>
				
				<li v-show="curObj.status==0" v-for="(itemSon,index) in quesImgList" v-if="index < curObj.plusCount"><img :src="itemSon"></li>
			</ul>
		</div>
		<div class="bottom">
			<p class="name-time" v-if="curObj.status==0">
				还差<span class="front">{{curObj.plusCount}}</span>个名额，<span class="back">{{hour}}:{{mint}}:{{secon}}</span>后结束
			</p>
			<p v-else style="height: 0;"></p>
			<div class="button" @click="shareOrder" v-show="curObj.status==0 || curObj.status==1">
				<p style="background: #fe3491;">邀请好友拼团</p>
			</div>
			<div class="button" @click="detailOrder" v-show="curObj.status==2">
				<p style="background: #fe3491;">重新拼团</p>
			</div>
			<div class="button"v-show="curObj.status==3">
				<p>产品已下架无法拼团</p>
			</div>
			<!--<div class="button" @click="buyGoods(curObj.productId)" v-show="curObj.plusCount!=0">
				<p>参与拼团</p>
			</div>-->
		</div>
		<!--分享-->
		<div class="shareDetail" v-show="shareSure" @click="colseShare">
			<div class="share">
				<div class="time" v-show="curObj.status==0">{{hour}}:{{mint}}:{{secon}}</div>
				<img :src="shareImg" />
				<div class="people"><i v-show="curObj.plusCount>0">还差<span>{{curObj.plusCount}}</span>人，</i>赶紧邀请好友来拼团吧</div>
				<div class="sure">点击右上角分享拼团</div>
			</div>
		</div>
		<div class="benefit">
			<ul>
				<li @click="goOne">
					<img :src="indexImg"/>
					<span>首页</span>
				</li>
				<li @click="goTwo">
					<img :src="pinpinImg"/>
					<span>拼团</span>
				</li>
				<li @click="goThree">
					<img :src="zhuanxiangImg"/>
					<span>粉领会员</span>
				</li>
				<li @click="goFour">
					<img :src="shiyongImg"/>
					<span>试用中心</span>
				</li>
				<li @click="goFive">
					<img :src="temaiImg"/>
					<span>品牌特卖</span>
				</li>
				
			</ul>
		</div>
		<div class="content">
			<ul>
				<li v-for='item in listObj' @click="goBuy(item.togetherId)">
					<p style="position: relative;">
						<img :src="item.productImage" />
						<img :src="soldOut"  class="soldOut" v-show="item.store==0"/>
					</p>
					
					<p class="top">{{item.productName}}</p>
					<p style="font-size: .30rem;color: #fa006a;font-weight: 700;">￥{{item.price}}
						<span style="color: #b3b3b3;font-size: .24rem;font-weight: normal;" v-show="item.count>0">已拼{{item.count}}件</span>
					</p>
					<p class="botMoney">
						<img v-for="items in item.joinMembers" :src="items.memberLogo" v-show="item.joinMembers.length>0"/>
						<!--<span class="goBuy" v-show="item.joinMembers.length==0">去拼团</span>-->
					</p>
				</li>
				
				<li v-show="showTrue" class="special">没有更多了</li>
			</ul>
		</div>
	</div>
</template>

<script>
	var timer='';
	export default {
		
		data : function() {
			return{
				goodsImg:'/static/images/goodsImg.png',
				chooseImg:'/static/images/choose.png',
				quesImg:'/static/images/question.png',
				nameImg:'/static/images/name.png',
				speImg:'/static/images/pin.png',
				successImg:'/static/images/success.png',
				indexImg:'/static/images/index.png',
				shiyongImg:'/static/images/shiyong.png',
				dajiaImg:'/static/images/dajia.png',
				zhuanxiangImg:'/static/images/zhuanxiang.png',
				pinpinImg:'/static/images/pinpin.png',
				temaiImg:'/static/images/temai.png',
				soldOut:'/static/images/soldOut.png',
				curObj:{},
				time:'',
				day:'',
				hour:'',
				mint:'',
				secon:'',
				numberone:0,
				shareImg:'/static/images/share.png',
				shareSure:false,
				shareData : {
					'title': "我们一起来拼团吧",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':false
				},
				keyId:'',
				number:'',
				showTrue:false,
				productId:'',
				listObj:[],
				isMore:true,
				pageObj:{
					page:1,
				},
				quesImgList:[
					'/static/images/question.png',
					'/static/images/question.png',
					'/static/images/question.png',
					'/static/images/question.png',
					'/static/images/question.png',
					'/static/images/question.png',
				]
			}
		},
		created: function() {
			this.$store.commit('documentTitle','拼团');
			this.getList();
			this.moveTime();
			//this.locationHref();
			
			
		},
		mounted: function() {
			
				
			window.addEventListener('scroll', this.handleScroll);
			
		},
		
		methods:{
			//点击产品详情
			getGoods(id){
				console.log(id)
				this.$router.push({path:'/index/goodsDetali/id/'+id+'?memberId='+this.$route.query.memberId+'&isLimit=0'});
				//window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id+'&memberId='+this.$route.query.memberId
			},
			//点击首页
			goOne(){
				if(this.getCookie("iShowCenter")==1){
					window.location.href=CUR_URLBACK+'index/pinkIndex?memberId='+this.$route.query.memberId;
				}else{
					window.location.href=CUR_URLBACK+'index/newIndex?memberId='+this.$route.query.memberId;
				}
			},
			//点击拼团
			goTwo(){
				window.location.href=CUR_URLBACK+'index/newIndex?memberId='+this.$route.query.memberId;
			},
			//点击粉领专享
			goThree(){
				window.location.href=CUR_URLBACK+'mine/index?memberId='+this.$route.query.memberId;
			},
			//点击试用中心
			goFour(){
				if(this.getCookie("iShowCenter")==1){
					window.location.href=CUR_URLBACK+'try/newCenter?memberId='+this.$route.query.memberId;
				}else{
					this.$toast('试用中心仅粉领可用');
				}
				
			},
			//点击品牌特卖
			goFive(){
				window.location.href=USE_URL+'ol/weixin/index/indexRecommendBrand?memberId='+this.$route.query.memberId
			},
			getList(){
				//this.setCookie('togetherRecordId',this.$route.params.id);
				console.log(this.$route.params.id)
				let data={
					//memberId:this.$route.query.memberId,
					togetherRecordId:this.$route.params.id,
					//togetherRecordId:24,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.togetherRecordDetail,data,this.getListBack,this);
			},
			getListBack(data){
				if(data.result){
					this.curObj=data.result;
				}else{
					this.curObj=[]
				}
				this.productId=data.result.productId;
				//console.log(this.curObj.productId);
				this.shareData.picURL=this.curObj.productImage;
				
				this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'share/share?id='+this.$route.params.id);
				//this.shareData.url=USE_URL+"weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+"share/share?id="+this.$route.params.id);
				this.shareData.title='【OL圈拼团】我花了'+this.curObj.togetherPrice+'元买了'+this.curObj.productName;
				this.shareData.description=this.curObj.productDesc;
				
				this.time=this.curObj.endTime.replace(/-/g,"/");
				this.addWeixinShare();//微信分享 
				this.getOrderDetail();
				
			},
			//点击购买商品
  			goBuy(id){
  				this.$router.push({path:'/index/goodsDetali/id/'+id+'?memberId='+this.$route.query.memberId+'&isLimit=0'});
  				//window.location.href=CUR_URLBACK+'index/goodsDetali/id/'+id+'?memberId='+this.$route.query.memberId+'&isLimit=0'
  			},
			//获取产品相关推荐
			getOrderDetail(){
				//console.log(this.productId)
				let data={
					//productId:this.productId
					//productId:6748
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getBestTogetherList,data,this.getOrderDetailBack,this);
			},
			getOrderDetailBack(data){
				//console.log(data)
				this.listObj=data.result;
				
			},
			//点击相关产品
			getPordcut(id){
				//console.log(id)
				window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id+'&memberId='+this.$route.query.memberId
			},
			locationHref(){
				//
				//window.location.reload(true)
				this.keyId=this.getCookie('number')
				if(this.keyId=='1'){
					//window.location.href="javascript"
					return false;
				}
				window.location.href=location.href;
				this.addWeixinShare();
				this.setCookie('number','1');
				//this.addWeixinShare()
				
			},
			detailOrder(){
				window.location.href=CUR_URLBACK+'/weixin/product/newProductDetail?productId='+this.curObj.productId+'&memberId='+this.$route.query.memberId
			},
			getRtime(){
				//console.log(this.time)
			    var EndTime= new Date(this.time);
			    //console.log('2017/11/04 00:00:00')
			    var NowTime = new Date();
			    //console.log(EndTime)
			    var t =EndTime.getTime() - NowTime.getTime();
			   // console.log(t)
			    var d=0;
			    var h=0;
			    var m=0;
			    var s=0;
			    if(t>=0){
			      d=check(Math.floor(t/1000/60/60/24));
			      h=check(Math.floor(t/1000/60/60%24));
			      m=check(Math.floor(t/1000/60%60));
			      s=check(Math.floor(t/1000%60));
			    } 
			    function check(i){
		 			if(i<10){
		 				i = "0" + i; 
		 			}
		 			return i; 
		 		}
			    this.day=d;
			    this.hour=h;
			    this.mint=m;
			    this.secon=s;
			},
			moveTime(){
				let _this=this
				//console.log(this)
				setInterval(_this.getRtime,0)
			},
			shareOrder(){
				this.shareSure=true;
				//this.$router.push({path:'/common/wxShare'});
				//window.location.href='http://ol-h5.olquan.cn/share/share/id/'+this.$route.params.id+'?memberId='+this.getCookie("memberId")+'&togetherId='+1+'&num='+1
			},
			colseShare(){
				this.shareSure=false;
			},
			buyGoods(id){
				
				//window.location.href='http://test-mobile.olquan.cn/ol/confirmOrder1.html?num='+this.$route.query.num+'&'+'normalId='+'&'+'memberId='+this.getCookie("memberId")+'&'+'togetherId='+this.$route.query.togetherId +'&'+'togetherRecordId='+this.$route.params.id
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
//			if(data.result=='fail'){
//				this.shareData.share=true;
//			}
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
.partake{
	
	width: 100%;
	min-height: 100%;
	position: relative;
	.sucess{
		
		background: #fff;
		width: 100%;
		
		text-align: center;
		
		img{
			height: .30rem;
			vertical-align: middle;
			width: .30rem;	
		}
		span{
			
			font-size:.32rem;
			vertical-align: middle;
			color: #1afa29;
			margin-left: -.20rem;
		}
	}
	.goodsdetail{
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
		padding: .24rem;
		background: #fff;
		
		.goods-l{
			
			height: 2.20rem;
			width: 2.20rem;
			img{
				height: 2.20rem;
				width: 2.20rem;
				display: block;
			}
			
		}
		.goods-r{
			width: 65%;
			margin-left: .24rem;
			line-height: .36rem;
			font-size: .30rem;
			position: relative;
			.bot{
				position: absolute;
				left: 0;
				bottom: 0;
				.top{
					font-size: .24rem;
					color: #a9a9a9;
				}
				.xia{
					font-size: .24rem;
					color: #a9a9a9;
					i{
						font-style: normal;
						font-size:.32rem;
						color: #e51072;
					}
				}
			}
		}
	}
	.list{
		display: flex;
		display:-webkit-box;
	    display: -moz-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: -moz-flex;
		padding: 0 .24rem;
		-webkit-justify-content:space-between;
		justify-content:space-between;
		-moz-box-pack:space-between;
		-webkit--moz-box-pack:space-between;
		font-size: .24rem;
		background: #f2f2f2;
		
		li{
			line-height: .64rem;
			position: relative;
			padding-left: .38rem;
			img{
				display: inline-block;
				height: .28rem;
				width: .28rem;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -.14rem;
				border-radius: 50%;
			}
		}
	}
	.name{
		background: #fff;
		display: flex;
		width: 100%;
		display:-webkit-box;
	    display: -moz-box;
	    display: -moz-flex;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    -webkit-justify-content:center;
		justify-content:center;
		-moz-box-pack:center;
		-webkit--moz-box-pack:center;
		
		
		
		.name-list{
			display: flex;
			display: -moz-flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
			flex-wrap:wrap;
			-webkit-flex-wrap:wrap;
		  -webkit-box-lines:multiple;
		  -moz-flex-wrap:wrap;
			width: 6.10rem;
			-webkit-justify-content:center;
			justify-content:center;
			-moz-box-pack:center;
			-webkit--moz-box-pack:center;
			font-size: .24rem;
			padding:.40rem 0;
			
			li{
				
				margin: .05rem .16rem;
				position: relative;
				
				img{
					display: inline-block;
					height: .80rem;
					width: .80rem;
					border-radius: 50%;
					
				}
				.special{
					display: inline-block;
					width: .58rem;
					height: .32rem;
					position: absolute;
					left: -.18rem;
					top: -.10rem;
					
				}
			}
			
		}
		
	}
	.bottom{
		background: #fff;
		padding-bottom: .20rem;
		.name-time{
			font-size: .36rem;
			
			text-align: center;
			color: #333;
			margin-bottom: .40rem;
			.front{
				color: #ff3892;
				font-weight: 700;
			}
			.back{
				font-weight: 700;
			}
		}
		.button{
			display: flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
			display: -moz-flex;
			-webkit-justify-content:center;
			justify-content:center;
			-moz-box-pack:center;
			-webkit--moz-box-pack:center;
			p{
				width: 7.02rem;
				height: .88rem;
				
				background: -webkit-linear-gradient(left, #bbbbbb , #949594); /* Safari 5.1 - 6.0 */
			    background: -o-linear-gradient(right, #bbbbbb, #949594); /* Opera 11.1 - 12.0 */
			    background: -moz-linear-gradient(right, #bbbbbb, #949594); /* Firefox 3.6 - 15 */
			    background: linear-gradient(to right, #bbbbbb , #949594); /* 标准的语法 */
				border-radius: 0.05rem;
				font-size: .32rem;
				color: #fff;
				text-align: center;
				line-height: .88rem;
			}
			
			
			/*position: absolute;
			left: 50%;
			margin-left: -3.51rem;
			bottom: 0.20rem;*/
		}
	}
	.shareDetail{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 222;
		background: rgba(0,0,0,.8);
		.share{
			
			.time{
				font-size: .28rem;
				text-align: center;
				width: 100%;
				color: #fff;
				line-height: .76rem;
				position: absolute;
				top: 0;
			}
			img{
				width: 1.60rem;
				height: 1.64rem;
				position: absolute;
				right: .40rem;
				top: .40rem;
			}
			.people{
				margin-top: 2.36rem;
				color: #fff;
				font-size: .36rem;
				text-align: center;
				span{
					color: #ff3892;
					
				}
				i{
					font-style: normal;
				}
			}
			.sure{
				font-size: .28rem;
				text-align: center;
				color: #fff;
				margin-top: .50rem;
			}
		}
	}
	.benefit{
			margin-top: .20rem;
			padding: 0.20rem .40rem 0;
			background: #fff;
			ul{
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
				
				li{
					margin-bottom: .20rem;
					font-size:0.24rem;
					text-align: center;
					width: 20%;
					display: flex;
					display: -moz-flex;
					display:-webkit-box;
				    display: -moz-box;
				    display: -ms-flexbox;
				    display: -webkit-flex;
					-webkit-justify-content:center;
					justify-content:center;
					-moz-box-pack:center;
					-webkit--moz-box-pack:center;
					flex-wrap:wrap;
				    -webkit-flex-wrap:wrap;
			        -webkit-box-lines:multiple;
			        -moz-flex-wrap:wrap;
					
					span{
						color: #666666;
						display: block;
					}
					img{
						display: block;
						height: .90rem;
						width: .90rem;
						border-radius: 50%;
						margin-bottom: .20rem;
						
						
					}
				}
			}
		}
		.content{
		padding: .20rem .12rem;
		ul{
			width:100%;
			display: flex;
			display:-webkit-box;
			display: -moz-box;
			display: -ms-flexbox;
			display: -webkit-flex;
			display: -moz-flex;
			-webkit-justify-content:space-between;
			justify-content:space-between;
			-moz-box-pack:space-between;
			-webkit--moz-box-pack:space-between;
			box-pack:space-between;
			flex-wrap:wrap;
			-webkit-flex-wrap:wrap;
		    -webkit-box-lines:multiple;
		    -moz-flex-wrap:wrap;
			.special{
				width: 100%;
				height: .56rem;
				background: none;
				color: #9C9C9C;
				line-height: .56rem;
				text-align: center;
				font-size:.28rem ;
			}
			li{
				width: 49.5%;
				padding-bottom: .20rem;
				background: #fff;
				margin-bottom:.10rem;
				position: relative;
				.soldOut{
					position: absolute;
					left:50% ;
					margin-left: -.90rem;
					top: 50%;
					margin-top: -.90rem;
					display: block;
					width: 1.80rem;
					height: 1.80rem;
					
				}
				img{
					display: block;
					width: 100%;
					
				}
				.top{
					font-weight: normal;
					font-size: .30rem;
					color: #333;
					line-height: .45rem;
					height: .86rem;
					overflow: hidden;
					padding: .08rem;
					margin-bottom: .25rem;
				}
				.botMoney{
					display: block;
					overflow: hidden;
					font-size: .20rem;
					color: #b2b2b2;
					
					font-style: normal;
					position: absolute;
					right: 0;
					bottom: .10rem;
					z-index: 222;
					width: 100%;
					height: .48rem;
					padding-right: .24rem;
					.goBuy{
						display: block;
						width: 1.20rem;
						height: .48rem;
						background: #fa006a;
						text-align: center;
						font-size: .30rem;
						color: #fff;
						line-height: .48rem;
						border-radius: 0.05rem;
						position: absolute;
						top: 0;
						right: .12rem;
					}
					img{
						display: inline-block;
						height: .48rem;
						width: .48rem;
						border-radius: 50%;
						
					}
					img:nth-child(1){
						position: absolute;
						right: .12rem;
						top: 0;
						z-index: 200;
					}
					img:nth-child(3){
						position: absolute;
						right: .58rem;
						top: 0;
						z-index: 206;
					}
					img:nth-child(2){
						position: absolute;
						right: .36rem;
						top: 0;
						z-index: 202;
					}
				}
			}
		}
	}
	
}

</style>