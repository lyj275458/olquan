<template>
	<div class="findIndex " v-bind:class="addClass">
		<div class="indexTop">
			<ul>
				<li @click="getTryIndex">试用</li>
				<li @click="getSaleIndex">特卖</li>
				<li class="speLiFind">发现</li>
			</ul>
		</div>
		<div v-bind:class="{ 'specialFide': seachShow==true}">
			<div class="search">
				<div class="searchIndex" style="padding: .10rem .30rem;">
					<div class="searchBod">
						<img :src="seachFindShare" />
						<form action="javascript:return true;" style="flex: 1;-webkit-box-flex: 1;-ms-flex: 1;">
							<input :placeholder="searchRemind" v-model="searchCode" @keyup.13=showInput() type="search" ref="input1"/>
						</form>
						
						<!--<span>达人、标题、产品</span>-->
					</div>
					<!--<div class="cancleCode" v-show="seachShow" @click="cancelCode">
						<img :src="cancelShare" />
					</div>-->
					<div class="searchSure" @click="cancelSearch" v-show="seachShowCancel">
						<!--<span v-show="searchCaleText" @click="searchEnterFun">搜索</span>-->
						<span >取消</span>
					</div>
				</div>
				
			</div>
			
		</div>
		
		<div class="chooseIsFollow" :class="searchBarFixed == true ? 'speChooseFollow' :''">
			<div v-bind:class="{ 'speDiv': isFollowId==1}" @click="getNewIndex">精选</div>
			<div class="hasFollowNew" v-bind:class="{ 'speDiv': isFollowId!=1}" @click="getNewIndexFollow">
				<div>关注</div>
				<div class="hasNew" v-show="isHasNewFollow"></div>
			</div>
			
		</div>
		
		<div class="newContent" v-for="(item,index) in curObj" :key="index">
			
			<div class="newCent_bot">
				<div class="newCent_headImg" @click="getMemIndex(item.accountId)">
					<img :src="item.logo" />
				</div>
				<div class="newCent_nameTime">
					<p class="newCent_name">{{item.name}}</p>
					<p class="newCent_time">{{item.createTime}}</p>
				</div>
				<div class="follow" v-show="isAddFollow">
					<p class="sureFollow" @click="getFollow(0,index,item.accountId)" v-show="item.isFollow==0">
						<span>+ 关注</span>
					</p>
					<!--<p class="sureFollow" @click="getFollow(1,index,item.accountId)" v-show="item.isFollow!=0">
						<span>已关注</span>
					</p>-->
				</div>
				<div class="follow" v-show="!isAddFollow">
					<p class="sureFollow" v-show="item.isFollow==0">
						<span>+ 关注</span>
					</p>
					<!--<p class="sureFollow" v-show="item.isFollow!=0">
						<span>已关注</span>
					</p>-->
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
						<img  :src="item.productImage" v-if="item.productImage!=null"/>
						<span style="display:block;background: rgba(0,0,0,.2);width: 100%;height: 100%;" v-if="item.productImage==null"></span>
						<img class="SpeImgBofang" :src="bofangImg"/>
					</p>
				</li>
			</ul>
			<!--<div class="newScaleImg">
				
				
				<img :src="pinkShare" @click="ceshi"/>
			</div>-->
			<div class="prodtctList" v-show="item.productName!=null && item.productName!=''">
				<div class="productDescrip" @click="getGoodsDetail(item.productType,item.productId,item.memberId)">
					<div class="prodtctImg">
						<img :src="item.productImage" v-if="item.productImage!=''"/>
						<img :src="newLogoImg" v-if="item.productImage==''"/>
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
				<div class="shareErwei" v-if="item.productType!=12 && item.productType!=13" @click="getGoodsShareNew(item.productType,item.productId,item.productImage,item.productName,item.productPrice)">
					<img :src="shareEShare" />
				</div>
			</div>
			<div class="giveGood">
				<div class="sureGood" @click="showAppLink">
					<img :src="productComment"/>
					<span>保存素材</span>
				</div>
				<div v-show="isAddGoodsSure">
					<div class="sureGood" v-show="item.isDoGood==1" @click="addGoodsNum(index,1,item.findId)">
						<img :src="giveUpImg"/>
						<span>{{item.goodCount}}</span>
					</div>
					<div class="sureGood" v-show="item.isDoGood==0"  @click="addGoodsNum(index,0,item.findId)">
						<img :src="giveUp01Img"/>
						<span>{{item.goodCount}}</span>
					</div>
				</div>
				<div v-show="!isAddGoodsSure">
					<div class="sureGood" v-show="item.isDoGood==1">
						<img :src="giveUpImg"/>
						<span>{{item.goodCount}}</span>
					</div>
					<div class="sureGood" v-show="item.isDoGood==0">
						<img :src="giveUp01Img"/>
						<span>{{item.goodCount}}</span>
					</div>
				</div>
				<div class="howToShare" @click="getHowShareNew">
					<img :src="shareMoreShare" />
				</div>
			</div>
		</div>
		

		<div class="followNone" v-show="hasNoFollowList">
			<div>
				<img :src="followNoneImg" />
			</div>
			<div>
				您还没有关注发现号哟～
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
		<div class="shareAppLink" v-show="appLinkShow" @click="closeAppLink"  @touchmove.prevent>
			<div class="linkCOntent">
				<div style="width: 100%;border-bottom: 0.01em solid #E1E1E1;">
					<div class="content" style="font-size: .26rem;">发现自动保存素材仅支持APP端，请前往下载。</div>
				</div>
				
				<div class="linkBot">
					<p @click="closeAppLink">
						<span style="display: block;border-right: 0.01rem solid #e1e1e1;">取消</span>
					</p>
					<p @click="linkAppAddress">
						<span style="color: #E50F72;">去下载</span>
					</p>
				</div>
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
		<div class="tiaozhuan" v-show="qiehuanShow"></div>
		<!--产品二维码-->
		<div class="pinKnow" v-show="pinKnowShow" @touchmove.prevent>
			<div style="display: none;">
			    <canvas width="800" height="1200" id="canvas" style="background: #fff;width: 7.50rem;">
			    	
			    </canvas>
			</div>
			<div style="width: 7.50rem;">
			    <img id="img" style="background: #fff;width:100%;display: block;" src="#" alt="">
			    
			</div>
			<div class="closeErweiImg" @click="showImg">
				<img :src="colseImg" />
			</div>
		</div>
		<!--<div class="pinGoods" v-show="pinKnowShow">
			<img :src="erweiObj" class="codeImage"/>
			<img :src="colseImg" class="closeImg" @click="showImg"/>
		</div>-->
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
				giveUpImg:'/static/images/giveUp.png',
				giveUp01Img:'/static/images/giveUp01.png',
				logo2Img:'/static/images/icon-logo.png',
				newLogoImg:'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/aaa.png',
				followNoneImg:'/static/images/followNone.png',
				productComment:'/static/images/sucai.png',
				erweiImgNew:'/static/images/qr_cord.jpg',
				logoImg:'/static/images/goodsImg.png',
				canProductImg:'',
				canProductName:'',
				canProductPrice:'',
				posterNew:'',
				videoUrl:'',
				erweiObj:'',
				showShare:false,
				isAddFollow:true,
				showTop:false,
				scalImg:false,
				isAddGoodsSure:true,
				seachShow:false,
				searchCodeIndex:false,
				appLinkShow:false,
				isMore:true,
				findNone:false,
				pinKnowShow:false,
				followAccountId:'',
				isFollowId:'',
				videoShow:false,
				hasNoFollowList:false,
				searchBarFixed:false,
				hasNoFollow:false,
				isHasNewFollow:false,
				seachShowCancel:false,
				qiehuanShow:false,
				defaultCode:'',
				addClass:'',
				followIndex:'',
				fistImg:'',
				searchRemind:'',
				memList:[],
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
					'description':'发现好物 分享赚钱' ,
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
			
			this.getNewFollow();
			this.getSearchRemind();
			this.getcartNum();
			
			this.getMember();
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
			window.addEventListener('scroll', this.xuanfuScroll);
		},
		methods:{
			showAppLink(){
				this.appLinkShow=true;
			},
			closeAppLink(){
				this.appLinkShow=false;
			},
			linkAppAddress(){
				window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.olquanapp.ttds.android';
			},
			getNewFollow(){
				let data = {
//					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.waitReadCount,data,this.getNewFollowBack,this);
			},
			getNewFollowBack(data){
				if(data.result>0){
					this.isHasNewFollow=true;
				}else{
					this.isHasNewFollow=false;
				}
			},
			//获取会员信息
			getMember(){
				let data={
//					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				this.newFind();
				this.memList=data.result;
				this.shareData.title='您的好友'+data.result.nickName+'在OL圈发布了一篇达人日记，快去看看吧！';
				this.setCookie('memberId',data.result.id)
				this.addWeixinShare();
			},
			getMemIndex(id){
				//this.$router.push({path:'/index/differentIndex/id/'+id+'?memberId=894559'});
				this.$router.push({path:'/index/differentIndex/id/'+id});
				//window.location.href=CUR_URLBACK+'index/differentIndex/id/'+id;
			},
			//关注或者取消
			getFollow(id,index,accountId){
//				console.log(id)
				this.isAddFollow=false;
				this.isFollowSure=id;
				this.followIndex=index;
				this.followAccountId=accountId;
//				console.log(this.isFollow)
				let data = {
//					memberId:this.$route.query.memberId,
					accountId:this.followAccountId
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.follow,data,this.getFollowBack);
			},
			getFollowBack(data){
				this.isAddFollow=true;
				if(data.code==0){
					if(this.isFollowSure==1){
						this.$toast('取消关注');
						for(let i=0;i<this.curObj.length;i++){
							if(this.curObj[i].accountId==this.followAccountId){
								this.$set(this.curObj[i],'isFollow',0);
							}
						}
					}else{
						this.$toast('关注成功');
						for(let i=0;i<this.curObj.length;i++){
							if(this.curObj[i].accountId==this.followAccountId){
								this.$set(this.curObj[i],'isFollow',1);
							}
						}
					}
				}else{
					this.$toast(data.message);
				}
			},
			//点赞或者取消
			addGoodsNum(index,id,findId){
				this.isAddGoodsSure=false;
				this.isAddGoodsIndex=index;
				this.isAddGoods=id;
				let data = {
//					memberId:this.$route.query.memberId,
					findId:findId
				}
//				console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.doGood,data,this.addGoodsNumBack);
			},
			addGoodsNumBack(data){
				this.isAddGoodsSure=true;
				if(data.code==0){
					
					if(this.isAddGoods==1){
						this.$set(this.curObj[this.isAddGoodsIndex],'isDoGood',0);
						this.$set(this.curObj[this.isAddGoodsIndex],'goodCount',this.curObj[this.isAddGoodsIndex].goodCount-1);
						
					}else{
						this.$set(this.curObj[this.isAddGoodsIndex],'isDoGood',1);
						this.$set(this.curObj[this.isAddGoodsIndex],'goodCount',this.curObj[this.isAddGoodsIndex].goodCount+1);
					}
					
				}else{
					this.$toast(data.message);
				}
			},
			 //获取搜索提示关键字
		    getSearchRemind(){
		    	
				let data={
//					memberId:this.$route.query.memberId,
					type:1,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getSearchRemind,data,this.getSearchRemindBack,this);
		    },
		    getSearchRemindBack(data){
		    	this.defaultCode=data.result;
		    	if(data.result!='无' && data.result!=''){
		    		this.searchRemind='大家都在搜“'+data.result+'”';
		    		
		    	}else{
		    		this.searchRemind=''
		    	}
		    	
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
			//点击精选
			getNewIndex(){
				if(this.searchBarFixed){
					$('html,body').animate({scrollTop:0},1000);
				}
				this.searchCode='';
				this.isFollowId='';
				this.isMore=true;
				this.pageObj.page=1;
				this.addClass='';
				this.newFind();
				
			},
			getNewIndexFollow(){
				this.searchCode='';
				this.isHasNewFollow=false;
				if(this.searchBarFixed){
					$('html,body').animate({scrollTop:0},1000);
				}
				this.isFollowId=1;
				this.isMore=true;
				this.pageObj.page=1;
				this.newFind();
				
			},
			newFind(){
				let data={
					keyword:this.searchCode,
					isFollow:this.isFollowId,
//					memberId:this.$route.query.memberId,
					page:1,
	  				rows:10,
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.newFinds,data,this.newFindBack,this);
				//console.log(data)
			},
			newFindBack(data){
				let _this=this;
				this.qiehuanShow=false;
				
				if(data.code==-1){
					this.$toast(data.message);
				}else{
					for(let i=0; i<data.result.length;i++){
						this.$set(data.result[i],'selectM',false);
					}
					this.curObj=data.result;
//					console.log(this.curObj)
					if(this.isFollowId==1){
						if(data.result.length==0){
							this.hasNoFollowList=true;
							this.addClass='speFollowNone';
						}else{
							this.hasNoFollowList=false;
						}
					}else{
						this.hasNoFollowList=false;
					}
				}
			},
			showInput(){
				if(this.searchCode==''){
					if(this.defaultCode!='无' && this.defaultCode!=''){
						this.searchCode=this.defaultCode
					}else{
						this.searchCode='';
					}
				}
				this.seachShowCancel=true;
				this.searchEnterFun();
			},
			getSearch(){
		    	this.seachShow=true;
		    	this.addClass='speFindIndex';
		    	
		    	
		    },
		    
		    cancelSearch(){
		    	this.searchCode='';
		    	this.isFollowId='';
		    	this.seachShowCancel=false;
		    	this.addClass='';
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
		    getGoodsDetail(type,productId,recId){
		    	
		    	if(type==9 || type==4){
		    		//window.location.href=CUR_URLBACK+'demo/iscroll/id/'+productId+'?isShare=0&type='+type;
		    		console.log('/demo/iscroll/id/'+productId+'?isShare=0&type='+ type+'&recId='+recId)
		    		this.$router.push({path:'/demo/iscroll/id/'+productId+'?isShare=0&type='+type+'&recId='+recId});
		    	}else if(type==12){
		    		this.$router.push({path:'/activity/newact?id='+productId});
		    		//window.location.href=CUR_URLBACK+'activity/newact?id='+productId;
		    	}else if(type==13){
		    		//this.$router.push({path:'/coupon/getcoupon/id/'+productId+'?memberId=894559'});
		    		this.$router.push({path:'/coupon/getcoupon/id/'+productId});
		    		//window.location.href=CUR_URLBACK+'/coupon/getcoupon/id/'+productId;
		    	}else {
		    		window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+productId+'&type='+type+'&recId='+recId;
		    	}
		    },
			draw(productImg,productName,productPrice){
				
			    var canvas = document.getElementById('canvas');
			    
			   
			    var ctx = canvas.getContext("2d");
				var imgLogo = new Image();
				imgLogo.setAttribute('crossOrigin', 'anonymous');
			    imgLogo.src= this.memList.logo;
			    var imgGoods = new Image();
			    imgGoods.setAttribute('crossOrigin', 'anonymous');
			    imgGoods.src =productImg;
			    
			    var img1 = new Image();
			    img1.setAttribute('crossOrigin', 'anonymous');
			    img1.src = this.erweiImgNew;
			    let _this=this;
			    var progress = 0;
			    imgLogo.onload=function(){
			    	progress += 20;
			    	if(progress===100){
				    	ctx.fillStyle = "#fff";
				   		ctx.fillRect(0,0,800,1220);
						ctx.save();
				        var R=50;
					    var d =2 * R;
					    var cx =30 + R;
					    var cy =50  + R;
					    ctx.beginPath();
					    ctx.arc(cx, cy,R, 0, 2 * Math.PI);
					    ctx.clip();
					    ctx.drawImage(imgLogo, 30, 50,d,d);
					    ctx.restore();
				        ctx.drawImage(imgGoods,0,202,800,750)
				        ctx.drawImage(img1,590,981,180,180)//设置图片比例和位置,匹配手机屏幕
				        var str =productName;
				        //绘制简单的文字
				        ctx.fillStyle = "#333"; // black color
				        ctx.font="30px PingFangSC-Regular";
				        ctx.lineWidth=1; 
				        console.log(111)
				        var lineWidth = 0;
				        var canvasWidth = 500;//计算canvas的宽度
						var initHeight=1011;//绘制字体距离canvas顶部初始的高度
						var lastSubStrIndex= 0; //每次开始截取的字符串的索引
						for(let i=0;i<str.length;i++){ 
						    lineWidth+=ctx.measureText(str[i]).width; 
						    if(lineWidth>canvasWidth){  
						        ctx.fillText(str.substring(lastSubStrIndex,i),30,initHeight,600);//绘制截取部分
						        initHeight+=36;//20为字体的高度
						        lineWidth=0;
						        lastSubStrIndex=i;
						       
						    } 
						    if(i==str.length-1){//绘制剩余部分
						        ctx.fillText(str.substring(lastSubStrIndex,i+1),30,initHeight,600);
						        
						    }
						}
						var moneyHeight=0;
						if(initHeight==1011){
							moneyHeight=initHeight+42+36;
						}else{
							moneyHeight=initHeight+45;
						}
						ctx.fillStyle = "#E50F72";
						ctx.fillText('￥'+productPrice,30,moneyHeight);
						ctx.fillStyle = "#777";
						ctx.font="24px PingFangSC-Regular";
						ctx.fillText('长按识别二维码查看详情',30,1150);
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText(_this.memList.nickName,150,84);
						ctx.fillStyle = "#333333";
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText('发现好物，与您分享！',150,132);
				        //生成的data的路径,可以通过php生成图片存到数据库,单存data路径不合适,高清图片情况下会出现图片的残缺
				        var srccc = canvas.toDataURL("image/png");
				        
				        $("#img").attr("src",srccc);
				    
				    }
			    }
			    imgGoods.onload=function(){
			    	progress += 40;
			    	if(progress===100){
				    	ctx.fillStyle = "#fff";
				   		ctx.fillRect(0,0,800,1220);
						ctx.save();
				        var R=50;
					    var d =2 * R;
					    var cx =30 + R;
					    var cy =50  + R;
					    ctx.beginPath();
					    ctx.arc(cx, cy,R, 0, 2 * Math.PI);
					    ctx.clip();
					    ctx.drawImage(imgLogo, 30, 50,d,d);
					    ctx.restore();
				        ctx.drawImage(imgGoods,0,202,800,750)
				        ctx.drawImage(img1,590,981,180,180)//设置图片比例和位置,匹配手机屏幕
				        
		
				        
		//		        ctx.drawImage(imgLogo,30,40,80,65)//设置图片比例和位置,匹配手机屏幕
						var str =productName;
				        //绘制简单的文字
				        ctx.fillStyle = "#333"; // black color
				        ctx.font="30px PingFangSC-Regular";
				        ctx.lineWidth=1; 
				        
				        var lineWidth = 0;
				        var canvasWidth = 500;//计算canvas的宽度
						var initHeight=1011;//绘制字体距离canvas顶部初始的高度
						var lastSubStrIndex= 0; //每次开始截取的字符串的索引
						for(let i=0;i<str.length;i++){ 
						    lineWidth+=ctx.measureText(str[i]).width; 
						    if(lineWidth>canvasWidth){  
						        ctx.fillText(str.substring(lastSubStrIndex,i),30,initHeight,600);//绘制截取部分
						        initHeight+=36;//20为字体的高度
						        lineWidth=0;
						        lastSubStrIndex=i;
						       
						    } 
						    if(i==str.length-1){//绘制剩余部分
						        ctx.fillText(str.substring(lastSubStrIndex,i+1),30,initHeight,600);
						        
						    }
						}
						var moneyHeight=0;
						if(initHeight==1011){
							moneyHeight=initHeight+42+36;
						}else{
							moneyHeight=initHeight+45;
						}
						console.log(initHeight)
						ctx.fillStyle = "#E50F72";
						ctx.fillText('￥'+productPrice,30,moneyHeight);
						ctx.fillStyle = "#777";
						ctx.font="24px PingFangSC-Regular";
						ctx.fillText('长按识别二维码查看详情',30,1150);
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText(_this.memList.nickName,150,84);
						ctx.fillStyle = "#333333";
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText('发现好物，与您分享！',150,132);
				        //生成的data的路径,可以通过php生成图片存到数据库,单存data路径不合适,高清图片情况下会出现图片的残缺
				        var srccc = canvas.toDataURL("image/png");
				        
				        $("#img").attr("src",srccc);
				    
				    }
			    }
			   	img1.onload=function(){
			    	progress += 40;
			    	if(progress===100){
				    	ctx.fillStyle = "#fff";
				   		ctx.fillRect(0,0,800,1220);
						ctx.save();
				        var R=50;
					    var d =2 * R;
					    var cx =30 + R;
					    var cy =50  + R;
					    ctx.beginPath();
					    ctx.arc(cx, cy,R, 0, 2 * Math.PI);
					    ctx.clip();
					    ctx.drawImage(imgLogo, 30, 50,d,d);
					    ctx.restore();
				        ctx.drawImage(imgGoods,0,202,800,750)
				        ctx.drawImage(img1,590,981,180,180)//设置图片比例和位置,匹配手机屏幕
				        
		
				        
		//		        ctx.drawImage(imgLogo,30,40,80,65)//设置图片比例和位置,匹配手机屏幕
						var str =productName;
				        //绘制简单的文字
				        ctx.fillStyle = "#333"; // black color
				        ctx.font="30px PingFangSC-Regular";
				        ctx.lineWidth=1; 
				        
				        var lineWidth = 0;
				        var canvasWidth = 500;//计算canvas的宽度
						var initHeight=1011;//绘制字体距离canvas顶部初始的高度
						var lastSubStrIndex= 0; //每次开始截取的字符串的索引
						for(let i=0;i<str.length;i++){ 
						    lineWidth+=ctx.measureText(str[i]).width; 
						    if(lineWidth>canvasWidth){  
						        ctx.fillText(str.substring(lastSubStrIndex,i),30,initHeight,600);//绘制截取部分
						        initHeight+=36;//20为字体的高度
						        lineWidth=0;
						        lastSubStrIndex=i;
						       
						    } 
						    if(i==str.length-1){//绘制剩余部分
						        ctx.fillText(str.substring(lastSubStrIndex,i+1),30,initHeight,600);
						        
						    }
						}
						var moneyHeight=0;
						if(initHeight==1011){
							moneyHeight=initHeight+42+36;
						}else{
							moneyHeight=initHeight+45;
						}
						ctx.fillStyle = "#E50F72";
						ctx.fillText('￥'+productPrice,30,moneyHeight);
						ctx.fillStyle = "#777";
						ctx.font="24px PingFangSC-Regular";
						ctx.fillText('长按识别二维码查看详情',30,1150);
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText(_this.memList.nickName,150,84);
						ctx.fillStyle = "#333333";
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText('发现好物，与您分享！',150,132);
				        //生成的data的路径,可以通过php生成图片存到数据库,单存data路径不合适,高清图片情况下会出现图片的残缺
				        var srccc = canvas.toDataURL("image/png");
				        
				        $("#img").attr("src",srccc);
				    	
				    }
			    }
			},
			clearCanvas(){  
			    let cxtNew=document.getElementById("canvas").getContext("2d");
			    cxtNew.clearRect(0,0,800,1200);  
			},
		    //获取商品二维码图片
		    getGoodsShareNew(type,productId,productImg,productName,productPrice){
		    	this.pinKnowShow=true;
		    	this.canProductImg=productImg;
		    	this.canProductName=productName;
		    	this.canProductPrice=productPrice;
				let data={
					productId:productId,
//					memberId:this.$route.query.memberId,
					type:type,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTwoCodeUrl,data,this.getGoodsShareBack,this);
		    },
		    getGoodsShareBack(data){
//		    	this.erweiObj=data.result;
				if(data.code!=0){
					this.$toast(data.message);
				}else{
					
					this.erweiImgNew=data.result;
					this.draw(this.canProductImg,this.canProductName,this.canProductPrice);
				}
				
		    },
		    showImg(){
				this.pinKnowShow=false;
				this.clearCanvas();
			},
		    //搜索功能
		    searchEnterFun(){
		    	let data={
					keyword:this.searchCode,
//					memberId:this.$route.query.memberId,
					isFollow:this.isFollowId,
					page:1,
	  				rows:10,
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.newFinds,data,this.searchEnterFunBack,this);
		    },
		    searchEnterFunBack(data){
		    	if(data.code==-1){
					this.$toast(data.message);
				}else{
					this.seachShow=true;
					this.$refs.input1.blur();
					for(let i=0; i<data.result.length;i++){
						this.$set(data.result[i],'selectM',false);
					}
					if(this.isFollowId==1){
						if(data.result.length==0){
							this.addClass='speFollowNone';
							this.hasNoFollowList=true;
						}
						
					}else{
						if(data.result.length==0){
				    		this.findNone=true;
				    	}else{
				    		this.findNone=false;
				    	}
					}
					
			    	if(data.result.length<10){
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
			//悬浮 
  			xuanfuScroll(){
  				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				
				let offsetTop = document.querySelector('.chooseIsFollow').offsetTop;
//				console.log(offsetTop)
				if(scrollTop > offsetTop){
					this.searchBarFixed = true;
					
				}else{
					this.searchBarFixed = false;
				}
				if(scrollTop<81){
					this.searchBarFixed = false;
				}
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
//			  	console.log(this.isMore)
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	 					keyword:this.searchCode,
//						memberId:this.$route.query.memberId,
						isFollow:this.isFollowId,
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
		beforeRouteLeave(to, from, next) {
	      
	        to.meta.keepAlive = false;
	      
	        next();
	    },
		destroyed () {
		 window.removeEventListener('scroll', this.hotSaleScroll)
		 window.removeEventListener('scroll', this.xuanfuScroll);
		},
	}
</script>

<style lang="scss" scoped>
	.speFollowNone{
		background: #fff;
		height: 100%;
		
	}
	.findIndex{
		
		padding-bottom: 1.00rem;
		.slide-fade-enter-active {
		 transition: opacity .5s;
		}
		.slide-fade-leave-active {
		 transition: opacity .5s;
		}
		.slide-fade-enter, .slide-fade-leave-to
		/* .slide-fade-leave-active for below version 2.1.8 */ {
		  
		  opacity: 0;
		}
		.fade-enter-active, .fade-leave-active {
		  transition: opacity .5s;
		}
		.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		  opacity: 0;
		}
		.indexTop{
			
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
		.chooseIsFollow{
			width: 100%;
			background: #fff;
			padding: .26rem 0;
			padding-top: .13rem;
			margin-bottom: .20rem;
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
			font-size: .30rem;
			color: #333;
			font-weight: 700;
			
			.hasFollowNew{
				margin-left: .48rem;
				position: relative;
				.hasNew{
					position: absolute;
					right: -.15rem;
					top: -.05rem;
					width: .12rem;
					height: .12rem;
					background: #E50F72;
					border-radius: 50%;
				}
			}
			
			.speDiv{
				color: #777;
				font-weight: normal;
			}
		}
		.speChooseFollow{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 998;
			background: #fff;
			padding-top: .26rem;
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
			    	width: 100%;
			    	margin-left: .14rem;
			    	height: 100%;
			    	border: none;
			    	background: #EFEDED;
			    	outline: none;
			    	
			    }
			    input::-webkit-search-cancel-button{
				  display: none;
				}
				input[type=search]::-ms-clear{
				  display: none;
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
				.follow{
				
					position: absolute;
					right: 0rem;
					top: 0.15rem;
					padding: 0.05rem;
					font-size: .26rem;
					.sureFollow{
						color: #E50F72;
						width: 1.06rem;
						text-align: center;
						padding: .10rem 0;
						border-radius: .08rem;
						border: 0.01rem solid #E50F72;
						
					}
					.sureFollowSpe{
						border: 0.01rem solid #777777;
						span{
							color: #777777;
						}
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
					border-radius: 0.06rem;
					
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
			.giveGood{
				padding-left: 1.00rem;
				overflow: hidden;
				.sureGood{
					width: 45%;
					float: left;
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
					height: .38rem;
					padding-top: .20rem;
					
					img{
						display: block;
						width: .30rem;
						height: .28rem;
						
					}
					span{
						margin-left: .12rem;
						font-size: .24rem;
						color: #AAAAAA;
						line-height: .38rem;
					}
				}
				.baocun{
					padding-top: .20rem;
					float: left;
					font-size: .24rem;
					color: #AAAAAA;
				}
				.howToShare{
					float: right;
					font-size: 0;
					padding-top: .20rem;
					width: 10%;
	    			height: .38rem;
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
					    display: block;
						width: .32rem;
						height: .06rem;
						
	    			}
				}
			}
		}
		.followNone{
			padding-top: 3.06rem;
			text-align: center;
			font-size: .26rem;
			color: #AAAAAA;
			img{
				display: block;
				width: 1.65rem;
				height: 1.24rem;
				margin: 0 auto;
				margin-bottom: .36rem;
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
		.shareAppLink{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 99999;
			background: rgba(0,0,0,.5);
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
			.linkCOntent{
				margin: 0 auto;
				width: 5.70rem;
				background: #fff;
				border-radius: .16rem;
				font-size: .28rem;
				color: #333;
				.content{
					margin: 0 auto;
					width: 4.00rem;
					text-align: center;
					padding: .40rem 0;
					line-height: .52rem;
					
					
				}
				.linkBot{
					display: flex;
					display:-webkit-box;
				    display: -moz-box;
				    display: -ms-flexbox;
				    display: -webkit-flex;
				    display: -moz-flex;
					p{
						width: 50%;
						text-align: center;
						line-height: .90rem;
					}
				}
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
			height: 100%;
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
		.tiaozhuan{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			z-index: 999;
			height: 100%;
			background: rgba(0,0,0,0);
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
			display: flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -moz-flex;
		    display: -ms-flexbox;
		    display: -webkit-flex;
			-webkit-box-pack: center;
		    -moz-box-pack: center;
		    -ms-flex-align:center;/* IE 10 */
		    -webkit-align-items: center;
		    -moz-align-items: center;
		    align-items: center;
			.closeErweiImg{
				position: absolute;
				right: 0.24rem;
				top: 1.00rem;
				img{
					
					display: block;
					width: .32rem;
					height: .32rem;
				}
			}
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