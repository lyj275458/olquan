<template>
	<div class="index">
		<!--<Linking></Linking>-->
		<div class="search" @click="getSearch">
			<div class="searchIcon"></div>
		</div>
		<div class="topmodel">
			
			<div class="list" style="padding-left: .30rem;">
				<p class="listItem" v-show="memberlevel" v-bind:class="{ 'specialList': addSelect}" style="margin-left: 0;" @click="getFist">特卖</p>
				<p class="listItem" v-show="memberlevel" v-bind:class="{ 'specialList': addSelectOne}" @click="getFistOne">试用</p>
				<p class="listItem" v-bind:class="{ 'specialList': addSelectTwo}" @click="getFistTwo">拼团</p>
				<li class="listItem" v-bind:class="{ 'specialList': index==addIndex}" v-for="(itemSon,index) in cateObj" @click='getDetailNex(index,itemSon.catId)'>{{itemSon.name}}</li>
				<!--<Seacrh></Seacrh>-->
			</div>
			
			
		</div>
		<div v-show="detailShow">
			
			<swiper loop auto :list="urlList" height='3.34rem'  dots-position='center' v-show="urlList.length!=0"></swiper>
			<!--<Swiper :aspect-ratio="9/16" loop auto  dots-position='center' ref="swiper" >
		      <swiper-item style="overflow: hidden; height: 100%;" class="swiper-demo-img" v-for="(itemsSon, index) in urlList" :key="index"><img style="width: 100%;" :src="itemsSon.img">
		      </swiper-item>
		    </Swiper>-->
			<div class="benefit" v-show="iconObj.length>0">
				<ul>
					<li v-for="items in iconObj" @click='goMoreIndex(items.link,items.type)'>
						<p><img :src="items.iconImage"/></p>
						<span>{{items.name}}</span>
					</li>
					
				</ul>
			</div>
			<div class="topNew" v-show="headlinesLength>0" @click="getTopNew">
				<swiper loop auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
			      <swiper-item v-for="item in imgObj.headlines"><p>{{item.title}}</p></swiper-item>
			     
			    </swiper>
			    <div class="newImg">
			    	<img :src="wordImg" />
			    </div>
			</div>
			
			<div class="bannerImg" v-for="item in imgObj.advers" @click="getAdvers(item.url)">
				<img v-lazy="item.image">
				<p class="specialZhe"></p>
			</div>
			<div class="havle">
				<p  v-for="item in imgObj.togetherCateries" @click="gofenImg(item.togetherCategoryId,item.type)">
					<span>
						<img :src="item.logo">
					</span>
					
				</p>
				
			</div>
			<div class="tuijian">
				<img :src="xianImgone"/>
					精选推荐
				<img :src="xianImgone"/>
				
			</div>
			<div class="cent">
				<ul class="init" >
				  <li v-for="item in listObj" @click="goBuy(item.togetherId)">
				  	<div class="goodsImg">
				  		<img v-lazy="item.productIndexImage" class="goosImg"/>
				  		<p class="specialZhe"></p>
						<!--<img :src="soldImg"  class="isSold" />-->
					</div>
					<p class="goodsdetail">
						<span class="describe"><i v-show="item.tagName!='' && item.togetherTagType!=1 && item.togetherTagType!=null">【{{item.tagName}}】</i>{{item.productName}}</span>
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
			<div class="tuijian" v-show="listTrue">
				<img :src="xianImgone"/>
					更多精选
				<img :src="xianImgone"/>
				
			</div>
		</div>
		
		<div class="content" v-show="listTrue">
			<ul>
				<li v-for='item in curObj' @click="goBuy(item.togetherId)">
					<div style="padding: 0 .10rem;">
						<div style="background: #fff; padding-bottom: .20rem;">
							<p class="imgTage">
								<img :src='item.tagLogo' v-show="item.togetherTagType!=2"/>
								
							</p>
							<p class="imgDetail">
								<img v-lazy="item.productImage" />
								<p class="specialZhe"></p>
							</p>
							<p class="top"><span v-show="item.tagName!='' && item.togetherTagType!=1">【{{item.tagName}}】</span>{{item.productName}}</p>
							<p style="font-size: .26rem;color: #e5006e;font-weight: 700; padding: 0 .20rem;">￥{{item.price}}
								<span style="color: #b3b3b3;font-size: .24rem;font-weight: normal;" v-show="item.count>0">已拼{{item.count}}件</span>
							</p>
							<p class="botMoney">
								<img v-for="items in item.joinMembers" :src="items.memberLogo" v-show="item.joinMembers.length>0"/>
								<!--<span class="goBuy" v-show="item.joinMembers.length==0">去拼团</span>-->
							</p>
						</div>
						
					</div>
					
				</li>
				<li v-show="showTrue" class="special">没有更多了</li>
			</ul>
		</div>
		<div class="getBottom">
			<div class="getIndex">
				<div class="top">
					<img :src="index01Img" />
				</div>
				<div class="bot" style="color: #000;">首页</div>
			</div>
			<div class="getIndex" @click="getIndex">
				<div class="top">
					<img :src="cartImg" />
				</div>
				<div class="bot">购物车</div>
				<div class="cartNum" v-show="cartNum>0">{{cartNum}}</div>
			</div>
			<div class="getIndex" @click="getFind">
				<div class="top">
					<img :src="findImg" />
				</div>
				<div class="bot">发现</div>
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



export default {
	
	data : function(){
			return{
				imgObj:[],
				urlList:[],
				curObj:{},
				wordImg:'/static/images/word.png',
				index01Img:'/static/images/icon-index02.png',
				cartImg:'/static/images/icon-cart.png',
				findImg:'/static/images/icon-find.png',
				serviceImg:'/static/images/icon-service.png',
				myImg:'/static/images/icon-my.png',
				xianImgone:'/static/images/xian.png',
				colseIcon:'/static/images/colseIcon.png',
				peopleImgone:'/static/images/mametchi1.png',
				peopleImgtwo:'/static/images/mametchi2.png',
				peopleImgthree:'/static/images/mametchi3.png',
				chaIconImg:'/static/images/chaIcon.png',
				indexImg:'/static/images/index.png',
				shiyongImg:'/static/images/shiyong.png',
				zhuanxiangImg:'/static/images/zhuanxiang.png',
				pinpinImg:'/static/images/pinpin.png',
				temaiImg:'/static/images/temai.png',
				goodsImg:'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/cca6d92c415c41028ed89bda3e681c66340f4a63',
				soldImg:'/static/images/soldOut.png',
				clearImg:'/static/images/clearpin.png',
				listObj:[],
				list:[
			          1,
			          2,
          		],
				showTrue:false,
				isMore:true,
				isMoreList:true,
				listTrue:false,
				pageObj:{
					page:1,
				},
				topPage:{
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
				addSelect:false,
				addSelectOne:false,
				addSelectTwo:true,
				addIndex:null,
				detailShow:true,
				isRecommend:0,
				productCategoryId:'',
				togetherCategoryId:'',
				sort:'',
				searchBarFixed:false,
				include: "test-keep-alive",
				offsetTop:0,
				iconObj:[],
				cateObj:[],
				showMember:false,
				cartNum:0,
				headlinesLength:0,
				avtiveObj:[],
				avtiveUrl:0,
				showActive:false,
				goTopImg:'/static/images/goTop.png',
				showTop:false,
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
			this.$store.commit('documentTitle','OL圈');
			this.getMember();
			this.getFirst();
			this.getImgtop();
			this.getList();
			this.getIcon();
			this.getCategory();
			this.getcartNum();
			this.getActiveImg();
//			console.log()
		},
  mounted(){
			window.addEventListener('scroll', this.handleScroll);
			window.addEventListener('scroll', this.toplistScroll);
			window.addEventListener('scroll', this.getTopScroll);
		},
		wacth:{
			scrollTop(x,y){
				console.log(x)
				console.log(y)
			}
		},
  methods: {
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
  			//点击拼团详情
  			gofenImg(id,type){
  				//console.log(type)
  				if(type==1){
  					//this.$router.push({path:'/index/moreindex/id/'+id+'?memberId='+this.$route.query.memberId});
  					window.location.href=CUR_URLBACK+'index/moreindex/id/'+id+'?memberId='+this.$route.query.memberId
  				}else if(type==2){
  					//this.$router.push({path:'/index/hotsale?memberId='+this.$route.query.memberId});
  					window.location.href=CUR_URLBACK+'index/hotsale?memberId='+this.$route.query.memberId
  				}
  				//
  			},
  			//获取会员信息
			getMember(){
				let data={
					//memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				if(data.result.isGetStoreCommission){
					this.showMember=true;
				}else{
					this.showMember=false;
				}
				console.log(this.showMember)
				this.setCookie('memberId',data.result.id)
				this.setCookie('iShowCenter',data.result.isGetStoreCommission)
//				console.log(this.getCookie("memberId"))
			},
			//点击首页
  			getFist(){
  				//this.$router.push({path:'/index/pinkIndex?memberId='+this.$route.query.memberId});
  				window.location.href=CUR_URLBACK+'index/pinkIndex?memberId='+this.$route.query.memberId
  			},
  			//点击试用
  			getFistOne(){
  				//this.$router.push({path:'/try/moretry?memberId='+this.$route.query.memberId});
  				//window.location.href=CUR_URLBACK+'try/moretry?memberId='+this.$route.query.memberId
  				window.location.href=CUR_URLBACK+'try/newCenter?memberId='+this.$route.query.memberId;
  			},
  			//点击拼团
  			getFistTwo(){
  				//this.$router.push({path:'/index/newIndex?memberId='+this.$route.query.memberId});
  				window.location.href=CUR_URLBACK+'index/newIndex?memberId='+this.$route.query.memberId
  			},
  			//点击头条
  			getTopNew(){
  				window.location.href=USE_URL+'weixin/headline/headline';
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
  				//console.log(data)
  				this.cateObj=data.result;
  				localStorage.setItem('cateGory',JSON.stringify(this.cateObj))
  				let ObjObj=JSON.parse(localStorage.getItem("cateGory"))
  				console.log(ObjObj)
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
  			//点击...详情
  			goMoreIndex(id,type){
  				//console.log(type)
  				if(type==18 || type==19 || type==20 || type==21 || type==22 || type==23 || type==25 || type==26  || type==28){
  					if(id!=""){
						if(id.indexOf("?")!=-1){
							//console.log("YES")
							window.location.href=USE_URL+id+'&memberId='+this.$route.query.memberId;
						}else{
							//console.log("no")
							window.location.href=USE_URL+id+'?memberId='+this.$route.query.memberId;
						}
					}
  				}else if(type==29){
  					console.log(11)
  				}else{
  					if(id!=""){
						if(id.indexOf("?")!=-1){
							//console.log("YES")
							window.location.href=id+'&memberId='+this.$route.query.memberId;
						}else{
							//console.log("no")
							window.location.href=id+'?memberId='+this.$route.query.memberId;
						}
					}
  				}
  				
  			},
  			//点击广告
  			getAdvers(id){
  				
  				
				if(id!="" && id!="#"){
					if(id.indexOf("?")!=-1){
						//console.log("YES")
						window.location.href=id+'&memberId='+this.$route.query.memberId;
					}else{
						//console.log("no")
						window.location.href=id+'?memberId='+this.$route.query.memberId;
					}
				}else{
					console.log(1)
				}
  			},
//			//点击特卖
//			getFist(){
//				window.location.href=CUR_URLBACK+'index/pinkIndex?memberId='+this.$route.query.memberId
//			},
  			//点击分类
  			getDetailNex(index,id){
  				window.location.href=USE_URL+'weixin/product/productCategoryDetail?pcatId='+id+'&memberId='+this.$route.query.memberId;
  				//http://test-mobile.olquan.cn/weixin/product/productCategoryDetail?pcatId=33
//				$('html,body').animate({scrollTop:0},0);
//				console.log(id)
//				this.addIndex=index;
//				this.addSelect=false;
//				this.detailShow=false;
//				this.isRecommend=2;
//				this.productCategoryId=id;
//				this.isMore=true;
//				this.showTrue=false;
//				this.pageObj.page=1;
//				this.getList();
  				
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
  			//跳转购物车
			getIndex(){
				window.location.href=CUR_URLBACK+'shopcar/ordercar?memberId='+this.$route.query.memberId
			},
			getFind(){
				window.location.href="http://live-weixin.olquan.cn"
			},
			//点击客服
			getkefu(){
				window.location.href='https://kefu.easemob.com/webim/im.html?tenantId=40231&ticket=false';	
			},
			getMindIndex(){
				window.location.href=USE_URL+'weixin/member/membercore?mmm='+this.$route.query.memberId;
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
			    if(this.listTrue){
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
					isCheck:this.$route.query.isCheck,
					page:1,
	  				rows:20,
					
				};
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getIndexTogetherList,data,this.getFirstBack);
			},
			getFirstBack(data){
				//console.log(data)
				this.listObj=data.result;
				this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/newIndex');
				//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/newIndex');
				this.shareData.description="拼优惠，拼乐趣";
				
				//this.shareData.picURL=this.pinpinImg;
				console.log(this.shareData)
				this.addWeixinShare();//微信分享 	
			},
			//上面列表分页
			toplistScroll(){
				
  			  var height=document.body.scrollHeight;
  				
			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			  var windowH=window.innerHeight;
			  if(this.scrollTop + windowH >=height-200){
			  	
			  	if(this.isMoreList){
	 				this.isMoreList=false;
	 				let data={
	  					page:this.topPage.page+1,
	  					rows:20,
	  					isCheck:this.$route.query.isCheck
	  				};
	  				this.topPage.page=this.topPage.page+1
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getIndexTogetherList,data,this.getFirstMoreBack);
	 			}
			  }
	 		},
	 		getFirstMoreBack(data){
	 			if(data.result.length<20){
					this.isMoreList=false;
					this.listTrue=true;
				}else{
					this.isMoreList=true;
				}
				
				
				for(let i=0; i<data.result.length; i++){
					this.listObj.push(data.result[i])
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
  				//console.log(this.showActive)
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
					//console.log("YES")
					window.location.href=this.avtiveUrl+'&memberId='+this.$route.query.memberId;
				}else{
					//console.log("no")
					window.location.href=this.avtiveUrl+'?memberId='+this.$route.query.memberId;
				}
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
			this.headlinesLength=data.result.headlines.length;
			//console.log(this.headlinesLength)
			for(let i=0;i<this.imgObj.banners.length;i++){
					
				if(this.imgObj.banners[i].url== "#" || this.imgObj.banners[i].url==""){
					this.imgObj.banners[i].url=location.href;
				}else{
					if(this.imgObj.banners[i].url.indexOf("?")!=-1){
						//console.log("YES")
						this.imgObj.banners[i].url=this.imgObj.banners[i].url+'&memberId='+this.$route.query.memberId;
					}else{
						//console.log("no")
						this.imgObj.banners[i].url=this.imgObj.banners[i].url+'?memberId='+this.$route.query.memberId;
					}
				}
			}
			this.urlList = this.imgObj.banners.map((item, index) => ({
			  url: item.url,
			  img: item.image,
			  
			}))
//			console.log(this.urlList)
//			console.log(data)
		},
		//获取购物车产品数量
		getcartNum(){
			let data={
//				memberId:this.getCookie("memberId"),
			}
			this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.totalNum,data,this.getcartNumBack);
		},
		getcartNumBack(data){
			//console.log(data)
			this.cartNum=data.result;
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
	  window.removeEventListener('scroll', this.getTopScroll)
	},
 	
  
}
</script>

<style lang="scss" scoped>

.index{
	
	background: #f7f7f7;
	padding-bottom: 1.00rem;
	padding-top: .80rem;
	img{
		pointer-events:none;
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
		background: #fff;
		overflow: hidden;
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
			z-index: 2222;
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
			margin-bottom: .10rem;
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
	.havle{
		background: #fff;
		width: 100%;
		border-bottom: 0.01rem solid #f2f2f2;
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
		flex-wrap:wrap;
	    -webkit-flex-wrap:wrap;
        -webkit-box-lines:multiple;
        -moz-flex-wrap:wrap;
        p{
        	/*webkit-box-flex: 1 ;
		    -moz-box-flex: 1;                
		    -webkit-flex: 1;       
		    -ms-flex: 1 ;            
		    flex: 1;*/
		  	
		   	
		    width: 50%;
		    span{
		    	display: block;
		    	height: 100%;
		    	border-right: 0.01rem solid #e1e1e1;
		    }
        	img{
        		display: block;
        		width: 100%;
        		
        	}
        }
        p:nth-child(1){
        	border-bottom: 0.01rem solid #e1e1e1;
        	
        }
        p:nth-child(2){
        	border-bottom: 0.01rem solid #e1e1e1;
        	span{
        		border: none;
        	}
        	
        	
        }
        p:nth-child(3){
        	width: 33.3%;
        }
        p:nth-child(4){
        	width: 33.3%;
        }
        p:nth-child(5){
        	width: 33.3%;
        	span{
        		border: none;
        	}
        	
        }
	}
	.cent{
		
		
		/*background: #f2f2f2;*/
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
			 		-webkit-box-pack: center;
				    -moz-box-pack: center;
				    -ms-flex-align:center;
				      
				    -webkit-align-items: center;
				    -moz-align-items: center;
				    align-items: center;

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
			 			max-height: 3.34rem;
			 			width: 100%;
			 		}
			 		
			 	}
			 	.goodsdetail{
			 		
			 		word-wrap: break-word;
			 		font-size: .28rem;
			 		padding: 0.15rem .20rem .20rem;
			 		
			 		
			 		background: #fff;
			 		position: relative;
			 		.describe{
			 			line-height: .42rem;
			 			color: #131313;
			 			display: block;
			 			i{
			 				font-style: normal;
			 				color: #e5006e;
			 				/*border: 0.01rem solid #fa006a;*/
			 				/*border-radius: 0.05rem;*/
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
				 	font-size: .32rem;
				 	color: #E5006E;
				 	margin-top: .20rem;
				 	line-height: .54rem;
				 	font-weight: 700;
				 	display: inline-block;
				 	
				 	i{
				 		font-style: normal;
				 		color: #b3b3b3;
				 		font-weight: normal;
				 		font-size: .24rem;
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
				 	bottom: .28rem;
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
				 	display:block;
				 	width: 1.1rem;
				 	height: .48rem;
				 	
				 	border-radius: 0.04rem;
				 	text-align: center;
				 	line-height: .49rem;
				 	color: #fff;
				 	font-size: .26rem;
				 	position: absolute;
				 	right: 0.20rem;
				 	bottom: 0.28rem;
				 	background: #E5006E;
				 	
				 }
			 	}
			 
		 	}
	 	}
	}
	.tuijian{
		font-size: .32rem;
		background: #f7f7f7;
		line-height: 1.16rem;
		
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
				width: 50%;
				
				
				margin-bottom:.30rem;
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
					left: .25rem;
					top: 0;
					width: .50rem;
				}
				.top{
					font-weight: normal;
					font-size: .26rem;
					color: #333;
					line-height: .40rem;
					height: .80rem;
					overflow: hidden;
					padding:0 .20rem;
					margin-bottom: .25rem;
					span{
						color: #e5006e;
		 				/*border: 0.01rem solid #fa006a;*/
		 				border-radius: 0.05rem;
		 				/*padding: 0 .05rem;*/
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
					right: 0.20rem;
					bottom: .10rem;
					z-index: 222;
					width: 100%;
					height: .48rem;
					padding-right: .20rem;
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
						height: .30rem;
						width: .30rem;
						border-radius: 50%;
						
					}
					img:nth-child(1){
						position: absolute;
						right: .12rem;
						top: 0.09rem;
						z-index: 200;
					}
					img:nth-child(3){
						position: absolute;
						right: .58rem;
						top: 0.09rem;
						z-index: 206;
					}
					img:nth-child(2){
						position: absolute;
						right: .36rem;
						top: 0.09rem;
						z-index: 202;
					}
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