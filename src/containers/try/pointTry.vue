<template>
	<div class="pointTry">
		<Linking></Linking>
		<ul class="topTry">
			<li v-bind:class="{ 'speLi': index===addSelect}" v-for="(item,index) in timeTry" @click="getTime(index)">{{item}}</li>
		</ul>
		<div class="severalTime" v-show="addSelect==0">
			<div style="padding: 0 .80rem;">
				<ul class="listLess" v-show="showLength<=5">
						<li v-for="(item,index) in timeObj" v-bind:class="{ 'speLi': selectLi==index}" @click="getTimeGoods(item.time,index,item.isStarted)">
							<p>{{item.time}}</p>
							<p class="spePel" v-bind:class="{ 'speLi': selectLi==index}" v-show="item.isStarted==1">抢试中</p>
							<p class="spePel" v-bind:class="{ 'speLi': selectLi==index}" v-show="item.isStarted!=1">预热中</p>
						</li>
						
					</ul>
					<ul class="listMore" v-show="showLength>5">
						<li v-for="(item,index) in timeObj" v-bind:class="{ 'speLi': selectLi==index}" @click="getTimeGoods(item.time,index,item.isStarted)">
							<p>{{item.time}}</p>
							<p class="spePel" v-bind:class="{ 'speLi': selectLi==index}" v-show="item.isStarted==1">抢试中</p>
							<p class="spePel" v-bind:class="{ 'speLi': selectLi==index}" v-show="item.isStarted!=1">预热中</p>
						</li>
					</ul>
			</div>
		</div>
		<div class="timeTryGoods">
			<div class="tryGoodsDetail" v-for="(item,index) in timeGoodsObj" @click="getGoods(item.productId)">
				<div class="goodsImg">
					<img class="goods-img" v-lazy="item.image" />
					<img class="tryOut" :src="tryImgone" v-show="item.percent=='100%'" />
				</div>
				<div class="goods-detail">
					<div class="goodsName">
						<!--<span v-show="item.countryIcon!=null" style="font-size: 0;"><img style="display: inline-block;height: .18rem;width: .28rem;" :src="item.countryIcon"/></span>
						<span style="color:#E72F7D;font-size: .24rem;">{{item.countryName}}</span>-->
						<span>{{item.productName}}</span>
					</div>
					<div class="goodsNum" v-show="addSelect==0">
						<div class="progress">
							<div class="num">已试用{{item.percent}}</div>
							<div class="porNum"v-bind:style="{width:item.percent}"></div>
						</div>
						<div class="uesNum">已试{{item.buyCount}}件</div>
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
		
	</div>
</template>

<script>
	
	export default{
		data : function() {
			return{
				goodsImg:'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/cca6d92c415c41028ed89bda3e681c66340f4a63',
				dianImg:'/static/images/dian.png',
				useImgone:'/static/images/use.jpg',
				tryImgone:'/static/images/tryOut.png',
				tryRowImg:'/static/images/tryRow.png',
				timeTry:['今日疯抢','明日预告'],
				showLength:0,
				addSelect:0,
				selectLi:-1,
				timeObj:[],
				timeList:0,
				whom: [],
				timeGoodsObj:[],
				gender:'',
				pageObj:{
					page:1,
				},
				isMore:true,
				isTime:'',
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
			this.$store.commit('documentTitle','整点试');
			this.getWholeTime();
			this.getFristGoods();
		},
		mounted(){
			
			window.addEventListener('scroll', this.getDayGoods);
			window.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			getTime(index){
				this.addSelect=index;
				this.isTime='';
//				this.selectLi='';
//				console.log(this.isTime)
				this.isMore=true;
				this.pageObj.page=1;
				
				if(index==0){
					this.getWholeTime();
					this.getTimeGoods();
				}else{
					this.getTodayOrTow(index)
				}
				
			},
			//获取当天整点抢试用时间
			getWholeTime(){
				let data = {
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getWholePointFreeUseTimes,data,this.getWholeTimeBack);
			},
			getWholeTimeBack(data){
				console.log(data.result)
				this.showLength=data.result.length;
				this.timeObj=data.result;
				for(let i=0;i<data.result.length;i++){
					if(data.result[i].isCurrentActivity==1){
						this.selectLi=i;
						this.timeList=data.result[i].time;
						this.isTime=data.result[i].time;
					}
				}
				this.shareData.url=USE_URL+"weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+"try/newCenter");
				//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'try/center');
				this.addWeixinShare();//微信分享 
			},
			//获取产品
			getTodayOrTow(id){
				let data ={
					page:1,
					rows:10,
					wholePointDateType:id,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getWholePointFreeUseProducts,data,this.getFristGoodsBack);
			},
			getFristGoods(){
				let data ={
					page:1,
					rows:20
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getWholePointFreeUseProducts,data,this.getFristGoodsBack);
			},
			getFristGoodsBack(data){
				this.timeGoodsObj=data.result;
				console.log(this.timeList)
				
			},
			//点击某个时间点
			getTimeGoods(time,index){
				this.selectLi=index;
				this.isTime=time;
				this.isMore=true;
				this.pageObj.page=1;
				let data = {
					page:1,
					rows:20,
					time:time
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getWholePointFreeUseProducts,data,this.getFristGoodsBack);
			},
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
		  					time:this.isTime,
		  					wholePointDateType:this.addSelect
		  				};
		  				this.pageObj.page=this.pageObj.page+1
						this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getWholePointFreeUseProducts,data,this.getSpecialGoodsMoreBack);
		 			}
				}
			
			},
			getSpecialGoodsMoreBack(data){
				if(data.result.length<20){
					this.isMore=false;
//					this.showTrue=true;
				}else{
					this.isMore=true;
				}
				for(let i=0; i<data.result.length; i++){
					this.timeGoodsObj.push(data.result[i])
				}
			},
			//查看商品详情
			getGoods(id){
				if(this.addSelect==1){
					this.$router.push({path:'/demo/iscroll/id/'+id+'?memberId='+this.$route.query.memberId+'&isShare=0&viewType=1'});
				}else{
					this.$router.push({path:'/demo/iscroll/id/'+id+'?memberId='+this.$route.query.memberId+'&isShare=0'});
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
		}
	}
</script>

<style lang="scss" scoped>
	.pointTry{
		img{
			pointer-events: none;
		}
		.topTry{
			font-size:0;
			li{
				width: 50%;
				text-align: center;
				color: #fff;
				background: #FC89B2;
				display: inline-block;
				font-size: .30rem;
				line-height: .90rem;
			}
			.speLi{
				background: #E50F72;
			}
		}
		.severalTime{
			padding: .39rem 0;
			background: #f7f7f7;
			color: #333;
			font-size: .30rem;
			.nowTime{
				font-size: 0;
				img{
					display: inline-block;
					width: .24rem;
					height: .24rem;
				}
				span{
					margin-left: .08rem;
					display: inline-block;
					font-size: .30rem;
					color: #333;
				}
			}
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
				
			}
			.spePel{
				margin-top: .10rem;
				font-size: .22rem;
				color: #777;
				
			}
			.speLi{
				color: #E50F72;
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
	}
</style>