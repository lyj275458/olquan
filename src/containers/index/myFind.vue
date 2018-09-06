<template>
	<div class="findIndex">
		<div class="personal">
			<div class="personalImg">
				<img :src="acountList.logo" />
			</div>
			<div class="personalName">{{acountList.name}}</div>
			<div class="sundryCount">
				<div class="sundryTotalFind">
					<p class="countNum">{{acountList.totalFindCount}}</p>
					<p>日记</p>
				</div>
				<div class="sundryTotalFind">
					<p class="countNum">{{acountList.followCount}}</p>
					<p>粉丝</p>
				</div>
				<div class="sundryTotalFind">
					<p class="countNum">{{acountList.doGoodCount}}</p>
					<p>获赞</p>
				</div>
			</div>
			<div class="mineOrOther" v-if="acountList.accountId!=0">
				<div class="otherAccount " v-bind:class="{ 'accountSpe': isChooseFalse==false}" @click="getOtherAccount">我关注的</div>
				<div class="speShu">|</div>
				<div class="mineAccount" v-bind:class="{ 'accountSpe': isChooseFalse==true}" @click="getMineAccount">我发布的</div>
			</div>
			<div class="mineOrOther" v-if="acountList.accountId==0">
				<div class="otherAccount " v-bind:class="{ 'accountSpe': isChooseFalse==false}">我关注的</div>
				
			</div>
		</div>
		<div class="newContent" v-for="(item,index) in curObj">
			
			<div class="newCent_bot">
				<div class="newCent_headImg"  @click="getNoDetail(item.accountId,index)">
					<img :src="item.logo" />
				</div>
				<div class="newCent_nameTime">
					<p class="newCent_name">{{item.name}}</p>
					<p class="newCent_time">{{item.createTime}}</p>
				</div>
				<div class="follow" v-show="!isChooseFalse">
					<p class="sureFollow" v-if="item.isAudit==0">
						<span>待审核</span>
					</p>
					<!--<p class="sureFollow sureFollowSpe" v-if="item.isAudit==1">
						<span>已通过</span>
					</p>-->
					<p class="sureFollow sureFollowSpe" v-if="item.isAudit==2">
						<span>未通过</span>
					</p>
				</div>
				<!--<div class="follow" v-show="isChooseFalse" @click="cancleFollow(index,item.accountId)">
					<p class="sureFollow">
						<span>已关注</span>
					</p>
					
				</div>-->
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
			<ul class="newScaleImg">
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
			<div class="prodtctList" v-show="item.productName!=null">
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
		<div class="hasNoFollow" v-show="followNoOne">
			您还没有关注任何人，快点去关注吧！
		</div>
		
		     
		
		<div class="getBottom" v-show="!seachShow">
			<div class="getIndex" @click="getSaleIndex">
				<div class="top">
					<img :src="index01Img" />
				</div>
				<div class="bot" style="color: #000;">特卖</div>
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
				{{findText}}
			</div>
		</div>
		<!--取消关注-->
		<!--<div class="changeAdd" v-show="needIdcard" @touchmove.prevent>
			<div class="change">
				<div style="padding: .40rem;line-height: .52rem;">你确定取消对此人的关注吗。</div>
				<div class="addAddress">
					<div class="addLeft" @click="quxiaoFollow">取消</div>
					<div class="addRight" @click="sureFollowCancel" v-show="cancleSureFollow">确定</div>
					<div class="addRight" v-show="!cancleSureFollow">确定</div>
				</div>
			</div>
		</div>-->
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
			
		<!--产品二维码-->
		<div class="pinKnow" v-show="pinKnowShow" @touchmove.prevent>
			<div style="display: none;">
			    <canvas width="800" height="1200" id="canvas" style="background: #fff;width: 7.50rem;">
			    	
			    </canvas>
			</div>
			<div style="width: 7.50rem;position: relative;">
			    <img id="img" style="background: #fff;width:100%;display: block;" src="#" alt="">
			    <div class="closeErweiImg" @click="showImg">
					<img :src="colseImg" />
				</div>
			</div>
			
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
				giveUpImg:'/static/images/giveUp.png',
				giveUp01Img:'/static/images/giveUp01.png',
				logoImg:'/static/images/icon-logo.png',
				newLogoImg:'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/aaa.png',
				productComment:'/static/images/sucai.png',
				posterNew:'',
				videoUrl:'',
				erweiObj:'',
				isAddGoodsSure:true,
				isAddFollow:true,
				appLinkShow:false,
				showShare:false,
				showTop:false,
				scalImg:false,
				seachShow:false,
				searchCodeIndex:false,
				isChooseFalse:false,
				followNoOne:false,
				cancleSureFollow:true,
				isFollowId:'',
				findText:'',
				isFollowSure:'',
				isAddGoods:'',
				isAddGoodsIndex:'',
				accountId:'',
				cancelIndex:'',
				cancelId:'',
				isMore:true,
				findNone:false,
				pinKnowShow:false,
				needIdcard:false,
				videoShow:false,
				acountList:[],
				memList:[],
				fistImg:'',
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
			
			this.getcartNum();
			this.getAcountList();
			
			this.$store.commit('documentTitle','日记');
			
		},
		activated(){
			console.log(123)
			this.$nextTick(function(){
			    //返回页面取出来
			    
			    window.scroll(0, savedPosition)
			  })
		   
		},
		updated () {
		  
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
		activated: function () {
		    
		},
		mounted(){
			window.addEventListener('scroll', this.hotSaleScroll);
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
			//我的关注点击头像
			getNoDetail(accountId){
				if(this.isChooseFalse){
					//this.$router.push({path:'/index/differentIndex/id/'+accountId+'?memberId=894559'});
					this.$router.push({path:'/index/differentIndex/id/'+accountId});
					//window.location.href=CUR_URLBACK+'index/differentIndex/id/'+accountId;
				}
			},
			//取消我的关注里面的关注
//			cancleFollow(index,accountId){
//				this.cancelIndex=index;
//				this.cancelId=accountId;
//				this.needIdcard=true;
//				
//			},
//			sureFollowCancel(){
//				this.cancleSureFollow=false;
//				let data = {
//					memberId:this.$route.query.memberId,
//					accountId:this.cancelId
//				}
//				
//				
//				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.follow,data,this.sureFollowCancelBack);
//			},
//			sureFollowCancelBack(data){
//				this.cancleSureFollow=true;
//				if(data.code==0){
//					this.needIdcard=false;
//					this.$toast('取消关注');
//					for(let i=0;i<this.curObj.length;i++){
//						if(this.curObj[i].accountId==this.cancelId){
//							this.$set(this.curObj[i],'selectM',true);
//						}
//					}
//					
//				}else{
//					this.$toast(data.result);
//				}
//			},
			quxiaoFollow(){
				this.needIdcard=false;
			},
			getMemList(){
				let data = {
//					memberId:this.$route.query.memberId,
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemListBack);
			},
			getMemListBack(data){
				this.memList=data.result;
				this.shareData.title='您的好友'+data.result.nickName+'在OL圈发布了一篇达人日记，快去看看吧！';
				this.shareData.url=USE_URL+"weixin/auth?recId="+data.result.id+"&view="+encodeURIComponent(CUR_URLBACK+'index/differentIndex/id/'+this.acountList.accountId);
				this.addWeixinShare();
			},
			//发现账号详情
			
			getAcountList(){
				let data = {
//					memberId:this.$route.query.memberId,
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.accountDetail,data,this.getAcountListBack);
			},
			getAcountListBack(data){
				
				this.acountList=data.result;
				this.accountId=this.acountList.accountId;
				this.shareData.picURL=data.result.logo;
//				this.shareData.url=USE_URL+"weixin/auth?recId="+data.result.id+"&view="+encodeURIComponent(CUR_URLBACK+'index/differentIndex/id'+data.result.accountId);
				this.getOtherAccount();
				this.getMemList();
			},
			//点击我发布的
			getMineAccount(){
				this.isChooseFalse=false;
				this.accountId=this.acountList.accountId;
				this.isFollowId='';
				this.findNone=false;
				this.isMore=true;
				this.pageObj.page=1;
				this.newFind();
			},
			//点击我关注的
			getOtherAccount(){
				this.isChooseFalse=true;
				this.accountId='';
				this.isFollowId=1;
				this.findNone=false;
				this.isMore=true;
				this.pageObj.page=1;
				this.newFind();
			},
			//关注或者取消
//			getFollow(id){
////				console.log(id)
//				this.isAddFollow=false;
//				this.isFollowSure=id;
////				console.log(this.isFollow)
//				let data = {
//					memberId:this.$route.query.memberId,
//					accountId:this.acountList.accountId
//				}
//				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.follow,data,this.getFollowBack);
//			},
//			getFollowBack(data){
//				this.isAddFollow=true;
//				if(data.code==0){
//					
//					if(this.isFollowSure==1){
//						this.$toast('取消关注');
//						this.$set(this.acountList,'isFollow',0);
//						this.$set(this.acountList,'followCount',this.acountList.followCount-1);
//					}else{
//						this.$toast('关注成功');
//						this.$set(this.acountList,'isFollow',1);
//						this.$set(this.acountList,'followCount',this.acountList.followCount+1);
//					}
//					
//				}else{
//					this.$toast(data.message);
//				}
//			},
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
						if(!this.isChooseFalse){
							this.$set(this.acountList,'doGoodCount',this.acountList.doGoodCount-1);
						}
						
					}else{
						this.$set(this.curObj[this.isAddGoodsIndex],'isDoGood',1);
						
						this.$set(this.curObj[this.isAddGoodsIndex],'goodCount',this.curObj[this.isAddGoodsIndex].goodCount+1);
						if(!this.isChooseFalse){
							this.$set(this.acountList,'doGoodCount',this.acountList.doGoodCount+1);
						}
					}
					
				}else{
					this.$toast(data.message);
				}
			},
			lookMore(index){
				console.log(123)
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
//					memberId:this.$route.query.memberId,
					accountId:this.accountId,
					isFollow:this.isFollowId,
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
				if(data.result.length==0){
					if(this.isFollowId==1){
						this.findNone=true;
						this.findText='你还没有关注过他人哦'
					}else{
						this.findNone=true;
						this.findText='你还没有发过素材哦'
					}
					
				}
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
		    	
		    	if(type==9 || type==4 || type==1){
		    		//window.location.href=CUR_URLBACK+'demo/iscroll/id/'+productId+'?isShare=0&type='+type;
		    		this.$router.push({path:'/demo/iscroll/id/'+productId+'?isShare=0&type='+ type+'&recId='+recId});
		    	}else if(type==12){
		    		this.$router.push({path:'/activity/newact?id='+productId});
//		    		window.location.href=CUR_URLBACK+'activity/newact?id='+productId;
		    	}else if(type==13){
		    		this.$router.push({path:'/coupon/getcoupon/id/'+productId});
//		    		window.location.href=CUR_URLBACK+'/coupon/getcoupon/id/'+productId;
		    	}else {
		    		window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+productId+'&type='+type;
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
				        ctx.drawImage(img1,590,971,200,200)//设置图片比例和位置,匹配手机屏幕
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
						var descriptHeight=0
						if(initHeight==1011){
							moneyHeight=initHeight+42+26;
							descriptHeight=1140;
						}else{
							moneyHeight=initHeight+45;
							if(initHeight==1047){
								descriptHeight=1140;
							}else{
								descriptHeight=initHeight+87;
							}
							
						}
						
						ctx.fillStyle = "#E50F72";
						ctx.fillText('￥'+productPrice,30,moneyHeight);
						ctx.fillStyle = "#777";
						ctx.font="24px PingFangSC-Regular";
						ctx.fillText('长按识别二维码查看详情',30,descriptHeight);
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText(_this.memList.nickName,150,84);
						ctx.fillStyle = "#333333";
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText('发现好物，与您分享！',150,132);
						ctx.fillStyle = "#777";
						ctx.font="28px PingFangSC-Regular";
						ctx.save();
						ctx.translate(830,30);
						ctx.rotate(90*Math.PI/180);
						ctx.fillText("E N J O Y",10,90)
						ctx.restore();
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
				        ctx.drawImage(img1,590,971,200,200)//设置图片比例和位置,匹配手机屏幕
				        
		
				        
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
						var descriptHeight=0
						if(initHeight==1011){
							moneyHeight=initHeight+42+26;
							descriptHeight=1140;
						}else{
							moneyHeight=initHeight+45;
							if(initHeight==1047){
								descriptHeight=1140;
							}else{
								descriptHeight=initHeight+87;
							}
						}
						console.log(initHeight)
						ctx.fillStyle = "#E50F72";
						ctx.fillText('￥'+productPrice,30,moneyHeight);
						ctx.fillStyle = "#777";
						ctx.font="24px PingFangSC-Regular";
						ctx.fillText('长按识别二维码查看详情',30,descriptHeight);
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText(_this.memList.nickName,150,84);
						ctx.fillStyle = "#333333";
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText('发现好物，与您分享！',150,132);
						ctx.fillStyle = "#777";
						ctx.font="28px PingFangSC-Regular";
						ctx.save();
						ctx.translate(830,30);
						ctx.rotate(90*Math.PI/180);
						ctx.fillText("E N J O Y",10,90)
						ctx.restore();
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
				        ctx.drawImage(img1,590,971,200,200)//设置图片比例和位置,匹配手机屏幕
				        
		
				        
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
						var descriptHeight=0
						if(initHeight==1011){
							moneyHeight=initHeight+42+26;
							descriptHeight=1140;
						}else{
							moneyHeight=initHeight+45;
							if(initHeight==1047){
								descriptHeight=1140;
							}else{
								descriptHeight=initHeight+87;
							}
						}
						ctx.fillStyle = "#E50F72";
						ctx.fillText('￥'+productPrice,30,moneyHeight);
						ctx.fillStyle = "#777";
						ctx.font="24px PingFangSC-Regular";
						ctx.fillText('长按识别二维码查看详情',30,descriptHeight);
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText(_this.memList.nickName,150,84);
						ctx.fillStyle = "#333333";
						ctx.font="28px PingFangSC-Regular";
						ctx.fillText('发现好物，与您分享！',150,132);
						ctx.fillStyle = "#777";
						ctx.font="28px PingFangSC-Regular";
						ctx.save();
						ctx.translate(830,30);
						ctx.rotate(90*Math.PI/180);
						ctx.fillText("E N J O Y",10,90)
						ctx.restore();
				        //生成的data的路径,可以通过php生成图片存到数据库,单存data路径不合适,高清图片情况下会出现图片的残缺
				        var srccc = canvas.toDataURL("image/png");
				        
				        $("#img").attr("src",srccc);
				    	
				    }
			    }
			},
			clearCanvas(){  
			    $("#img").attr("src","#");
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
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getLocalCodePath,data,this.getGoodsShareBack,this);
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
//	 					keyword:this.searchCode,
						accountId:this.accountId,
						isFollow:this.isFollowId,
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
		beforeRouteLeave(to, from, next) {
	      
	        to.meta.keepAlive = false;
	      
	        next();
	    },

		destroyed () {
		 window.removeEventListener('scroll', this.hotSaleScroll)
		},
	}
</script>

<style lang="scss" scoped>
	
	.findIndex{
		
		padding-bottom: 1.00rem;
		.personal{
			position: relative;
			background: #E50F72;
			margin-bottom: .20rem;
			padding-top: .68rem;
			padding-bottom: .42rem;
			
			.personalImg{
				
				width: 100%;
				img{
					display: block;
					width: 1.20rem;
					height: 1.20rem;
					border-radius: 50%;
					margin: 0 auto;
				}
			}
			.personalName{
				text-align: center;
				font-size: .34rem;
				color: #fff;
				margin-top: .18rem;
			}
			.sundryCount{
				margin-top: .50rem;
				font-size: .24rem;
				color: rgba(255,255,255,.7);
				display: flex;
				display:-webkit-box;
			    display: -moz-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
				justify-content: center;
		    	-moz-box-pack: center;
		    	-webkit--moz-box-pack: center;
				text-align: center;
				p{
					margin: 0 .45rem;
				}
				.countNum{
					font-size: .30rem;
					color: #fff;
					margin-bottom: .20rem;
				}
			}
			.mineOrOther{
				font-size: .30rem;
				margin-top: .42rem;
				color: #fff;
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
				.speShu{
					margin: 0 1.10rem;
				}
				.accountSpe{
					color: rgba(255,255,255,.7);
				}
				.mineAccount{
					
				}
			}
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
					padding: 0.05rem ;
					position: absolute;
					right: 0;
					bottom: .08rem;
					font-size: .24rem;
					.sureFollow{
						color: #E50F72;
						width: .98rem;
						height: .40rem;
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
						background: #fff;
						
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
					border-radius: 0.06rem;
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
		.changeAdd{
			position: fixed;
			z-index: 9999;
			left: 0;
			top: 0;
			background: rgba(0,0,0,0.5);
			width: 100%;
			height: 100%;
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
			.change{
				text-align: center;
				font-size: .30rem;
				
				color: #333;
				width: 70%;
				margin: 0 auto;
				background: #fff;
				.addAddress{
					border-top: 0.01rem solid #E1E1E1;
					display: flex;
					display:-webkit-box;
				    display: -moz-box;
				    display: -ms-flexbox;
				    display: -webkit-flex;
				    display: -moz-flex;
					text-align: center;
					line-height: .88rem;
					.addLeft{
						width: 50%;
						
					}
					.addRight{
						width: 50%;
						background: #E5006E;
						color: #fff;
					}
				}
			}
		}
		.hasNoFollow{
			font-size: .30rem;
			text-align: center;
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
			font-size: .26rem;
			color: #aaa;
			padding-top: 2.60rem;
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
				top: .24rem;
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