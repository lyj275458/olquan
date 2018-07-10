	<template>
	<div>
	<div class="order" :style="objLoad">
			<div v-for="item in listObj.subassembly">
				<!--轮播图-->
				<div v-if="item.modelSampleCode==='advertisingFigure'" v-show="item.contents.length>0">
					<Swiper :aspect-ratio="9/16" loop auto  dots-position='center' ref="swiper" >
				      <swiper-item style="overflow: hidden; height: 100%;" class="swiper-demo-img" v-for="(itemsSon, index) in item.contents" :key="index"><img style="width: 100%;" :src="itemsSon.image" @click="goMore(itemsSon.url,itemsSon.type,itemsSon.typeId,itemsSon.productId,itemsSon.image,itemSon.productType)">
				      </swiper-item>
				    </Swiper>
        		</div>
        		
				<!--能滑动的-->
				<!--<div class="touchImg" v-if="item.modelSampleCode==='titleproducttouch'"  id='issc'>
					<div v-for="itemSons in item.contents" @click="goMore(itemSons.url,itemSons.type,itemSons.typeId,itemSons.productId,itemSons.image)" class='liTisy'>
						<img style="display: block;" v-lazy="itemSons.image" />
					</div>
				</div>-->
				<swiper :options="swiperOption" ref="mySwiper" v-if="item.modelSampleCode==='titleproducttouch'">
				   	<swiper-slide v-for="itemSons in item.contents" >
				   	 <img style="width: 100%; display: block;" :src="itemSons.image" @click="goMore(itemSons.url,itemSons.type,itemSons.typeId,itemSons.productId,itemSons.image)"/>
				    </swiper-slide>
				</swiper>
				<!--等分图片-->
				<div class="img" v-else-if="item.modelSampleCode==='f5'">
		            <div  v-if="item.contents.length==2"  v-for="itemSon in item.contents" style="width:50%" @click="goMore(itemSon.url,itemSon.type,itemSon.typeId,itemSon.productId,itemSon.image,itemSon.productType)">
		              <img  :src='itemSon.image' />
		            </div>
		            <div  v-if="item.contents.length==3" v-for="itemSon in item.contents" style="width: 33.3%;" @click="goMore(itemSon.url,itemSon.type,itemSon.typeId,itemSon.productId,itemSon.image,itemSon.productType)" >
		              <img  :src='itemSon.image'/>
		            </div>
		            <div v-if="item.contents.length==1"  v-for="itemSon in item.contents" style="width: 100%;" @click="goMore(itemSon.url,itemSon.type,itemSon.typeId,itemSon.productId,itemSon.image,itemSon.productType)">
		              <img  :src='itemSon.image'/>
		            </div>
		            <div v-if="item.contents.length==4" v-for="itemSon in item.contents"  style="width:25%;" @click="goMore(itemSon.url,itemSon.type,itemSon.typeId,itemSon.productId,itemSon.image,itemSon.productType)">
		              <img  :src='itemSon.image'/>
		            </div>
		            <div v-if="item.contents.length==5" v-for="itemSon in item.contents"  style="width: 20%;" @click="goMore(itemSon.url,itemSon.type,itemSon.typeId,itemSon.productId,itemSon.image,itemSon.productType)">
		              <img  :src='itemSon.image'/>
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
			<div class="cent">
				<ul class="init">
					<li v-for='item in dataList' @click="goBuy(item.togetherId,item.type,item.productId)">
						<img :src="item.image" />
						<p class="top"><span v-show="item.productTag!=null">{{item.productTag}}</span>{{item.productName}}</p>

						<p style="font-size: .28rem;color: #fc469a; line-height: .66rem;">￥{{item.salePriceView}}</p>
						<p class="botMoney">
							<span class="left">￥{{item.marketPriceView}}</span>
							<span class="right" >{{item.score? item.score : ''}}</span>
						</p>
					</li>
					<li v-if="showTrue" class="special">没有更多了</li>
				</ul>
			</div>
			<div class="zhezhao" v-if="activeTrue==true" ></div>
			<!--<img :src="colseImg" class="colse" @click="colseShow" v-if="activeTrue==true"/>-->
			<div class="zhezhaoName" v-if="activeTrue==true && status==0">
				<img :src="actstartImg" style="height: 5.03rem;width: 4.21rem;" />
			</div>
			<div class="zhezhaoName" v-if="activeTrue==true && status==-1">
				<img :src="activeImg" style="height: 5.20rem; width: 5.20rem;"/>
			</div>	
	</div>
		<div v-show='LoadTrue===false' style='width:100%;position: fixed;background: #fffff;text-align: center;z-index=111111'>
			<span style='display:inline-block;margin:0 auto;font-size:0.30rem;margin-top: 49%;'>正在加载中......</span>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { Swiper, SwiperItem} from 'vux'
	import { Lazyload } from 'mint-ui';
	import $ from 'jquery'
    import axios from 'axios'
	import Swiperion from 'swiper';
	var time;
	//import commonPageTop from '../../components/scroll/divsion.vue';
	export default {

    data: function () {
      return {
        activeImg: '/static/images/active.png',
        goodImg: '/static/images/goodsImg.png',
        activeImg: '/static/images/active.png',
        actstartImg: '/static/images/actstart.png',
        colseImg: '/static/images/cha.png',
        listObj: {},
        curObj: {},
        pageObj: {
          page: 1,
        },
        styleobj:{},
        backCObj:{},
        activeDetail:'',

        showTrue: false,
        status: '',
        
        swiperOption: {
		  notNextTick: true,
          slidesPerView: 3,
	      freeMode: true,
	      pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	      },
        },
        message: [],
        searchBarFixed: false,
        title: '',
        titleTwo:'',
        imgLength: '',
        classify: [],
        addSelect: 0,
        dataList: [],
        useContentId: '',
        dataObj: {
          memberId:this.$route.query.memberId,
          contentId: '',
        },
        urlList: [],
        shareData: {
          'title': "",
          'description': "",
          'url': "",
          'picURL': "",
          'hide': true,
          'share': false

        },
        isMore: true,
        description: '',
        picURL: '',
        listUrl: '',
        activeTrue: false,
		iPhone:false,
		Pc:false,
		isAndroid:'',
		isiOS:'',
		iosType:'',
		obj:{},
		LoadTrue:false,
		isPinkSureGet:false,
		
      }
    },
    components: {
      swiper,
      swiperSlide,
      Swiper,
      SwiperItem,
	  Swiperion,
      //commonPageTop
    },
    created: function () {
      this.getActiveDetail(this.$route.query.id);
      this.browserRedirect();
      this.showPhone();
      this.getMember();
    },
    updated() {

    },
    mounted() {
      //window.addEventListener('scroll', this.handleScroll);
		


    },

    computed: {
			objLoad:function(){
				let obj={}
				if(this.LoadTrue){
					obj={
						'display':"block"
					}
				}else{
					obj={
						'display':"none"
					}
				}
			},
			swiper() {
		        return this.$refs.mySwiper.swiper
		    }
    },
    methods: {
    	getUrl(url){
//  		console.log(url)
    	},
    	//获取会员信息
		getMember(){
			let data={
//				memberId:this.$route.query.memberId,
			}
			//console.log(data)
			this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
		},
		getMemberBack(data){
			if(data.result.isShowRenewButton!=0){
				this.isPinkSureGet=true;
			}else{
				this.isPinkSureGet=false;
			}
			
		},
      //关闭弹窗
      colseShow() {
        this.activeTrue = false
      },
      loading(){
      	var $imgLoad=$('img')
      	$imgLoad.onload=function(){
      		alert(1)
      	}
      },
      getActiveDetail(id){
      	this.LoadTrue=false
//    	console.log(id)
       axios.get(API_HOST+"mobile/buildblocks/getById",{
         params:{id:id}
       }).then(res => {
         this.activeDetail=res.data.result
         this.title=res.data.result.name;
         this.titleTwo=res.data.result.shareTitle;
         this.description=res.data.result.memo;
         this.picURL="https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/"+this.activeDetail.shareImg;
//       console.log(this.picURL)
         this.status=this.activeDetail.status;
         this.getFirst(res.data.result.ossDataId)

       }).catch(
      (error) => {
	     this.LoadTrue=false
      }
    )
      },
      getFirst(id) {
        axios.get('https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/buildblocks_data/'+id,{
          params:{}
        }).then(res =>{
        this.listObj = res.data
//      console.log(this.listObj)
//        console.log(res)
          this.getFirstBack(res)
        }).catch(
          (error) => {
    	       this.LoadTrue=false;
          }
        )
      },
      getFirstBack(data) {
       if (this.listObj.background.modelSampleCode == 'color') {
         this.styleobj = {'background': this.listObj.background.contents}
       } else if (this.listObj.background.modelSampleCode == "imgUrl") {
         this.styleobj = {
           'background-image': 'url(' + this.listObj.background.contents + ')',
           'background-repeat': 'no-repeat',
           'background-size':'cover'
         }
       } else {
         this.obj = {}
       }
       if(this.listObj.subassembly[this.listObj.subassembly.length-1].contents.length>0 && this.listObj.subassembly[this.listObj.subassembly.length - 1].modelSampleCode=="catlist1"){
      		this.dataList=this.listObj.subassembly[this.listObj.subassembly.length-1].contents[0].dataList
       }else{
       		this.dataList=[]
       }

      //this.backCObj= {'padding':this.listObj.subassembly[this.listObj.subassembly.length-1].marginData}
      /* this.title=this.activeDetail.name;
       this.description=this.activeDetail.memo;
       this.picURL=this.activeDetail.shareImg;
       this.status=this.activeDetail.status;*/
//     console.log(this.status)
       	if(this.status==1){
          this.activeTrue=false
        }else{
          this.activeTrue=true
        }
        this.$store.commit('documentTitle',this.title);
        if(this.iPhone){
//      	console.log(1)
			if(tsApp.getClientBrowser()!='wx'){
				if(this.isAndroid){
					OLquan.activeShare(this.titleTwo,this.description,this.picURL,this.title)
					//OLquan.activeShare(this.title,this.description,this.picURL)
				}
				if(this.isiOS){
					window.location.href="https://www.baidu.com/hdfx"+this.titleTwo+'&'+this.description+'&'+this.picURL+'&'+this.title
					//window.location.href="https://www.baidu.com/hdfx"+this.title+'&'+this.description+'&'+this.picURL
				}
			}
		}
	
//		for(let i=0;i<this.listObj.subassembly.length;i++){
//			if(this.listObj.subassembly[i].modelSampleCode==catlist1)
//		}
		if(this.listObj.subassembly[this.listObj.subassembly.length - 1].modelSampleCode=="catlist1"){
			this.classify = this.listObj.subassembly[this.listObj.subassembly.length - 1].contents
		}else{
			this.classify=[]
		}
//     	console.log(113)
//      console.log(this.classify)
        //if(this.classify.length>0){
        //this.dataObj.contentId=this.classify[0].contentId;
        //this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.findProductByContentId,this.dataObj,this.getListBack);
        //}
        this.shareData.title=this.titleTwo;
        this.shareData.description=this.description;
//      console.log(this.shareData.description)
        this.shareData.picURL=this.picURL;
        this.shareData.url="https://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'activity/newact?id='+this.$route.query.id);
        //this.shareData.url="https://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'activity/newact?id='+this.$route.query.id);
        this.addWeixinShare();//微信分享
//		 let myscroll=new IScroll("#issc",{
//				mouseWheel:true,
//				scrollbars:false,
//				scrollY:false,
//				scrollX:true,
//				click:true
//			})
			this.LoadTrue=true
      },
        //获取手机
        showPhone(){
			var u = navigator.userAgent;
			this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//				console.log('是否是Android：'+this.isAndroid);
//				console.log('是否是iOS：'+this.isiOS);
		},
		//PC和移动端判断
		browserRedirect() {
	      var sUserAgent = navigator.userAgent.toLowerCase();
	      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	      var bIsAndroid = sUserAgent.match(/android/i) == "android";
	      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

	      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
	        this.iPhone=true
	        //console.log( this.iPhone);

	      } else {
	      	this.Pc=true
	        //console.log(this.Pc);
	      }
	    },
      goMore(url,type,typeId,productId,image,productType) {
		console.log(type)
		if(type=="" || type==undefined){
            return;
			
		}else if(type==0){
			return;
			
//			console.log(Number(url.substr(url.indexOf("d=")+2)))
		}else if(type==1){
        	this.iosType='syzx';
        }else if(type==2){
        	this.iosType='cpxq';
        }else if(type==3){
        	this.iosType='pptm';
        }else if(type==4){
        	this.iosType='xsms';
        }else if(type==5){
        	this.iosType='zycs';
        }else if(type==6){
        	this.iosType='jzry';
        }else if(type==7){
        	this.iosType='qjgl';
        }else if(type==8){
        	this.iosType='mzsy';
        }else if(type==9){
        	this.iosType='jzsx';
        }else if(type==10 || type==15){
        	this.iosType='ptlb';
        }else if(type==11){
        	this.iosType='ktfl';
        }else if(type==12){
        	this.iosType='jkcz';
        }else if(type==13){
        	this.iosType='flzx';
        }else if(type==14){
        	this.iosType='xsms';
        }else if(type==16){
        	this.iosType='olbx';	
        }else if(type==17){
        	this.iosType='ppgl';
        }else if(type==18 || type==22){
        	this.iosType='hdlb';
//      	console.log(url.substr(url.indexOf("=")+1))
        }else if(type==19){
        	this.iosType='flxf';
        }else if(type==20){
        	this.iosType='tmsy';
        }else if(type==21){
        	this.iosType='flxq';
        }else if(productId==''){
        	productId=0
        }
        
        if(this.iPhone){
        	
			if(tsApp.getClientBrowser()=='wx'){
				if(type==11){
					if(this.isPinkSureGet){
						window.location.href=USE_URL+'weixin/member/renewConfirmOrder';
					}else{
						window.location.href=CUR_URLBACK+'supervisor/buyPink';
					}
				}else if(type=="" || type==0 || type==undefined || type=='undefined'){
					console.log(1)
				}else{
					if(type==2 || type==21){
						window.location.href = url + "?type=" + productType;
					}else{
						window.location.href = url
					}
					
				}
				
			}else{
				if(this.isAndroid){
					if(type!="" && type!=0){
						if(type==18 || type==22){
							OLquan.activeJump(18,typeId,productId,image,url.substr(url.indexOf("=")+1),productType)
						}else if(type==2){
							OLquan.activeJump(2,typeId,productId,image,url,productType)
						}else if(type==11) {
							if(this.isPinkSureGet){
								OLquan.activeJump(19,typeId,productId,image,url,productType)
							}else{
								OLquan.activeJump(11,typeId,productId,image,url,productType)
							}
							
						}else{
							OLquan.activeJump(type,typeId,productId,image,url,productType)
						}
					}
				}
				if(this.isiOS){
					//window.location.href="https://www.baidu.com/ptlb";//小积分页面  去提现5
					if(type!="" && type!=0){
						if(type==17){
							window.location.href="https://www.baidu.com/"+this.iosType+typeId+'&'+image
	
						}else if(type==2 || type==21){
							window.location.href="https://www.baidu.com/"+this.iosType+productId+"&"+productType
						}else if(type==16){
							window.location.href="https://www.baidu.com/"+this.iosType+url
	
						}else if(type==18 || type==22){
							window.location.href="https://www.baidu.com/hdlb"+url.substr(url.indexOf("=")+1)
	
						}else if(type==11){
							if(this.isPinkSureGet){
								window.location.href="https://www.baidu.com/"+"flxf";
							}else{
								window.location.href="https://www.baidu.com/"+"ktfl";
							}
						}else if(type!=11 && type!=18 && type!=22 && type!=16 && type!=21 && type!=2 && type!=17){
							window.location.href="https://www.baidu.com/"+this.iosType;
						}
					}
				}
			}
		}else{
			window.location.href=CUR_URLBACK+'index/newIndex'
		}


        //window.location.href=id+'&memberId='+this.getCookie("memberId");
      },
		
      getLunbo(url) {
//      console.log(url);
        if (url != "") {
          window.location.href = url;
        } else {
          console.log(1)
        }
        //
      },
      getDetail(index, id) {

        this.addSelect = index;
        console.log(id)
        this.dataList = this.classify[index].dataList
        this.pageObj.page = 1;
        this.isMore = true;
        this.dataObj.contentId = id;
//      console.log(this.dataObj)
        let data = {
         // memberId: this.$route.query.memberId,
          contentId: id
        }

        //this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.findProductByContentId,data,this.getDetailBack);
      },
     /* getDetailBack(data) {
        //console.log(data)
        this.curObj = data.result;
      },*/
      goBuy(id,type,productId) {
//      console.log(id)
        if(this.iPhone){
//      	console.log(1)
			if(tsApp.getClientBrowser()=='wx'){
				if(type==11){
					this.$router.push({path:'/index/goodsDetali/id/'+id+'&isLimit=0'});
				}else if(type==4 || type==8){
					this.$router.push({path:'/demo/demo/id/'+productId});
				}else if(type==9){
					this.$router.push({path:'/demo/iscroll/id/'+productId});
				}else{

					window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+productId
				}
			}else{
				if(this.isAndroid){
					OLquan.activeJump(2,0,productId,'','');
				}
				if(this.isiOS){
					window.location.href="https://www.baidu.com/cpxq"+productId;//小积分页面  去提现5


				}
			}
		}else{
			window.location.href=CUR_URLBACK+'index/newIndex'
		}
        //window.location.href = API_HOST + 'weixin/product/newProductDetail?productId=' + id + '&memberId=' + this.getCookie("memberId")
      },
      //微信分享
      addWeixinShare: function () {
        var data = {
          "url": location.href,
          "callback": '',
        };
        console.log(location.href)

        this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);
      },
      shareBack: function (data) {
//		  	console.log("data")
//		  	console.log(data)
		if(data.result=='fail'){
			this.shareData.share=true;
		}
        //console.log()
        //调用共用的分享接口
//      console.log(1111)
//      console.log(this.shareData)
        //console.log(JSON.stringify(data.result))
        this.wxShareFun(data.result, this.shareData);
        //this.locationWx(data);

        //},
      },
//  拼团首页  拼团秒杀列表 超值拼列表 拼洋货列表  拼大牌列表 清仓拼列表  （ptlb）
//	拼团秒杀产品详情 正常拼团产品详情  积分试用产品详情 产品详情 （cpxq）
//	开通粉领 （ktfl）
//	全球购列表（qjgl）
//	家居日用首页（jzry）
//	品牌馆（ppgl）
//	试用中心（syzx）
//	品牌特卖（pptm）
//	限时购（xsms）
//	自营超市（zycs）
//	美妆首页（mzsy）
//	今日上新（jzsx）
//	活动内跳活动，优惠券活动（hdlb）
//	小金库充值（jkcz）
//	粉领产品详情（flxq）
//	1 试用中心
//	2 产品详情
//	3 品牌特卖
//	4 限时购
//	5 进口超市
//	6 进口家居馆
//	7 全球购 
//	8 美妆
//	9 今日上新
//	10 拼团
//	11 开通粉领
//	12 小金库充值
//	13 粉领专享
//	14 限时拼
//	15 拼洋货/拼大牌/超值拼/拼大牌   productId 传 分类Id 如果没有分类Id 就传0 
//	16保险
//	17品牌馆
//	18其他活动
//	19 粉领续费
//	20 特卖首页
//	21 粉领产品详情
//	22  优惠券活动
     /* destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
      },*/
    }
  }
</script>

<style lang="scss" scoped>
@import "../../../static/swiper.min.css";

img{
		pointer-events: none;
	}
/*.swiper-container{
	width: 100%;
	height: 3rem;
}*/
/*.swiper-slide{
	background: #fff;
}*/
	.swiper-demo-img{
		  img[lazy=loading] {
					  width: .50rem;
					  height: .50rem;
					  margin: auto;
					  margin-top: -50%;
					}
	}
	.order{
		overflow-x: auto;
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
			/*width:100%;*/
		    overflow-x: auto;
		  	
		  	overflow-y: hidden;
		   	white-space:nowrap;
		   	.liTisy{
				width: 2.30rem;
				position: relative;
		   		display: inline-block;


		   		/*float:left;*/
		   		 img{
		   		 	display: block;
		   		 	width: 100%;
		   		  }
		   		  img[lazy=loading] {
					  width: .50rem;
					  height: .50rem;
					  margin: auto;
					  margin-top: -50%;
					}
		   	}
		}


	/*.img{
		width: 100%;
		overflow: hidden;
		img{

			display: block;
			max-width: 100%;
			float: left;


		}
	}*/
	.img{
		width: 100%;
    display: flex;
    justify-content: space-between;
	overflow: hidden;
    /*margin-bottom: .02rem;*/
		img{
			display: block;
			width: 100%;
    }
     img[lazy=loading] {
					  width: .50rem;
					  height: .50rem;
					  margin: auto;
					  margin-top: -50%;
					}
	}

	.list-top{
		width: 100%;
		background: #fff;
		height: .88rem;
		/*margin-bottom: .10rem;*/
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
			width:100%;
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

		      	z-index: 999;
		      	color: #f49;
		    }
		}

	}
	.cent{

		/*padding: 0rem .10rem;*/

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
				/*width: 50%;*/
				background: #fff;
				margin-bottom:.10rem;

				 img[lazy=loading] {
					  width: .50rem;
					  height: .50rem;
					  margin: auto;
					  margin-top: -50%;
					}
				img{
					display: block;
					width: 100%;
					height: 3.59rem;
				}
				.top{
					font-weight: normal;
					font-size: .24rem;
					color: #333;
					line-height: .40rem;
					padding:0.08rem  .08rem 0;
			        height:.80rem;
			        overflow: hidden;
			        span{
			        	line-height: .32rem;
			        	height: .30rem;
			        	display: inline-block;
			        	margin-right: .10rem;
			        	padding: 0 .05rem;
			        	color: #fa006a;
		 				border: 0.01rem solid #fa006a;
		 				border-radius: 0.05rem;
		 				font-size: .20rem;
			        }
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
