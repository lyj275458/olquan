<template>
	<div class="severalTry">
		<div style="width: 100%;" v-if="imgObj!=undefined">
			<img v-lazy="imgObj.image" style="display: block;width: 100%;"/>
		</div>
		<!--<div style="width: 100%;" v-show="this.$route.params.id==4">
			<img v-lazy="overSeaImg" style="display: block;width: 100%;"/>
		</div>-->
		<div class="goodslTry" v-for="item in curObj" @click="getGoods(item.productId)">
			<div class="goodsImg">
				<img v-lazy="item.indexImage" />
			</div>
			<div class="goodsName">
				{{item.productName}}
			</div>
			<div class="goodsDesc">
				{{item.summery}}
			</div>
			<div class="goodsPrice">
				<p>保证金<span>￥{{item.price}}</span></p>
				<p style="margin-top: .04rem;">限量{{item.dayLimitCount}}件</p>
			</div>
		</div>
		
	</div>
</template>

<script>
	
	export default{
		data : function() {
			return{
				goodsImg:'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/cca6d92c415c41028ed89bda3e681c66340f4a63',
//				bannerImg:JSON.parse(localStorage.getItem("bannerImg")),
//				overSeaImg:JSON.parse(localStorage.getItem("overSeaImg")),
				pageObj:{
					page:1,
				},
				curObj:[],
				typeList:0,
				isMore:true,
				imgObj:[],
				shareData : {
					'title': "OL圈 试用中心",
					'description': "试，是一种态度。每日整点限量抢试！还有更多新品、海外产品期待您来试用体验！",
					'url': "",
					'picURL': "http://ol-site.olquan.com/plug/mobile/img/logoo.jpg",
					'hide':true,
					'share':false
				},
			}
		},
		created: function() {
			if(this.$route.query.memberId=='undefined'){
				this.$route.query.memberId='';
			}
			if(this.$route.params.id==2){
				this.$store.commit('documentTitle','新品首试');
				this.typeList=1;
			}else if(this.$route.params.id==4){
				this.$store.commit('documentTitle','试海外');
				this.typeList=2;
			}
			
			this.getSpecialGoods();
			this.getIndexImg();
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			getSpecialGoods(){
				
				let data={
					page:this.pageObj.page,
					rows:20,
					type:this.$route.params.id
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getFreeUseProducts,data,this.getSpecialGoodsBack);
			},
			getSpecialGoodsBack(data){
				
				this.curObj=data.result;
				this.shareData.url=USE_URL+"weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+"try/newCenter");
				//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'try/center');
				this.addWeixinShare();//微信分享 				
				
			},
			//查看商品详情
			getGoods(id){
				
				this.$router.push({path:'/demo/iscroll/id/'+id+'?memberId='+this.$route.query.memberId+'&isShare=0'});
			},
			//获取试用展示图
			getIndexImg(){
				let data = {
					type:this.typeList
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.freeUseIndexImg,data,this.getIndexImgBack);
				
			},
			getIndexImgBack(data){
				if(this.typeList==1){
					this.imgObj=data.result.firstUseImg;
				}else if(this.typeList==2){
					this.imgObj=data.result.overSeasImg;
				}
				
				console.log(this.imgObj)
			},
			//获取精品试用产品分页数据
			handleScroll(){
				var height=document.body.scrollHeight;
//				console.log(height)
  				this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				var windowH=window.innerHeight;
//				console.log(this.scrollTop + windowH)
				if(this.scrollTop + windowH >=height-200){
					
		  			if(this.isMore){
		 				this.isMore=false;
		 				let data={
		  					page:this.pageObj.page+1,
		  					rows:20,
		  					type:this.$route.params.id,
		  				};
		  				this.pageObj.page=this.pageObj.page+1
						this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getFreeUseProducts,data,this.getSpecialGoodsMoreBack);
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
				for(let i=0; i<data.result.length; i++){
					this.curObj.push(data.result[i])
				}
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
	.severalTry{
		img{
			pointer-events: none;
		}
		.goodslTry{
			padding: .30rem .20rem;
			background: #fff;
			margin-top: .20rem;
			.goodsImg{
				border-radius: 0.06rem;
				width: 100%;
				height:2.80rem;
				img{
					display: block;
					width: 100%;
					border-radius: 0.06rem;
					height: 100%;
				}
			}
			.goodsName{
				margin-top: .12rem;
				width: 100%;
				line-height: .34rem;
				color: #333;
				overflow: hidden;
				font-size: .26rem;
				max-height: .68rem;
			}
			.goodsDesc{
				font-size: .24rem;
				color: #777777;
				line-height: .48rem;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.goodsPrice{
				
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
					span{
						font-size: .34rem;
						color: #E5006E;
					}
				}
				
			
			}
		}
	}
</style>