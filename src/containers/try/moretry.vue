<template>
	<div class="tryMore">
		<Linking></Linking>
		<div class="search" @click="getSearch">
			<div class="searchIcon"></div>
		</div>
		<div class="topmodel">
			<ul class="list">
				<li class="listItem" v-bind:class="{ 'specialList': addSelectSpe}" style="margin: 0;margin-left: .30rem;" @click="getFist">特卖</li>
				<li class="listItem" v-bind:class="{ 'specialList': addSelectOne}" style="margin: 0 0 0 -.1rem;" @click="getFistOne">试用</li>
				<li class="listItem" v-bind:class="{ 'specialList': addSelectTwo}" style="margin: 0 -.2rem 0 -0.01rem;" @click="getFistTwo">拼团</li>
				<li class="listItem" v-bind:class="{ 'specialList': index==addIndex}" v-for="(itemSon,index) in cateObj" @click='getDetailNex(index,itemSon.catId)'>{{itemSon.name}}</li>
			</ul>
		</div>
		<div class="activeTime">
			<div class="leftact" v-for="(item,index) in actObj" v-bind:class="{ 'special': item.type===2}" @click="getAct(index,item.type,item.timeId)">
				<p style="line-height: .72rem;">{{item.title}}</p>
				<p style="font-size: .26rem; line-height: .32rem;">{{item.subTitle}}</p>
			</div>
			
		</div>
		<div class="goods-name" v-for="item in curObj" @click='gototry(item.productId)'>
			<div class="food" >
				<div class="fodImg">
					<img v-lazy="item.image"/>
					<img :src="soldImg"  class="isSold" v-show="item.percent=='100%'"/>
				</div>
				<div class="fodName">
					<p style="height: 1.16rem; overflow: hidden;">{{item.productName}}</p>
					<div class="gotry">
						<span style="font-size:.24rem ; color: #959595;">
							试用保证金
							<i style="color: #ed0276;font-style: normal;"></i>
							<b style="color: #ed0276;font-size: .32rem;">{{item.price}}</b>
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
	export default {
		name:'a',
		data : function(){
			return{
				curObj:[],
				actObj:[],
				addSelect:0,
				nowTime:new Date().getTime(),
				timeId:1,
				pageObj:{
					page:1,
				},
				isMore:true,
				addSelectSpe:false,
				addSelectOne:true,
				addSelectTwo:false,
				addIndex:null,
				showBottom:false,
				selectVlaue:'默认',
				selected:'',
				downImg:'/static/images/download.png',
				soldImg:'/static/images/soldOut.png',
				showChoose:false,
				searchBarFixed:false,
				shareData : {
					'title': "OL圈 试用中心",
					'description': "试,是一种态度。每日10,20点限量开抢！",
					'url': "",
					'picURL': "http://ol-site.olquan.com/plug/mobile/img/logoo.jpg",
					'hide':true,
					'share':false
				},
				cateObj:JSON.parse(localStorage.getItem("cateGory")),
			}
		},
		created: function() {
			this.$store.commit('documentTitle','粉领试用');
			this.getActive();
			//this.getCategory();
			console.log(this.cateObj)
//			console.log(this.timeId)
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
			
			 	
		},
		methods:{
			gototry(id){
				console.log(id)
				this.$router.push({path:'/try/trygoods/id/'+id+'?memberId='+this.$route.query.memberId});
				//this.$router.push({path:'/demo/iscroll/id/'+id+'?memberId='+this.getCookie("memberId")});
				//window.location.href=CUR_URLBACK+'try/trygoods/id/'+id+'?memberId='+this.getCookie("memberId");
			},
			getShow(){
				this.showChoose=!this.showChoose;
			},
			//点击特卖
  			getFist(){
  				//this.$router.push({path:'/index/pinkIndex?memberId='+this.getCookie("memberId")});
  				window.location.href=CUR_URLBACK+'index/pinkIndex?memberId='+this.$route.query.memberId
  				
  			},
  			//点击试用
  			getFistOne(){
  				//this.$router.push({path:'/try/moretry?memberId='+this.getCookie("memberId")});
  				window.location.href=CUR_URLBACK+'try/moretry?memberId='+this.$route.query.memberId
  			},
  			//点击拼团
  			getFistTwo(){
  				//this.$router.push({path:'/index/newIndex?memberId='+this.getCookie("memberId")});
  				window.location.href=CUR_URLBACK+'index/newIndex?memberId='+this.$route.query.memberId
  			},
  			//点击分类
  			getDetailNex(index,id){
  				window.location.href=USE_URL+'weixin/product/productCategoryDetail?pcatId='+id+'&memberId='+this.$route.query.memberId;
  				
  			},
  			getSearch(){
  				window.location.href=USE_URL+'ol/weixin/index/search?memberId='+this.$route.query.memberId;
  			},
  			//获取首页顶部分类
  			getCategory(){
  				let data={};
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getCategory,data,this.getCategoryBack);
  				
  			},
  			getCategoryBack(data){
//				console.log(data)
  				this.cateObj=data.result;
  			},
			//获取活动
			getActive(){
				let data={
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getFreeUseTimes,data,this.getActiveBack);
			},
			getActiveBack(data){
				this.actObj=data.result.times;
				console.log(this.actObj)
				for(let i=0;i<this.actObj.length;i++){
					if(this.actObj[i].type==2){
						this.timeId=this.actObj[i].timeId
					}
				}
//				console.log(this.timeId)
				this.getList();
			},
			//获取当前试用产品
			getList(){
				let data={
					page:1,
					rows:20,
					isNeedBrand:0,
					timeId:this.timeId
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getFreeUseData,data,this.getListBack);
			},
			getListBack(data){
//				console.log(data)
				this.curObj=data.result.productDtos;
				
//				console.log(this.nowTime)
				this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'try/moretry');
				//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'try/moretry');
				this.tryWeixinShare();//微信分享
			},
			getAct(index,type,id){
//				console.log(index)
//				console.log(type)
//				console.log(id)
				
				if(type==1){
					this.$toast('活动尚未开始');
				} else if(type==3){
					this.$toast('活动已经结束');
				}else{
					this.timeId=id;
					this.addSelect=index;
					this.pageObj.page=1;
					this.isMore=true;
					this.getList();
				}
			},
			//获取更多
			handleScroll () {
			  var height=document.body.scrollHeight;
				//console.log(height)
			  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			 // var offsetTop = document.querySelector('.top').offsetTop;
			  var windowH=window.innerHeight;
			 // console.log(scrollTop+windowH)
			 // console.log(height)
//			 if (scrollTop > offsetTop) {
//				    this.searchBarFixed = true;
//				} else {
//				    this.searchBarFixed = false;
//			}
			  if(scrollTop + windowH >=height-200){
			  	
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	  					page:this.pageObj.page+1,
	  					rows:20,
	  					isNeedBrand:0,
						timeId:this.timeId
	  				};
	  				this.pageObj.page=this.pageObj.page+1
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getFreeUseData,data,this.getListMoreBack);
	 			}
			  }
	 			
			},
			getListMoreBack(data){
				if(data.result.productDtos.length<20){
					this.isMore=false;
					this.showTrue=true;
				}else{
					this.isMore=true;
				}
				
				
				for(let i=0; i<data.result.productDtos.length; i++){
					this.curObj.push(data.result.productDtos[i])
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
//				console.log(this.curObj)
			
			},
			//微信分享 
			tryWeixinShare:function(){
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
	.tryMore{
		padding-top: .80rem;
		img{
			pointer-events: none;
		}
		.search{
			width: .80rem;
			height: .74rem;
			padding-top: 0.06rem;
			position: fixed;
			background: #fff;
			right: 0;
			top: 0;
			
			z-index: 99999;
			.searchIcon{
				width: 100%;
				height: 100%;
				background: url(../../../static/images/search-index.png) no-repeat center center;
				background-size: .34rem .34rem;
			}
		}
		.topmodel{
			
			background: #fff;
			border-bottom: 0.01rem solid #f2f2f2;
			position: fixed;
			left: 0;
			top: 0;
			height: .80rem;
			z-index: 22222;
			width: 100%;
				.select{
					font-size: .24rem;
					color: #666;
					float: left;
					width: 1.90rem;
					text-align: center;
					border: 0.01rem solid #f2f2f2;
					background: #fff;
					height: .62rem;
					line-height: .64rem;
					/*border-radius: .05rem 0 0 .05rem;*/
					margin-left: .24rem;
					
				}
				.selectImg{
					width: .50rem;
					height: .62rem;
					border: 0.01rem solid #f2f2f2;
					border-left: none;
					/*border-radius: 0 .05rem 0.05rem 0;*/
					position: relative;
					float: left;
					img{
						display: block;
						position: absolute;
						left: 50%;
						margin-left: -.08rem;
						width: .16rem;
						height: .10rem;
						top: 50%;
						margin-top: -0.05rem;
					}
				}
				
				.list{
					padding: .09rem 0.80rem 0.12rem 0;
					white-space:nowrap;
					width: 6.40rem;
					overflow-y: hidden;
					height: .58rem;
					float: left;
					
					.listItem{
						font-size: .30rem;
						line-height: .64rem;
						margin: 0 .20rem;
						color: #333;
						vertical-align: text-top;
						display: inline-block;
					}
					.specialList{
						color: #E5006E;
						font-weight: 600;
						border-bottom:  0.04rem solid #E5006E;
					}
				}
				
			
			.choose{
				font-size: .24rem;
				position: absolute;
				line-height: .62rem;
				width: 2.41rem;
				text-align: center;
				background: #fff;
				border: 0.01rem solid #f2f2f2;
				z-index: 22;
				left: 0.24rem;
				top: 0.76rem;
				border-top: none;
			}
			
			
		}
		.top{
			padding: .12rem 0;
			background: #fff;
			border-bottom: 0.01rem solid #f2f2f2;
			position: relative;
			
			.atuoPage{
				overflow-x: scroll;
				position: relative;
				
				.select{
					font-size: .24rem;
					color: #666;
					float: left;
					width: 1.90rem;
					text-align: center;
					border: 0.01rem solid #f2f2f2;
					background: #fff;
					height: .62rem;
					line-height: .64rem;
					/*border-radius: .05rem 0 0 .05rem;*/
					margin-left: .24rem;
					
				}
				.selectImg{
					width: .50rem;
					height: .62rem;
					border: 0.01rem solid #f2f2f2;
					border-left: none;
					/*border-radius: 0 .05rem 0.05rem 0;*/
					position: relative;
					float: left;
					img{
						display: block;
						position: absolute;
						left: 50%;
						margin-left: -.08rem;
						width: .16rem;
						height: .10rem;
						top: 50%;
						margin-top: -0.05rem;
					}
				}
				.list{
					
					white-space:nowrap;
					width: 60%;
					height: .64rem;
					float: left;
					overflow-y: hidden;
					z-index: 333;
					overflow-x: auto;
					.listItem{
						font-size: .28rem;
						line-height: .64rem;
						color: #666;
						vertical-align: text-top;
						display: inline-block;
					}
				}
				
			}
			.choose{
				font-size: .24rem;
				position: absolute;
				line-height: .62rem;
				width: 2.41rem;
				text-align: center;
				background: #fff;
				border: 0.01rem solid #f2f2f2;
				z-index: 22;
				left: 0.24rem;
				top: 0.76rem;
				border-top: none;
			}
			
			
		}
		.isFixed{
			position: fixed;
			left: 0;
			top: 0;
			z-index: 2222;
		}
		.activeTime{
			overflow: hidden;
			border-bottom: 0.01rem solid #f2f2f2;
			font-size:.32rem;
			background: #fff;
			color:#9c9c9c;
			.special{
				color: #e50f72;
			}
			.leftact{
				float: left;
				width: 50%;
				text-align: center;
			}
			
		}
		.goods-name{
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
					border-radius: .05rem;
					position: relative;
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
				    -webkit-justify-content:center;
					justify-content:center;
					-moz-box-pack:center;
					-webkit--moz-box-pack:center;
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
					width: 56.38%;
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
						z-index: 111;
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
						z-index: 112;
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