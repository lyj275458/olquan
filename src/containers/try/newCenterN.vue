<template>
	<div class="newCenter">
		<!--<div class="search" @click="getSearch">
			<div class="searchIcon"></div>
		</div>
		<div class="topmodel">
			<ul class="list">
				<li class="listItem" v-bind:class="{ 'specialList': addSelectSpe}" style="margin-left: .30rem;" @click="getFist">特卖</li>
				<li class="listItem" v-bind:class="{ 'specialList': addSelectOne}" @click="getFistOne">试用</li>
				<li class="listItem" v-bind:class="{ 'specialList': addSelectTwo}" @click="getFistTwo">拼团</li>
				<li class="listItem" v-bind:class="{ 'specialList': index==addIndex}" v-for="(itemSon,index) in cateObj" @click='getDetailNex(index,itemSon.catId)'>{{itemSon.name}}</li>
			</ul>
		</div> -->
		<div class="indexTop">
			<ul>
				<li class="speLiFind">试用</li>
				<li @click="getFist">特卖</li>
				
				<li @click="getFind">发现</li>
			</ul>
		</div>
		<swiper loop auto :list="urlList" height='3.34rem'  dots-position='center' v-show="headlinesLength>0"></swiper>
		<div class="fixedArea" :class="searchBarFixed == true ? 'isFixed' :''">
			<div class="chooseTop">
				<div class="choose" @click="getIndexGoods">
					<img :src="jingpinChoosekImg" v-show="isChooseIndex==1"/>
					<img :src="jingpinNoImg" v-show="isChooseIndex==2 || isChooseIndex==3"/>
					<p v-bind:class="{ 'pSpecial': isChooseIndex==1}">精品试用</p>
				</div>
				<div style="margin: 0 .30rem;">
					<p>|</p>
				</div>
				<div class="choose" @click="getIndexGoodsPay">
					<img :src="chooseYouPayImg" v-show="isChooseIndex==3"/>
					<img :src="chooseNoYouPayImg" v-show="isChooseIndex==2 || isChooseIndex==1"/>
					<p v-bind:class="{ 'pSpecial': isChooseIndex==3}">付邮试用</p>
				</div>
				<div style="margin: 0 .30rem;" v-show="memberlevel">
					<p>|</p>
				</div>
				<div class="choose" @click="getColckGoods" v-show="memberlevel">
					
					<img :src="chooseClockImg" v-show="isChooseIndex==2"/>
					<img :src="noChooseClockImg" v-show="isChooseIndex==1 || isChooseIndex==3" />
					<p v-bind:class="{ 'pSpecial': isChooseIndex==2}">整点抢试</p>
				</div>
			</div>
			
			<div class="fanfanfan" v-show="isChooseIndex==2"  :class="searchBarFixedSpecial == true ? 'isFixedSpe' :''">
				<ul class="listLess" v-show="showLength<=5">
					<li v-for="(item,index) in timeObj" v-bind:class="{ 'speLi': selectLi==index}" @click="getTimeGoods(item.time,index)">
						<p>{{item.time}}</p>
						<p class="spePel" v-show="item.isStarted==1">抢试中</p>
						<p class="spePel" v-show="item.isStarted!=1">预热中</p>
					</li>
					
				</ul>
				<ul class="listMore" v-show="showLength>5">
					<li v-for="(item,index) in timeObj" v-bind:class="{ 'speLi': selectLi==index}" @click="getTimeGoods(item.time,index)">
						<p>{{item.time}}</p>
						<p class="spePel" v-show="item.isStarted==1">抢试中</p>
						<p class="spePel" v-show="item.isStarted!=1">预热中</p>
					</li>
				</ul>
			</div>
		</div>
		
		<!--<div class="benefit" v-show="iconObj.length>0">
			<ul>
				<li v-for="items in iconObj" @click='goMoreIndex(items.link,items.type)'>
					<p><img :src="items.iconImage"/></p>
					<span>{{items.name}}</span>
				</li>
			</ul>
		</div>
		<div class="banner">
			<div class="bannerImg" v-for="item in advertObj" @click="getAdvers(item.url)">
				<img v-lazy="item.image"/>
			</div>
			
		</div>-->
		<!--<div class="tuijian" v-show="newShow">
			<img :src="xianImgone"/>
				新品首试
			<img :src="xianImgone"/>
		</div>
		<div class="newTry" v-show="newShow">
			<div class="tryImg" @click="getSeveralTry(2)" v-if="newImg!=null">
				<img v-lazy="newImg.image"/>
			</div>
			<div class="newGoods">
				<div class="lunGoods">
					<div class="topImg" v-for="item in newObj.products" @click="getGoods(item.productId)">
						<p class="topImgSon">
							<img v-lazy="item.image" />
							<img class="tryOut" :src="tryOutImg" v-show="item.percent=='100%'"/>
						</p>
						<p class="descript" style="color: #333;padding-top: .10rem;max-height: .72rem;">
							{{item.productName}}
						</p>
						<p class="descript" style="color: #777;">
							限量{{item.dayLimitCount}}份
						</p>
						<p class="descript" style="font-size: .22rem; color: #777;">
							保证金<span style="color: #E50F72;font-size: .24rem;">￥{{item.price}}</span>
						</p>
					</div>
					
					<div class="topImg" style="vertical-align: top;background: #F7F7F7;" @click="getSeveralTry(2)">
						<div class="topImgSon" style="text-align: center;">
							<div class="tagImgTop">
								<span class="lookMore" >
									<i>查看全部</i>
								</span>
								<p style="color: #777;font-size: .22rem;">view all</p>
								
							</div>
							
						</div>
						
					</div>
				</div>
			</div>
		</div>
		<div class="tuijian" v-show="showLength>0">
			<img :src="xianImgone"/>
				整点抢试
			<img :src="xianImgone"/>
		</div>
		<div class="pointGoods" v-show="showLength>0">
			<div class="topTime">
				
				<div style="padding: 0 .80rem;margin-bottom: .38rem;">
					<ul class="listLess" v-show="showLength<=5">
						<li v-for="(item,index) in timeObj" v-bind:class="{ 'speLi': selectLi==index}" @click="getTimeGoods(item.time,index)">
							<p>{{item.time}}</p>
							<p class="spePel" v-show="item.isStarted==1">抢试中</p>
							<p class="spePel" v-show="item.isStarted!=1">预热中</p>
						</li>
						
					</ul>
					<ul class="listMore" v-show="showLength>5">
						<li v-for="(item,index) in timeObj" v-bind:class="{ 'speLi': selectLi==index}" @click="getTimeGoods(item.time,index)">
							<p>{{item.time}}</p>
							<p class="spePel" v-show="item.isStarted==1">抢试中</p>
							<p class="spePel" v-show="item.isStarted!=1">预热中</p>
						</li>
					</ul>
				</div>
				<div class="newGoods" style="height: 3.09rem;overflow-y: hidden;">
					<div class="lunGoods">
						<div style="padding-bottom: .10rem;" class="topImg" v-for="item in timeGoodsObj" @click="getGoods(item.productId)">
							<p class="topImgSon">
								<img v-lazy="item.image" />
								<img class="tryOut" :src="tryOutImg" v-show="item.percent=='100%'"/>
							</p>
							<p class="descript" style="color: #333;padding-top: .10rem;height: .72rem;">
								<span v-show="item.countryIcon!=null"><img style="display: inline-block;height: .18rem;width: .28rem;" :src="item.countryIcon"/></span>
								<span style="color:#E72F7D;font-size: .22rem;">{{item.countryName}}</span>
								<span style="font-size: .24rem;">{{item.productName}}</span>
							</p>
							<p class="descript" style="color: #777;">
								限量{{item.dayLimitCount}}份
							</p>
							<p class="descript" style="font-size: .22rem; color: #777;">
								保证金<span style="color: #E50F72;font-size: .24rem;">￥{{item.price}}</span>
							</p>
						</div>
						
						<div class="topImg" style="vertical-align: top;background: #F7F7F7;" @click="getPointTry">
							<div class="topImgSon" style="text-align: center;">
								<div class="tagImgTop">
									<span class="lookMore" >
										<i>查看全部</i>
									</span>
									<p style="color: #777;font-size: .22rem;">view all</p>
									
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>-->
		<!--<div class="tuijian" v-show="overSeaShow">
			<img :src="xianImgone"/>
				试海外
			<img :src="xianImgone"/>
		</div>
		<div class="newTry" v-if="overSeaShow">
			<div class="tryImg" @click="getoverseaTry()" v-if="overSeaImg!=null">
				<img v-lazy="overSeaImg.image"/>
			</div>
			<div class="newGoods" v-show="overSeaShow">
				<div class="lunGoods">
					<div class="topImg" v-for="item in overSeaObj.products" @click="getGoods(item.productId)">
						<p class="topImgSon">
							<img v-lazy="item.image" />
							<img class="tryOut" :src="tryOutImg" v-show="item.percent=='100%'"/>
						</p>
						<p class="descript" style="color: #333;padding-top: .10rem;max-height: .72rem;">
							<span v-show="item.countryIcon!=null"><img style="display: inline-block;height: .18rem;width: .28rem;" :src="item.countryIcon"/></span>
							<span style="color:#E72F7D;font-size: .22rem;">{{item.countryName}}</span>
							<span style="font-size: .24rem;">{{item.productName}}</span>
						</p>
						<p class="descript" style="color: #777;">
							限量{{item.dayLimitCount}}份
						</p>
						<p class="descript" style="font-size: .22rem; color: #777;">
							保证金<span style="color: #E50F72;font-size: .24rem;">￥{{item.price}}</span>
						</p>
					</div>
					
					<div class="topImg" style="vertical-align: top;background: #F7F7F7;" @click="getoverseaTry()">
						<div class="topImgSon" style="text-align: center;">
							<div class="tagImgTop">
								<span class="lookMore" >
									<i>查看全部</i>
								</span>
								<p style="color: #777;font-size: .22rem;">view all</p>
								<p class="moreImg">
									<img :src="moreImgone" />
								</p>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>-->
		<!--<div class="tuijian" style="margin-bottom: -.30rem;" v-show="normalShow">
			<img :src="xianImgone"/>
				精品试用
			<img :src="xianImgone"/>
		</div>-->
		<div v-bind:class="{ 'specialMoreGoods': isChooseIndex==1}">
			
			<div class="moreGoodsTry" v-for="(item,index,key) in curObj" @click="getGoods(item.productId)" v-show="isChooseIndex==1 || isChooseIndex==3" >
				<div class="moreGoodsImg">
					<img :src="item.indexImage" />
					<img class="tryOut" :src="tryOutImg" v-show="item.percent=='100%'"/>
				</div>
				<div class="moreGoodsName moreGoodsNameSpe">
					{{item.productName}}
				</div>
				<div class="moreGoodsDes">
					{{item.summery}}
				</div>
				<div class="moreGoodsPrice">
					<p>保证金<span>￥{{item.price}}</span></p>
					<p style="margin-top: .04rem;">已试{{item.buyCount}}份</p>
				</div>
			</div>
			
		</div>
		
		<div class="timeTryGoods" v-show="isChooseIndex==2">
			<div class="tryGoodsDetail" v-for="(item,index) in timeGoodsObj" @click="getGoods(item.productId)">
				<div class="goodsImg">
					<img class="goods-img" v-lazy="item.image" />
					<img class="tryOut" :src="tryImgone" v-show="item.percent=='100%'" />
				</div>
				<div class="goods-detail">
					<div class="goodsName">
						<span v-show="item.countryIcon!=null" style="font-size: 0;display: inline-block;"><img style="display: block;height: .18rem;width: .28rem;" :src="item.countryIcon"/></span>
						<span style="color:#E72F7D;font-size: .24rem;">{{item.countryName}}</span>
						<span style="font-size: .28rem;color: #333;;">{{item.productName}}</span>
					</div>
					<div class="goodsNum" v-show="addSelect==0">
						<div class="uesNum">仅剩{{(item.dayLimitCount-item.saleCount)<0?0:item.dayLimitCount-item.saleCount}}件</div>
						<!--<div class="progress">
							<div class="num">仅剩{{item.plusPercent}}</div>
							<div class="porNum"v-bind:style="{width:item.plusPercent}"></div>
						</div>
						<div class="uesNum">仅剩{{item.dayLimitCount-item.saleCount}}件</div>-->
						<div class="uesNum" style="color: #777;">已有{{item.totalBuyCount}}人试用</div>
					</div>
					<div class="dayTomorrow"  v-show="addSelect==1">
						{{item.dayLimitCount}}件 | 明日{{item.dailyStartTime}}
					</div>
					<div class="goodsMoney">
						保证金:<span>￥{{item.price}}</span>
					</div>
				</div>
				<div class="getGoods" v-show="addSelect==0 && item.isStarted==1">
					<span>马上试</span>
					<img :src="tryRowImg" />
				</div>
				<div class="getGoods" v-show="addSelect==1 || item.isStarted==0" style="background: #FC89B2;">
					<span>即将开始</span>
					
				</div>
			</div>
			
		</div>
		<div class="getBottom">
			<div class="getIndex" @click="getIndex">
				<div class="top">
					<img :src="index01Img" />
				</div>
				<div class="bot" style="color: #000;">首页</div>
			</div>
			<div class="getIndex" @click="getShangcheng">
				<div class="top">
					<img :src="find1Img" />
				</div>
				<div class="bot">分类</div>
			</div>
			<div class="getIndex" @click="getOrderCate">
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
		<!--首页弹窗-->
		<div class="avtiveBack" v-show="showActive">
			<div class="avtiveTop">
				<div style="padding: 0 .10rem; position: relative;">
					<div class="avtiveIMg" v-for="(item,index) in avtiveObj" v-show="item.selectM">
						<div @click="getActive(item.dialogId,item.url)"><img :src="item.image" @click="getActive(item.dialogId,item.url)"/></div>
						<p class="colse" @click="colseImg(index)">
							<img :src="colseIcon"/>
						</p>
					</div> 
				</div>
			</div>
		</div>
		<!--首页弹窗-->
		<!--点击回到顶部-->
		<div class="goFortop" v-show="showTop" @click="gotoTop">
			<img :src="goTopImg"/>
		</div>
		<!--点击回到顶部-->
		
	</div>
	
	
</template>

<script>
	import { Swiper, SwiperItem} from 'vux'
	import axios from 'axios'
	import $ from 'jquery';
	export default {
		
		data : function(){
			return{
				cateObj:JSON.parse(localStorage.getItem("cateGory")),
				goodsImg:'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/cca6d92c415c41028ed89bda3e681c66340f4a63',
				xianImgone:'/static/images/xian.png',
				useImgone:'/static/images/use.jpg',
				moreImgone:'/static/images/moreTry.png',
				index01Img:'/static/images/icon-index02.png',
				cartImg:'/static/images/icon-cart.png',
				find1Img:'/static/images/shangcheng.png',
				serviceImg:'/static/images/icon-service.png',
				myImg:'/static/images/icon-my.png',
				goTopImg:'/static/images/goTop.png',
				colseIcon:'/static/images/colseIcon.png',
				tryOutImg:'/static/images/tryOut.png',
				noChooseClockImg:'/static/images/noChooseClock.png',
				chooseClockImg:'/static/images/chooseClock.png',
				chooseYouPayImg:'/static/images/youPay.png',
				chooseNoYouPayImg:'/static/images/youNoPay.png',
				jingpinChoosekImg:'/static/images/jingpinChoose.png',
				jingpinNoImg:'/static/images/jingpinNo.png',
				tryImgone:'/static/images/tryOut.png',
				tryRowImg:'/static/images/tryRow.png',
				searchBarFixed:false,
				searchBarFixedSpecial:false,
				isChooseIndex:1,
				addSelect:0,
				selectLi:-1,
				headlinesLength:0,
				showTop:false,
				addSelectSpe:false,
				addSelectOne:true,
				addSelectTwo:false,
				isMore:true,
				addIndex:null,
				overSeaShow:true,
				newShow:true,
				timeShow:true,
				normalShow:true,
				cartNum:0,
				iconObj:[],
				showActive:false,
				isChooseTime:false,
				memberlevel:false,
				avtiveObj:[],
				urlList:[],
				imgObj:[],
				advertObj:[],
				curObj:[],
				newObj:[],
				overSeaObj:[],
				overSeaImg:[],
				timeObj:[],
				timeGoodsObj:[],
				scrollTop:0,
				isTime:'',
				pageObj:{
					page:1,
				},
				newImg:[],
				timeList:0,
				shareData : {
					'title': "OL圈 试用中心",
					'description': "试，是一种态度。每日整点限量抢试！还有更多新品、海外产品期待您来试用体验！",
					'url': "",
					'picURL': "https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/aaa.png",
					'hide':true,
					'share':false
				},
				showLength:'',
				
			}
		},
		components: {
		    Swiper,
		    SwiperItem,
		    $
		},
		created: function() {
			if(this.$route.query.memberId=='undefined'){
				this.$route.query.memberId='';
			}
			this.getMember();
			this.addRecord();
			this.$store.commit('documentTitle','OL圈');
//			this.getFreeUse();
			this.getSpecialGoods(1);
			this.getImgtop();
//			this.getIcon();
			this.getFristGoods()
			this.getWholeTime();
//			this.getAdvert();
			this.getcartNum();
//			this.getActiveImg();
			
			
			
//			this.getCate();
		},
		mounted(){
			
			window.addEventListener('scroll', this.getTopScroll);
			window.addEventListener('scroll', this.handleScroll);
			window.addEventListener('scroll', this.xuanfuScroll);
		},
		methods:{
			//获取会员信息
			getMember(){
				let data={
					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				this.shareData.url=USE_URL+"weixin/auth?recId="+data.result.id+"&view="+encodeURIComponent(CUR_URLBACK+"try/newCenter");
				//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'try/center');
				this.addWeixinShare();//微信分享 
				
				if(data.result.isGetStoreCommission==1){
					this.memberlevel=true;
				}else{
					this.memberlevel=false;
				}
				this.setCookie('memberId',data.result.id)
			},
			//添加访问记录
			addRecord(){
  				let data = {
  					terminalType:5,
  					pageuri:'try/newCenter'
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,data,this.addRecordBack,this);
  			},
  			addRecordBack(data){},
			//
			getIndexGoodsPay(){
				this.isChooseTime=false;
				this.isChooseIndex=3;
				this.isMore=true;
				this.pageObj.page=1;
				this.getSpecialGoods(5);
				if(this.searchBarFixed || this.searchBarFixedSpecial){
					$('html,body').animate({scrollTop:0},1000);
				}
			},
			getIndexGoods(){
				this.isChooseTime=false;
				this.isChooseIndex=1;
				this.isMore=true;
				this.pageObj.page=1;
				this.getSpecialGoods(1);
				if(this.searchBarFixed || this.searchBarFixedSpecial){
					$('html,body').animate({scrollTop:0},1000);
				}
				
			},
			getColckGoods(){
				console.log(this.isTime)
				if(this.isChooseTime){
					console.log(1)
				}else{
					this.isChooseIndex=2;
					if(this.searchBarFixed || this.searchBarFixedSpecial){
						$('html,body').animate({scrollTop:0},10);
					}
					this.searchBarFixed=false;
					this.isMore=true;
					this.pageObj.page=1;
					
//					this.isTime='';
				}
				
//				if(this.searchBarFixed || this.searchBarFixedSpecial){
//					$('html,body').animate({scrollTop:0},1000);
//				}
			},
			//获取试用首页信息
			getFreeUse(){
				let data={
					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.freeUseNewHomePage,data,this.getFreeUseBack);
			},
			getFreeUseBack(data){
//				console.log(data)
				
				this.newObj=data.result.firstUseDto;
//				this.overSeaObj=data.result.overSeasDto;
//				if(this.overSeaObj.products.length>0){
//					this.overSeaShow=true;
//				}else{
//					this.overSeaShow=false;
//				}
//				this.overSeaImg=data.result.overSeasDto.overSeasBanner;
				this.newImg=data.result.firstUseDto.firstUseBanner;
				if(this.newObj.products.length>0){
					this.newShow=true;
				}else{
					this.newShow=false;
				}
				this.shareData.url=USE_URL+"weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+"try/newCenter");
				//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'try/center');
				this.addWeixinShare();//微信分享 
//				console.log(this.overSeaImg)
			},
			//获取精品试用产品
			getSpecialGoods(id){
				this.goodsType=id;
				let data={
					page:this.pageObj.page,
					rows:20,
					type:id
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getFreeUseProducts,data,this.getSpecialGoodsBack);
			},
			getSpecialGoodsBack(data){
				
				if(this.goodsType==1 || this.goodsType==5){
					this.curObj=data.result;
				}
				if(this.curObj.length>0){
					this.normalShow=true;
					
				}else{
					this.normalShow=false;
				}
				//console.log(this.curObj)
			},
			//获取精品试用产品分页数据
			handleScroll(){
				var height=document.body.scrollHeight;
//				console.log(height)
  				this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				var windowH=window.innerHeight;
//				console.log(this.scrollTop + windowH)
				if(this.isChooseIndex==1){
					if(this.scrollTop + windowH >=height-200){
						
			  			if(this.isMore){
			 				this.isMore=false;
			 				let data={
			  					page:this.pageObj.page+1,
			  					rows:20,
			  					type:1,
			  				};
			  				this.pageObj.page=this.pageObj.page+1
							this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getFreeUseProducts,data,this.getSpecialGoodsMoreBack);
			 			}
					}
				}
				if(this.isChooseIndex==2){
					if(this.scrollTop + windowH >=height-200){
						
			  			if(this.isMore){
			 				this.isMore=false;
			 				let data={
			  					page:this.pageObj.page+1,
			  					rows:20,
			  					time:this.isTime,
			  					wholePointDateType:this.addSelect
			  				};
			  				this.pageObj.page=this.pageObj.page+1
							this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getWholePointFreeUseProducts,data,this.getSpecialGoodsMoreBack);
			 			}
					}
				}
				
			},
			getSpecialGoodsMoreBack(data){
				if(data.result.length<20){
					this.isMore=false;
					this.showTrue=true;
				}else{
					this.isMore=true;
				}
				if(this.isChooseIndex==1){
					for(let i=0; i<data.result.length; i++){
						this.curObj.push(data.result[i])
					}
				}
				if(this.isChooseIndex==2){
					for(let i=0; i<data.result.length; i++){
						this.timeGoodsObj.push(data.result[i])
					}
				}
				
			},
			//悬浮
			xuanfuScroll(){
				if(this.memberlevel){
					var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	//			 	console.log(scrollTop)
				  	var offsetTop = document.querySelector('.fixedArea').offsetTop;
//				  	console.log(offsetTop)
				  	var offsetTopNext= document.querySelector('.fanfanfan').offsetTop;
//				    console.log(offsetTopNext)	
					if(this.isChooseIndex==1){
						if (scrollTop > offsetTop) {
						    this.searchBarFixed = true;
						} else {
						    this.searchBarFixed = false;
						}
						if(scrollTop<198){
							this.searchBarFixed = false;
						}
					}else{
						if (scrollTop > offsetTopNext) {
						    this.searchBarFixedSpecial = true;
						} else {
						    this.searchBarFixedSpecial = false;
						}
						if(scrollTop<256){
							this.searchBarFixedSpecial = false;
						}
					}
				}
			},
			//获取当天整点抢试用时间
			getWholeTime(){
				let data = {
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getWholePointFreeUseTimes,data,this.getWholeTimeBack);
			},
			getWholeTimeBack(data){
//				console.log(data.result)
				this.showLength=data.result.length;
				this.timeObj=data.result;
				for(let i=0;i<data.result.length;i++){
					if(data.result[i].isCurrentActivity==1){
						this.selectLi=i;
						this.timeList=data.result[i].time;
						this.isTime=data.result[i].time;
					}
				}
			},
			//更多整点抢
			getPointTry(){
				this.$router.push({path:'/try/pointTry'});
			},
			//
			getFristGoods(){
				let data ={
					page:1,
					rows:20
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getWholePointFreeUseProducts,data,this.getFristGoodsBack);
			},
			getFristGoodsBack(data){
				this.timeGoodsObj=data.result;
//				console.log(this.timeGoodsObj)
				
			},
			getTimeGoods(time,index){
				this.isChooseTime=true;
				this.selectLi=index;
				this.isTime=time;
				this.isMore=true;
				this.pageObj.page=1;
				if(this.searchBarFixed || this.searchBarFixedSpecial){
					$('html,body').animate({scrollTop:document.querySelector('.timeTryGoods').offsetTop-document.querySelector('.fanfanfan').offsetTop*3},1000);
				}
				let data = {
					page:1,
					rows:20,
					time:time
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getWholePointFreeUseProducts,data,this.getFristGoodsBack);
			},
			//获取试用首页广告图
//			getAdvert(){
//				let data ={
//					
//				}
//				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getFreeUseAd,data,this.getAdvertBack);
//			},
//			getAdvertBack(data){
//				//console.log(data)
//				this.advertObj=data.result;
//			},
			//点击各种试
			getSeveralTry(id){
//				localStorage.setItem('bannerImg',JSON.stringify(this.newImg.image))
//				let bannerImg=JSON.parse(localStorage.getItem("bannerImg"));
//				console.log(bannerImg)
				window.location.href=CUR_URLBACK+'try/severalTry/id/'+id;
				//this.$router.push({path:'/try/severalTry/id/'+id+'?memberId='+this.$route.query.memberId});
			},
			getoverseaTry(){
				//localStorage.setItem('overSeaImg',JSON.stringify(this.overSeaImg.image))
				window.location.href=CUR_URLBACK+'try/severalTry/id/4';
				//this.$router.push({path:'/try/severalTry/id/4?memberId='+this.$route.query.memberId});
			},
			//点击广告
  			getAdvers(id){
  				if(id!="" && id!="#"){
					if(id.indexOf("?")!=-1){
//						console.log("YES")
						window.location.href=id;
					}else{
//						console.log("no")
						window.location.href=id;
					}
				}else{
					console.log(1)
				}
  			},
			//获取首页ICON
  			getIcon() {
		        axios.get(API_HOST+'mobile/product/icon/list',{
		          params:{}
		        }).then(res =>{
		           this.iconObj = res.data.result;
		          // console.log(this.iconObj)
			    }).catch(
		          (error) => {
		    	      this.$toast(res.data.message);
		          }
		        )
		    },
		    //获取购物车产品数量
			getcartNum(){
				let data={
					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.totalNum,data,this.getcartNumBack);
			},
			getcartNumBack(data){
				//console.log(data)
				this.cartNum=data.result;
			},
			//查看商品详情
			getGoods(id){
				
				this.$router.push({path:'/demo/iscroll/id/'+id+'?isShare=0&type=4'});
			},
		    //点击...详情
  			goMoreIndex(id,type){
  				//console.log(type)
  				if(type==18 || type==19 || type==20 || type==21 || type==22 || type==23 || type==25 || type==26  || type==28){
  					if(id!=""){
						if(id.indexOf("?")!=-1){
							//console.log("YES")
							window.location.href=USE_URL+id;
						}else{
							//console.log("no")
							window.location.href=USE_URL+id;
						}
					}
  				}else if(type==29){
  					console.log(11)
  				}else{
  					if(id!=""){
						if(id.indexOf("?")!=-1){
							//console.log("YES")
							window.location.href=id;
						}else{
							//console.log("no")
							window.location.href=id;
						}
					}
  				}
  				
  			},
  			//获取试用首页轮播图
	  		getImgtop(){
				let data={
					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.advers,data,this.getImgBack);
			},
			getImgBack(data){
				if(data.code==0){
					if(data.result){
						this.imgObj=data.result;
					}else{
						this.imgObj=[];
					}
					//this.advertObj=data.result.ads;
					this.headlinesLength=data.result.banners.length;
	//				console.log(this.headlinesLength)
					for(let i=0;i<this.imgObj.banners.length;i++){
						
						if(this.imgObj.banners[i].url== "#" || this.imgObj.banners[i].url==""){
							this.imgObj.banners[i].url=location.href;
						}else{
							this.imgObj.banners[i].url=this.imgObj.banners[i].url
						}
					}
					this.urlList = this.imgObj.banners.map((item, index) => ({
					  url: item.url,
					  img: item.image,
					  
					}))
				}else {
					this.$toast(data.message);
				}
				
//				console.log(this.urlList)
	//			console.log(data)
			},
			//点击特卖
  			getFist(){
  				//this.$router.push({path:'/index/pinkIndex?memberId='+this.$route.query.memberId});
  				window.location.href=CUR_URLBACK+'index/pinkIndex'
  				
  			},
  			//点击特卖
  			getFind(){
  				//this.$router.push({path:'/index/pinkIndex?memberId='+this.$route.query.memberId});
  				//window.location.href=CUR_URLBACK+'index/findIndex';
		    	window.location.href=CUR_URLBACK+'index/newFindIndex';
  				
  			},
  			gotoTop(){
				$('html,body').animate({scrollTop:0},1000);
			},
			getTopScroll(){
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(scrollTop)
				if(scrollTop>600){
					this.showTop=true;
				}else{
					this.showTop=false;
				}
			},
			//获取首页弹窗图标
  			getActiveImg(){
  				
  				let data ={
					memberId:this.$route.query.memberId,
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getDialog,data,this.getActiveImgBack);
  			},
  			getActiveImgBack(data){
  				//console.log(data)
  				if(data.code!=-1){
  					if(data.result.length>0){
	  					this.showActive=true;
	  				}else{
	  					this.showActive=false;
	  				}
	  				for(let i=0;i<data.result.length;i++){
	  					this.$set(data.result[i],'selectM',true);
	  				}
	  				this.avtiveObj=data.result;
  				}
  				
  				
  				
  			},
  			colseImg(index){
  				
  				this.avtiveObj[index].selectM=false;
  				this.avtiveObj.splice(index,1);
  				if(this.avtiveObj.length==0){
  					this.showActive=false;
  				}
//				console.log(this.showActive)
  			},
  			getActive(id,url){
  				//console.log(id)
  				this.avtiveUrl=url;
  				let data ={
  					dialogId:id,
					memberId:this.$route.query.memberId,
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.openDialog,data,this.getActiveBack);
  			},
  			getActiveBack(data){
				if(this.avtiveUrl.indexOf("?")!=-1){
					console.log("YES")
					window.location.href=this.avtiveUrl;
				}else{
					console.log("no")
					window.location.href=this.avtiveUrl;
				}
  			},
  			
  			//点击试用
  			getFistOne(){
  				//this.$router.push({path:'/try/moretry?memberId='+this.$route.query.memberId});
  				window.location.href=CUR_URLBACK+'try/newCenter';
  			},
  			//点击拼团
  			getFistTwo(){
  				//this.$router.push({path:'/index/newIndex?memberId='+this.$route.query.memberId});
  				window.location.href=CUR_URLBACK+'index/newIndex';
  			},
			//点击分类
  			getDetailNex(index,id){
  				window.location.href=USE_URL+'weixin/product/productCategoryDetail?pcatId='+id;
  				
  			},
  			getSearch(){
  				window.location.href=USE_URL+'ol/weixin/index/search';
  			},
  			//跳转购物车
			getIndex(){
				window.location.href=CUR_URLBACK+'try/newCenter';
			},
			getOrderCate(){
				window.location.href=CUR_URLBACK+'shopcar/ordercar';
			},
			getShangcheng(){
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
		  window.removeEventListener('scroll', this.handleScroll)
		  window.removeEventListener('scroll', this.getTopScroll);
		  window.removeEventListener('scroll', this.xuanfuScroll);
		},
	}
</script>

<style lang="scss" scoped>
	
	.newCenter{
		padding-top: .80rem;
		padding-bottom: 1.00rem;
		background: #F7F7F7;
		.indexTop{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			z-index: 999;
			background: #FFF;
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
		.fixedArea{
			font-size:.30rem;
			background: #fff;
			.chooseTop{
				display: flex;
				display:-webkit-box;
			    display: -moz-box;
			    display: -moz-flex;
			    display: -ms-flexbox;
			    display: -webkit-flex;
				-webkit-justify-content:center;
				justify-content:center;
				-moz-box-pack:center;
				-webkit--moz-box-pack:center;
				font-size: .30rem;
				color: #333;
				line-height: 1.20rem;
				.choose{
					display: flex;
					display:-webkit-box;
				    display: -moz-box;
				    display: -moz-flex;
				    display: -ms-flexbox;
				    display: -webkit-flex;
					-webkit-justify-content:center;
					justify-content:center;
					-moz-box-pack:center;
					-webkit--moz-box-pack:center;
					align-items:center;
					-webkit-align-items:center;
					box-align:center;
					-moz-box-align:center;
					-webkit-box-align:center;
					img{
						display: inline-block;
						width: .30rem;
						
						height: .30rem;
					}
					p{
						display: inline-block;
						font-size: .30rem;
						margin-left: .10rem;
						color: #777777;
					}
					.pSpecial{
						color: #333;
					}
				}
			}
			.fanfanfan {
				padding: .38rem .80rem; background: #F7F7F7;
				.listLess{
					
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
					li{
						margin: 0 .24rem;
						text-align: center;
					}
					.speLi{
						color: #E50F72;
						.spePel{
							color: #E50F72;
						}
					}
				}
			.listMore{
				font-size: 0;
				height: .62rem;
				overflow-x: auto;
				overflow-y: hidden;
				white-space: nowrap;	
				li{
					text-align: center;
					display: inline-block;
					margin: 0 .24rem;
					font-size: .30rem;
					
				}
				li:first-child{
					margin-left: 0.05rem;
				}
				li:last-child{
					margin-right: 0;
				}
				.speLi{
					color: #E50F72;
					.spePel{
						color: #E50F72;
					}
				}
			}
				.spePel{
					margin-top: .10rem;
					font-size: .22rem;
					color: #777;
				}
			}
			.isFixedSpe{
				position: fixed;
				top: .96rem;
				z-index: 999;
				width: 100%;
				left: 0;
				overflow-x: auto;
				top: 0.8rem;
				ul{
					margin-left: -1.60rem;
				}
			}
		}
		.isFixed{
			position: fixed;
			width: 100%;
			z-index: 999;
			left: 0;
			top: 0;
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
					font-size: 0;
					.listItem{
						font-size: .30rem;
						line-height: .64rem;
						margin: 0 .15rem;
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
		.benefit{
			/*margin-bottom: .10rem;*/
			padding: 0.20rem 0 0;
			width: 100%;
			background: #fff;
			ul{
				width: 100%;
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
					overflow: hidden;
					width: 20%;
					span{
						color: #666666;
						display: block;
					}
					p{
						width: 100%;
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
		}
		.banner{
			padding: 0 .20rem;
			background: #fff;
			.bannerImg{
				margin-bottom: .20rem;
				width: 100%;
				
				img{
					display: block;
					width: 100%;
				}
			}
			.bannerImg:last-child{
				margin-bottom: 0;
			}
		}
		.tuijian{
			font-size: .34rem;
			color: #333;
			line-height: 1.16rem;
			background: #fff;
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
		.newTry{
			padding-bottom: .10rem;
			margin-bottom: .20rem;
			background: #fff;
			.tryImg{
				height: 2.98rem;
				padding: 0 .20rem .20rem;
				img{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		
			
		}
		.pointGoods{
			background: #fff;
			margin-bottom: .20rem;
			.topTime{
				
				font-size: .30rem;
				
			}
		}
		.newGoods{
			overflow-y: hidden;
			width: 100%;
			height: 3.34rem;
			.lunGoods{
				font-size: 0rem;
				padding-bottom: .20rem;
				
				overflow-x: auto;
				overflow-y: hidden;
				white-space: nowrap;	
				
				.topImg{
					display: inline-block;
					font-size: .24rem;
					vertical-align: top;
					
					margin-right: .20rem;
					
					.topImgSon{
						position: relative;
						width: 2.00rem;
						height: 1.80rem;
						
						.tagImgTop{
							height: 1.14rem;
							position: absolute;
							width: 100%;
							top: 50%;
							margin-top: -0.57rem;
						}
						.tryOut{
							position: absolute;
							left: 50%;
							margin-left: -.75rem;
							
							top: 50%;
							margin-top: -.75rem;
							width: 1.50rem;
							height: 1.50rem;
						}
						.lookMore{
							display: block;
							width: 100%;
							height: .78rem;
							position: relative;
							i{
								position: absolute;
								left: 50%;
								color: #333;
								font-size: .26rem;
								margin-left: -.67rem;
								font-style: normal;
								
								display: block;
								width: 1.34rem;
								text-align: center;
								border-bottom: .01rem solid #777;
								line-height: .62rem;
							}
						}
						.moreImg{
							width: 100%;
							height: .30rem;
							margin-top: .14rem;
							position: relative;
							img{
								position: absolute;
								left: 50%;
								margin-left: -.15rem;
								display: block;
								width: .30rem;
								height: 100%;
							}
						}
						img{
							display: block;
							width: 100%;
							height: 100%;
						}
					}
					.descript{
						width: 2.00rem;
						
						line-height: .36rem;
						white-space: initial;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					
				}
				.topImg:first-child{
					margin-left: .20rem;
				}
				
			}
		}
		.specialMoreGoods{
			margin-top: -.30rem;
		}
		.moreGoodsTry{
			background: #fff;
			margin-bottom: .20rem;
			padding: 0.30rem .20rem .24rem;
			.moreGoodsImg{
				width: 100%;
				height: 2.80rem;
				position: relative;
				border-radius: .06rem;
				.tryOut{
					position: absolute;
					left: 50%;
					margin-left: -.75rem;
					
					top: 50%;
					margin-top: -.75rem;
					width: 1.50rem;
					height: 1.50rem;
				}
				img{
					display: block;
					width: 100%;
					height:100%;
					border-radius: .06rem;
				}
			}
			.moreGoodsName{
				margin-top: .12rem;
				width: 100%;
				line-height: .34rem;
				color: #333;
				overflow: hidden;
				font-size: .26rem;
				max-height: .68rem;
				
			}
			.moreGoodsNameSpe{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.moreGoodsDes{
				font-size: .24rem;
				color: #777777;
				line-height: .48rem;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.moreGoodsPrice{
				color: #777;
				font-size: .24rem;
				display: flex;
				display: -moz-flex;
				display:-webkit-box;
			    display: -moz-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
				-webkit-justify-content:space-between;
				justify-content:space-between;
				-moz-box-pack:space-between;
				-webkit--moz-box-pack:space-between;
				
				margin-top: .14rem;
				
				p{
					line-height: .24rem;
					vertical-align: text-bottom;
					span{
						font-size: .34rem;
						color: #E5006E;
					}
				}
				
			}
		}
		
		.timeTryGoods{
			background: #fff;
			.tryGoodsDetail{
				position: relative;
				padding: .10rem .30rem .20rem .10rem;
				border-bottom: 0.01rem solid #E1E1E1;
				display: flex;
				display: -moz-flex;
				display:-webkit-box;
			    display: -moz-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
			    .goodsImg{
			    	width: 2.50rem;
			    	height: 2.50rem;
			    	position: relative;
			    	.goods-img{
			    		display: block;
			    		width: 100%;
			    		height: 100%;
			    	}
			    	.tryOut{
			    		position: absolute;
			    		left: 50%;
			    		margin-left: -.75rem;
			    		top: 50%;
			    		margin-top: -.75rem;
			    		display: block;
			    		width: 1.50rem;
			    		height: 1.50rem;
			    	}
			    }
			    .goods-detail{
			    	-webkit-box-flex: 1;  
				    -moz-box-flex: 1;                
				    -webkit-flex: 1;      
				    -ms-flex: 1;           
				    flex: 1;
				    padding-top: .18rem;
			    	padding-left: .22rem;
			    	.goodsName{
			    		font-size: .28rem;
			    		line-height: .36rem;
			    		height: .72rem;
			    		overflow: hidden;
			    		color: #333;
			    	}
			    	.goodsNum{
			    		font-size: .24rem;
			    		margin-top: .32rem;
			    		display: flex;
			    		justify-content: space-between;
			    		.progress{
			    			width: 2.98rem;
			    			height: .28rem;
			    			position: relative;
			    			border: .01rem solid #E50F72;
			    			background: #FC89B2;
			    			overflow: hidden;
			    			border-radius: .30rem;
			    			.num{
			    				position: absolute;
			    				left: 0;
			    				top: 0;
			    				width: 100%;
			    				height: .30rem;
			    				z-index: 333;
			    				color: #fff;
			    				line-height: .30rem;
			    				text-align: center;
			    				font-size: .20rem;
			    			}
			    			.porNum{
			    				position: absolute;
			    				left: 0;
			    				top: 0;
			    				height: 100%;
			    				z-index: 222;
			    				width: 60%;
			    				
			    				background: #E50F72;
			    			}
			    		}
			    		.uesNum{
			    			color: #E50F72;
			    			height: .30rem;
			    			line-height: .30rem;
			    		}
			    	}
			    	.dayTomorrow{
			    		margin-top: .32rem;
			    		font-size: .24rem;
			    		color: #E50F72;
			    	}
			    	.goodsMoney{
			    		margin-top: .52rem;
			    		font-size: .24rem;
			    		color: #333;
			    		span{
			    			color: #E50F72;
			    		}
			    	}
			    }
			}
			.tryGoodsDetail:last-child{
				border-bottom: none;
			}
			.getGoods{
				position: absolute;
				right: .30rem;
				bottom: .28rem;
				width: 1.30rem;
				height: .56rem;
				display: flex;
				justify-content: center;
				align-items:center;
				text-align: center;
				background: #E50F72;
				color: #FFF;
				font-size: 0;
				border-radius: .06rem;
				span{
					font-size: .24rem;
					line-height: .56rem;
					display: inline-block;
				}
				img{
					margin-left: .10rem;
					display: inline-block;
					vertical-align: middle;
					
					width: .14rem;
					height: .24rem;
				}
			}
		}
		.getBottom{
			position: fixed;
			border-top: 0.01rem solid #e1e1e1;
			bottom: 0;
			left: 0;
			background: #f7f7f7;
			height: .85rem;
			padding-top: .15rem;
			width: 100%;
			z-index: 99999;
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
					/*padding-top: .04rem;*/
					line-height: .26rem;
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
		.avtiveBack{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			min-height: 100%;
			z-index: 99999;
			background: rgba(0,0,0,.5);
			
			.avtiveTop{
				position: fixed;
				left: 50%;
				margin-left: -3.75rem;
				width: 7.50rem;
				top: 50%;
				margin-top: -2.5rem;
				min-height: 5.00rem;
				
				
				.avtiveIMg{
					position: absolute;
					padding: 0 .10rem;
					min-width: 7.30rem;
					display: flex;
					display:-webkit-box;
				    display: -moz-box;
				    display: -ms-flexbox;
				    display: -webkit-flex;
				    display: -moz-flex;
				    margin: 0 auto;
				    -webkit-justify-content:center;
					justify-content:center;
					-moz-box-pack:center;
					-webkit--moz-box-pack:center;
					box-pack:center;
					-webkit-box-pack: center;
				    -moz-box-pack: center;
				    -ms-flex-align:center;
				    -webkit-align-items: center;
				    -moz-align-items: center;
				    align-items: center;
					left: 0;
					top: 0;
					img{
						display: block;
						max-width: 7.30rem;
					}
					p{
						position: absolute;
						right: 1.20rem;
						top: -.80rem;
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
		}
	}

</style>