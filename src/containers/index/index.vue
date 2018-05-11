<template>
	<div class="index">
		<Linking></Linking>
		<div class="topmodel">
			<div class="atuoPage">
				<ul class="list">
					<li class="listItem" v-bind:class="{ 'specialList': addSelect}" style="margin-right: 0;" @click="getFist">首页</li>
					<li class="listItem" v-bind:class="{ 'specialList': index==addIndex}" v-for="(itemSon,index) in imgObj.productCategories" @click='getDetailNex(index,itemSon.catId)'>{{itemSon.name}}</li>
				</ul>
			</div>
		</div>
		<div v-show="detailShow">
			
			<swiper loop auto :list="urlList" height='3.34rem'  dots-position='center' v-show="urlList.length!=0"></swiper>
			<!--<Swiper :aspect-ratio="9/16" loop auto  dots-position='center' ref="swiper" >
		      <swiper-item style="overflow: hidden; height: 100%;" class="swiper-demo-img" v-for="(itemsSon, index) in urlList" :key="index"><img style="width: 100%;" :src="itemsSon.img">
		      </swiper-item>
		    </Swiper>-->
			<div class="benefit" v-show="imgObj.togetherCateries!=undefined">
				<ul>
					<li v-for="items in imgObj.togetherCateries" @click='goMoreIndex(items.togetherCategoryId,items.type)'>
						<img :src="items.logo"/>
						<span>{{items.name}}</span>
					</li>
					
				</ul>
			</div>
			
			<div class="cent">
				<ul class="init" >
				  <li v-for="item in listObj" @click="goBuy(item.togetherId)">
				  	<p class="goodsImg">
				  		<img :src="item.productIndexImage" class="goosImg"/>
						<!--<img :src="soldImg"  class="isSold" />-->
					</p>
					<p class="goodsdetail">
						<span class="describe"><i style="font-size: .20rem; margin-right: .10rem;" v-show="item.tagName!='' && item.togetherTagType!=1 && item.togetherTagType!=null">{{item.tagName}}</i>{{item.productName}}</span><br />
						<span class="pricedetail">
							￥{{item.price}}<i>已拼{{item.successCount}}件</i>
						</span>
						
						<span class="jionmember">
							<img class="jion" v-for="items in item.joinMembers" :src="items.memberLogo" />
						</span>
						<span class="shopping" >
							去拼团
						</span>
					</p>
					<img class="tagLogo"  :src="item.tagLogo" v-show="item.togetherTagType!=2 "/>	
				  </li>
				 	
				</ul>
			</div>
			<div class="tuijian">
				<img :src="xianImgone"/>
					更多精选
				<img :src="xianImgone"/>
				<span>精品推荐</span>
			</div>
		</div>
		
		<div class="content">
			<ul>
				<li v-for='item in curObj' @click="goBuy(item.togetherId)">
					<p class="imgTage">
						<img :src='item.tagLogo' v-show="item.togetherTagType!=2"/>
					</p>
					<p class="imgDetail"><img :src="item.productImage" /></p>
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
	</div>
  
</template>

<script>
import { Swiper, SwiperItem} from 'vux'
import $ from 'jquery';
var time;



export default {
	
	data : function(){
			return{
				imgObj:[],
				urlList:[],
				curObj:{},
				xianImgone:'/static/images/xian.png',
				peopleImgone:'/static/images/mametchi1.png',
				peopleImgtwo:'/static/images/mametchi2.png',
				peopleImgthree:'/static/images/mametchi3.png',
				indexImg:'/static/images/index.png',
				shiyongImg:'/static/images/shiyong.png',
				zhuanxiangImg:'/static/images/zhuanxiang.png',
				pinpinImg:'/static/images/pinpin.png',
				temaiImg:'/static/images/temai.png',
				goodsImg:'/static/images/goodsImg.png',
				soldImg:'/static/images/soldOut.png',
				listObj:[],
				list:[
			          1,
			          2,
          		],
				showTrue:false,
				isMore:true,
				pageObj:{
					page:1,
				},
				scrollTop:'',
				moreObj:[],
				shareData : {
					'title':"OL圈拼团",
					'description':"拼优惠，拼乐趣",
					'url': "",
					'picURL': "http://ol-h5-preview.olquan.cn/static/images/pinpin.png",
					'hide':true,
					'share':false
				},
				
				showChoose:false,
				selectVlaue:'默认',
				downImg:'/static/images/download.png',
				addSelect:true,
				addIndex:null,
				detailShow:true,
				isRecommend:0,
				productCategoryId:'',
				togetherCategoryId:'',
				sort:'',
				searchBarFixed:false,
				include: "test-keep-alive",
				offsetTop:0,
			}
		},
  components: {
    Swiper,
    $,
    SwiperItem
    
  },
  ready () {
  },
    
  created: function() {
			this.$store.commit('documentTitle','拼团');
			this.getFirst();
			this.getImgtop();
			this.getList();
			console.log(this.$route.query.isCheck)
		},
  mounted(){
			window.addEventListener('scroll', this.handleScroll);
			
		},
		wacth:{
			scrollTop(x,y){
				console.log(x)
				console.log(y)
			}
		},
  methods: {
  			//点击拼团详情
  			goMoreIndex(id,type){
  				console.log(type)
  				if(type==1){
  					//this.$router.push({path:'/index/moreindex/id/'+id+'?memberId='+this.getCookie("memberId")});
  					window.location.href=CUR_URLBACK+'index/moreindex/id/'+id+'?memberId='+this.$route.query.memberId
  				}else if(type==2){
  					//this.$router.push({path:'/index/hotsale?memberId='+this.getCookie("memberId")});
  					window.location.href=CUR_URLBACK+'index/hotsale?memberId='+this.$route.query.memberId
  				}
  				//
  			},
  			//点击首页
  			getFist(){
  				$('html,body').animate({scrollTop:0},0);
  				this.addIndex=null;
  				this.addSelect=true;
  				this.detailShow=true;
  				this.pageObj.page=1;
  				this.isRecommend=0;
  				this.productCategoryId='';
  				this.togetherCategoryId='';
  				this.sort='';
  				this.getList();
  			},
  			//点击分类
  			getDetailNex(index,id){
  				$('html,body').animate({scrollTop:0},0);
  				console.log(id)
  				this.addIndex=index;
  				this.addSelect=false;
  				this.detailShow=false;
  				this.isRecommend=2;
  				this.productCategoryId=id;
  				this.isMore=true;
  				this.showTrue=false;
  				this.pageObj.page=1;
  				this.getList();
  				
  			},
  			getShow(){
				this.showChoose=!this.showChoose;
			},
			//价格筛选
			lowPrice(){
				this.selectVlaue='积分由低到高';
				this.showChoose=false;
			},
			higPrice(){
				this.selectVlaue='积分由高到低';
				this.showChoose=false;
			},
  			//点击购买商品
  			goBuy(id){
  				this.$router.push({path:'/index/goodsDetali/id/'+id+'?memberId='+this.$route.query.memberId+'&isLimit=0'});
  				//window.location.href=CUR_URLBACK+'index/goodsDetali/id/'+id+'?memberId='+this.getCookie("memberId")+'&isLimit=0'
  			},
  			
  			//加载更多
  			handleScroll () {
  			  var height=document.body.scrollHeight;
  				//console.log(height)
//			  this.offsetTop = document.querySelector('.topmodel').offsetTop;
//				console.log(this.offsetTop)
			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(this.scrollTop)
				
				
			  var windowH=window.innerHeight;
			  if(this.scrollTop + windowH >=height-200){
			  	
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	  					page:this.pageObj.page+1,
	  					rows:20,
	  					isRecommend:this.isRecommend,
	  					productCategoryId:this.productCategoryId,
	  					togetherCategoryId:this.togetherCategoryId,
	  					sort:this.sort,
	  					isCheck:this.$route.query.isCheck
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
  			getList(){
  				let data={
  					page:1,
  					rows:20,
  					isRecommend:this.isRecommend,
  					productCategoryId:this.productCategoryId,
  					togetherCategoryId:this.togetherCategoryId,
  					sort:this.sort,
  					isCheck:this.$route.query.isCheck

  				};
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTogetherList,data,this.getListBack);

			},
			getListBack(data){
				//console.log(data);
				
				this.curObj=data.result;
			},
			getFirst(){
				let data={
					isCheck:this.$route.query.isCheck
				};
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getIndexTogetherList,data,this.getFirstBack);
			},
			getFirstBack(data){
				//console.log(data)
				this.listObj=data.result;
				this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/index');
				//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/index');
				this.shareData.description="拼优惠，拼乐趣";
				
				//this.shareData.picURL=this.pinpinImg;
				console.log(this.shareData)
				this.addWeixinShare();//微信分享 	
			},
		getImgtop(){
			let data={
				isCheck:this.$route.query.isCheck
			}
			this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getNewTogetherBanners,data,this.getImgBack);
		},
		getImgBack(data){
			if(data.result){
				this.imgObj=data.result;
			}else{
				this.imgObj=[];
			}
			for(let i=0;i<this.imgObj.banners.length;i++){
					
				if(this.imgObj.banners[i].url== "#" || this.imgObj.banners[i].url==""){
					this.imgObj.banners[i].url=CUR_URLBACK+'index/index?memberId='+this.$route.query.memberId
				}else{
					if(this.imgObj.banners[i].url.indexOf("?")!=-1){
						console.log("YES")
						this.imgObj.banners[i].url=this.imgObj.banners[i].url+'&memberId='+this.$route.query.memberId
					}else{
						console.log("no")
						this.imgObj.banners[i].url=this.imgObj.banners[i].url+'?memberId='+this.$route.query.memberId;
					}
				}
			}
			this.urlList = this.imgObj.banners.map((item, index) => ({
			  url: item.url,
			  img: item.image,
			  
			}))
			console.log(this.urlList)
//			console.log(data)
		},
		geDetail(id){
			//console.log(id)
			window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id+'&memberId='+this.$route.query.memberId
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

.index{
	padding-top: .90rem;
	.topmodel{
			padding: .12rem 0;
			background: #fff;
			border-bottom: 0.01rem solid #f2f2f2;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 2222;
			width: 100%;
			
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
		
	.benefit{
			margin: .10rem 0 0;
			padding: 0.20rem 0 0;
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
						
						border-radius: 50%;
						margin-bottom: .20rem;
						
						
					}
				}
			}
		}
	.bannerImg{
		width: 100%;
		img{
			display: block;
			width: 100%;
		}
	}
	.cent{
		margin-bottom: .30rem;
		padding-top: .10rem;
		background: #f2f2f2;
		.init{
			
		 
		 .noMore{
		 	font-size: .28rem;
		 	text-align: center;
		 	line-height: .56rem;
		 	color: #9C9C9C;
		 }
		 	li{
		 		margin-bottom:.10rem;
		 		overflow: hidden;
		 		position: relative;
		 		width: 100%;
		 		.tagLogo{
				 	display: block;
				 	position: absolute;
				 	top: 0;
				 	width: 1.00rem;
				 	left: .10rem;
				}
		 		.goodsImg{
			 		
			 		width: 100%;
			 		
			 		overflow: hidden;
			 		display: flex;
			 		display: -moz-flex;
			 		align-items:center ;
			 		background: #fff;
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
			 		
			 		.goosImg{
			 			display: block;
			 			
			 			width: 100%;
			 		}
			 		
			 	}
			 	.goodsdetail{
			 		
			 		word-wrap: break-word;
			 		font-size: .28rem;
			 		padding: .12rem .24rem .20rem;
			 		
			 		
			 		background: #fff;
			 		position: relative;
			 		.describe{
			 			line-height: .42rem;
			 			
			 			display: block;
			 			i{
			 				font-style: normal;
			 				color: #fa006a;
			 				border: 0.01rem solid #fa006a;
			 				border-radius: 0.05rem;
			 			}
			 		}
			 		/*.peopleImg{
			 			position: relative;
			 			display: inline-block;
				 			img{
					 		display: inline-block;
					 		height: .48rem;
					 		width: .48rem;
					 		border-radius: 50%;
					 	}
					 	img:nth-child(2){
					 		position: absolute;
					 		top: 0rem;
					 		left: .30rem;
						 }
					 	img:nth-child(3){
					 		position: absolute;
					 		left: .64rem;
					 		top: 0rem;
					 	}
						 img:nth-child(4){
						 	position: absolute;
						 	left: .92rem;
						 	top:0rem;
						 }
			 		}*/
			 			
				 	
				 .pricedetail{
				 	font-size: .40rem;
				 	color: #fa006a;
				 	line-height: .54rem;
				 	font-weight: 700;
				 	display: inline-block;
				 	
				 	i{
				 		font-style: normal;
				 		color: #b3b3b3;
				 		font-weight: normal;
				 		font-size: .28rem;
				 		margin-left: .12rem;
				 		padding: 0 .05rem;
				 		line-height: .54rem;
				 	}
				 }
				 
			 	.jionmember{
				 	display: inline-block;
				 	height: .48rem;
				 	font-size: .28rem;
				 	position: absolute;
				 	right: 1.60rem;
				 	bottom: .26rem;
				 	.jion{
				 		display: inline-block;
				 		height: .48rem;
				 		width: .48rem;
				 		margin-left: -.18rem;
				 		border-radius: 50%;
				 		position: absolute;
				 	}
				 	.jion:nth-child(1){
				 		z-index: 123;
				 		right: 0rem;
				 	}
				 	.jion:nth-child(2){
				 		z-index: 125;
				 		right: .28rem;
				 	}
				 	.jion:nth-child(3){
				 		z-index: 127;
				 		right: .52rem;
				 	}
				 }
				
				 
				 .shopping{
				 	display: inline-block;
				 	width: 1.18rem;
				 	height: .56rem;
				 	border: .01rem solid #ff3893;
				 	border-radius: 0.05rem;
				 	text-align: center;
				 	line-height: .56rem;
				 	color: #fff;
				 	font-size: .30rem;
				 	position: absolute;
				 	right: 0.24rem;
				 	bottom: 0.20rem;
				 	background: #fa006a;
				 	
				 }
			 	}
			 
		 	}
	 	}
	}
	.tuijian{
		font-size: .32rem;
		line-height: .56rem;
		text-align: center;
		img{
			display: inline-block;
			width: .50rem;
			height: .02rem;
			vertical-align: middle;
			
			margin:-0.05rem .10rem 0;
		}
		span{
			display: block;
			font-size: .26rem;
			color: #ccc;
		}
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
				width: 49.5%;
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
				}
				img{
					display: block;
					width: 100%;
				}
				.imgTage{
					position: absolute;
					left: .25rem;
					top: 0;
					width: .50rem;
				}
				.top{
					font-weight: normal;
					font-size: .28rem;
					color: #333;
					line-height: .40rem;
					height: .80rem;
					overflow: hidden;
					padding:0 .08rem;
					margin-bottom: .25rem;
					span{
						color: #fa006a;
		 				border: 0.01rem solid #fa006a;
		 				border-radius: 0.05rem;
		 				padding: 0 .05rem;
		 				line-height: .32rem;
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
}

</style>