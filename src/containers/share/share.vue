<template>
	<div class="partake" v-bind:class="{ 'spe': showHeigth===true}">
		<div class="goodsdetail" @click="goGood(curObj.togetherId)">
			<div class="goods-l">
				<img :src='curObj.productImage' />
			</div>
			<div class="goods-r">
				
				<div style="height: 1.435rem;overflow: hidden;">
					{{curObj.productName}}
				</div>
				<p class="bot">
					<span class="top"> &nbsp;{{curObj.count}}人团·已拼{{curObj.joinCount}}件</span><br />
					<span class="xia"><i>￥{{curObj.togetherPrice}}</i> 拼团省{{curObj.economizePrice}}元</span>
				</p>
			</div>
		</div>
		<ul class="list">
			<li v-for="item in curObj.productTags"><img :src='chooseImg'/>{{item}}</li>
			
		</ul>
		<div class="name">
			<ul class="name-list">
				<li v-for="item in curObj.joinMemberData" >
					<img :src="item.memberLogo"/>
					<img :src="speImg"  class="special" v-show="item.isOwner==1"/>
				</li>
				
				<li v-show="curObj.isSuccess!=1" v-for="(itemSon,index) in quesImgList" v-if="index < curObj.plusCount"><img :src="itemSon"/></li>
			</ul>
			
		</div>
		<div class="time">
			<p class="name-time" v-show="curObj.status==0">
				还差<span class="front">{{curObj.plusCount}}</span>个名额，<span class="back">{{hour}}:{{mint}}:{{secon}}</span>后结束
			</p>
			
			<div class="button" @click="buyGoods" v-show="curObj.isJoinTogether==0">
				<p>参与拼团</p>
			</div>
			<div class="button" @click="shareOrder" v-show="curObj.isJoinTogether==1">
				<p>邀请好友拼团</p>
			</div>
		</div>
		<div class="shareDetail" v-show="shareSure" @click="colseShare">
			<div class="share">
				<div class="time" v-show="curObj.status==0">{{hour}}:{{mint}}:{{secon}}</div>
				<img :src="shareImg" />
				<div class="people"><i v-show="curObj.plusCount>0">还差<span>{{curObj.plusCount}}</span>人，</i>赶紧邀请好友来拼团吧</div>
				<div class="sure">点击右上角分享拼团</div>
			</div>
		</div>
		<div class="know">
			<p class="know-l">拼团须知</p>
			<div class="know-r">
				<p></p>
				<span>好友拼团</span>
				<p></p>
				<span>人满发货</span>
				<p></p>
				<span>人不满退款</span>
			</div>
		</div>
		
		<div class="norms" v-show="chooseNor">
			<div class="choose">
				<img class="close" :src="colseImg" @click="closeShow"/>
				<img :src="curObj.productImage"  class="productImage"/>
				<p class="detail">
					<span class="money" style="display: block;" v-if="curObj.normals!=[] && getNomoreObj.valueIds!=undefined && getNomoreObj.valueIds!=''">￥{{getNomoreObj.salePriceView}}</span>
					<span class="money" style="display: block;" v-else>￥{{curObj.activePriceInterval}}</span>
					<span class="num" v-if="showMoney!=0 && getNomoreObj.valueIds!=undefined && getNomoreObj.valueIds!=''">已选规格：{{getNomoreObj.values}}</span>
					<span class="num" v-if="showMoney!=0 && getNomoreObj.valueIds==undefined || getNomoreObj.valueIds==''">请选择规格</span>
					<span class="num" v-if="showMoney==0"></span>
					<!--<span class="num" v-if='this.getNomoreObj.store'>&nbsp;库存{{getNomoreObj.store}}件</span>-->
				</p>
				<!--<div class="noMores" v-for="item in curObj.normals">
					<p class="name">
						{{item.key}}
					</p>
					<p class="size" >
						<span class="special" v-for="(items,index) in item.normses" v-model="getVlaueOne" @click="getValue(index,items.keyId,items.valueId)">{{items.value}}</span>
						
					</p>
				</div>-->
				
				<div class="noMores" v-if="nomoreOne!=undefined">
					<p class="nameClass">
						{{nomoreOne.key}}
					</p>
					<p class="size" >
						<span v-bind:class="{ 'special': index===addSelect}" v-for="(item,index) in nomoreOne.normses"   v-model="getVlaueOne" @click="getVlaueone(index,item.valueId)">{{item.value}}</span>
						
					</p>
				</div>
				<div class="noMores" v-if="nomoreTwo!=undefined">
					<p class="nameClass">
						{{nomoreTwo.key}}
					</p>
					<p class="size" >
						<span v-bind:class="{ 'special': index===addSelectTwo}" v-for="(item,index) in nomoreTwo.normses" @click="getVlauetwo(index,item.valueId)">{{item.value}}</span>
						
					</p>
				</div>
				<div class="noMores" v-if="nomoreThree!=undefined">
					<p class="nameClass">
						{{nomoreThree.key}}
					</p>
					<p class="size" >
						<span v-bind:class="{ 'special': index===addSelectThree}" v-for="(item,index) in nomoreThree.normses">{{item.value}}</span>
						
					</p>
				</div>
				<div class="buyNum">
					<p class="left">购买数量</p>
					<p class="right">
						<span class="del" @click="delNum">
							<img :src="delImg" class="delnum"/>
						</span>
						<span class="num">{{num}}</span>
						<span class="add" @click="addNum">
							<img :src="addImg" class="addnum"/>
						</span>
					</p>
				</div>
				<div class="surePay" @click="goBuything">
					确 定
				</div>
			</div>
		
			
		</div>
		<div class="benefit">
			<ul>
				<li @click="goOne">
					<img :src="indexImg"/>
					<span>首页</span>
				</li>
				<li @click="goTwo">
					<img :src="pinpinImg"/>
					<span>拼团</span>
				</li>
				<li @click="goThree">
					<img :src="zhuanxiangImg"/>
					<span>粉领会员</span>
				</li>
				<li @click="goFour">
					<img :src="shiyongImg"/>
					<span>试用中心</span>
				</li>
				<li @click="goFive">
					<img :src="temaiImg"/>
					<span>品牌特卖</span>
				</li>
				
			</ul>
		</div>
		<!--<div class="content">
			<ul>
				<li v-for="item in listObj" @click="getPordcut(item.productId)">
					<img :src="item.productImage" />
					<p class="top">{{item.productName}}</p>
					<p style="font-size: .28rem;color: #e20630;">￥{{item.price}}</p>
					<p class="botMoney">
						<span class="left">￥{{item.marketPrice}}</span>
						<span class="right" >{{item.score}}</span>
					</p>
				</li>
				
				<li v-show="showTrue" class="special">没有更多了</li>
			</ul>
		</div>-->
		<div class="content">
			<ul>
				<li v-for='item in listObj' @click="goBuy(item.togetherId)">
					<p style="position: relative;">
						<img :src="item.productImage" />
						<img :src="soldOut"  class="soldOut" v-show="item.store==0"/>
					</p>
					
					<p class="top">{{item.productName}}</p>
					<p style="font-size: .30rem;color: #fa006a;font-weight: 700;">￥{{item.price}}
						<span style="color: #b3b3b3;font-size: .24rem;font-weight: normal;" v-show="item.count>0">已拼{{item.count}}件</span>
					</p>
					<p class="botMoney">
						<img v-for="items in item.joinMembers" :src="items.memberLogo" v-show="item.joinMembers.length>0"/>
						<!--<span class="goBuy" v-show="item.joinMembers.length==0">去拼团</span>-->
					</p>
				</li>
				
				<li v-show="showTrue" class="special">没有更多了</li>
			</ul>
		</div>
		<div class="stop" @touchmove.prevent>
			<p>拼团功能已暂停服务</p>
		</div>
	</div>
</template>

<script>
	export default {
		name:'b',
		data : function() {
			return{
				goodsImg:'/static/images/goodsImg.png',
				colseImg:'/static/images/colse.png',
				chooseImg:'/static/images/choose.png',
				quesImg:'/static/images/question.png',
				nameImg:'/static/images/name.png',
				speImg:'/static/images/pin.png',
				delImg:'/static/images/del.png',
				addImg:'/static/images/add.png',
				indexImg:'/static/images/index.png',
				shiyongImg:'/static/images/shiyong.png',
				dajiaImg:'/static/images/dajia.png',
				zhuanxiangImg:'/static/images/zhuanxiang.png',
				pinpinImg:'/static/images/pinpin.png',
				temaiImg:'/static/images/temai.png',
				soldOut:'/static/images/soldOut.png',
				showHeigth:false,
				curObj:[],
				time:'',
				day:'',
				hour:'',
				mint:'',
				secon:'',
				shareImg:'/static/images/share.png',
				shareSure:false,
				getMemberId:'',
				getTogetherRecordId:'',
				nomoreOne:'',
				nomoreTwo:'',
				nomoreThree:'',
				getVlaueOne:'',
				getVlaueTwo:'',
				getVlaueThree:'',
				addSelect:-1,
				addSelectTwo:-1,
				addSelectThree:-1,
				getNomoreObj:'',
				num:1,
				normalId:'',
				chooseNor:false,
				productId:'',
				listObj:[],
				isMore:true,
				pageObj:{
					page:1,
				},
				showTrue:false,
				shareData : {
					'title': "我们一起来拼团吧",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':false
				},
				maxNumber:0,
				showMoney:0,
				quesImgList:[
					'/static/images/question.png',
					'/static/images/question.png',
					'/static/images/question.png',
					'/static/images/question.png',
					'/static/images/question.png',
					'/static/images/question.png',
				],
				showMember:false,
				
			}
		},
		created: function() {
			this.$store.commit('documentTitle','拼团');
			console.log(this.$route.query.id)
			this.getTogetherRecordId=this.getCookie('togetherRecordId')
			console.log(this.getCookie('togetherRecordId'))
			//console.log(this.$route.params.id)
			//this.getList();
			this.addRecord();
			this.getMember();
			this.getList();
			this.moveTime();
			
			
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
			 	
		},
		methods:{
			//添加访问记录
			addRecord(){
  				let data = {
  					terminalType:5,
  					pageuri:'share/share'
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,data,this.addRecordBack,this);
  			},
  			addRecordBack(data){},
			//点击首页
			goOne(){
				if(this.showMember){
					window.location.href=CUR_URLBACK+'index/pinkIndex';
				}else{
					window.location.href=CUR_URLBACK+'index/newIndex';
				}
				//window.location.href=USE_URL+'ol/weixin/index/modelVM?code=index&memberId='+this.getCookie("memberId");
			},
			//点击拼团
			goTwo(){
				window.location.href=CUR_URLBACK+'index/newIndex';
			},
			//点击粉领专享
			goThree(){
				window.location.href=CUR_URLBACK+'mine/index';
			},
			//点击试用中心
			goFour(){
				if(this.showMember){
					window.location.href=CUR_URLBACK+'try/newCenter';
				}else{
					this.$toast('试用中心仅粉领可用');
				}
			},
			//点击品牌特卖
			goFive(){
				window.location.href=USE_URL+'ol/weixin/index/indexRecommendBrand';
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
			},
			getList(){
				let data={
					//memberId:this.$route.query.memberId,
					//togetherRecordId:this.$route.query.id,
					togetherRecordId:this.$route.query.id,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.togetherRecordDetail,data,this.getListBack,this);
			},
			getListBack(data){
				if(data.result){
					this.curObj=data.result;
				}else{
					this.curObj=[]
				}
				console.log(data.result.normals)
				if(data.result.normals.length!=0){
					
					if(data.result.normals.length>0 && data.result.normals.length<2){
						this.nomoreOne=data.result.normals[0];
						console.log(this.nomoreOne)
						//this.getVlaueOne=data.result.normals[0].normses[0].valueId;
						
					}else if(data.result.normals.length>1){
						this.nomoreOne=data.result.normals[0];
						console.log(this.nomoreOne)
						//this.getVlaueOne=data.result.normals[0].normses[0].valueId;
						this.nomoreTwo=data.result.normals[1];
						//this.getVlaueTwo=data.result.normals[1].normses[0].valueId;
						this.nomoreThree=data.result.normals[3]
					}
					console.log(this.nomoreThree)
				}
				this.productId=data.result.productId;
				//this.getValueDetail();
				this.getOrderDetail();
				this.time=this.curObj.endTime.replace(/-/g,"/");
				this.shareData.picURL=this.curObj.productImage;
				this.showMoney=this.curObj.normals.length;
				console.log(this.showMoney)
				this.shareData.url="https://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'share/share?id='+this.$route.query.id);
				//this.shareData.url="https://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'share/share?id='+this.$route.query.id);
				this.shareData.title='【OL圈拼团】我花了'+this.curObj.togetherPrice+'元买了'+this.curObj.productName;
				this.shareData.description=this.curObj.productDesc;
				this.addWeixinShare();//微信分享
			},
			//点击购买商品
  			goBuy(id){
  				this.$router.push({path:'/index/goodsDetali/id/'+id+'?isLimit=0'});
  				//window.location.href=CUR_URLBACK+'index/goodsDetali/id/'+id+'?memberId='+this.$route.query.memberId+'&isLimit=0'
  			},
			//获取产品相关推荐
			getOrderDetail(){
				let data={
					//productId:this.productId
//					productId:6748
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getBestTogetherList,data,this.getOrderDetailBack,this);
			},
			getOrderDetailBack(data){
				console.log(data)
				this.listObj=data.result;
				
			},
//			//获取更多
//			handleScroll () {
//			  var height=document.body.scrollHeight;
//				//console.log(height)
//			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//				//console.log(this.scrollTop)
//			  var windowH=window.innerHeight;
//			  if(this.scrollTop + windowH >=height-200){
//			  	if(this.isMore){
//	 				this.isMore=false;
//	 				let data={
//	  					page:this.pageObj.page+1,
//	  					rows:20,
//	  					productId:this.productId
//	  				};
//	  				this.pageObj.page=this.pageObj.page+1
//					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.recommendProduct,data,this.getListMoreBack);
//	 			}
//			  }
//	 			
//			},
//			getListMoreBack(data){
//				if(data.result.length<20){
//					this.isMore=false;
//					this.showTrue=true;
//				}else{
//					this.isMore=true;
//				}
//				
//				
//				for(let i=0; i<data.result.length; i++){
//					this.listObj.push(data.result[i])
//				}
//				//console.log(this.curObj)
//			
//			},
			//点击相关产品
			getPordcut(id){
				console.log(id)
				window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id;
			},
			getRtime(){
				
			    var EndTime= new Date(this.time);
			    //console.log('2017/11/04 00:00:00')
			    var NowTime = new Date();
			    //console.log(EndTime)
			    var t =EndTime.getTime() - NowTime.getTime();
			   // console.log(t)
			    var d=0;
			    var h=0;
			    var m=0;
			    var s=0;
			    if(t>=0){
			      d=check(Math.floor(t/1000/60/60/24));
			      h=check(Math.floor(t/1000/60/60%24));
			      m=check(Math.floor(t/1000/60%60));
			      s=check(Math.floor(t/1000%60));
			    } 
			    function check(i){
		 			if(i<10){
		 				i = "0" + i; 
		 			}
		 			return i; 
		 		}
			    this.day=d;
			    this.hour=h;
			    this.mint=m;
			    this.secon=s;
			},
			moveTime(){
				let _this=this
				console.log(this)
				setInterval(_this.getRtime,0)
			},
			shareOrder(){
				this.shareSure=true;
			},
			colseShare(){
				this.shareSure=false;
			},
			buyGoods(){
				this.$toast('拼团功能已经暂停服务');
				//console.log(id);
//				this.chooseNor=true;
//				this.showHeigth=true;
				//window.location.href='http://test-mobile.olquan.cn/ol/confirmOrder1.html?num='+this.$route.query.num+'&'+'normalId='+'&'+'memberId='+this.getCookie("memberId")+'&'+'togetherId='+this.$route.query.togetherId +'&'+'togetherRecordId='+this.$route.query.id
			},
			closeShow(){
				this.chooseNor=false;
				this.showHeigth=false;
			},
			getValue(id,valueKey,valueId){
				console.log(id)
				console.log(valueKey)
				console.log(valueId)
//				if(this.nomoreOne==valueKey){
//					this.getVlaueOne=valueId;
//				}
//				if(this.nomoreTwo==valueKey){
//					this.getVlaueTwo=valueId;
//				}
				
			},
			getVlaueone(index,valueId){
				this.addSelect=index;
				
				this.getVlaueOne=valueId;
				this.getValueDetail();
			},
			getValueDetail(){
				let data={
					productId:this.curObj.productId,
					valueIds:this.getVlaueOne+','+this.getVlaueTwo,
					uutype:1,
					//memberId:this.$route.query.memberId,
					type:this.curObj.type
				}
				console.log(this.getVlaueOne)
				console.log(this.getVlaueTwo)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getNormal,data,this.getNormalBack,this);
			},
			getVlauetwo(index,valueId){
				this.addSelectTwo=index;
				this.getVlaueTwo=valueId;
				this.getValueDetail();
			},
			getNormalBack(data){
				console.log(data);
				if(data.result!=null){
					this.getNomoreObj=data.result;
				}else{
					this.getNomoreObj='';
				}
				
				if(data.result.norms.length>0){
					this.normalId=data.result.id;
				}else{
					this.normalId=''
				}
				console.log(this.normalId)
			},
			delNum(){
				this.num -=1;
				if(this.num<=0){
					this.num=1;
				}
			},
			addNum(){
				this.num +=1;
				if(this.num>this.curObj.limitBuyCount){
					this.num=this.curObj.limitBuyCount;
					this.$toast('该产品最多购买'+this.num+'件');
				}
			},
			goBuything(){
				this.setCookie('number','')
				let data={
					num:this.num,
					normalId:this.normalId,
					//memberId:this.$route.query.memberId,
					togetherId:this.curObj.togetherId,
					togetherRecordId:this.$route.query.id
				}
				if(this.normalId=='' && this.showMoney!=0){
					this.$toast('请选择规格');
				}else{
					//console.log(data)
					window.location.href=USE_URL+'ol/confirmOrder1.html?num='+this.num+'&type='+this.curObj.type+'&normalId='+this.normalId+'&'+'togetherId='+this.curObj.togetherId +'&'+'togetherRecordId='+this.$route.query.id
				}
				

			},
			goGood(id){
				console.log(id)
				this.$router.push({path:'/index/goodsDetali/id/'+id+'?isLimit=0'});
				//window.location.href=API_HOST+'weixin/product/newProductDetail?productId='+id+'&memberId='+this.getCookie("memberId")
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
.spe{
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
}
.partake{
	
	width: 100%;
	min-height: 100%;
	
	position: relative;
	.know{
		overflow:hidden;	
		font-size: .28rem;
		padding:0 .24rem;
		background: #fff;
		line-height: .50rem;
		
		.know-l{
			float: left;
		}
		.know-r{
			float: right;
			color: #949494;
			display: inline-block;
			p{
				display: inline-block;
				height: .05rem;
				width: .05rem;
				background: #949494;
				border-radius: 50%;
				vertical-align: middle;
				
			}
			
			
		}
	}
	
	.goodsdetail{
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
		padding: .24rem;
		background: #fff;
		
		.goods-l{
			
			height: 2.20rem;
			width: 2.20rem;
			img{
				height: 2.20rem;
				width: 2.20rem;
				display: block;
			}
			
		}
		.goods-r{
			width: 65%;
			
			overflow: hidden;
			margin-left: .24rem;
			line-height: .36rem;
			font-size: .30rem;
			position: relative;
			.bot{
				position: absolute;
				left: 0;
				bottom: 0;
				.top{
					font-size: .24rem;
					color: #a9a9a9;
				}
				.xia{
					font-size: .24rem;
					color: #a9a9a9;
					i{
						font-style: normal;
						font-size:.32rem;
						color: #e51072;
					}
				}
			}
		}
	}
	.list{
		display: flex;
		display:-webkit-box;
	    display: -moz-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: -moz-flex;
		padding: 0 .24rem;
		-webkit-justify-content:flex-start;
		justify-content:flex-start;
		-moz-box-pack:flex-start;
		-webkit--moz-box-pack:flex-start;
		font-size: .24rem;
		background: #f2f2f2;
		
		li{
			line-height: .64rem;
			position: relative;
			padding-left: .38rem;
			margin: 0 .20rem ;
			img{
				display: inline-block;
				height: .28rem;
				width: .28rem;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -.14rem;
				border-radius: 50%;
			}
		}
	}
	.name{
		background: #fff;
		display: flex;
		width: 100%;
		display:-webkit-box;
	    display: -moz-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    -webkit-justify-content:center;
		justify-content:center;
		-moz-box-pack:center;
		-webkit--moz-box-pack:center;
		
		
		.name-list{
			width: 6.10rem;
			display: flex;
			display: -moz-flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
			flex-wrap:wrap;
			-webkit-flex-wrap:wrap;
		    -webkit-box-lines:multiple;
		    -moz-flex-wrap:wrap;
			-webkit-justify-content:center;
			justify-content:center;
			-moz-box-pack:center;
			-webkit--moz-box-pack:center;
			font-size: .24rem;
			padding:.40rem 0;
			
			li{
				
				margin: 0.05rem .16rem;
				position: relative;
				
				img{
					display: inline-block;
					height: .80rem;
					width: .80rem;
					border-radius: 50%;
					
				}
				.special{
					display: inline-block;
					width: .58rem;
					height: .32rem;
					position: absolute;
					left: -.18rem;
					top: -.10rem;
					
				}
			}
			
		}
		
	}
	.time{
		background: #FFF;
		padding-bottom: .20rem;
		.name-time{
			font-size: .36rem;
			text-align: center;
			color: #333;
			margin-bottom: .40rem;
			.front{
				color: #ff3892;
				font-weight: 700;
			}
			.back{
				font-weight: 700;
			}
		}
		.button{
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
			p{
				width: 7.02rem;
				height: .88rem;
				background:#fe3491 ;
				border-radius: 0.05rem;
				font-size: .32rem;
				color: #fff;
				text-align: center;
				line-height: .88rem;
			}
			
			
			/*position: absolute;
			left: 50%;
			margin-left: -3.51rem;
			bottom: 0.20rem;*/
		}
	}
	.shareDetail{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 222;
		background: rgba(0,0,0,.8);
		.share{
			
			.time{
				background:none;
				font-size: .28rem;
				text-align: center;
				width: 100%;
				color: #fff;
				line-height: .76rem;
				position: absolute;
				top: 0;
			}
			img{
				width: 1.60rem;
				height: 1.64rem;
				position: absolute;
				right: .40rem;
				top: .40rem;
			}
			.people{
				margin-top: 2.36rem;
				color: #fff;
				font-size: .36rem;
				text-align: center;
				span{
					color: #ff3892;
					
				}
				i{
					font-style: normal;
				}
			}
			.sure{
				font-size: .28rem;
				text-align: center;
				color: #fff;
				margin-top: .50rem;
			}
		}
	}
	
	.norms{
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		z-index: 999;
		background: rgba(0,0,0,.5);
		
		.choose{
			position: absolute;
			left: 0;
			bottom: 0;
			min-height: 1.56rem;
			width: 100%;
			background: #fff;
			.productImage{
				position: absolute;
				left: .26rem;
				top: -.20rem;
				height: 1.56rem;
				width: 1.56rem;
				display: block;
			}
			.close{
				display: block;
				position: absolute;
				left: 6.90rem;
				top: 0.26rem;
				z-index: 222;
				height: .32rem;
				width: .32rem;
			}
			.detail{
				font-size: .26rem;
				padding-left: 2.04rem;
				height: 1.56rem;
				.money{
					line-height: .50rem;
					font-weight: 700;
					font-size: .36rem;
					color: #fe3491;
				}
				.num{
					font-size: .20rem;
					
				}
			}
			.noMores{
				
				.nameClass{
					font-size: .26rem;
					margin-left: .26rem;
					line-height: .80rem;
				}
				.size{
					overflow: hidden;
					padding-left:.26rem ;
					span{
						margin: 0 .20rem .20rem 0;
						float: left;
						height: .54rem;
						min-width: 1.20rem;
						border: 0.01rem solid #cfcfcf;
						font-size: .24rem;
						text-align: center;
						line-height: .56rem;
					}
					.special{
						border: .01rem solid #e30067;
						color: #e30067;
					}
				}
			}
		}
		.buyNum{
			font-size: .26rem;
			padding: .26rem;
			overflow: hidden;
			
			.left{
				float: left;
				line-height: .50rem;
			}
			.right{
				float: right;
				overflow: hidden;
				.num{
					float: left;
					line-height: .50rem;
					font-size: .32rem;
					min-width: .48rem;
					text-align: center;
					
				}
				.del{
					
					float: left;
					height: .48rem;
					width: .48rem;
					
					vertical-align: middle;
					text-align: center;
					line-height: .50rem;
					font-size: .48rem;
					margin-right: .20rem;
					.delnum{
						display: block;
						height: 100%;
						width: 100%;
					}
				}
				.add{
					float: right;
					height: .48rem;
					width: .48rem;
					color: #e30067;
					line-height: .50rem;
					font-size: .48rem;
					
					vertical-align: middle;
					text-align: center;
					margin-left: .20rem;
					.addnum{
						display: block;
						height: 100%;
						width: 100%;
					}
					
				}
			}
		}
		.surePay{
			width: 100%;
			background: #e30067;
			font-size: .34rem;
			color: #fff;
			line-height: 1rem;
			text-align: center;
		}
	}
	.benefit{
			margin-top: .20rem;
			padding: 0.20rem .40rem 0;
			background: #fff;
			ul{
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
				
				li{
					margin-bottom: .20rem;
					font-size:0.24rem;
					text-align: center;
					width: 20%;
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
					
					span{
						color: #666666;
						display: block;
					}
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
		.content{
		padding: .20rem .12rem;
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
				width: 49.5%;
				padding-bottom: .20rem;
				background: #fff;
				margin-bottom:.10rem;
				position: relative;
				.soldOut{
					position: absolute;
					left:50% ;
					margin-left: -.90rem;
					top: 50%;
					margin-top: -.90rem;
					display: block;
					width: 1.80rem;
					height: 1.80rem;
					
				}
				img{
					display: block;
					width: 100%;
					
				}
				.top{
					font-weight: normal;
					font-size: .30rem;
					color: #333;
					line-height: .45rem;
					height: .86rem;
					overflow: hidden;
					padding: .08rem;
					margin-bottom: .25rem;
				}
				.botMoney{
					display: block;
					overflow: hidden;
					font-size: .20rem;
					color: #b2b2b2;
					
					font-style: normal;
					position: absolute;
					right: 0;
					bottom: .10rem;
					z-index: 222;
					width: 100%;
					height: .48rem;
					padding-right: .24rem;
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
						height: .48rem;
						width: .48rem;
						border-radius: 50%;
						
					}
					img:nth-child(1){
						position: absolute;
						right: .12rem;
						top: 0;
						z-index: 200;
					}
					img:nth-child(3){
						position: absolute;
						right: .58rem;
						top: 0;
						z-index: 206;
					}
					img:nth-child(2){
						position: absolute;
						right: .36rem;
						top: 0;
						z-index: 202;
					}
				}
			}
		}
	}
	.stop{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
		z-index: 999;
		color: #fff;
		text-align: center;
		line-height:.72rem;
		font-size: .36rem;
		display: flex;
		display:-webkit-box;
	    display: -moz-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: -moz-flex;
	    -webkit-align-items: center;
	    -moz-align-items: center;
	    align-items: center;
		p{
			width: 100%;
		}
	}
}

</style>