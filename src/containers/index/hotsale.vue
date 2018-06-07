<template>
	<div class="hotsale">
		<Linking></Linking>
		<div class="saletop">
			<p class="sale-t-l" v-bind:class="{ 'back': xuanzhong==0}" @click="getToday">今日秒杀</p>
			<p class="sale-t-r" v-bind:class="{ 'back': xuanzhong==1}" @click="getTomorrow">明日预告</p>
		</div>
		<div v-for="(item,index) in curObj">
			<div class="timelist" v-show="xuanzhong!=1">
				<div class="timetop" v-show="item.type==1">
					<img :src="shengTimeImg"/>
					{{item.hourTime}} 即将开始
				</div>
				<div class="timetop" v-show="item.type==2" style="color: #ed0477;">
					<img :src="dianImg"/>
					{{item.hourTime}}正在秒杀
				</div>
				<div class="timebot" v-show="item.type==1">
					距开始还剩：<scroll :Time="item.plusTime"></scroll>
				</div>
				<div class="timebot" v-show="item.type==2">
					距结束还剩：<scroll :Time="item.plusTime"></scroll>
				</div>
			</div>
			<div class="goods-name" v-for="(itemSon,indexSon) in item.togetherProducts">
				<div style="padding:  .20rem .24rem;overflow: hidden;border-bottom: .01rem solid #ddd;">
					<div class="food" >
						<div class="fodImg" @click="getBuyGood(itemSon.togetherId)">
							<img :src="itemSon.productImage"/>
							<img :src="soldImg"  class="isSold" v-show="itemSon.plusPercent==0"/>
						</div>
						<div class="fodName">
							<p class="productName" @click="getBuyGood(itemSon.togetherId)" style="height: .76rem;overflow: hidden;"><i class="tagName" v-show="itemSon.tagName!='' && itemSon.togetherTagType!=1">{{itemSon.tagName}}</i>{{itemSon.productName}}</p>
							<div style="overflow: hidden; padding-bottom: .85rem;" @click="getBuyGood(itemSon.togetherId)">
								<div class="progressNum" v-show="item.type==2">
									已抢{{itemSon.limitBuyedCount}}件
								</div>
								<div class="progress" v-bind:class="{'specialpro':item.type!=2}">
									<p v-show="item.type==2" class="use"></p>
									<p v-show="item.type==2" class="number">{{100-itemSon.plusPercent}}%</p>
									<div v-show="item.type==2" class="bei">
										<p v-bind:style="{width:100-itemSon.plusPercent+'%'}"></p>
									</div>
									
									<p style="color: #FD89B2;" v-show="item.type!=2 && xuanzhong==0">限量{{itemSon.limitStore}}件 | {{item.hourTime}}开抢</p>
								    <p style="color: #FD89B2;font-size: .24rem; width: 2.90rem;" v-show="item.type!=2 && xuanzhong==1">限量{{itemSon.limitStore}}件 | {{itemSon.hourTime}}开抢</p></div>
							</div>
							
							<div class="gotry">
								<span style="font-size:.24rem ;color: #ed0276; line-height: .60rem;">￥
									<b style="font-size: .36rem;">{{itemSon.price}}</b>
									<i style="font-style: normal;text-decoration:line-through;color: #999;">￥{{itemSon.marketPrice}}</i>
								</span>
								<span class="spebot specialBot" v-show="itemSon.isAddTogetherLimitRemind==0 && item.type!=2 && showBuy==false" @click="remind(itemSon.togetherHourTimeId,item.togetherHourTimeId,itemSon.togetherId,index,itemSon.curIndex,indexSon)"><img :src="colckImg"/>提醒我</span>
								<span class="spebot" style="background: #dcdcdc;" v-show="itemSon.isAddTogetherLimitRemind==1 && item.type!=2 || showBuy==true" @click="moveRemind(itemSon.togetherHourTimeId,item.togetherHourTimeId,itemSon.togetherId,index,itemSon.curIndex,indexSon)"><img :src="colckImg"/>已提醒</span>
								<!--<span class="spebot" style="background: #dcdcdc;" v-show="itemSon.plusPercent==0" >已抢光</span>-->
								<span class="spebot" v-show="item.type==2" style="background: #ed0477;" @click="getBuyGood(itemSon.togetherId)">马上抢<img :src="rowtopImg" class="rowtop"/></span>
							</div>
							
						</div>
					</div>
				</div>
				
				<div class="tagImg">
					<img :src='itemSon.tagLogo' v-show="itemSon.togetherTagType!=2"/>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Scroll from '../../components/common/time.vue'
	export default {
		
		data : function(){
			
			return{
				shengTimeImg:'/static/images/shengtime.png',
				goodsImg:'/static/images/goodsImg.png',
				colckImg:'/static/images/clock.png',
				dianImg:'/static/images/dian.png',
				rowtopImg:'/static/images/row.png',
				soldImg:'/static/images/soldOut.png',
				xuanzhong:0,
				perWidth:0,
				type:1,
				curObj:[],
				day:'',
				hour:'',
				mint:'',
				secon:'',
				time:'',
				showBuy:false,
				scrollTop:0,
				isMore:true,
				pageObj:{
					page:1,
				},
				togetherHour:0,
				curTargetSm:0,
				curTargetS:0,
				curTargetSon:0,
				shareData : {
					'title': "OL圈拼团",
					'description': "限时秒杀 速度来抢",
					'url': "",
					'picURL': "http://ol-h5-preview.olquan.cn/static/images/pinpin.png",
					'hide':true,
					'share':false
				},
				offsetTop:0,
				
			}
		},
		created: function() {
			this.$store.commit('documentTitle','限时秒杀');
			this.getList();
			this.addRecord();
			//this.locationHref();
		},
		components: {
	      Scroll,
	    },
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
			
			
		},
		methods:{
			//添加访问记录
			addRecord(){
  				let data = {
  					terminalType:5,
  					pageuri:'index/hotsale'
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,data,this.addRecordBack,this);
  			},
  			addRecordBack(data){},
			locationHref(){
				//
				//window.location.reload(true)
				this.keyId=this.getCookie('hotsale')
				if(this.keyId=='1'){
					//window.location.href="javascript"
					return false;
				}
				window.location.href=location.href;
				
				this.setCookie('hotsale','1');
				
				
			},
			//点击马上抢
			getBuyGood(id){
				//window.location.href=CUR_URLBACK+'index/goodsDetali/id/'+id+'?memberId='+this.$route.query.memberId+'&isLimit=1'
				this.$router.push({path:'/index/goodsDetali/id/'+id+'?memberId='+this.$route.query.memberId+'&isLimit=1'});
			},
			getToday(){
				this.type=1;
				this.xuanzhong=0;
				this.getList();
			},
			getTomorrow(){
				this.type=2;
				this.xuanzhong=1;
				this.getList();
			},
			//提醒
			remind(togetherHourTimeId,id,togetherId,index,curIndex,indexSon){
				//console.log(indexSon);
				//console.log(index);
				this.curTargetS=curIndex
				this.curTargetSon=indexSon;
				this.curTargetSm = index;
				if(this.type==1){
					this.togetherHour=id;
				}
				if(this.type==2){
					this.togetherHour=togetherHourTimeId
				}
				//console.log(this.type)
//				this.showBuy=true;
				let data={
					togetherId:togetherId,
					togetherHourTimeId:this.togetherHour,
					//memberId:this.$route.query.memberId
				}
				//console.log(this.curObj[this.curTargetSm].togetherProducts[this.curTargetSon])
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addTogetherLimitRemind,data,this.remindBack);
			},
			remindBack(data){
				console.log(data)
				if(data.ok){
					this.$toast('秒杀提醒成功');
					if(this.type==1){
						this.$set(this.curObj[this.curTargetSm].togetherProducts[this.curTargetS],'isAddTogetherLimitRemind',1);
					}else{
						this.$set(this.curObj[this.curTargetSm].togetherProducts[this.curTargetSon],'isAddTogetherLimitRemind',1);
					}
					
				}
			},
			//取消提醒
			moveRemind(togetherHourTimeId,id,togetherId,index,curIndex,indexSon){
				console.log(togetherHourTimeId);
				console.log(id);
				this.curTargetS=curIndex
				this.curTargetSm = index;
				this.curTargetSon=indexSon;
				console.log(index)
				if(this.type==1){
					this.togetherHour=id;
				}
				if(this.type==2){
					this.togetherHour=togetherHourTimeId
				}
				console.log(this.type)
//				this.showBuy=true;
				let data={
					togetherId:togetherId,
					togetherHourTimeId:this.togetherHour,
					//memberId:this.$route.query.memberId
				}
				console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addTogetherLimitRemind,data,this.moveRemindBack);
			},
			moveRemindBack(data){
				console.log(data)
				if(data.ok){
					this.$toast('取消秒杀提醒');
					if(this.type==1){
						this.$set(this.curObj[this.curTargetSm].togetherProducts[this.curTargetS],'isAddTogetherLimitRemind',0);
					}else{
						this.$set(this.curObj[this.curTargetSm].togetherProducts[this.curTargetSon],'isAddTogetherLimitRemind',0);
					}
					
				}
			},
			getList(){
				let data={
					type:this.type,
					//memberId:this.$route.query.memberId
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.limitTimeProducts,data,this.getListBack);
			},
			getListBack(data){
				console.log(123)
				this.curObj=data.result;
				console.log(data.result)
				this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/hotsale');
				//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/hotsale');
				this.tryWeixinShare();//微信分享 	
			},
			//加载更多
  			handleScroll () {
  			  var height=document.body.scrollHeight;
  				//console.log(height)
//			  this.offsetTop = document.querySelector('.topmodel').offsetTop;
  				//console.log(offsetTop)
			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(this.scrollTop)
				if (this.scrollTop > this.offsetTop) {
				    this.searchBarFixed = true;
				} else {
				    this.searchBarFixed = false;
				}
				if(this.scrollTop>600){
					this.showTop=true;
				}else{
					this.showTop=false;
				}
			  var windowH=window.innerHeight;
//			  if(this.scrollTop + windowH >=height-200){
//			  	
//			  	if(this.isMore){
//	 				this.isMore=false;
//	 				let data={
//	  					page:this.pageObj.page+1,
//	  					rows:20,
//	  					isRecommend:this.isRecommend,
//	  					productCategoryId:this.productCategoryId,
//	  					togetherCategoryId:this.togetherCategoryId,
//	  					sort:this.sort
//	  				};
//	  				this.pageObj.page=this.pageObj.page+1
//					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTogetherList,data,this.getListMoreBack);
//	 			}
//			  }
	 			
			},
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
//					this.curObj.push(data.result[i])
//				}
//				//console.log(this.curObj)
//			
//			},
			//微信分享 
			tryWeixinShare:function(){
				var data = {                 
					"url":location.href,
					"callback":'',
				};
			  // console.log(location.href)
			    
			    this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);			
			},
			shareBack:function(data){
				//调用共用的分享接口
				//console.log(JSON.stringify(data.result))
				this.wxShareFun(data.result,this.shareData);
				//this.locationWx(data);
			},
			
		},
		destroyed () {
		  window.removeEventListener('scroll', this.handleScroll)
		  this.setCookie('hotsale','')
		},
	}
</script>

<style lang="scss" scoped>
	.hotsale{
		background: #fff;
		
		.saletop{
			font-size: .28rem;
			background: #fd89b2;
			overflow: hidden;
			color: #fff;
			text-align: center;
			line-height: .88rem;
			.sale-t-l{
				width: 50%;
				float: left;
			}
			.sale-t-r{
				width: 50%;
				float: left;
			}
			.back{
				background: #ed0477;
			}
		}
		.timelist{
			height: 1.18rem;
			.timetop{
				text-align: center;
				font-size: .40rem;
				padding-top: .24rem;
				color: #fd89b2;
				img{
					display: inline-block;
					width: .30rem;
					height: .30rem;
					margin-top: -0.07rem;
					vertical-align: middle;
				}
			}
			.timebot{
				text-align: center;
				margin-top: .20rem;
				font-size: .30rem;
				color: #333;
			}
		}
		.goods-name{
			overflow: hidden;
			position: relative;
			.tagImg{
				position: absolute;
				
				top: 0.20rem;
				width: .80rem;
				left: .50rem;
				img{
					display: block;
					width: 100%;
				}
			}
			.food{
				width: 100%;
				overflow: hidden;
				background: #fff;
				
				float: left;
				
				/*display: flex;
				display:-webkit-box;
				display: -webkit-flex;
				display: -moz-box;
				display: -moz-flex;
				display: -ms-flexbox;
				-webkit-box-pack: center;
			    -moz-box-pack: center;
			    -ms-flex-align:center;
			    -webkit-align-items: center;
			    -moz-align-items: center;
			    align-items: center;*/
				.fodImg{
					
					width: 40%;
					position: relative;
					border-radius: .05rem;
					height: 2.80rem;
					float: left;
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
					img{
						display: block;
						
						width: 100%;
					}
					
				}
				.fodName{
					float: left;
					width: 57.0%;
					margin-left: .20rem;
					font-size: .28rem;
					line-height: .38rem;
					word-wrap: break-word;
					.productName{
						
						.tagName{
			 				font-style: normal;
			 				color: #fa006a;
			 				border: 0.01rem solid #fa006a;
			 				border-radius: 0.05rem;
			 				font-size: .20rem;
			 				margin-right: .10rem;
			 				line-height:.32rem;
			 			}
					}
					.gotry{
						
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
						.spebot{
							display: inline-block;
							width: 1.40rem;
							
							height: .50rem;
							
							color: #FFF;
							background: #fd89b2;
							text-align: center;
							border-radius: .05rem;
							padding-top: .12rem;
							.rowtop{
								display: inline-block;
								width: .15rem;
								height: .24rem;
								vertical-align: middle;
								margin-left: .05rem;
								margin-top: -0.03rem;
							}
							img{
								width: .32rem;
								height: .32rem;
								margin-top: .04rem;
								margin-right: .10rem;
								display: inline-block;
								vertical-align: top;
							}
						}
						/*.specialBot{
							position: absolute;
							right: 0.48rem;
							bottom: 0.64rem;
							z-index: 2222;
						}*/
						
					}
					.progressNum{
						float: right;
						margin-top: .28rem;
						color: #ed0477;
						font-size: .24rem;
					}
					.progress{
						width: 2.70rem;
						height: .32rem;
						margin-top: .30rem;
						float: left;
						
						position: relative;
						.number{
							width: 100%;
							height: 100%;
							text-align: center;
							position: absolute;
							left: 0;
							top: 0;
							z-index: 1111;
							color: #fff;
							font-size: .16rem;
							line-height: .32rem;
						}
						.use{
							position: absolute;
							left: 0;
							top: 0;
							height: .32rem;
							width: 100%;
							border-radius: .34rem;
							border: 0.01rem solid #ed0477;
							line-height: .34rem;
							text-align: center;
							font-size: .24rem;
							color: #fff;
							background: #fd89b2;
							z-index: 333;
						}
						.bei{
							position: absolute;
							width: 100%;
							height: .34rem;
							border-radius: .34rem;
							overflow: hidden;
							
							z-index: 444;
							p{
								height: .32rem;
								border: 0.01rem solid #ed0477;
								background: #ed0477;
							}
						}
					}
					.specialpro{
						width: 3.40rem;
					}
				}
			}
		}
	}
</style>