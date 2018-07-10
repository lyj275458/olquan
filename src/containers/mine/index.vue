<template>
	<div class="mine">
		<div class="member" v-show="listObj.levelCode!='white' && listObj.levelCode!='golden'">
			<div class="headImg">
				<div style="overflow: hidden;" >
					<img :src="listObj.logo" class="headerImg"/>
					<p class="name">{{listObj.nickName}}<br />
						<span v-if="listObj.levelCode=='white'">白领会员</span>
						<span v-else-if="listObj.levelCode=='golden'">金领会员</span>
						<span v-else>粉领会员</span>
					</p>
				</div>
				<div class="leijifen">已累计获得 <span>{{listObj.totalScore}}</span> 积分</div>
				<div style="width: 100%;margin-bottom: .24rem;"><img style="display: block;width: 100%;height: 0.01rem;" :src="diandianImg"/></div>
				<div class="action">
					<div class="dataDetail" @click="getDetailOne">
						<p class="top">{{listObj.freeUseOrderCount}}<span style="font-size: .24rem;">件</span></p>
						<p class="cen">获得试用产品</p>
						<p class="bot">去试用</p>
					</div>
					<div class="dataDetail" @click="getInvite">
						<p class="top">{{listObj.fansCount}}<span style="font-size: .24rem;">人</span></p>
						<p class="cen">粉圈人数</p>
						<p class="bot">去邀请</p>
					</div>
					<div class="dataDetail" @click="getDetailFour">
						<p class="top">{{listObj.storeFansCount}}<span style="font-size: .24rem;">人</span></p>
						<p class="cen">推荐粉领会员</p>
						<p class="bot">去推荐</p>
					</div>
				</div>
				<div class="dateTime" @click="getPinkuse" v-show="showButton">
					<p>续费</p>
					<p style="font-size: .24rem;">{{time}} 到期</p>
					<img :src="rowImg"/>
				</div>
				<div class="dateTime" v-show="!showButton">
					<!--<p>续费</p>-->
					<p style="font-size: .24rem;margin-top: .10rem">{{time}} 到期</p>
					<!--<img :src="rowImg"/>-->
				</div>
				
			</div>
			
			
			
		</div>
		<div style="width: 100%;">
			<img :src="goldenImg" style="display: block;width: 100%;" v-show="listObj.levelCode=='golden'"/>
			<img :src="whiteImg" style="display: block;width: 100%;margin-bottom: .10rem;" v-show="listObj.levelCode=='white'" @click="goIndex"/>
		</div>
		<div class="pink-invio">
			<div class="pinTop" v-show="listObj.levelCode=='white'">
				<p class="top">金领会员5大特权</p>
			</div>
			<div class="benefit" v-show="listObj.levelCode=='white' || listObj.levelCode=='golden'">
				<ul>
					<li>
						<img :src="buyfenImg"/>
						<span>购物送积分</span>
					</li>
					<li>
						<img :src="tuifenImg"/>
						<span>推荐赚积分</span>
					</li>
					<li>
						<img :src="sharefenImg"/>
						<span>分享赚积分</span>
					</li>
					<li>
						<img :src="tryImg"/>
						<span>积分试用</span>
					</li>
					<li>
						<img :src="OLImg"/>
						<span>专属粉圈</span>
					</li>
					
				</ul>
			</div>
			<div class="tiao" v-show="listObj.levelCode=='white' || listObj.levelCode=='golden'"></div>
			<div class="pinTop">
				<p class="top" v-show="listObj.levelCode!='white' && listObj.levelCode!='golden'">您已尊享粉领会员6大特权</p>
				<p class="top" v-show="listObj.levelCode=='white' || listObj.levelCode=='golden'">开通粉领会员尊享6大特权</p>
			</div>
			<div class="jinOwn">
				<ul>
					<li style="border-right: 0.01rem solid #ddd; border-bottom: 0.01rem solid #ddd;">
						<img :src="buyfenImg" />
						<span>购物送积分</span>
						<span style="margin-top: .10rem;">双倍</span>
					</li>
					<li style="border-right: 0.01rem solid #ddd;border-bottom: 0.01rem solid #ddd;">
						<img :src="tuifenImg"/>
						<span>推荐有礼</span>
						<span style="margin-top: .10rem;">￥100</span>
					</li>
					<li style="border-bottom: 0.01rem solid #ddd;">
						<img :src="sharefenImg"/>
						<span>分享赚积分</span>
						<span style="margin-top: .10rem;">双倍</span>
					</li>
					<li style="border-right: 0.01rem solid #ddd;padding: .40rem 0;" @click="getDetailOne">
						<img :src="buypackImg"/>
						<span>粉领试用</span>
					</li>
					<li style="border-right: 0.01rem solid #ddd;padding: .40rem 0;">
						<img :src="zhuanImg"/>
						<span>专享产品</span>
					</li>
					<li style="padding: .40rem 0;">
						<img :src="giftImg"/>
						<span>粉领礼包</span>
					</li>
				</ul>
			</div>
			<!--<div class="getPink" @click="kaiPinkuse" v-show="listObj.levelCode=='white' || listObj.levelCode=='golden'">
				<p>一步到位 ￥{{fenMoney}}/年 享粉领特权</p>
				<img  :src="getpinkImg"/>
			</div>-->
			<!--<div class="jifenUse" @click="gotoJifen">
				<p>小积分 大用处
					<img :src="goImg" />
				</p>
			</div>-->
			<!--<div class="pinkOwn" v-show="showFen">
				
				<span style="margin: 0 .30rem; font-weight: 700;">专享产品</span>
				
			</div>-->
		</div>
		<!--分类产品-->
		<!--<div class="cent" v-show="showFen">
			<ul >
				<li v-for='item in curObj' >
					<img :src="item.indexImage" @click="goBuy(item.productId)"/>
					<p @click="goBuy(item.productId)" class="top">{{item.productName}}</p>
					<p @click="goBuy(item.productId)" class="productMoney">￥{{item.price}}
						<i style="font-style: normal; color: gray;"> / </i><span style="color: #ed0477;font-weight: 700;">{{item.score}}</span>
					</p>
					<p class="botMoney">
						<span class="left">OL圈价：￥{{item.marketPrice}}</span>
						<span class="right" >{{item.score}}</span>
					</p>
					<img class="getassess" :src="gopinjiaImg" @click="getassess(item.productId)"/>
				</li>
				
				<li v-show="showTrue" class="special">没有更多了</li>
			</ul>
		</div>-->
	</div>
</template>

<script>
	var time;
	export default {
		
		data : function(){
			return{
				
				getpinkImg:'/static/images/getpink.png',
				fenlingImg:'/static/images/fenling.png',
				diandianImg:'/static/images/diandian.png',
				buyfenImg:'/static/images/buyfen.png',
				tuifenImg:'/static/images/tuifen.png',
				sharefenImg:'/static/images/sharefen.png',
				buypackImg:'/static/images/buypack.png',
				zhuanImg:'/static/images/zhuan.png',
				giftImg:'/static/images/gift.png',
				tryImg:'/static/images/try.png',
				OLImg:'/static/images/OL.png',
				goldenImg:'/static/images/golden.png',
				whiteImg:'/static/images/white.png',
				rowImg:'/static/images/row.png',
				goImg:'/static/images/go.png',
				gopinjiaImg:'/static/images/getassess.png',
				showTrue:false,
				showFen:false,
				showButton:false,
				curObj:{},
				listObj:{},
				time:'',
				memberId:'',
				pageObj:{
					page:1,
				},
				isAndroid:'',
				isiOS:'',
				isMore:true,
				shareData : {
					'title': "会员权益",
					'description': "快点来查看自己的会员权益吧",
					'url': "",
					'picURL': "http://ol-h5-preview.olquan.cn/static/images/zhuanxiang.png",
					'hide':true,
					'share':false
				},
				fenMoney:'',
				isOpen:0,
				
			}
		},
		components: {
			
		},
		mounted(){
				
			window.addEventListener('scroll', this.handleScroll);
		},
		created: function() {
			//this.getCookie('JSESSIONID')
			this.getDetail();
			//this.getList();
			this.showPhone();
			this.getMoney();
			this.$store.commit('documentTitle','会员权益');
		},
		computed:{
			
		},
		methods:{
			//开通粉领
			kaiPinkuse(){
				if(this.showButton){
					if(tsApp.getClientBrowser()=='wx'){
						window.location.href=USE_URL+'weixin/member/renewConfirmOrder';
					}else{
						if(this.isAndroid){
							OLquan.toProduct("8")
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/flxf";//续费  8
						}
					}	
				}else{
					if(tsApp.getClientBrowser()=='wx'){
						window.location.href=USE_URL+'weixin/member/openStore';
					}else{
						if(this.isAndroid){
							OLquan.toProduct("1")
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/ktfl";//开通  1
						}
					}
				}
				
			},
			//开通粉领的价格
			getMoney(){
				let data={
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getStoreFee,data,this.getMoneyBack);
			},
			getMoneyBack(data){
				//console.log(data)
				this.fenMoney=data.result
				
			},
//			handleScroll () {
//			  var height=document.body.scrollHeight;
//				//console.log(height)
//			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//				//console.log(this.scrollTop)
//			  var windowH=window.innerHeight;
//			  if(this.scrollTop + windowH >=height-200){
//			  	if(this.isMore){
//	 				this.isMore=false;
//	 				let data={
//	  					page:this.pageObj.page+1,
//	  					rows:20,
//	  				};
//	  				this.pageObj.page=this.pageObj.page+1
//					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getPlusRecommendData,data,this.getListMoreBack);
//	 			}
//			  }
//	 			
//			},
//			getListMoreBack(data){
//				if(data.result.length<20){
//					this.isMore=false;
//					this.showTrue=true;
//				}else{
//					this.isMore=true;
//				}
//				
//				
//				for(let i=0; i<data.result.length; i++){
//					this.curObj.push(data.result[i])
//				}
//				
//				console.log(this.curObj)
//			
//			},
			//白领点击
			goIndex(){
				if(tsApp.getClientBrowser()=='wx'){
					if(this.showFen){
						window.location.href=CUR_URLBACK+'index/pinkIndex';
					}else{
						window.location.href=CUR_URLBACK+'index/newIndex';
					}
					//window.location.href=USE_URL+'ol/weixin/index/modelVM?code=index&memberId='+this.$route.query.memberId
				}else{
					if(this.isAndroid){
						OLquan.toProduct("3")
					}
					if(this.isiOS){
						window.location.href="https://www.baidu.com/scsy";//小积分页面 去下单 去购物3
					}
					
					
				}
			},
			showPhone(){
				var u = navigator.userAgent;
				this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//				console.log('是否是Android：'+this.isAndroid);
//				console.log('是否是iOS：'+this.isiOS);
			},
			getList(){
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getPlusRecommendData,this.dataObj,this.getListBack);

			},
			getListBack(data){
				//console.log(data);
				this.curObj=data.result;
			},
			goBuy(id){
				console.log(id);
				if(tsApp.getClientBrowser()=='wx'){
					window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id
				}else{
					if(this.isAndroid){
						OLquan.toModules(id)
					}
					if(this.isiOS){
						window.location.href="https://www.baidu.com/cpxq"+id;//点击商品详情
					}
					
				}
				
			},
			getPinkuse(){
				console.log(1)
				if(tsApp.getClientBrowser()=='wx'){
					window.location.href=USE_URL+'weixin/member/renewConfirmOrder';
				}else{
					if(this.isAndroid){
						OLquan.toProduct("8")
					}
					if(this.isiOS){
						window.location.href="https://www.baidu.com/flxf";//续费  8
					}
				}	
//					window.location.href="开通粉领";//续费8  开通粉领1
//					window.location.href="试用中心";//点击去试用  小积分页面 去试用2
//					window.location.href="商城首页";//小积分页面 去下单 去购物3
//					window.location.href="我的钱包";//小积分页面  去提现4
//					window.location.href="拼团列表";//小积分页面  去提现5
//					window.location.href="推广海报";//点击去推荐  小积分页面 去推荐6
//					window.location.href="产品详情+756";//点击产品3
//					window.location.href="推广海报";//点击去推荐  小积分页面 去推荐3				
//					window.location.href="邀请粉领";//点击去邀请4
			},
			
			getInvite(){
				if(tsApp.getClientBrowser()=='wx'){
					window.location.href=CUR_URLBACK+'mobile/weixin/member/memberTwoCode2';
				}else{
					if(this.isAndroid){
						OLquan.toProduct("6")
					}
					if(this.isiOS){
						window.location.href="https://www.baidu.com/tghb";//点击去推荐  小积分页面 去推荐6
					}
					
					
				}
			},
			getDetailOne(){
				if(this.showFen){
					if(tsApp.getClientBrowser()=='wx'){
						window.location.href=CUR_URLBACK+'try/newCenter';
					}else{
						if(this.isAndroid){
							//OLquan.toProduct("9")
							OLquan.toProduct("2")
						}
						if(this.isiOS){
							//window.location.href="https://www.baidu.com/flsy";//点击去试用  跳粉领试用  9
							window.location.href="https://www.baidu.com/syzx";
						}
					}
				}else{
					console.log(1)
				}
				
				
			},
			//点击去邀请
			getDetailFour(){
				if(this.isOpen){
					if(tsApp.getClientBrowser()=='wx'){
						//window.location.href=USE_URL+'weixin/member/openStore?memberId='+this.$route.query.memberId
						window.location.href=CUR_URLBACK+'supervisor/buyPink';
					}else{
						if(this.isAndroid){
							OLquan.toProduct("1")
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/ktfl";//
						}
						
					}
				}else{
					if(tsApp.getClientBrowser()=='wx'){
						window.location.href=CUR_URLBACK+'supervisor/buyPink';
					}else{
						if(this.isAndroid){
							OLquan.toProduct("7")
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/yqfl";//
						}	
					}
				}
			},
			gotoJifen(){
				//console.log(CUR_URLBACK+'integral/uesget?memberId='+this.getCookie("memberId"))
				window.location.href=CUR_URLBACK+'integral/uesget';
				//this.$router.push({path:'/integral/uesget?memberId='+this.getCookie("memberId")});
			},
			getDetail(){
				let data={
					//memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getDetailBack,this);
			},
			getDetailBack(data){
				this.listObj=data.result;
				this.time=this.listObj.validTime.split("至")[1];
				console.log(this.time)
				this.shareData.url="https://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'mine/index?isCheck=1');
				//this.shareData.url="https://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'mine/index');
				if(this.listObj.isGetStoreCommission){
					this.showFen=true;
				}else{
					this.showFen=false;
				}
				if(this.listObj.levelCode=="white" || this.listObj.levelCode=="golden"){
					this.isOpen=1;
				}else{
					this.isOpen=0;
				}
				if(this.listObj.isShowRenewButton==0){
					this.showButton=false;
				}else{
					this.showButton=true;
				}
				this.addWeixinShare();//微信分享 
			},
			goMore(){
				if(tsApp.getClientBrowser()=='wx'){
			         //window.location.href="http://www.baidu.com"
			    }else{
			    	console.log(123)
			    }
				OLquan.toProduct("123")

			},
			//点击去评价
			getassess(id){
				window.location.href=USE_URL+'ol/commentList.html?productId='+id;
			},
			toProduct(){
				
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
			
		},
		destroyed () {
		  window.removeEventListener('scroll', this.handleScroll)
		},
	}
</script>

<style lang="scss" scoped>
	.mine{
		background: #f2f2f2;
		min-height: 100%;
		.member{
			position: relative;
			padding: .24rem .24rem 0rem;
			
			.dateTime{
				background: url(../../../static/images/time.png) no-repeat center;
				background-size: cover;
				width: 2.70rem;
				height: .68rem;
				position: absolute;
				top: .68rem;
				right: .25rem;
				padding-top: .20rem;
				font-size: .26rem;
				color: #fff;
				p{
					margin-left: .36rem;
					/*margin-top: .10rem;*/
					margin-bottom: .08rem;
				}
				img{
					width: .17rem;
					height: .28rem;
					display: block;
					position: absolute;
					right: 0.15rem;
					top: 50%;
					margin-top: -0.14rem;
				}
			}
			
			.headImg{
				padding-left: .64rem;
				padding-top: .30rem;
				padding-right: .64rem;
				height: 3.8rem;
				background: url(../../../static/images/fenback.png) no-repeat center;
				background-size: cover;
				.headerImg{
					display: inline-block;
					width: 1.00rem;
					height: 1.00rem;
					border-radius: 50%;
					float: left;
				}
				.name{
					font-size: .26rem;
					vertical-align: middle;
					margin-top: .15rem;
					margin-left: .20rem;
					float: left;
					color: #fff;
					span{
						text-align:center;
						margin-top:.12rem;
						width: 1.20rem;
						display: inline-block;
						height: .32rem;
						border: 0.01rem solid #fff;
						border-radius: .30rem;
						font-size: .20rem;
						line-height: .34rem;
					}
					
				}
				.leijifen{
					font-size: .28rem;
					color: #fff;
					padding: .20rem 0 .16rem;
					span{
						color: #fff600;
						font-weight: 700;
					}
				}
				.action{
					display: flex;
					display:-webkit-box;
				    display: -moz-box;
				    display: -ms-flexbox;
				    display: -moz-flex;
				    display: -webkit-flex;
					-webkit-justify-content:space-between;
					justify-content:space-between;
					-moz-box-pack:space-between;
					-webkit--moz-box-pack:space-between;
					.dataDetail{
						color: #fff;
						.top{
							font-size:.32rem ;
							margin-bottom: .20rem;
						}
						.cen{
							font-size:.24rem ;
							margin-bottom: .20rem;
						}
						.bot{
							width: 1rem;
							height: .38rem;
							background: #fff;
							color: #c8084f;
							font-size: .24rem;
							text-align: center;
							line-height: .38rem;
							border-radius: .38rem;
						}
					}
				}
			}
			.fenquan{
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
				.sheng{
					width: 30%;
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
					border: 0.01rem solid #fff;
					border-bottom: none;
					line-height: .64rem;
					margin: 0 .05rem;
					position: relative;
					text-align: center;
					margin-top: .40rem;
					border-radius: 0.10rem 0.10rem 0 0;
					p{
						font-size: .24rem;
						color: #fff;
						margin-left: 0.05rem;
					}
					img{
						width: .30rem;
						
						display: inline-block;
						vertical-align: middle;
						margin-top: -0.20rem;
					}
				}
				
			}
		}
		
		
		.pink-invio{
			background: #fff;
			.pinTop{
				border-bottom: 0.01rem solid #f2f2f2;
				.top{
					padding-left: .24rem;
					line-height: .84rem;
					font-size: .32rem;
					font-weight: 700;
					text-align: center;
					
				}
			}
			
		}
		.tiao{
			height: .20rem;
			width: 100%;
			background: #f2f2f2;
		}
		.jinOwn{
			padding-top: .20rem;
			ul{
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
				li{
					
					padding-bottom: .30rem;
					font-size:0.24rem;
					text-align: center;
					width: 33%;
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
						width: 100%;
					}
					img{
						display: block;
						height: .52rem;
						width: .52rem;
						
						margin-bottom: .20rem;
						
						
					}
				}
			}
		}
		.benefit{
			padding: 0.20rem .40rem 0;
			ul{
				display: flex;
				display: -moz-flex;
				
				display:-webkit-box;
			    display: -moz-box;
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
						height: .52rem;
						width: .52rem;
						
						margin-bottom: .20rem;
						
						
					}
				}
			}
		}
		.jifenUse{
			width: 100%;
			padding: .10rem 0;
			background: #f2f2f2;
			padding-top: .20rem;
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
				font-size: .32rem;
				width: 6.98rem;
				line-height: .88rem;
				border-radius: .90rem;
				border: 0.01rem solid #fc469a;
				background: #fff;
				color: #fc469a;
				text-align: center;
				position: relative;
				font-weight: 700;
				img{
					display: block;
					width: .17rem;
					height: .28rem;
					position: absolute;
					left: 66%;
					top: 50%;
					margin-top: -0.14rem;
				}
			}
		}
		
		.getPink{
			width: 100%;
			background: #f2f2f2;
			padding-top: .66rem;
			position: relative;
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
			box-pack:center;
			p{
				font-size: .32rem;
				color: #fff;
				width: 7.00rem;
				line-height: .90rem;
				border-radius: 0.05rem;
				background: #fc469a;
				text-align: center;
			}
			img{
				position: absolute;
				left: 50%;
				margin-left: -3.23rem;
				top: 0.12rem;
				display: block;
				width: 6.46rem;
			}
		}
		.pinkOwn{
			width: 100%;
			font-size: .28rem;
			text-align: center;
			line-height: .76rem;
			background: #f2f2f2;
			img{
				display: inline-block;
				vertical-align: middle;
				width: 1.32rem;
				height: 0.02rem;
			}
			
		}
		.cent{
		
		padding: .20rem .12rem;
		
		ul{
			width:100%;
			/*display: flex;
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
		    -moz-flex-wrap:wrap;*/
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
				width: 100%;
				font-size: .28rem;
				padding-bottom: .20rem;
				background: #fff;
				margin-bottom:.10rem;
				position: relative;
				.getassess{
					display: block;
					width: .36rem;
					height: .36rem;
					position: absolute;
					bottom: 0.20rem;
					right: .48rem;
					z-index: 9999;
				}
				img{
					display: block;
					width: 100%;
					
				}
				.top{
					font-weight: normal;
					font-size: .28rem;
					color: #333;
					line-height: .42rem;
					padding: .08rem;
					max-height:.84rem ;
					overflow: hidden;
				}
				.productMoney{
					font-size: .28rem;
					line-height: .32rem; 
					font-weight: 700;
					position: relative;
					z-index: 22;
					line-height: .36rem;
					
				}
				.botMoney{
					display: block;
					overflow: hidden;
					font-size: .24rem;
					color: #b2b2b2;
					font-style: normal;
					margin-top: .10rem;
					padding-left: .05rem;
					padding-right: .24rem;
					.left{
						
						
						float: left;
						
						
					}
					.right{
						float: right;
						
					}
				}
			}
		}
	}
	}
</style>