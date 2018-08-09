<template>
	<div class="findIndex" v-bind:class="{ 'speFindIndex': seachShow==true }">
		<div class="indexTop">
			<ul>
				<li @click="getSaleIndex">特卖</li>
				<li @click="getTryIndex">试用</li>
				<li class="speLiFind">发现</li>
			</ul>
		</div>
		<div v-bind:class="{ 'specialFide': seachShow==true}">
			<div class="search">
				<div class="searchIndex" style="padding: .10rem .30rem;">
					<div class="searchBod">
						<img :src="seachFindShare" />
						<input placeholder="达人、标题、产品" v-model="searchCode" @click="getSearch"/>
						<!--<span>达人、标题、产品</span>-->
					</div>
					<div class="cancleCode" v-show="seachShow" @click="cancelCode">
						<img :src="cancelShare" />
					</div>
					<div class="searchSure" v-show="seachShow">
						<span v-show="searchCaleText" @click="searchEnterFun">搜索</span>
						<span v-show="!searchCaleText" @click="cancelSearch">取消</span>
					</div>
				</div>
				
			</div>
			
		</div>
		<div class="newContent" v-for="(item,index) in curObj">
			
			<div class="newCent_bot">
				<div class="newCent_headImg">
					<img :src="item.logo" />
				</div>
				<div class="newCent_nameTime">
					<p class="newCent_name">{{item.name}}</p>
					<p class="newCent_time">{{item.createTime}}</p>
				</div>
				<div class="howToShare" @click="getHowShareNew">
					<img :src="shareMoreShare" />
				</div>
			</div>
			<div class="newCent_top">
				{{item.title}}
			</div>
			<div class="newCent_descript">
				<p v-bind:class="{'spenewCent_descript':item.selectM==false}">
					{{item.content}}
				</p>
				<p style="color: #507daf;margin-top: .10rem;" @click="lookMore(index)" v-show="item.selectM==false">全文</p>
			</div>
			<ul class="newScaleImg" @click="conseLog">
				<li v-for="(itemSon,index) in item.fileDtos" v-if="itemSon.type==1" v-bind:class="{ 'speScalImg': item.fileDtos.length<=2}">
					
					<p @click="getScalImgNew(item.fileDtos,index)"><img :src="itemSon.linkUrl"/></p>
					
				</li>
				<li v-for="(itemSon,index) in item.fileDtos" v-if="itemSon.type==2" v-bind:class="{ 'speScalImg': item.fileDtos.length<=2}">
					<p @click="getVideoNew(itemSon.linkUrl,item.productImage)">
						<img  :src="item.productImage"/>
						<img class="SpeImgBofang" :src="bofangImg"/>
					</p>
				</li>
			</ul>
			<!--<div class="newScaleImg">
				
				
				<img :src="pinkShare" @click="ceshi"/>
			</div>-->
			<div class="prodtctList" v-show="item.productName!=null">
				<div class="productDescrip" @click="getGoodsDetail(item.productType,item.productId)">
					<div class="prodtctImg">
						<img :src="item.productImage"/>
					</div>
					<div class="prodtctDescript" v-if="item.productType!=12 && item.productType!=13">
						<p class="productName">{{item.productName}}</p>
						<p class="productPrice">￥{{item.productPrice}}</p>
					</div>
					<div class="prodtctDescript" v-if="item.productType==12 || item.productType==13">
						<p class="activeTitle">
							<span>{{item.productName}}</span>
						</p>
						
					</div>
				</div>
				<div class="shareErwei" v-if="item.productType!=12 && item.productType!=13" @click="getGoodsShareNew(item.productType,item.productId)">
					<img :src="shareEShare" />
				</div>
			</div>
		</div>
		
		
		     
		
		<div class="getBottom" v-show="!seachShow">
			<div class="getIndex">
				<div class="top">
					<img :src="index01Img" />
				</div>
				<div class="bot" style="color: #000;">首页</div>
			</div>
			<div class="getIndex" @click="getFind">
				<div class="top">
					<img :src="find1Img" />
				</div>
				<div class="bot">分类</div>
			</div>
			<div class="getIndex" @click="getIndex">
				<div class="top">
					<img :src="cartImg" />
				</div>
				<div class="bot">购物车</div>
				<div class="cartNum" v-show="cartNum>0">{{cartNum}}</div>
			</div>
			
			<div class="getIndex" @click="getkefu">
				<div class="top">
					<img :src="serviceImg" />
				</div>
				<div class="bot">客服</div>
			</div>
			<div class="getIndex" @click="getMindIndex">
				<div class="top">
					<img :src="myImg" />
				</div>
				<div class="bot">我的</div>
			</div>
		</div>
		<div class="curObjNone" v-show="findNone">
			<div><img :src="noMorefindShare"/></div>
			<div style="width: 100%;text-align: center;">
				没有搜索到相关内容哟~
			</div>
		</div>
		<div class="toShare" v-show="showShare">
			<div class="shareDetail" @click="colseShare">
				<div class="detailIndex">
					<div class="colse">
						<img :src="chaImg"/>
					</div>
					<div class="shareImg">
						<img :src="pinkShare"/>
					</div>
					<div class="shareText">
						您可以文本长按复制,图片点击大图长按保存。进入产品详情右上角分享。
					</div>
					<div class="shareK">
						我知道啦
					</div>
				</div>
			</div>
		</div>
		<!--图片放大-->
		<div class="scalImg" v-show="scalImg" @click="colseScalImg">
			
			<div class="speScale">
				<swiper :options="swiperOption" ref="imgOverview">
				  <swiper-slide v-for="(img, index) in previewImg">
				    <p class="swiper-zoom-container">
				      <img :src="img.linkUrl" alt="">
				    </p>
				  </swiper-slide>
				</swiper>
				<div class="swiper-pagination" slot="pagination"></div>
			</div>
			<div class="baocunImg"><img :src="baocunShare" />长按保存图片</div>
		</div>
		<div class="zhezhao" v-show="seachShow"></div>
			
		<!--产品二维码-->
		<div class="pinKnow" v-show="pinKnowShow" @click="showImg"></div>
		<div class="pinGoods" v-show="pinKnowShow">
			<img :src="erweiObj" class="codeImage"/>
			<img :src="colseImg" class="closeImg" @click="showImg"/>
		</div>
		<!--<VideoImg :Url='videoUrl' v-if='videoShow' ></VideoImg>-->
		<div v-if="videoShow" class="videoIndex" @click="colseVideo" @touchmove.prevent></div>
			<video width="100%" 
					   autoplay
					   height=""
					   controls
					   :poster="posterNew"
					   id="myMusic"
					   ref="myVideo"
					   class="videoPost"
					   :src="videoUrl" 
	  				    v-show="videoShow"
					   >
			</video>
			<div class="goFortop" v-show="showTop" @click="gotoTop">
			<img :src="goTopImg"/>
		</div>
	</div>
	
	
	
</template>

<script>
	
	import 'src/css/swiper.min.css';
	import { videoPlayer } from 'vue-video-player';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import $ from 'jquery';
	export default {
		
		data : function(){
			return{
				chaImg:'/static/images/cha.png',
				pinkShare:'/static/images/pinkShare.png',
				producCommentShare:'/static/images/producComment.png',
				shareEShare:'/static/images/shareE.png',
				shareMoreShare:'/static/images/shareMore.png',
				seachFindShare:'/static/images/seachFind.png',
				cancelShare:'/static/images/cancel.png',
				baocunShare:'/static/images/baocun.png',
				noMorefindShare:'/static/images/noMorefind.png',
				colseImg:'/static/images/colse.png',
				index01Img:'/static/images/icon-index02.png',
				cartImg:'/static/images/icon-cart.png',
				find1Img:'/static/images/shangcheng.png',
				serviceImg:'/static/images/icon-service.png',
				myImg:'/static/images/icon-my.png',
				bofangImg:'/static/images/bofang.png',
				goTopImg:'/static/images/goTop.png',
				posterNew:'',
				videoUrl:'',
				erweiObj:'',
				showShare:false,
				showTop:false,
				scalImg:false,
				seachShow:false,
				searchCodeIndex:false,
				isMore:true,
				findNone:false,
				pinKnowShow:false,
				videoShow:false,
				fistImg:'',
				searchRemind:'',
				cartNum:0,
				pageObj:{
					page:1,
					row:10
				},
				searchCode:'',
				
			    listObj:[],
			    curObj:[],
				shareData : {
					'title': "OL圈 发现",
					'description':'OL圈 发现' ,
					'url': '',
					'picURL': "https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/aaa.png",
					'hide':true,
					'share':false,
					'video':true,
				},
				swiperOption: {
			      width: window.innerWidth,
			      zoom : true,
			      initialSlide: 0,
			      pagination : '.swiper-pagination',
			      notNextTick: true,
			    },
			    previewImg:[
			    	
			    ],
			    
				
			}
		},
		components: {
		    swiper,
  	   		swiperSlide,
  	   		$,
  	   		videoPlayer
		},
		watch:{
			
		},
		created: function() {
			if(this.$route.query.memberId==undefined){
				this.$route.query.memberId='';
			}
			this.newFind();
			this.getSearchRemind();
			this.getcartNum();
			this.addWeixinShare();
			
			this.$store.commit('documentTitle','OL圈');
//			newFinds
			
			
		},
		computed: {
			searchCaleText() {
//				
				if(this.searchCode.length>0){
					return true;
				}else{
					return false;
				}
			},
			
		},
		mounted(){
			window.addEventListener('scroll', this.hotSaleScroll);
		},
		methods:{
			 //获取搜索提示关键字
		    getSearchRemind(){
		    	
				let data={
//					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getSearchRemind,data,this.getSearchRemindBack,this);
		    },
		    getSearchRemindBack(data){
		    	this.searchRemind=data.result;
		    },
			lookMore(index){
				this.curObj[index].selectM=true;
			},
		    getVideoNew(url,poster){
		    	this.posterNew=poster;
		    	this.videoUrl=url;
		    	this.videoShow=true;
		    	this.$nextTick(function () {
		    		this.$refs.myVideo.play();
			       
			    })
		    	

		    },
		    bofang(){
//		    	console.log(event.target.children)
		    	this.$refs.myVideo.play();
		    },
		    colseVideo(){
		    	this.$refs.myVideo.pause();
		    	this.videoUrl='';
		    	this.posterNew='';
		    	this.videoShow=false;
		    	
		    },
			//获取购物车产品数量
			getcartNum(){
				let data={
//					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.totalNum,data,this.getcartNumBack);
			},
			getcartNumBack(data){
				//console.log(data)
				this.cartNum=data.result;
			},
			newFind(){
				let data={
					keyword:this.searchCode,
					//memberId:this.$route.query.memberId,
					page:1,
	  				rows:10,
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.newFinds,data,this.newFindBack,this);
				//console.log(data)
			},
			newFindBack(data){
				if(data.code==-1){
					this.$toast(data.message);
				}else{
					for(let i=0; i<data.result.length;i++){
						this.$set(data.result[i],'selectM',false);
					}
					this.curObj=data.result;
//					console.log(this.curObj)
					
					
					
				}
			},
			
			getSearch(){
		    	this.seachShow=true;
		    	
		    	
		    },
		    
		    cancelSearch(){
		    	this.seachShow=false;
		    	this.searchEnterFun();
		    },
		    cancelCode(){
		    	this.searchCode='';
		    },
		    ceshi(){
		    	this.scalImg=true;
		    },
		    conseLog(){
		    	console.log(1)
		    },
		    //放大图片
		    getScalImgNew(item,index){
//		    	console.log(item)
				this.$nextTick(function(){
					
					this.scalImg=true;
				    this.previewImg=item;
//				    this.show(index)
					this.$refs.imgOverview.swiper.slideTo(index, 50, false);
			    	
				})
		    	
		    },
		    colseScalImg(){
		    	this.$nextTick(function(){
					this.scalImg=false;
					this.previewImg=[];
			    })
		    	
		    },
		    show (index) {
		      this.$refs.imgOverview.swiper.slideTo(index, 50, false);
		    },
		    //打开和关闭分享提示
		    getHowShareNew(){
		    	this.showShare=true;
		    },
		    colseShare(){
		    	this.showShare=false;
		    },
		    //获取商品详情
		    getGoodsDetail(type,productId){
		    	
		    	if(type==9 || type==4){
		    		//window.location.href=CUR_URLBACK+'demo/iscroll/id/'+productId+'?isShare=0&type='+type;
		    		this.$router.push({path:'/demo/iscroll/id/'+productId+'?isShare=0&type='+ type});
		    	}else if(type==12){
//		    		this.$router.push({path:'/activity/newact?id='+productId});
		    		window.location.href=CUR_URLBACK+'activity/newact?id='+productId;
		    	}else if(type==13){
//		    		this.$router.push({path:'/coupon/getcoupon/id/'+productId});
		    		window.location.href=CUR_URLBACK+'coupon/getcoupon/id/'+productId;
		    	}else {
		    		window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+productId+'&type='+type;
		    	}
		    },
		    //获取商品二维码图片
		    getGoodsShareNew(type,productId){
		    	this.pinKnowShow=true;
				let data={
					productId:productId,
//					memberId:this.$route.query.memberId,
					type:type,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTwoCodeUrl,data,this.getGoodsShareBack,this);
		    },
		    getGoodsShareBack(data){
		    	this.erweiObj=data.result;
		    },
		    showImg(){
				this.pinKnowShow=false;
			},
		    //搜索功能
		    searchEnterFun(){
		    	let data={
					keyword:this.searchCode,
//					memberId:this.$route.query.memberId,
					page:1,
	  				rows:20,
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.newFinds,data,this.searchEnterFunBack,this);
		    },
		    searchEnterFunBack(data){
		    	if(data.code==-1){
					this.$toast(data.message);
				}else{
					if(data.result.length==0){
			    		this.findNone=true;
			    	}else{
			    		this.findNone=false;
			    	}
			    	if(data.result.length<20){
			    		this.isMore=false;
			    	}else{
			    		this.isMore=true;
			    	}
	//				this.isMore=true;
			    	this.pageObj.page=1;
			    	this.curObj=data.result;
			    	this.seachShow=false;
				}
		    	
		    },
		    //点击回到顶部
			gotoTop(){
				$('html,body').animate({scrollTop:0},1000);
			},
		    //加载更多
  			hotSaleScroll () {
  			  var height=document.body.scrollHeight;
  				//console.log(height)
//			  this.offsetTop = document.querySelector('.topmodel').offsetTop;
//				console.log(this.offsetTop)
			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//				console.log(this.scrollTop)
				if(this.scrollTop>600){
					this.showTop=true;
				}else{
					this.showTop=false;
				}
				
			  var windowH=window.innerHeight;
			 // console.log(this.scrollTop + windowH >=height-200)
			  if(this.scrollTop + windowH >=height-200){
			  	
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	 					keyword:this.searchCode,
//						memberId:this.$route.query.memberId,
	  					page:this.pageObj.page+1,
	  					rows:10,
	  					
	  				};
	  				this.pageObj.page=this.pageObj.page+1
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.newFinds,data,this.getListMoreBack);
	 			}
			  }
	 			
			},
			getListMoreBack(data){
				if(data.result.length<10){
					this.isMore=false;
					
				}else{
					this.isMore=true;
				}
				
				for(let i=0; i<data.result.length; i++){
					this.$set(data.result[i],'selectM',false);
					this.curObj.push(data.result[i])
				}
				//console.log(this.curObj)
			
			},
			
			getSaleIndex(){
				window.location.href=CUR_URLBACK+'index/pinkIndex';
			},
			getTryIndex(){
				window.location.href=CUR_URLBACK+'try/newCenter';
			},
			//跳转购物车
			getIndex(){
				window.location.href=CUR_URLBACK+'shopcar/ordercar';
			},
			getFind(){
				//window.location.href="http://live-weixin.olquan.cn"
				window.location.href=USE_URL+'weixin/product/productCategoryDetail?pcatId=33';
			},
			//点击客服
			getkefu(){
				window.location.href='https://kefu.easemob.com/webim/im.html?tenantId=40231&ticket=false';	
			},
			getMindIndex(){
				window.location.href=USE_URL+'weixin/member/membercore';
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
		 window.removeEventListener('scroll', this.hotSaleScroll)
		},
	}
</script>

<style lang="scss" scoped>
	
	.findIndex{
		
		padding-bottom: 1.00rem;
		padding-top: .80rem;
		.indexTop{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			background: #FFF;
			z-index: 999;
			color: #777;
			font-size: .32rem;
			ul{
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
				
				height: .80rem;
				border-bottom: 0.01rem solid #E1E1E1;
				li{
					margin: 0 .30rem;
					line-height: .80rem;
				}
				.speLiFind{
					color: #E50F72;
					font-size: .36rem;
					border-bottom: .05rem solid #E50F72;
					
				}
			}
		}
		
		.search{
			background: #fff;
			
			
			.searchIndex{
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
				position: relative;
				.cancleCode{
					position: absolute;
					right: 1.32rem;
					top: .28rem;
					
					img{
						display: block;
						width: .28rem;
						height: .28rem;
					}
				}
			}
			.searchSure{
				font-size: .28rem;
				line-height: .60rem;
				color: #333;
				margin-left: .20rem;
			}
			.searchBod{
				height: .60rem;
				-webkit-box-flex: 1;
			    -ms-flex: 1;
			    flex: 1;
				background: #EFEDED;
				overflow: hidden;
				border-radius: .30rem;
				font-size:.24rem;
				color: #aaa;
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
				-webkit-box-pack: center;
			    -moz-box-pack: center;
			    -ms-flex-align:center;/* IE 10 */
			    -webkit-align-items: center;
			    -moz-align-items: center;
			    align-items: center;
			    img{
			    	display: block;
			    	width: .30rem;
			    	height: .28rem;
			    	margin-left: .20rem;
			    }
			    input{
			    	margin-left: .14rem;
			    	height: 100%;
			    	border: none;
			    	background: #EFEDED;
			    	outline: none;
			    	-webkit-box-flex: 1;
				    -ms-flex: 1;
				    flex: 1;
			    }
			    span{
			    	margin-left: .14rem;
			    }
			}
		}
		.specialFide{
			position: fixed;
			top: 0;
			left: 0;
			background: #fff;
			
			z-index: 999;
			width: 100%;
			border-bottom: 0.01rem solid #E1E1E1;
		}
		.newContent{
			padding: .20rem .30rem;
			
			background: #fff;
			margin-bottom: .20rem;
			.newCent_top{
				padding-left: 1.00rem;
				font-weight: 700;
				color: #333333;
				font-size: .30rem;
				line-height: .36rem;
				max-height: .72rem;
				overflow: hidden;
			    margin-bottom: .21rem;
			}
			.newCent_bot{
				max-width: 100%;
				
				margin-bottom: .18rem;
				position: relative;
				font-size: 0rem;
				.newCent_headImg{
					display: inline-block;
					width: .80rem;
					height: .80rem;
					border-radius: 50%;
					img{
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.newCent_nameTime{
					display: inline-block;
					margin-left: .20rem;
					vertical-align: top;
					font-size: .24rem;
					color: #333333;
					.newCent_name{
						font-size: .28rem;
						line-height: .52rem;
					}
				}
				.howToShare{
					position: absolute;
					right: 0;
					top: .40rem;
					padding-top: .1rem;
					width: .48rem;
	    			height: .38rem;
	    			img{
					    display: block;
						  width: .32rem;
						  height: .06rem;
	    			}
				}
			}
			.newCent_descript{
				font-size: .28rem;
				padding-left: 1.00rem;
				padding-right: .04rem;
				line-height: .36rem;
				margin-bottom: .28rem;
				
			}
			.spenewCent_descript{
				overflow: hidden;
			    max-height: 1.06rem;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 3;
			    -webkit-box-orient: vertical;
			}
			.newScaleImg{
				cursor:pointer;
				position: relative;
				left: 0;
				top: 0;
				z-index: 122;
				font-size: 0;
				display: flex;
				display:-webkit-box;
			    display: -moz-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
			    display: -moz-flex;
				flex-wrap: wrap;
				-webkit-flex-wrap:wrap;
			    -webkit-box-lines:multiple;
			    -moz-flex-wrap:wrap;
				padding-left: 1.00rem;
				li{
					cursor:pointer;
					position: relative;
					left: 0;
					top: 0;
					z-index: 222;
					display: inline-block;
					width: 1.90rem;
					height: 1.90rem;
					margin-right: .10rem;
					margin-bottom: .10rem;
					display: flex;
					display:-webkit-box;
				    display: -moz-box;
				    display: -ms-flexbox;
				    display: -webkit-flex;
				    display: -moz-flex;
				    -webkit-box-pack: center;
				    -moz-box-pack: center;
				    -ms-flex-align:center;
				    -webkit-align-items: center;
				    -moz-align-items: center;
				    align-items: center;
				    justify-content: center;
			    	-moz-box-pack: center;
			    	-webkit--moz-box-pack: center;
					overflow: hidden;
					p{
						width: 100%;
						height: 100%;
						cursor:pointer;
						position: relative;
						display: flex;
						display:-webkit-box;
					    display: -moz-box;
					    display: -ms-flexbox;
					    display: -webkit-flex;
					    display: -moz-flex;
					    -webkit-box-pack: center;
					    -moz-box-pack: center;
					    -ms-flex-align:center;/* IE 10 */
					    -webkit-align-items: center;
					    -moz-align-items: center;
					    align-items: center;
						img{
							
						}
						.SpeImgBofang{
							position: absolute;
							width: .94rem;
							height: .94rem;
							left: 50%;
							margin-left: -.47rem;
							margin-top: -.47rem;
							top: 50%;
							min-height: 0;
						}
					}
					img{
						cursor:pointer;
						display: block;
						width: 100%;
						
						border-radius: 0.06rem;
					}
				}
				li:nth-child(3){
					margin-right: 0;
				}
				li:nth-child(6){
					margin-right: 0;
				}
				li:nth-child(9){
					margin-right: 0;
				}
				.speScalImg{
					width: 2.85rem;
					height: 2.85rem;
					margin-right: .10rem;
					margin-bottom: .10rem;
					
					
				}
				.speScalImg:nth-child(2){
					margin-right: 0;
				}
			}
			.prodtctList{
				height: 1.30rem;
				margin-top: .06rem;
				padding-left: 1.00rem;
				position: relative;
				.productDescrip{
					position: absolute;
					left: 1.00rem;
					top: 0;
					width: 5.90rem;
					height: 100%;
					background: #F5F5F5;
					border-radius: 0.06rem;
					display: flex;
					display:-webkit-box;
					display: -webkit-flex;
					display: -moz-box;
					display: -moz-flex;
					display: -ms-flexbox;
				    -ms-flex-pack: start;
				    justify-content: flex-start;
				    -moz-box-pack: flex-start;
				    -webkit--moz-box-pack: flex-start;
			    .prodtctImg{
			    	width: 1.10rem;
			    	height: 1.10rem;
			    	border-radius: 0.06rem;
			    	margin: .10rem;
			    	img{
			    		display: block;
			    		width: 100%;
			    		height: 100%;
			    		border-radius: 0.06rem;
			    	}
			    	
			    }
			    .prodtctDescript{
			    		font-size: .26rem;
			    		color: #333;
			    		
			    	.productName{
			    		padding-top: .16rem;
			    		width: 3.7rem;
			    		line-height:.62rem;
					    overflow: hidden;
					    white-space: nowrap;
					    text-overflow: ellipsis;
			    	}
			    	.activeTitle{
			    		height: 100%;
			    		display: flex;
						display:-webkit-box;
						display: -webkit-flex;
						display: -moz-box;
						display: -moz-flex;
						display: -ms-flexbox;
						align-items: center;
					   span{
					   		display: block;
						   	width: 3.7rem;
				    		line-height:.32rem;
				    		max-height: .64rem;
				    		overflow: hidden;
					   }
			    	}
			    	.productPrice{
			    		color: #E50F72;
			    	}
			    }
				}
				.shareErwei{
					position: absolute;
					right: 0.22rem;
					top: .44rem;
					height: .44rem;
					width: .44rem;
					img{
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		
		.getBottom{
			border-top: 0.01rem solid #e1e1e1;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #f7f7f7;
			height: .85rem;
			padding-top: .15rem;
			width: 100%;
			z-index: 999;
			display: flex;
			display:-webkit-box;
			display: -webkit-flex;
			display: -moz-box;
			display: -moz-flex;
			display: -ms-flexbox;
			.getIndex{
				width: 20%;
				font-size: .18rem;
				text-align: center;
				position: relative;
				color: #b2b2b2;
				.cartNum{
					width:.26rem;
					height: .26rem;
					font-size: .16rem;
					background: #E5006E;
					line-height: .26rem;
					/*padding-top: .06rem;*/
					color: #fff;
					position: absolute;
					border-radius: 50%;
					right: 0.25rem;
					top: 0;
				}
				.top{
					position: relative;
					height: .50rem;
					img{
						display: block;
						position: absolute;
						left: 50%;
						margin-left: -.22rem;
						height: .44rem;
						width: .44rem;
					}
				}
			}
		}
		.curObjNone{
			width: 100%;
			height: 6.40rem;
			background: #fff;
			font-size: .26rem;
			color: #aaa;
			
			padding-top: 3.60rem;
			img{
				display: block;
				margin: 0 auto;
				width: .76rem;
				height: .76rem;
				margin-bottom: .32rem;
			}
		}
		.toShare{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			min-height: 100%;
			z-index: 99999;
			background: rgba(0,0,0,.6);
			.shareDetail{
				position: fixed;
				width: 5.70rem;
				height: 4.60rem;
				background: #fff;
				border-radius: .10rem;
				left: 50%;
				margin-left: -2.85rem;
				top: 50%;
				margin-top: -2.30rem;
				.detailIndex{
					width: 100%;
					height: 100%;
					border-radius: .10rem;
					position: relative;
					.colse{
						right: .34rem;
						top: .34rem;
						position: absolute;
						img{
							
							display: block;
							width: .20rem;
							height: .20rem;
						}
					}
					.shareImg{
						padding-top: .54rem;
						width: 100%;
						img{
							display: block;
							width: 1.36rem;
							height: 1.42rem;
							margin: 0 auto;
						}
					}
					.shareText{
						margin-top: .30rem;
						padding-left:.40rem ;
						padding-right: .56rem;
						color: #333333;
						font-size: .28rem;
						line-height: .36rem;
						
					}
					.shareK{
						margin: 0 auto;
						margin-top: .42rem;
						width: 4.70rem;
						line-height: .88rem;
						background: #E50F72;
						color: #fff;
						text-align: center;
						font-size: .32rem;
						border-radius: .88rem;
					}
				}
			}
		}
		.videoIndex{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			min-height: 100%;
			z-index: 999;
			background: rgba(0,0,0,.5);
			display: flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
		    display: -moz-flex;
		    -webkit-box-pack: center;
		    -moz-box-pack: center;
		    -ms-flex-align:center;/* IE 10 */
		    -webkit-align-items: center;
		    -moz-align-items: center;
		    align-items: center;
		    .videoBox{
		    	
		    }
		}
		.videoPost{
			width: 100%;
	    	height: 5.00rem;
	    	
	    	position: fixed;
	    	z-index: 1000;
	    	top: 50%;
	    	margin-top: -2.50rem;
		}
		.scalImg{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			min-height: 100%;
			z-index: 999;
			background: rgba(0,0,0,1);
			display: flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
		    display: -moz-flex;
		    -webkit-box-pack: center;
		    -moz-box-pack: center;
		    -ms-flex-align:center;/* IE 10 */
		    -webkit-align-items: center;
		    -moz-align-items: center;
		    align-items: center;
		    .speScale{
		    	width: 100%;
		    	height:100%; 
		    	overflow: hidden;
		    	padding-bottom: 1.50rem;
		    	display: flex;
				display:-webkit-box;
			    display: -moz-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
		    }
		    .baocunImg{
		    	position: fixed;
		    	background: #fff;
		    	bottom: 0;
		    	left: 0;
		    	width: 100%;
		    	line-height: 1.00rem;
		    	text-align: center;
		    	font-size: .36rem;
		    	color: #333;
		    	display: flex;
				display:-webkit-box;
			    display: -moz-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
			    display: -moz-flex;
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
		    	img{
		    		display:block;
		    		width: .35rem;
		    		height: .40rem;
		    		margin-right: .12rem;
		    	}
		    }
		}
		.zhezhao{
			background: #fff;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			z-index: 989;
			height: 100%;
		}
		.goFortop{
			position: fixed;
			bottom: 1.80rem;
			right: .60rem;
			z-index: 222;
			img{
				display: block;
				width: .60rem;
				height: .60rem;
			}
		}
		.pinKnow{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1000;
			background: rgba(0,0,0,.5);
			
			
		}
		.pinGoods{
			width: 6.40rem;
			height: 8.56rem;
			
			position: fixed;
			top: 50%;
			margin-top: -4.28rem;
			left: 50%;
			margin-left: -3.20rem;
			z-index: 1002;
			
			.codeImage{
				display: block;
				width: 100%;
			}
			.closeImg{
				display: block;
				width: .32rem;
				height: .32rem;
				position: absolute;
				right: 0.24rem;
				top: 0.24rem;
				z-index: 1005;
				
			}
		}
	}
	.speFindIndex{
		height: 100%;
		overflow: hidden;
		padding: 0;
	}

</style>