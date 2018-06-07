<template>
	<div class="indexMore">
		<Linking></Linking>
		<div class="topmodel" >
			<div class="atuoPage">
				<!--<div style="float: left; overflow: hidden;" @click="getShow">
					<div class="select">
						{{this.selectVlaue}}
					</div>
					<div class="selectImg">
						<img :src="downImg" />
					</div>
				</div>-->
				<ul class="list" v-bind:class="{ 'listSpecial': showFive==true}">
					
					<li class="listItem"  v-bind:class="{ 'specialList': itemSon.togetherCategoryId==togetherCategoryId}" v-for="(itemSon,index) in imgObj.togetherCateries" v-show="itemSon.type!=2" @click='getDetailNex(index,itemSon.togetherCategoryId)'>{{itemSon.name}}</li>
					
				</ul>
			</div>
			<div class="score">
				<p class="scoreL" v-bind:class="{ 'scoreS': sort==1}" @click="lowPrice">价格从低到高
					<img :src="gofotopImg" v-show="sort==1"/>
					<img :src="shangupImg" v-show="sort==2"/>
				</p>
				<p class="scoreR" v-bind:class="{ 'scoreS': sort==2}" @click="higPrice">价格从高到低
					
					<img :src="godownImg"  v-show="sort==1"/>
					<img :src="xiaupImg" v-show="sort==2"/>
				</p>
			</div>
			<!--<div class="choose" v-show="showChoose">
				<p style="border-bottom: 0.01rem solid #f2f2f2;" @click="lowPrice">价格由低到高</p>
				<p @click="higPrice">价格由高到低</p>
			</div>-->
			
		</div>
		<div class="content">
			<ul>
				<li v-for='item in curObj' @click="goBuy(item.togetherId)">
					<p class="imgTage">
						<img :src='item.tagLogo' v-show="item.togetherTagType!=2"/>
					</p>
					<p class="imgDetail">
						<img :src="item.productImage" />
						<p class="specialZhe"></p>
					</p>
					<p class="top"><span v-show="item.tagName!='' && item.togetherTagType!=1" style="font-size: .20rem; margin-right: .10rem;">{{item.tagName}}</span>{{item.productName}}</p>
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
		<!--<div class="goFortop" v-show="showTop">
			<img :src="goTopImg" @click="gotoTop"/>
		</div>-->
	</div>
</template>

<script>
	import $ from 'jquery';
	export default {
		data : function(){
			return{
				selectVlaue:'默认',
				downImg:'/static/images/download.png',
				goTopImg:'/static/images/goTop.png',
				godownImg:'/static/images/godown.png',
				gofotopImg:'/static/images/gofotop.png',
				shangupImg:'/static/images/shangup.png',
				xiaupImg:'/static/images/xiaup.png',
				showChoose:false,
				imgObj:[],
				curObj:[],
				addIndex:0,
				showTrue:false,
				showTop:false,
				sort:1,
				togetherCategoryId:this.$route.params.id,
				pageObj:{
					page:1,
				},
				searchBarFixed:false,
				isMore:true,
				offsetTop:0,
				showFive:true,
				shareData : {
					'title':"OL圈拼团",
					'description':"拼优惠，拼乐趣",
					'url': "",
					'picURL': "http://ol-h5-preview.olquan.cn/static/images/pinpin.png",
					'hide':true,
					'share':false
				},
			}
		},
		components: {
		    $
		},
		created: function() {
			this.$store.commit('documentTitle','拼团');
			this.addRecord();
			this.getList();
			this.getGoods();
			
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
			//
		},
		methods: {
			//添加访问记录
			addRecord(){
  				let data = {
  					terminalType:5,
  					pageuri:'index/moreindex/id/'+this.togetherCategoryId,
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,data,this.addRecordBack,this);
  			},
  			addRecordBack(data){},
			//获取拼团分类
			getList(){
				let data={
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getNewTogetherBanners,data,this.getListBack);
			},
			getListBack(data){
				console.log(data)
				this.imgObj=data.result;
				if(this.imgObj.togetherCateries.length>=6){
					this.showFive=false
				}else{
					this.showFive=true
				}
				
			},
			//获取拼团分类详情
			getGoods(){
				let data={
					page:1,
	  				rows:20,
					isRecommend:2,
					togetherCategoryId:this.togetherCategoryId,
					sort:this.sort
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTogetherList,data,this.getGoodsBack);
			},
			getGoodsBack(data){
				console.log(data)
				this.curObj=data.result;
				this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/newIndex');
				//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/newIndex');
				this.shareData.description="拼优惠，拼乐趣";
				this.addWeixinShare();//微信分享 	
			},
			//点击购买商品
			goBuy(id){
  				//window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id+'&memberId='+this.getCookie("memberId")
  				this.$router.push({path:'/index/goodsDetali/id/'+id+'?memberId='+this.$route.query.memberId+'&isLimit=0'});
  				//window.location.href=CUR_URLBACK+'index/goodsDetali/id/'+id+'?memberId='+this.getCookie("memberId")+'&isLimit=0'
  			},
			getShow(){
				this.showChoose=!this.showChoose;
			},
			getDetailNex(index,id){
				$('html,body').animate({scrollTop:0},0);
  				console.log(id)
  				this.addIndex=index;
  				this.togetherCategoryId=id;
  				
  				this.sort=1;
  				this.isMore=true;
  				this.pageObj.page=1;
  				this.getGoods();
  				this.addRecord();
  				
  			},
			//价格筛选
			lowPrice(){
				
				this.sort=1;
				this.getGoods();
			},
			higPrice(){
				
				this.sort=2;
				this.getGoods();
			},
			//加载更多
  			handleScroll () {
  			  var height=document.body.scrollHeight;
  				//console.log(height)
  			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				
				if(this.scrollTop>600){
					this.showTop=true;
				}else{
					this.showTop=false;
				}
			  var windowH=window.innerHeight;
			  if(this.scrollTop + windowH >=height-200){
			  	
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	  					page:this.pageObj.page+1,
	  					rows:20,
	  					isRecommend:2,
						togetherCategoryId:this.togetherCategoryId,
						sort:this.sort
	  				};
	  				this.pageObj.page=this.pageObj.page+1
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTogetherList,data,this.getListMoreBack);
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
			
			//点击回到顶部
//			gotoTop(){
//				document.body.scrollTop=0;
//				document.documentElement.scrollTop = 0	
//				$('html,body').animate({scrollTop:0},1000);
//			},
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
	.indexMore{
		padding-top:1.42rem ;
		.topmodel{
			padding: .12rem 0;
			background: #fff;
			border-bottom: 0.01rem solid #f2f2f2;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			z-index: 2222;
			.score{
				border-top: 0.01rem solid #f2f2f2;
				font-size: .24rem;
				color: #999;
				width: 100%;
				padding-top: 0.06rem;
				overflow: hidden;
				img{
					display: inline-block;
					height: .20rem;
					width: .20rem;
				}
				.scoreS{
					color: #000;
				}
				.scoreL{
					float: left;
					width: 49.9%;
					text-align: center;
					line-height: .46rem;
				}
				.scoreR{
					float: left;
					width: 48.9%;
					text-align: center;
					line-height: .46rem;
					border-left: 0.01rem solid #e5e5e5;
				}
			}
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
					width: 100%;
					height: .64rem;
					float: left;
					overflow-y: hidden;
					z-index: 333;
					overflow-x: auto;
					.listItem{
						font-size: .28rem;
						line-height: .64rem;
						margin: 0 .20rem;
						color: #666;
						vertical-align: text-top;
						display: inline-block;
					}
					.specialList{
						color: #ed0477;
						font-weight: 600;
					}
				}
				.listSpecial{
					display: flex;
					display:-webkit-box;
					display: -moz-box;
					display: -ms-flexbox;
					display: -webkit-flex;
					display: -moz-flex;
					-webkit-justify-content:space-around ;
					justify-content:space-around ;
					-moz-box-pack:space-around ;
					-webkit--moz-box-pack:space-around ;
					box-pack:space-around;
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
			width: 100%;
			z-index: 2222;
			
		}
		.content{
		padding: .05rem .12rem;
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
				width: 49.2%;
				padding-bottom: .20rem;
				background: #fff;
				margin-bottom:.10rem;
				position: relative;
				.imgDetail{
					width: 100%;
					height: 3.60rem;
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
				}
				.specialZhe{
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					z-index: 22;
					top: 0;
					background: rgba(0,0,0,0);
				}
				img{
					display: block;
					width: 100%;
				}
				.imgTage{
					position: absolute;
					left: 0.10rem;
					top: 0;
					width: 30%;
				}
				.top{
					font-weight: normal;
					font-size: .28rem;
					color: #333;
					line-height: .40rem;
					height: .80rem;
					overflow: hidden;
					margin-bottom: .25rem;
					span{
						color: #fa006a;
		 				border: 0.01rem solid #fa006a;
		 				/*border-radius: 0.05rem;
		 				-o-border-radius:0.05rem;
		 				-ms-border-radius:0.05rem;
		 				-moz-border-radius:0.05rem;
		 				-webkit-border-radius:0.05rem;
		 				
					    -khtml-border-radius: 0.05rem;*/
		 				padding: 0 .05rem;
		 				line-height: .36rem;
					}
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
		.goFortop{
			position: fixed;
			bottom: .60rem;
			right: .60rem;
			z-index: 333;
			img{
				display: block;
				width: .60rem;
				height: .60rem;
			}
		}
	}
</style>