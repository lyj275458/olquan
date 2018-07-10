<template>
	
	<!--<div class="step">
		<p class="bot"></p>
		<p class="cent" v-bind:style="{width:Number(perWidth.split('%')[0])/100*3+'rem'}"></p>
	</div>-->
	<div class="tryIndex" >
		<Linking></Linking>
		<swiper loop auto :list="urlList" height='3.34rem'  dots-position='center' v-show="urlList.length!=0"></swiper>
		<!--<Swiper :aspect-ratio="9/16" loop auto  dots-position='center' ref="swiper" >
	      <swiper-item style="overflow: hidden; height: 100%;" class="swiper-demo-img" v-for="(itemsSon, index) in urlList" :key="index"><img style="width: 100%;" :src="itemsSon.img">
	      </swiper-item>
	    </Swiper>-->
		<div class="message">
			<div class="leftfen">
				<img :src="tryfenImg"/>
				
				<span>我的积分：{{memList.score}}</span>
			</div>
			<div class="leftmine" @click='getTry'>
				<img :src="trymineImg"/>
				<span>我的试用</span>
			</div>
		</div>
		<div class="benefit">
			<ul v-bind:class="{ 'specialUl': showFive==true}">
				<li v-for="item in memList.categories" @click="getNomore(item.categoryId,item.categoryType)">
					<img :src="item.categoryIcon"/>
					<span>{{item.categoryName}}</span>
				</li>
				
			</ul>
		</div>
		<div class="goods-name" v-for="item in curObj" @click='gototry(item.productId)'>
			<div class="food" >
				<div class="fodImg">
					<img :src="item.image"/>
					<img :src="soldImg"  class="isSold" v-show="item.percent=='100%'"/>
				</div>
				<div class="fodName">
					<p style="height: 1.16rem; overflow: hidden;">{{item.productName}}</p>
					<div class="gotry">
						<span style="font-size:.24rem ; color: #959595;">
							<b style="color: #ed0276;font-size: .36rem;">{{item.score}}</b>
							<b style="font-weight: normal;">积分</b>
						</span>
						<span class="spebot">去试用</span>
					</div>
					<div class="progress">
						<p class="use"></p>
						<p class="number">已试用{{item.percent}}</p>
						<div class="bei">
							<p v-bind:style="{width:item.percent}"></p>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Swiper, SwiperItem} from 'vux'
	import { Lazyload } from 'mint-ui';
	export default {
		
		data : function(){
			return{
				perWidth:"50%",
				urlList:[],
				goodsImg:'/static/images/goodsImg.png',
				tryfenImg:'/static/images/tryfen.png',
				trymineImg:'/static/images/trymine.png',
				indexImg:'/static/images/index.png',
				shiyongImg:'/static/images/shiyong.png',
				zhuanxiangImg:'/static/images/zhuanxiang.png',
				pinpinImg:'/static/images/pinpin.png',
				temaiImg:'/static/images/temai.png',
				soldImg:'/static/images/soldOut.png',
				curObj:[],
				memList:[],
				isMore:true,
				showFive:true,
				pageObj:{
					page:1,
				},
				cateObj:[],
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
		    Swiper,
		    SwiperItem
		},
		created: function() {
			this.$store.commit('documentTitle','试用中心');
			this.getImgtop();
			this.getList();
//			this.getCate();
		},
		mounted(){
			
			window.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			//获取试用分类
//			getCate(){
//				let data={
//					
//				}
//				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.cateGories,data,this.getCateBack,this);
//			},
//			getCateBack(data){
//				console.log(data)
//				this.cateObj=data.result;
//			},
			
			//点击试用分类
			getNomore(id,type){
				console.log(id)
				console.log(type)
				if(type==2){
					//this.$router.push({path:'/try/moretry'+'?memberId='+this.getCookie("memberId")});
					window.location.href=CUR_URLBACK+'try/moretry';
				}else if(type==3){
					window.location.href=USE_URL+'weixin/protocol/protocol?code=freeUseDesc';
				}else if(type==4){
					window.location.href=USE_URL+'ol/buy-zd.html';
				}else if(type==1){
					//this.$router.push({path:'/try/detailtry/id/'+id+'?memberId='+this.$route.query.memberId});
					window.location.href=CUR_URLBACK+'try/detailtry/id/'+id;
				}
			},
			//点击我的试用
			getTry(){
				window.location.href=USE_URL+'weixin/member/freeUseCore';
			},
			//点击列表商品
			gototry(id){
				console.log(id)
				//window.location.href=CUR_URLBACK+'try/trygoods/id/'+id+'?memberId='+this.$route.query.memberId;
				this.$router.push({path:'/try/trygoods/id/'+id});
				//this.$router.push({path:'/demo/iscroll/id/'+id+'?memberId='+this.$route.query.memberId});
			},
			
			//轮播图获取
			getImgtop(){
				let data={
					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.freeUseHomePage,data,this.getImgBack);
			},
			getImgBack(data){
				this.memList=data.result;
				if(data.result.categories.length>5){
					this.showFive=false;
				}else{
					this.showFive=true;
				}
				if(data.result.banners){
					this.imgObj=data.result.banners;
				}else{
					this.imgObj=[];
				}
				
				this.urlList = this.imgObj.map((item, index) => ({
				  url: item.url,
				  img: item.image,
				  
				}))
			},
			getList(){
				let data={
					page:1,
					rows:20
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getScoreDataAll,data,this.getListBack);
			},
			getListBack(data){
				//console.log(data)
				this.curObj=data.result;
				
				this.shareData.url="https://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'try/center');
				//this.shareData.url="https://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'try/center');
				this.addWeixinShare();//微信分享 	
			},
			handleScroll () {
  			  var height=document.body.scrollHeight;
  				//console.log(height)
			  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(this.scrollTop)
			  var windowH=window.innerHeight;
			  if(scrollTop + windowH >=height-200){
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	  					page:this.pageObj.page+1,
	  					rows:20,
	  				};
	  				this.pageObj.page=this.pageObj.page+1
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getScoreDataAll,data,this.getListMoreBack);
	 			}
			  }
	 			
			},
			getListMoreBack(data){
				if(data.result.length<20){
					this.isMore=false;
					
				}else{
					this.isMore=true;
				}
				for(let i=0; i<data.result.length; i++){
					this.curObj.push(data.result[i])
				}
				for(let i=0;i<this.curObj.length;i++){
					if(Number(this.curObj[i].percent.replace("%",""))<5 && Number(this.curObj[i].percent.replace("%",""))>0){
						this.curObj[i].parent=5+'%'
					}else if(Number(this.curObj[i].percent.replace("%",""))==0){
						this.curObj[i].parent=0+'%'
					}else{
						this.curObj[i].parent=this.curObj[i].percent;
					}
				}
				//console.log(this.curObj)
			
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
	.tryIndex{
		
		.message{
			margin-top: .10rem;
			padding:.10rem 0 ;
			display: flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
		    display: -moz-flex;
			-webkit-justify-content:space-around;
			justify-content:space-around;
			-moz-box-pack:space-around;
			-webkit--moz-box-pack:space-around;
			font-size: .28rem;
			color: #666;
			background: #fff;
			line-height: .68rem;
			.leftfen{
				width: 50%;
				text-align: center;
				img{
					display: inline-block;
					width: .28rem;
					height: .22rem;
					
				}
				span{
					display: inline-block;
				}
			}
			.leftmine{
				text-align: center;
				width: 50%;
				border-left: 0.01rem solid #e5e5e5;
				img{
					display: inline-block;
					width: .23rem;
					height: .28rem;
					margin-top: .05rem;
					margin-top: -0.05rem;
					vertical-align: middle;
				}
				span{
					display: inline-block;
				}
			}
		}
		.benefit{
			margin: .10rem 0;
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
				flex-wrap:wrap;
				-webkit-flex-wrap:wrap;
				-webkit-box-lines:multiple;
				-moz-flex-wrap:wrap;
				
				li{
					height: 1.70rem;
					
					font-size:0.24rem;
					text-align: center;
					width: 20%;
					position: relative;
					span{
						color: #666666;
						width: 100%;
						display: inline-block;
						position: absolute;
						bottom: 0.20rem;
						left: 0;
						
						
					}
					img{
						display: block;
						height: .90rem;
						width: .90rem;
						position: absolute;
						left: 50%;
						margin-left: -.45rem;
						top: 0.20rem;
						border-radius: 50%;
						margin-bottom: .20rem;
						
						
					}
				}
			}
			.specialUl{
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
		.goods-name{
			overflow: hidden;
		.food{
			padding:  .20rem .24rem;
			overflow: hidden;
			background: #fff;
			margin-bottom: .10rem;
			border-bottom: .01rem solid #f2f2f2;
			float: left;
			/*display: flex;
			display:-webkit-box;
			display: -webkit-flex;
			display: -moz-box;
			display: -moz-flex;
			display: -ms-flexbox;
			-webkit-box-pack: center;
		    -moz-box-pack: center;
		    -ms-flex-align:center;
		    -webkit-align-items: center;
		    -moz-align-items: center;
		    align-items: center;*/
			.fodImg{
				
				width: 40%;
				height: 2.80rem;
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
			    position: relative;
			    .isSold{
			    	display: block;
			    	position: absolute;
			    	left: 50%;
			    	margin-left: -.90rem;
			    	top: 50%;
			    	margin-top: -.90rem;
			    	height: 1.80rem;
			    	width: 1.80rem;
			    }
				img{
					display: block;
					
					width: 100%;
				}
				
			}
			.fodName{
				float: left;
				width: 56.40%;
				margin-left: .24rem;
				font-size: .28rem;
				line-height: .38rem;
				word-wrap: break-word;
				.gotry{
					margin: .35rem 0 .25rem;
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
					span{
						line-height: .50rem;
					}
					.spebot{
						display: inline-block;
						width: 1.10rem;
						height: .50rem;
						color: #FFF;
						background: #ed0477;
						text-align: center;
						border-radius: .50rem;
						line-height: .50rem;
					}
					
				}
				.progress{
					width: 100%;
					height: .28rem;
					border-radius: .28rem;
					
					position: relative;
					.use{
						position: absolute;
						left: 0;
						top: 0;
						height: .32rem;
						width: 100%;
						border-radius: .34rem;
						border: 0.01rem solid #ed0477;
						line-height: .34rem;
						text-align: center;
						font-size: .24rem;
						color: #fff;
						background: #fd89b2;
						z-index: 333;
					}
					.number{
						width: 100%;
						height: 100%;
						text-align: center;
						position: absolute;
						left: 0;
						top: 0;
						z-index: 1111;
						color: #fff;
						font-size: .20rem;
						
					}
					.bei{
						position: absolute;
						width: 100%;
						height: .34rem;
						
						border-radius: .34rem;
						overflow: hidden;
						z-index: 444;
						p{
							height: .32rem;
							border: 0.01rem solid #ed0477;
							background: #ed0477;
						}
					}
				}
			}
		}
	}
	}

</style>