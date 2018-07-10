	<template>
	<div class="order" style="background: #fff; min-height: 100%;">
			
			
			<!--<Swiper loop auto :list="urlList" style='width: 100%;' :aspect-ratio="9/16" dots-position='center'></Swiper>-->
			<!--<div>
				<swiper :options="swiperOption">
					 <swiper-slide v-for='(item,index) in lunboList' :key="index">
					 	<img :src= "item.image" style="width: 100%; display: block;" @click="getLunbo(index)"/>
					 </swiper-slide>
					 <div class="swiper-pagination"  slot="pagination"></div>
				</swiper>
			</div>-->
			<Linking></Linking>
			<div v-for="item in listObj">
				<!--轮播图-->
				<Swiper loop auto v-if="item.modelSampleCode=='advertisingFigure'" dots-position='center' ref="swiper">
			      <swiper-item class="swiper-demo-img" v-for="(itemsSon, index) in item.contents" :key="index"><img style="width: 100%;" :src="itemsSon.image" @click="getLunbo(itemsSon.url)"></swiper-item>
			    </Swiper>
				<!--能滑动的-->
				
					<ul class="touchImg" v-if="item.modelSampleCode=='titleproducttouch'">
						<li v-for="itemSons in item.contents" @click="goMore(itemSons.url)"><img :src="itemSons.image" /></li>
						
					</ul>
				
				
				<!--等分图片-->
				<div class="img" v-if="item.modelSampleCode=='f5'">
					<!--<img  :src='goodImg'/>-->
					<div>
						<img v-for="itemSon in item.contents" v-if="item.contents.length==2" style="width: 50%;"  :src='itemSon.image' @click="goMore(itemSon.url)"/>
						<img v-for="itemSon in item.contents" v-if="item.contents.length==3" style="width: 33.3%;" :src='itemSon.image' @click="goMore(itemSon.url)" />
						<img v-for="itemSon in item.contents" v-if="item.contents.length==1" style="width: 100%;" :src='itemSon.image' @click="goMore(itemSon.url)" />
						<img v-for="itemSon in item.contents" v-if="item.contents.length==4" style="width: 25%;"  :src='itemSon.image' @click="goMore(itemSon.url)"/>
					</div>
				</div>
			</div>
			
			<!--分类-->
			<div class="list-top" v-show="classify.length!=0">
				<ul :class="searchBarFixed == true ? 'isFixed' :''">
					<li v-for="(itemsSon,index) in classify" v-bind:class="{ 'special': index===addSelect}" @click="getDetail(index,itemsSon.contentId)">{{itemsSon.title}}</li>
					
				</ul>
				
			</div>
			<!--分类产品-->
			<div class="cent" v-show="productMore==true">
				<ul class="init">
					<li v-for='item in curObj' @click="goBuy(item.productId)">
						<img :src=item.image />
						<p class="top">{{item.productName}}</p>
						
						<p style="font-size: .28rem;color: #fc469a;">￥{{item.price}}</p>
						<p class="botMoney">
							<span class="left">￥{{item.marketPrice}}</span>
							<span class="right" >{{item.score}}</span>
						</p>
					</li>
					<!--<li v-show="showTrue" class="special">没有更多了</li>-->
				</ul>
			</div>
			<div class="zhezhao" v-show="activeTrue==true" ></div>
			<img :src="colseImg" class="colse" @click="colseShow" v-show="activeTrue==true && status==3"/>
			<div class="zhezhaoName" v-show="activeTrue==true && status==1">
				<img :src="actstartImg" style="height: 5.03rem;width: 4.21rem;" />
			</div>
			<div class="zhezhaoName" v-show="activeTrue==true && status==3">
				<img :src="activeImg" style="height: 5.20rem; width: 5.20rem;"/>
			</div>
		
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { Swiper, SwiperItem} from 'vux'
	var time;
	//import commonPageTop from '../../components/scroll/divsion.vue';
	export default {
		name:'a',
		data : function() {
			return{
				activeImg:'/static/images/active.png',
				goodImg:'/static/images/goodsImg.png',
				activeImg:'/static/images/active.png',
				actstartImg:'/static/images/actstart.png',
				colseImg:'/static/images/cha.png',
				listObj:{},
				curObj:{},
				pageObj:{
					page:1,
				},
				pageObj2:{
					page:1,
				},
				showTrue:false,
				status:'',
				swiperOption:{
//					notNextTick: true,
					preventClicks:false,
					initialSlide:0,
					autoplay: 3000,
					loop : true,
					pagination : '.swiper-pagination',
					autoplayDisableOnInteraction : false,
				},
				message:[],
				searchBarFixed:false,
				title:'',
				imgLength:'',
				lunboList:[],
				classify:[],
				partList:'',
				addSelect:0,
				useContentId:'',
				dataObj:{
					memberId:this.$route.query.memberId,
					contentId:'',
				},
				urlList:[],
				shareData : {
					'title': "",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':false
					
				},
				isMore:false,
				description:'',
				picURL:'',
				listUrl:'',
				activeTrue:true,
				imgMore:true,
				productMore:false,
				
			}
		},
		components: {
			swiper,
			swiperSlide,
			Swiper,
			SwiperItem
			//commonPageTop
		},
		created: function() {
			this.getFirst();
			this.$nextTick(function () {
		       // this.$refs.swiper.xheight = 'auto'
		      })
		},
		updated(){
			//console.log(this.urlList);
		},
		mounted(){
			
			window.addEventListener('scroll', this.handleScroll);
			
			
		},
		
		computed:{
			
		},
		methods:{
			//关闭弹窗
			colseShow(){
				this.activeTrue=false
			},
			getFirst(){
				let data={
//					memberId:this.$route.query.memberId,
					code:this.$route.query.code,
					page:1,
					rows:20
				};
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getByModelCode,data,this.getFirstBack);
				
			},
			getFirstBack(data){
					this.listObj=data.result.data.details;
					this.title=data.result.modelName;
					this.description=data.result.desc
					this.picURL=data.result.image;
					
					this.status=data.result.status;
					if(this.status==2){
						this.activeTrue=false
					}else{
						this.activeTrue=true
					}
					console.log(this.activeTrue)
					this.$store.commit('documentTitle',this.title);
					console.log(this.title)
					
				//console.log(this.status)
				for(let i=0;i<this.listObj.length;i++){
					if(this.listObj[i].modelSampleCode=='catlist1'){
						this.classify=this.listObj[i].contents;
						
					}
					if(this.listObj[i].modelSampleCode=='advertisingFigure'){
						this.lunboList=this.listObj[i].contents;
					}
					if(this.listObj[i].modelSampleCode=='f5'){
						this.partList=this.listObj[i].contents;
						
					}
				}
				if(this.lunboList.length>0){
					this.urlList = this.lunboList.map((item, index) => ({
					  url: item.url,
					  img: item.image
					}));
				}
				//console.log(123)
				//console.log(this.partList)
				if(this.classify.length>0){
					this.dataObj.contentId=this.classify[0].contentId;
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.findProductByContentId,this.dataObj,this.getListBack);
				}
				this.shareData.title=this.title;
				this.shareData.description=this.description;
				this.shareData.picURL=this.picURL;
				this.shareData.url="https://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'activity/detail?code='+this.$route.query.code);
				//this.shareData.url="https://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'activity/detail?code='+this.$route.query.code);
				//console.log(this.urlList)
				this.addWeixinShare();//微信分享 	
				
			},
			getListBack(data){
				//console.log(data);
				this.curObj=data.result;
			},
			goMore(id){
				console.log(id);
				if(id!=""){
					if(id.indexOf("?")!=-1){
						console.log("YES")
						window.location.href=id;
					}else{
						console.log("no")
						window.location.href=id;
					}
				}
				
				//window.location.href=id+'&memberId='+this.getCookie("memberId");
			},
			
			getLunbo(url){
				console.log(url);
				if(url!=""){
					window.location.href=url;
				}else{
					console.log(1)
				}
				//
			},
			//悬浮
			handleScroll () {
				var height=document.body.scrollHeight;
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				 //console.log(scrollTop)
			  	//var offsetTop = document.querySelector('.list-top').offsetTop;
			  	var windowH=window.innerHeight;
			  	//console.log(windowH)
				//console.log(this.searchBarFixed)
				if(scrollTop + windowH >= height-20){
					//console.log("aaaa")
				  	if(this.isMore){
		 				this.isMore=false;
		 				let data={
		  					page:this.pageObj.page+1,
		  					rows:20,
		  					//memberId:this.$route.query.memberId,
		  					contentId:this.dataObj.contentId
		  				};
		  				this.pageObj.page=this.pageObj.page+1
						this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.findProductByContentId,data,this.getListMoreBack);
		 			}
				}
				if(scrollTop + windowH >= height-20){
					//console.log("aaaa")
				  	if(this.imgMore){
		 				this.imgMore=false;
		 				let data={
		  					page:this.pageObj2.page+1,
		  					rows:20,
		  					//memberId:this.getCookie("memberId"),
		  					code:this.$route.query.code,
		  				};
		  				this.pageObj2.page=this.pageObj2.page+1
						this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getByModelCode,data,this.getImgMoreBack);
		 			}
				}
				
			},
			getImgMoreBack(data){
				console.log(data)
				if(data.result.data.details.length<20){
					this.isMore=true;
					this.productMore=true;
				}else{
					this.imgMore=true;
				}
				for(let i=0;i<data.result.data.details.length;i++){
					this.listObj.push(data.result.data.details[i]);
				}
				console.log(this.listObj)
			},
			getListMoreBack(data){
				if(data.result.length<20){
					this.isMore=false;
					//this.isMore=true;
					this.showTrue=true;
				}else{
					this.isMore=true;
				}
				
				
				for(let i=0; i<data.result.length; i++){
					this.curObj.push(data.result[i])
				}
				console.log(this.curObj)
			
			},
			getDetail(index,id){
				
				this.addSelect=index;
				console.log(id)
				this.pageObj.page=1;
				this.isMore=true;
				this.dataObj.contentId=id;
				console.log(this.dataObj)
				let data={
					memberId:this.$route.query.memberId,
					contentId:id
				}
				
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.findProductByContentId,data,this.getDetailBack);
			},
			getDetailBack(data){
				//console.log(data)
				this.curObj=data.result;
			},
			goBuy(id){
				//console.log(id)
				window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id
			},

			//微信分享 
		  addWeixinShare:function(){
			var data = {                 
				"url":location.href,
				"callback":'',
		    };
		    console.log(location.href)
		    
		    this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);			
		  },
		  shareBack:function(data){
//		  	console.log("data")
//		  	console.log(data)
			if(data.result=='fail'){
				this.shareData.share=true;
			}
	      	//console.log()
			//调用共用的分享接口
				console.log(this.shareData)
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
@import "../../../static/swiper.min.css";
.swiper-container{
	width: 100%;
	height: 3rem;
}
.swiper-slide{
	background: #fff;
}	
	.swiper-demo-img{
		
		img{
			max-height: 3.60rem;
		}
	} 
	.order{
		position: relative;
		.zhezhao{
			position: absolute;
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.5);
			z-index: 222;
		}
		.colse{
			position: absolute;
			right: 1.60rem;
			top: 3.00rem;
			z-index: 240;
		}
		.zhezhaoName{
			position: fixed;
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
			box-pack:center;
			top: 50%;
			margin-top: -2.60rem;
			left: 50%;
			margin-left: -2.60rem;
			height: 5.20rem;
			width: 5.20rem;
			color: #FFF;
			text-align: center;
			line-height: 2.00rem;
			font-size: .36rem;
			z-index: 223;
			img{
				display: block;
				width: 100%;
			}
			
			
		}
	}
	
		
		.touchImg{
			WIDTH:100%;
		    overflow-x: auto;
		  	max-height: 2.86rem;
		  	overflow-y: hidden;
		   	white-space:nowrap;
		   	li{
		   		
				width: 2.30rem;
		   		display: inline-block;
		   		 
		   		 img{
		   		 	display: block;
		   		 	width: 100%;
		   		 	max-height: 2.86rem;
		   		  }
		   	}
		}
		
	
	.img{
		width: 100%;
		overflow: hidden;
		img{
			
			display: block;
			max-width: 100%;
			float: left;
			
			
		}
	}
	.list-top{
		width: 100%;
		
		background: #fff;
		height: .88rem;
		margin-bottom: .10rem;
		.isFixed{
			position:fixed;
		    background-color:#Fff;
		    top:0;
		    z-index:22;
			height: 1.00rem;
			padding:0 ;
			margin: 0;
		    
		}
		ul{
			WIDTH:100%;
		    
		   	height: 1.60rem;
		   	white-space:nowrap;
		    overflow: auto;
		    li{
		    	  font-size: 0.30rem;
			      text-align: center;
			      display: inline-block;
			      line-height: .88rem;
			      width: 1.60rem;
			      padding:0 ;
		  		  margin: 0;
			      
			      vertical-align: top;
			      
		    }
		    .special{
		      	border-bottom: 0.01rem solid #f49;
		      	z-index: 999;
		      	color: #f49;
		    }
		}
		
	}
	.cent{
		
		padding: 0rem .12rem;
		
		ul{
			width:100%;
			display: flex;
			display:-webkit-box;
			display: -moz-box;
			display: -ms-flexbox;
			display: -webkit-flex;
			
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
				
				background: #fff;
				margin-bottom:.10rem;
				
				img{
					display: block;
					width: 100%;
					height: 3.59rem;
				}
				.top{
					font-weight: normal;
					font-size: .24rem;
					color: #333;
					line-height: .30rem;
					padding: .08rem;
				}
				.botMoney{
					display: block;
					overflow: hidden;
					font-size: .20rem;
					color: #b2b2b2;
					font-style: normal;
					
					padding-right: .24rem;
					.left{
						text-decoration:line-through;
						
						float: left;
						
						
					}
					.right{
						float: right;
						
					}
				}
				
			}
		}
	}

</style>