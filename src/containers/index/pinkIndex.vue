<template>
	<div class="index">
		<!--<Linking></Linking>-->
		<!--<div class="search" @click="getSearch">
			<div class="searchIcon"></div>
		</div>
		<div class="topmodel">
			<div class="list">
				<p class="listItem" v-bind:class="{ 'specialList': addSelect}" style="margin-left: .30rem;" @click="getFist">特卖</p>
				<p class="listItem" v-show="memberlevel" v-bind:class="{ 'specialList': addSelectOne}" @click="getFistOne">试用</p>
				<p class="listItem" v-bind:class="{ 'specialList': addSelectTwo}"  @click="getFistTwo">拼团</p>
				<p class="listItem" v-bind:class="{ 'specialList': index==addIndex}" v-for="(itemSon,index) in cateObj" @click='getDetailNex(index,itemSon.catId)'>{{itemSon.name}}</p>
				
			</div>
		</div>-->
		<div class="indexTop">
			<ul>
				<li @click="getTryIndex">试用</li>
				<li class="speLiFind">特卖</li>
				
				<li @click="getFindeIndex">发现</li>
			</ul>
		</div>
		<div class="searchIndex" @click="getSearch">
			<div class="searchBox">
				<img :src="seachFindShare" />
				<input :placeholder="searchRemind" disabled />
			</div>
		</div>
		<div v-show="detailShow">
			
			<swiper loop auto :list="urlList" height='3.34rem'  dots-position='center' v-show="urlList.length!=0" @click="getImg()"></swiper>
			<!--<Swiper :aspect-ratio="9/16" loop auto  dots-position='center' ref="swiper" >
		      <swiper-item style="overflow: hidden; height: 100%;" class="swiper-demo-img" v-for="(itemsSon, index) in urlList" :key="index"><img style="width: 100%;" :src="itemsSon.img">
		      </swiper-item>
		      
		    </Swiper>-->
			<!--<div class="benefit" v-show="iconObj.length>0">
				<ul>
					<li v-for="items in iconObj" @click='goMoreIndex(items.link,items.type)'>
						<p><img :src="items.iconImage"/></p>
						<span>{{items.name}}</span>
					</li>
					
				</ul>
			</div>-->
			<div style="width: 100%;height: .10rem;background: #f7f7f7;" v-show="headlinesLength>0 || showBottom"></div>
			<div class="topNew" v-show="headlinesLength>0" @click="getTopNew">
				<swiper loop auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
			      <swiper-item v-for="item in imgObj.headlines"><p>{{item.title}}</p></swiper-item>
			     
			    </swiper>
			    <div class="newImg">
			    	<img :src="wordImg" />
			    </div>
			</div>
			
			<div class="bannerImg" v-show="showBottom" v-for="(item,index) in imgObj.advers"  @click="getAdvers(item.url)">
				<img v-lazy="item.image"/>
				<p class="specialZhe"></p>
			</div>
			<div class="dayTomorrow"  :class="searchBarFixed == true ? 'speDayTomorrow' :''">
				<span @click="chooseDay" v-bind:class="{ 'chooseDay': dayTrue==true}">今日特卖</span>
				<span style="color: #333; text-align: center;margin: 0 .15rem;"> | </span>
				<span @click="chooseHotSale" v-bind:class="{ 'chooseDay': hotSaleTrue==true}">热门特卖</span>
				<span style="color: #333; text-align: center;margin: 0 .15rem;"> | </span>
				<span @click="chooseTomorrow" v-bind:class="{ 'chooseDay': tomorrowTrue==true}">明日预告</span>
				
			</div>
			<div class="cent">
				<div class="hotSale" v-for='item in todayObj'>
					<div class="hotProduct">
						<div @click="goBuy(item.productId)">
							
							<div style="position: relative;">
								<img v-lazy="item.productImage"/>
								<p class="specialZhe"></p>
							</div>
							
							<p class="top">{{item.productName}}</p>
							<p class="describe">{{item.summary}}</p>
							<p class="productMoney">￥{{item.price}}
								<i style="font-style: normal; color: #AAAAAA;font-size:.24rem;text-decoration:line-through">{{item.marketPrice}}</i> <span v-show="memberlevel" style="color: #e5006e;font-size: .26rem;">{{item.score}}</span>
							</p>
							<!--<p class="botMoney">
								<span class="left">OL圈价：￥{{item.marketPrice}}</span>
								<span class="right" >{{item.score}}</span>
							</p>-->
							<div class="buyGoods" v-show="!memberlevel">立即购买</div>
						</div>
						<div class="getassess" v-show="memberlevel" @click="getassess(item.productId)" style="right: .98rem;" >
							<img :src="productComment02"/>
						</div>
						<div class="getassess" v-show="memberlevel" @click="goBuy(item.productId)" style="right: .30rem;">
							<img :src="productShare01"/>
						</div>
						
					</div>
				</div>
			</div>
			
			<!--<div class="tuijian" v-show="hotObj.length>0 && getSale" style="margin-top: -.20rem;">
				<img :src="xianImgone"/>
					热门特卖
				<img :src="xianImgone"/>
			</div>-->
			
			
		</div>
		<!--<div class="tuijian" v-show="hotObj.length>0 && getHotSale"  style="background: #f7f7f7;margin-top: -.20rem;">
			<img :src="xianImgone"/>
				更多特卖
			<img :src="xianImgone"/>
		</div>
		<div class="cent">
				<div class="hotSale" v-for='item in moreSaleObj'>
					<div class="hotProduct">
						<div @click="goBuy(item.productId)">
							<div style="height: 3.34rem;overflow: hidden; position: relative;">
								<img v-lazy="item.productImage"/>
								<p class="specialZhe"></p>
							</div>
							<p class="top">{{item.productName}}</p>
							<p class="describe">{{item.summary}}</p>
							<p class="productMoney">￥{{item.price}}
								<i v-show="memberlevel" style="font-style: normal; color: gray;"> / </i><span v-show="memberlevel" style="color: #e5006e;">{{item.score}}</span>
							</p>
							
							<div class="buyGoods" v-show="!memberlevel">立即购买</div>
						</div>
						
						<div class="getassess" v-show="memberlevel" @click="getassess(item.productId)" style="right: .98rem;" >
							<img :src="productComment02"/>
						</div>
						<div class="getassess" v-show="memberlevel" @click="goBuy(item.productId)" style="right: .30rem;">
							<img :src="productShare01"/>
						</div>
					</div>
				</div>
			</div>-->
			<div class="noMore" v-show="showMoreNone">—— &nbsp;松开切换到下一场次 &nbsp; ——</div>
		<!--<div class="moreSale">
			<div class="saleProduct" v-for="(item,index) in moreSaleObj">
				<div class="productDetail" @click="goBuy(item.productId)">
					<div class="productImg">
						<div class="proImg">
							<img :src="item.productImage" />
						</div>
					</div>
					<div class="productName">
						<div class="pro_name">
							{{item.productName}}
						</div>
						<div class="pro_money">
							<span>￥{{item.price}}</span>
							<i v-show="memberlevel" style="font-style: normal; color: gray;"> / </i>
							<span v-show="memberlevel" style="color: #E5006E;">{{item.score}}</span>
						</div>
					</div>
				</div>
				<div v-show="!memberlevel" class="goBuyGoods">立即购买</div>
				<img class="getassess" v-show="memberlevel" style="right: .98rem;" :src="productComment02" @click="getassess(item.productId)"/>
				<img class="getassess" v-show="memberlevel" style="right: .30rem;" :src="productShare01" @click="goBuy(item.productId)"/>
			</div>
		</div>-->
		<div class="getBottom">
			<div class="getIndex">
				<div class="top">
					<img :src="index01Img" />
				</div>
				<div class="bot" style="color: #000;">特卖</div>
			</div>
			<div class="getIndex" @click="getShangcheng">
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
		<div class="goFortop" v-show="showTop" @click="gotoTop">
			<img :src="goTopImg"/>
		</div>
	</div>
  
</template>

<script>
import { Swiper, SwiperItem} from 'vux'
import $ from 'jquery';
import axios from 'axios'

var time;
var timeNew;


export default {
	
	data : function(){
			return{
				addSelect:true,
				addSelectOne:false,
				showBottom:false,
				dayTrue:true,
				tomorrowTrue:false,
				hotSaleTrue:false,
				addSelectTwo:false,
				searchBarFixed:false,
				isGetTomorrow:false,
				addIndex:null,
				wordImg:'/static/images/word.png',
				productComment:'/static/images/producComment.png',
				productShare:'/static/images/productShare.png',
				productComment02:'/static/images/producComment02.png',
				productShare01:'/static/images/productShare01.png',
				gopinjiaImg:'/static/images/getassess.png',
				index01Img:'/static/images/icon-index02.png',
				cartImg:'/static/images/icon-cart.png',
				seachFindShare:'/static/images/seachFind.png',
				find1Img:'/static/images/shangcheng.png',
				serviceImg:'/static/images/icon-service.png',
				myImg:'/static/images/icon-my.png',
				chaIconImg:'/static/images/chaIcon.png',
				xianImgone:'/static/images/xian.png',
				colseIcon:'/static/images/colseIcon.png',
				goodsImg:'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/cca6d92c415c41028ed89bda3e681c66340f4a63',
				detailShow:true,
				shareData : {
					'title':"OL圈特卖",
					'description':"你那么好看，这个分享一定要看!",
					'url': "",
					'picURL': "https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/aaa.png",
					'hide':true,
					'share':false
				},
				cateObj:[],
				iconObj:[],
				urlList:[],
				imgObj:[],
				hotObj:[],
				todayObj:[],
				tomorrowObj:[],
				tomorrowLength:0,
				todayLength:0,
				moreSaleObj:[],
				dayType:0,
				listTrue:false,
				isMore:true,
				pageObj:{
					page:1,
				},
				cartNum:0,
				headlinesLength:0,
				avtiveObj:[],
				avtiveUrl:0,
				showActive:false,
				memberlevel:false,
				getSale:false,
				isGetSale:true,
				isGetHotSale:false,
				getHotSale:false,
				moreHotSale:false,
				noMoreGoods:false,
				goTopImg:'/static/images/goTop.png',
				showTop:false,
				scrollTopN:'',
				windowHeightN:'',
				scrollHeightN:'',
				scrollTopMore:'',
				isHotMore:true,
				todayOrTom:1,
				isHotOrday:1,
				showMoreNone:false,
				searchRemind:'',
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
  			if(this.$route.query.memberId=='undefined'){
				this.$route.query.memberId='';
			}
			this.addRecord();
			this.$store.commit('documentTitle','OL圈');
			this.getMember();
			this.getSearchRemind();
			this.shareDate();
//			this.getCategory();
			this.getImgtop();
//			this.getIcon();
			
			this.getDaySale(1);
			//this.getMoreSale();
			this.getcartNum();
			this.getActiveImg();
			
		},
  mounted(){
  			window.addEventListener('scroll', this.hotSaleScroll);
  			window.addEventListener('scroll', this.moreSaleScroll);
  			window.addEventListener('scroll', this.getTopScroll);
			window.addEventListener('scroll', this.handleScroll);
			window.addEventListener('scroll', this.xuanfuScroll);
//			window.addEventListener('scroll', this.newFunction);
		},
		wacth:{
			
			
   
		},
  methods: {
  			//访问记录
  			addRecord(){
  				let data = {
  					terminalType:5,
  					pageuri:'index/pinkIndex'
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,data,this.addRecordBack,this);
  			},
  			addRecordBack(data){},
			 //获取搜索提示关键字
		    getSearchRemind(){
		    	
				let data={
//					memberId:this.$route.query.memberId,
					type:2,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getSearchRemind,data,this.getSearchRemindBack,this);
		    },
		    getSearchRemindBack(data){
		    	if(data.result!='无' && data.result!=''){
		    		this.searchRemind='大家都在搜“'+data.result+'”';
		    		
		    	}else{
		    		this.searchRemind=''
		    	}
		    },
		   
			//点击回到顶部
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
			//获取会员信息
			getMember(){
				let data={
//					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				this.memberScore=data.result.score;
				
				if(data.result.isGetStoreCommission==1){
					this.memberlevel=true;
				}else{
					this.memberlevel=false;
				}
				this.setCookie('memberId',data.result.id)
//				console.log(this.getCookie("memberId"))
				//console.log(this.memberlevel)
			},
			shareDate(){
				this.shareData.url="https://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/pinkIndex');
				//this.shareData.url="https://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/pinkIndex');
				
//				console.log(this.shareData)
				this.addWeixinShare();//微信分享 
			},
  			//获取首页顶部分类
  			getCategory(){
  				let data={};
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getCategory,data,this.getCategoryBack);
  				
  			},
  			getCategoryBack(data){
//				console.log(data)
  				this.cateObj=data.result;
  				localStorage.setItem('cateGory',JSON.stringify(this.cateObj))
  				
  			},
  			//获取首页ICON
//			getIcon() {
//		        axios.get(API_HOST+'mobile/product/icon/list',{
//		          params:{}
//		        }).then(res =>{
//		           this.iconObj = res.data.result;
//		           //console.log(this.iconObj)
//			    }).catch(
//		          (error) => {
//		    	      this.$toast(res.data.message);
//		          }
//		        )
//		    },
		    getFindeIndex(){
		    	//window.location.href=CUR_URLBACK+'index/findIndex';
		    	window.location.href=CUR_URLBACK+'index/newFindIndex';
		    },
		    getTryIndex(){
				window.location.href=CUR_URLBACK+'try/newCenter';
			},
  			//点击首页
  			getFist(){
  				//this.$router.push({path:'/index/pinkIndex?memberId='+this.$route.query.memberId});
  				window.location.href=CUR_URLBACK+'index/pinkIndex';
  			},
  			//点击试用
  			getFistOne(){
  				//this.$router.push({path:'/try/moretry?memberId='+this.$route.query.memberId});
  				//window.location.href=CUR_URLBACK+'try/moretry?memberId='+this.$route.query.memberId
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
  			//点击...详情
  			goMoreIndex(id,type){
//				console.log(type)
  				if(type==18 || type==19 || type==20 || type==21 || type==22 || type==23 || type==25 || type==26  || type==28){
  					if(id!=""){
						if(id.indexOf("?")!=-1){
							console.log("YES")
							window.location.href=USE_URL+id;
						}else{
							console.log("no")
							window.location.href=USE_URL+id;
						}
					}
  				}else if(type==29){
  					console.log(11)
  				}else{
  					if(id!=""){
						if(id.indexOf("?")!=-1){
							console.log("YES")
							window.location.href=id;
						}else{
							console.log("no")
							window.location.href=id;
						}
					}
  				}
  				
  			},
  			//点击广告
  			getAdvers(id){
  				
  				
				if(id!="" && id!="#"){
					if(id.indexOf("?")!=-1){
						console.log("YES")
						window.location.href=id;
					}else{
						console.log("no")
						window.location.href=id;
					}
				}else{
					console.log(1)
				}
  			},
  			//获取轮播图广告图
  			getImgtop(){
				let data={
//					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.advers,data,this.getImgBack);
			},
			getImgBack(data){
				
				if(data.result.advers.length>0){
					this.showBottom=true;
				}else{
					this.showBottom=false;
				}
				if(data.result){
					this.imgObj=data.result;
				}else{
					this.imgObj=[];
				}
				this.headlinesLength=data.result.headlines.length;
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
//				console.log(this.urlList)
//				console.log(data)
			},
			//获取热门特卖
			gethotSale(){
				let data={
//					memberId:this.$route.query.memberId,
					page:1,
					rows:10,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.recommendProduct,data,this.gethotSaleBack);
			},
			gethotSaleBack(data){
//				console.log(data)
					
				this.todayObj=data.result;
				this.getSale=true;
		  		this.isGetSale=false;
		  		this.getHotSale=true;
		  		this.isGetHotSale=true;
		  		
//		  		this.isMore=true;
				//console.log(this.hotObj.length)
			},
  			//点击购买商品
  			goBuy(id){
  				//window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id+'&memberId='+this.$route.query.memberId
  				//window.location.href=CUR_URLBACK+'index/goodsDetali/id/'+id+'?memberId='+this.$route.query.memberId'&isLimit=0'
				//this.$router.push({path:'/demo/iscroll/id/'+id+'?isShare=0&memberId='+this.$route.query.memberId});
				this.$router.push({path:'/demo/iscroll/id/'+id+'?isShare=0&type=9'});
  			},
  			//获取今天特卖
  			getDaySale(id){
  				this.dayType=id;
  				let data={
//					memberId:this.$route.query.memberId,
					type:id,
					page:1,
  					rows:10,
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.timeProduct,data,this.getDaySaleBack);
  			},
  			getDaySaleBack(data){
  				//console.log(this.dayType)
  				this.todayObj=data.result;
  				
  				
  			},
  			//获取首页弹窗图标
  			getActiveImg(){
  				
  				let data ={
//					memberId:this.$route.query.memberId,
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getDialog,data,this.getActiveImgBack);
  			},
  			getActiveImgBack(data){
//				console.log(data)
  				if(data.result.length>0){
  					this.showActive=true;
  				}else{
  					this.showActive=false;
  				}
  				for(let i=0;i<data.result.length;i++){
  					this.$set(data.result[i],'selectM',true);
  				}
  				this.avtiveObj=data.result;
  				
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
//					memberId:this.$route.query.memberId,
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
  			//今日特卖
  			chooseDay(){
  				this.showMoreNone=false;
  				this.isHotOrday=1;
  				this.isHotMore=true;
  				this.pageObj.page=1;
  				this.todayOrTom=1;
  				this.dayTrue=true;
  				this.tomorrowTrue=false;
  				this.hotSaleTrue=false;
  				this.getDaySale(1);
  				if(this.searchBarFixed){
					$('html,body').animate({scrollTop:document.querySelector('.cent').offsetTop-50},1000);
				}
  				
  			},
  			//明日预告
  			chooseTomorrow(){
  				clearInterval(time);
  				this.showMoreNone=false;
  				this.isHotOrday=1;
  				this.isHotMore=true;
  				this.pageObj.page=1;
  				this.todayOrTom=2;
  				this.dayTrue=false;
  				this.tomorrowTrue=true;
  				this.hotSaleTrue=false;
  				this.getDaySale(2);
  				if(this.searchBarFixed ){
  					document.documentElement.scrollTop = document.body.scrollTop = document.querySelector('.cent').offsetTop-50;
  				}
  				
  			},
  			chooseHotSale(){
  				clearInterval(time);
  				this.showMoreNone=false;
  				this.isHotOrday=0;
  				this.isHotMore=true;
  				this.pageObj.page=1;
  				this.isGetTomorrow=false;
  				this.dayTrue=false;
  				this.tomorrowTrue=false;
  				this.hotSaleTrue=true;
  				this.gethotSale();
  				if(this.searchBarFixed ){
					$('html,body').animate({scrollTop:document.querySelector('.cent').offsetTop-50},1000);
				}
  				
  				
  			},
  			//悬浮 
  			xuanfuScroll(){
  				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				
				let offsetTop = document.querySelector('.dayTomorrow').offsetTop;
//				console.log(offsetTop)
				if(scrollTop > offsetTop){
					this.searchBarFixed = true;
					
				}else{
					this.searchBarFixed = false;
				}
				if(scrollTop<237){
					this.searchBarFixed = false;
				}
  			},
  			//获取更多特卖
  			getMoreSale(){
  				let data={
//					memberId:this.$route.query.memberId,
					page:1,
  					rows:10,
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.moreProduct,data,this.getMoreSaleBack);
  			},
  			getMoreSaleBack(data){
  				this.moreSaleObj=data.result;
  				this.moreHotSale=true;
  				
  			},
  			//获取购物车产品数量
			getcartNum(){
				let data={
//					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.totalNum,data,this.getcartNumBack);
			},
			getcartNumBack(data){
//				console.log(data)
				this.cartNum=data.result;
			},
  			//点击去评价
			getassess(id){
				window.location.href=USE_URL+'ol/commentList.html?productId='+id;
			},
  			//跳转购物车
			getIndex(){
				window.location.href=CUR_URLBACK+'shopcar/ordercar';
			},
			getShangcheng(){
				window.location.href=USE_URL+'weixin/product/productCategoryDetail?pcatId=33';
			},
			//点击客服
			getkefu(){
				window.location.href='https://kefu.easemob.com/webim/im.html?tenantId=40231&ticket=false';	
			},
			//点击头条
  			getTopNew(){
  				window.location.href=USE_URL+'weixin/headline/headline';
  			},
  			getSearch(){
  				window.location.href=USE_URL+'ol/weixin/index/search';
  			},
			getMindIndex(){
				window.location.href=USE_URL+'weixin/member/membercore';
			},
			//加载热门特卖
//			hotSaleScroll(){
//				
//			  var height=document.body.scrollHeight;
//				//console.log(height)
////			  this.offsetTop = document.querySelector('.topmodel').offsetTop;
////				console.log(this.offsetTop)
//			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//				//console.log(this.scrollTop)
//				
//				
//			  var windowH=window.innerHeight;
//			   	if(this.scrollTop + windowH >=height-200){
//			   		if(this.isGetSale){
//			   			this.isGetSale=false;
//			   			this.gethotSale();
//		  			}
//		  			
//				}
//		  	
//			},
//			//第一次加载更多热卖
//			moreSaleScroll(){
//				
//			  var height=document.body.scrollHeight;
//				//console.log(height)
////			  this.offsetTop = document.querySelector('.topmodel').offsetTop;
////				console.log(this.offsetTop)
//			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//				//console.log(this.scrollTop)
//				
//				
//			  var windowH=window.innerHeight;
//			  if(this.scrollTop + windowH >=height-200){
//			   		if(this.isGetHotSale){
//				   		this.isGetHotSale=false;
//				   		this.getMoreSale();
//				   	}
//		  		}
//			   	
//		  	},
//			//加载更多
			handleScroll () {
			  var height=document.body.scrollHeight;
//				console.log(height)
//			  this.offsetTop = document.querySelector('.topmodel').offsetTop;
//				console.log(this.offsetTop)
			  this.scrollTopMore = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(this.scrollTop)
				
				
			  var windowH=window.innerHeight;
//			   	console.log(this.scrollTopMore + windowH >=height-500)
		   		if(this.scrollTopMore + windowH >=height-5){
	  			    if(this.isHotOrday){
	  			    	if(this.isHotMore){
	  			    		this.isHotMore=false;
	  			    		let data={
//								memberId:this.$route.query.memberId,
								type:this.todayOrTom,
								page:this.pageObj.page+1,
			  					rows:10,
								
							}
	  			    		this.pageObj.page=this.pageObj.page+1
							this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.timeProduct,data,this.getListMoreBack);
	  			    	}
	  			    }else{
	  			    	if(this.isHotMore){
			 				this.isHotMore=false;
			 				let data={
//			 					memberId:this.$route.query.memberId,
			  					page:this.pageObj.page+1,
			  					rows:10,
			  					
			  				};
			  				this.pageObj.page=this.pageObj.page+1
							this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.recommendProduct,data,this.getListMoreBack);
			 			}
	  			    }
				  	
				}
			   	
		  	},
			getListMoreBack(data){
				let This=this;
				if(data.result.length==0){
					this.isHotMore=false;
					this.showMoreNone=true;
					if(this.todayOrTom==1 && this.dayTrue){
						console.log(1)
						time=setTimeout(function(){
							This.chooseHotSale();
						},4000)
					}
					if(this.hotSaleTrue){
						time=setTimeout(function(){
							This.chooseTomorrow();
						},4000)
					}
				}else{
					this.isHotMore=true;
				}
				for(let i=0; i<data.result.length; i++){
					this.todayObj.push(data.result[i])
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
 		window.removeEventListener('scroll', this.hotSaleScroll)
 		window.removeEventListener('scroll', this.moreSaleScroll)
 		window.removeEventListener('scroll', this.xuanfuScroll)
 		window.removeEventListener('scroll', this.getTopScroll)
	    window.removeEventListener('scroll', this.handleScroll)
//	    window.removeEventListener('scroll', this.newFunction);
	   
	},
 	
  
}
</script>

<style lang="scss" scoped>

.index{
	background: #f7f7f7;
	padding-bottom: 1.00rem;
	padding-top: .80rem;
	img{
		pointer-events: none;
	}
	.indexTop{
		z-index: 998;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
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
	.searchIndex{
		padding: 0.1rem 0.3rem;
		background: #fff;
		.searchBox{
			width: 100%;
			height: .60rem;
			background: #EFEDED;
			border-radius: .30rem;
		    font-size: .24rem;
		    overflow: hidden;
            color: #999;
			display: flex;
		    display: -ms-flexbox;
		    display: -moz-flex;
		    -ms-flex-pack: start;
		    justify-content: flex-start;
		    -moz-box-pack: flex-start;
		    -webkit--moz-box-pack: flex-start;
		    -webkit-box-pack: center;
		    -moz-box-pack: center;
		    -ms-flex-align: center;
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
				    -ms-flex: 1;
				    flex: 1;
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
	.text-scroll {
	  
	}
	.text-scroll p{
	  font-size: 12px;
	  
	  line-height: 30px;
	}
	.topNew{
		position: relative;
		overflow: hidden;
		background: #fff;
		margin-bottom: .10rem;
		padding-left: 1.2rem;
		.newImg{
			position: absolute;
			left: .20rem;
			top: 50%;
			margin-top: -.15rem;
			width: .61rem;
			height: .30rem;
			img{
				display: block;
				width: 100%;
				padding-right: .20rem;
				border-right: 0.01rem solid #e1e1e1;
			}
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
		.benefitSpecial{
			margin-bottom: .40rem;
		}
	.bannerImg{
		padding: .20rem .20rem 0;
		background: #fff;
		position: relative;
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
	}
	.dayTomorrow{
		font-size: .30rem;
		line-height: 1.00rem;
		text-align: center;
		color: #777;
		.chooseDay{
			color: #E50F72;
			display: inline-block;
			height: .75rem;
			border-bottom:  0.03rem solid #E50F72;
		}
	}
	.speDayTomorrow{
		position: fixed;
		left: 0;
		top: 0rem;
		z-index: 9999;
		width: 100%;
		background: #fff;
	}
	.tuijian{
		font-size: .30rem;
		background: #f7f7f7;
		color: #333;
		line-height: 1.00rem;
		
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
	.moreSale{
		background: #fff;
		
		border-bottom: 0.01rem solid #e1e1e1;
		padding: 0 .15rem;
		.saleProduct{
			border-bottom: 0.01rem solid #e1e1e1;
			position: relative;
			height: 100%;
			.goBuyGoods{
				width: 1.20rem;
			 	height: .46rem;
			 	z-index: 15;
			 	border:0.01rem solid #fa006a;
			 	border-radius: 0.05rem;
			 	text-align: center;
			 	line-height: .48rem;
			 	color: #fa006a;
			 	font-size: .26rem;
			 	position: absolute;
			 	right: 0.15rem;
			 	bottom: 0.25rem;
			 	background: #fff;
			}
			.getassess{
				display: block;
				width: .32rem;
				/*height: .32rem;*/
				position: absolute;
				bottom: 0.32rem;
				right: .48rem;
				z-index: 9998;
			}
			.productDetail{
				display: flex;
				display:-webkit-box;
				display: -webkit-flex;
				display: -moz-box;
				display: -moz-flex;
				display: -ms-flexbox;
				-webkit-justify-content:flex-start;
				justify-content:flex-start;
				-moz-box-pack:flex-start;
				-webkit--moz-box-pack:flex-start;
				box-pack:flex-start;
				.productImg{
					width: 2.58rem;
					height: 2.58rem;
					
					display: flex;
					display:-webkit-box;
					display: -webkit-flex;
					display: -moz-box;
					display: -moz-flex;
					display: -ms-flexbox;
					-webkit-justify-content:center;
					justify-content:center;
					-moz-box-pack:center;
					-webkit--moz-box-pack:center;
					box-pack:flex-start;
					-webkit-box-pack: center;
				    -moz-box-pack: center;
				    -ms-flex-align:center;/* IE 10 */
				    -webkit-align-items: center;
				    -moz-align-items: center;
				    align-items: center;
					.proImg{
						width: 2.1rem;
						height: 2.1rem;
						
						overflow: hidden;
						img{
							display: block;
							width: 100%;
						}
					}
				}
				
				.productName{
					webkit-box-flex: 1 ;
				    -moz-box-flex: 1;                
				    -webkit-flex: 1;       
				    -ms-flex: 1 ;            
				    flex: 1;
				    padding-top: .40rem;
				    color: #131313;
				    .pro_name{
				    	font-size: .28rem;
				    	
				    	line-height: .32rem;
				    	height: .64rem;
				    	overflow: hidden;
				    	
				    }
				    .pro_money{
			    		font-size: .26rem;
			    		/*font-weight: 700;*/
			    		margin-top: .92rem;
			    	}
				}
			}
		}
		.saleProduct:last-child{
		
			border-bottom: none;
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
	.cent{
		
		padding: 0rem .20rem;
		
		
		.hotSale{
			width:100%;
			margin-bottom: .20rem;
			border-radius: .12rem;
			box-shadow: 0 0 0.06rem #e9e8e8;
			-moz-box-shadow:0 0 .06rem #e9e8e8;/*firefox*/ 
			-webkit-box-shadow:0 0 .06rem #e9e8e8;/*webkit*/ 
			overflow: hidden;
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
			.hotProduct{
				width: 100%;
				font-size: .28rem;
				padding-bottom: .20rem;
				background: #fff;
				
				
				position: relative;
				.specialZhe{
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					z-index: 22;
					top: 0;
					background: rgba(0,0,0,0);
				}
				.getassess{
					display: block;
					width: .32rem;
					height: .32rem;
					position: absolute;
					bottom: 0.20rem;
					right: .48rem;
					z-index: 9998;
				}
				img{
					display: block;
					width: 100%;
					max-height: 3.34rem;
				}
				.top{
					font-weight: normal;
					font-size: .28rem;
					color: #131313;
					line-height: .42rem;
					padding: 0.14rem .15rem 0;
					
					max-height:.42rem ;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.describe{
					padding: .20rem .15rem 0.10rem;
					/*margin-top: .20rem;*/
					font-size: .22rem;
					color: #777;
					
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.productMoney{
					font-size: .30rem;
					line-height: .32rem; 
					/*font-weight: 700;*/
					padding: .12rem .15rem 0;
					
					position: relative;
					color: #131313;
					z-index: 22;
					line-height: .36rem;
					
				}
				.buyGoods{
					width: 1.20rem;
				 	height: .46rem;
				 	z-index: 15;
				 	border:0.01rem solid #fa006a;
				 	border-radius: 0.05rem;
				 	text-align: center;
				 	line-height: .48rem;
				 	color: #fa006a;
				 	font-size: .26rem;
				 	position: absolute;
				 	right: 0.15rem;
				 	bottom: 0.15rem;
				 	background: #fff;
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
		.hotSale:nth-last-child{
			margin-bottom: 0;
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
	.noMore{
		font-size: .22rem;
		text-align: center;
		color: #CECECE;
		padding-top: .20rem;
		padding-bottom: .40rem;
	}
	
}

</style>