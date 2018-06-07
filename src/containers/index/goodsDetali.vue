<template>
	<div class="goodsDetail">
		<div>
			<Linking v-show="!getCouponList"></Linking>
		    <!--<swiper :aspect-ratio="1/1":list="imgList" dots-position="center" :auto='true' :loop="true"></swiper>-->
		    <Swiper :aspect-ratio="1/1" loop auto  dots-position='center' ref="swiper" >
		      <swiper-item style="overflow: hidden; height: 100%;" class="swiper-demo-img" v-for="(itemsSon, index) in imgList" :key="index"><img style="width: 100%;" :src="itemsSon.img" ></swiper-item>
		    </Swiper>
		    <div class="soldOut">
		    	<img :src="soldImg"  class="isSold" v-show="curObj.store==0"/>
		    </div>
		    <div class="detailTime" v-show="isType==12 && showSure==true">
		    	<div style="overflow: hidden; float: left;">
		    		<div class="timeLeft"><span>￥<b style="font-size: .66rem;">{{curObj.salePrice}}</b></span><span  style="text-decoration:line-through;">￥{{curObj.marketPrice}}</span></div>
		    		<div class="timeEnd">
						<span class="Endtiem">
							<img :src="clockImg" />
							限时秒杀
						</span> 
			    		<span class='timeEndS' v-show="curObj.status!=1"><b>{{hour}}</b><i> : </i><b>{{mint}}</b><i> : </i><b>{{secon}}</b></span>
			    		<span style="font-size: .26rem;" v-show="curObj.status==1">限量 {{curObj.togetherLimitCount}} 件</span>
		    		</div>
		    	</div>
		    	<div class="timeRight">
		    		<p style="padding-top: .35rem;">{{curObj.togetherCount}}人拼团</p>
		    		<p style="line-height: .44rem;margin-top: .16rem; ">累计已拼{{curObj.togetherSuccessCount}}件</p>
		    	</div>
		    </div>
		    <!--<div class="notStart" v-show="isShow==1 && curObj.status==1">
		    	<div class="startL">
		    		<span>￥<b style="font-size: .66rem;">{{curObj.salePrice}}</b></span>
		    	</div>
		    	<div class="startC">
		    		<p style="color: #7a7476;text-decoration:line-through;">￥{{curObj.marketPrice}}</p>
		    		<p>限量{{curObj.togetherLimitCount}}</p>
		    	</div>
		    	<div class="startR">
		    		<p >{{curObj.togetherCount}}人拼团</p>
		    		<p>累计已拼{{curObj.togetherSuccessCount}}件</p>
		    	</div>
		    </div>-->
		    <div class="putongPin"v-show="isType==11 || showSure==false">
		    	<div class="pintongL">
		    		<img :src="curObj.activeLogo" v-show="curObj.activeLogo!=null"/>
		    		<span style="font-size: .44rem;color: #ff1e83;">￥<b>{{curObj.salePrice}}</b></span>
		    		<span style="text-decoration:line-through; color: #58595b;">￥{{curObj.marketPrice}}</span>
		    	</div>
		    	<div class="pintongR">
		    		已拼{{curObj.togetherSuccessCount}}件·{{curObj.togetherCount}}人拼团
		    	</div>
		    </div>
		    <div class="goodsName">
		    	<div class="goodsNameLeft">
		    		{{curObj.productName}}
		    	</div>
		    	<div class="goodsNameRight" @click="closeFen">
		    		<img :src="ruleImg" />
		    		<p>开团送积分</p>
		    	</div>
		    </div>
		    <div class="goodsMoney">
		    	{{curObj.summary}}
		    </div>
		   <div style="width: 100%;height: .10rem;background: #f2f2f2;"></div>
		    <div class="list">
				<p class="listSon" v-for="item in curObj.tags"><img :src='chooseImg'/>{{item}}</p>
				<div class="erwei" @click="getErwei(curObj.productId)">
					<img :src="erweiImg" />
				</div>
			</div>
			<div style="width: 100%;height: .10rem;background: #f2f2f2;"></div>
			<div class="getCoupon" v-show="couponMoney!=null" @click="getCoupon">
				<div class="pinShuo" >
					<p class="pinShuoL">领券</p>
					<p class="pinShuoC">
						<ul>
							<li v-for="item in couponMoney">{{item}}元</li>
						</ul>
					</p>
					<p class="pinshuoR">
						<img :src="rowmoreImg" />
					</p>
				</div>
			</div>
			<div style="width: 100%;height: .10rem;background: #f2f2f2;"></div>
			 <div class="timeing" v-show="pinObj.togetherCount>0">
				<div class="toping">
					<p class="topDetailLeft">{{pinObj.togetherCount}}人在拼团,可直接参与</p>
					<p class="topDetailRight" @click="getMorePin">查看更多</p>
				</div>
				<div class="peoplePin" v-for="(item,index) in pinObj.togetherData" v-if="index<2" >
					<div class="pinLeft">
						<div class="pinImg">
							<img :src="item.memberLogo" />
						</div>
						<div class="pinName">{{item.memberName}}</div>
					</div>
					<div class="pinRight">
						<div class="pinNeed">
							<p style="font-size: .24rem;color: #1c1c1c;line-height: .40rem;">还差<span style="color: #ed0477;">{{Math.abs(item.plusCount)}}人</span>拼成</p>
							<p style="font-size: .20rem;color: #8d8e8f;line-height: .36rem;">剩余<more :Time="item.plusTime"></more></p>
						</div>
						<div class="pinGo" @click="pinGoBuy(item.togetherRecordId)">去参团</div>
					</div>
				</div>
			</div>
			<div style="width: 100%;height: .10rem;background: #f2f2f2;" v-show="pinObj.togetherCount>0"></div>
			<div class="pinProduct" style="border-bottom: 0.01rem solid #f2f2f2;">
				<div class="pinShuo" @click="closeFen">
					<p class="pinShuoL">开团后邀请好友参团,人数不足自动退款</p>
					<p class="pinshuoR">
						<img :src="rowmoreImg" />
					</p>
				</div>
			</div>
			
			<div style="width: 100%;height: .10rem;background: #f2f2f2;" v-show='curObj.commentCount>0'></div>
			<div class="howtry" v-show='curObj.commentCount>0'>
				<p class="tryleft">用户评价 ({{curObj.commentCount}})</p>
			</div>
			<div class="assess" v-show='curObj.commentCount>0'>
				<div class="top" v-for="(item,index) in curObj.comments" v-if="index<3">
					<div class="topImg">
						<div class="topleft">
							<img :src="item.memberLogo"/>{{item.memberName}}
						</div>
						<div class="topright">
							{{item.time}}
						</div>
					</div>
					<div class="detail">{{item.content}}</div>
					<div class="detailImg">
						<img :src="itemSon" v-for="(itemSon,index) in item.images" v-if="index<3"/>
					</div>
				</div>
				<div class="seemore" >
					
					<p @click="lookMore">查看更多评价</p>
				</div>
			</div>
			<div style="width: 100%;height: .10rem;background: #f2f2f2;"></div>
			<div class="shopname">
				<div class="shopleft">
					<img :src="curObj.sellerLogo" />{{curObj.sellerName}}
				</div>
				<div class="shopright" @click="getshop">
					<p>进店逛逛</p>
				</div>
			</div>
			<div style="width: 100%;height: .10rem;background: #f2f2f2;"></div>
			<div class="howtry">
				<p class="tryleft">商品详情</p>
			</div>
			<!--<div style="width: 100%;height: .10rem;background: #f2f2f2;"></div>
			<p style="width: 100%;"><img :src="soldStopImg" style="display: block; width: 100%;"/></p>-->
			<div style="width: 100%;height: .10rem;background: #f2f2f2;"></div>
			<div class="imgdetail" v-html="curObj.detail" style="width: 100%;">
				
				<p style="width: 100%;">{{curObj.detail}}</p>
					
			</div>
		</div>
		
		<div class="bottomshop">
			<ul class="use">
				<li @click='getkefu'>
					<p><img :src="kefuImg"/></p>
					<span style="font-size: .24rem; display: block;color: #9b9b9b; margin-top: .10rem;">客服</span>
				</li>
				<li @click='getshop'>
					<p><img :src="houseImg"/></p>
					<span style="font-size: .24rem; display: block;color: #9b9b9b; margin-top: .10rem;">店铺</span>
				</li>
				<!--<li @click='shoucang'>
					<p>
						<img :src="shoucangImg" v-show='showShou==false'/>
						<img :src="collectedImg" v-show='showShou==true'/>
					</p>
					<span v-show='showShou==false' style="font-size: .24rem; display: block;color: #9b9b9b; margin-top: .10rem;">收藏</span>
					<span v-show='showShou==true'style="font-size: .24rem; display: block;color: #9b9b9b; margin-top: .10rem;">已收藏</span>
				</li>-->
			</ul>
			<div class="trytouse" v-show="curObj.status!=1 && showSure==true">
				<div class="trytouseLeft" @click="commonBuy">
					<p>￥{{curObj.marketPrice}}</p>
					<p style="font-size: .24rem;">直接购买</p>
				</div>
				<div  class="trytouseRigth" @click="togoterBug">
					<p>￥{{curObj.salePrice}}</p>
					<p style="font-size: .24rem;">一键开团</p>
				</div>
				
			</div>
			<div class="trytouse"  v-show="curObj.status!=1 && showSure==false" style="background: #e5e5e5;"></div>
			<div class="trytouse" style="background: #fd89b2;" @click="buyGoods(curObj.togetherHourTimeId,curObj.togetherId)" v-show="curObj.status==1 && curObj.isAddTogetherLimitRemind==0">
				<img :src="clockImg" />
				{{curObj.togetherTime}}提醒
			
			</div>
			<div class="trytouse" style="background: #dcdcdc;" @click="noBuyGoods(curObj.togetherHourTimeId,curObj.togetherId)" v-show="curObj.status==1 && curObj.isAddTogetherLimitRemind==1">
				<img :src="clockImg" />
				已提醒({{curObj.togetherTime}}开抢) 
			
			</div>
		</div>
		<div class="norms" v-show="chooseNor">
			<div class="choose">
				<img class="close" :src="colseImg" @click="closeShow"/>
				<img :src="curObj.image"  class="productImage" v-if="getNomoreObj.length<=0 || getNomoreObj.image==null"/>
				<img :src="getNomoreObj.image"  class="productImage" v-else/>
				
				<p class="detail">
					<span style="display: block;" class="money" v-if="isCommon==2 && showLength==0">￥{{curObj.salePrice}}</span>
					<span style="display: block;" class="money" v-if="isCommon==2 && showLength!=0 && getNomoreObj.valueIds==undefined ||isCommon==2 && showLength!=0 && getNomoreObj.valueIds==''">￥{{curObj.activePriceInterval}}</span>
					<span style="display: block;" class="money" v-if="isCommon==2 && showLength!=0 && getNomoreObj.valueIds!=undefined && getNomoreObj.valueIds!=''">￥{{getNomoreObj.salePriceView}}</span>
					<span style="display: block;" class="money" v-if="isCommon==1 && getNomoreObj.length==0">￥{{curObj.marketPrice}}</span>
					<span style="display: block;" class="money" v-if="isCommon==1 && getNomoreObj.salePrice!=undefined">￥{{getNomoreObj.salePriceView}}</span>
					
					<span class="num" v-if="showLength!=0 && getNomoreObj.valueIds!=undefined && getNomoreObj.valueIds!=''">已选规格：{{getNomoreObj.values}}</span>
					<span class="num" v-if="showLength!=0 && getNomoreObj.valueIds==undefined || showLength!=0 && getNomoreObj.valueIds==''">请选择规格</span>
					<span class="num" v-if="showLength==0"></span>
					<!--<span class="num" v-else>&nbsp;库存{{curObj.store}}件</span>-->
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
						<span v-bind:class="{ 'special': index===addSelect}" v-for="(item,index) in nomoreOne.normses" @click="getVlaueone(index,item.valueId)">{{item.value}}</span>
						
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
						<span v-bind:class="{ 'special': index===addSelectThree}" v-for="(item,index) in nomoreThree.normses"   v-model="getVlaueThree" >{{item.value}}</span>
						
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
		<div class="tishi"  v-show="scroeEnt">
			<div class="morePin">
				<div class="pinTopIng">
					正在拼团
					<img :src="colseImg" @click="closePin"/>
				</div>
				<div style="padding: 0 .24rem;" v-for="itemS in pinObj.togetherData">
					<div class="pinNum">
						<div class="pinNumL">
							<img :src="itemS.memberLogo" />
						</div>
						<div class="pinNumC">
							<p style="font-size: .20rem; color: #666;line-height: .36rem; height: .36rem;overflow: hidden;">{{itemS.memberName}}</p>
							<p style="font-size: .20rem; color: #a2a2a2;line-height: .32rem;">
								还差{{Math.abs(itemS.plusCount)}}人 剩余<more :Time="itemS.plusTime"></more>
							</p>
						</div>
						<div class="pinBuy" @click="pinGoBuy(itemS.togetherRecordId)">去参团</div>
					</div>
				</div>
				
				<div class="morPinBot">仅显示5位正在拼团的人</div>
			</div>
		</div>
		<div class="pinKnow" v-show="pinKnowShow" @click="showImg"></div>
		<div class="pinGoods" v-show="pinKnowShow">
			<div style="position: relative;">
				<img :src="erweiObj" class="codeImage"/>
				<img :src="colseImg" class="closeImg" @click="showImg"/>
				
			</div>
			
		</div>
		<div class="pinFen" v-show="pinFenShow || getCouponList" @click="showFen"></div>
		<div class="rule" v-show="pinFenShow">
			<div class="ruleDetail">
				<img class="closeRule" :src="colseImg" @click="showFen"/>
				<div class="topName">
					拼团规则
				</div>
				<div class="step clear">
					<p class="stepDetail">
						<img  :src="oneImg"/>
						<span>支付开团/参团</span>
					</p>
					<p class="stepNext">
						<img :src="rowImg"/>
					</p>
					
					<p class="stepDetail">
						<img  :src="twoImg"/>
						<span>邀请拼团</span>
					</p>
					<p class="stepNext">
						<img :src="rowImg"/>
					</p>
					<p class="stepDetail">
						<img  :src="threeImg"/>
						<span>人满成团/不满退款</span>
					</p>
				</div>
				<div style="border-bottom: .01rem solid #f2f2f2;"></div>
				<div style="padding: 0rem .26rem .42rem;">
					<ul class="explain">
						<li>
							1、开团送积分，OL圈会员开团支付成功，平台赠送团长拼团商品价格的等数量积分。
						</li>
						<li>
							2、拼团成功之后可以在商品有库存的情况下，多次邀请会员参与拼团。平台根据参团会员购买商品数量赠送商品价格*购买数量的积分给团长。
						</li>
						<li>
							3、团长拼团成功后，申请退货退款的，则获得的所有积分全部退回。并且继续邀请的参团不再赠送积分。
						</li>
						<li>
							4、拼团有效期是自开团时刻起24小时内，如果距离商品失效时间小于24小时，则以商品的结束时间为准。
						</li>
						<li>
							5、超过成团有效期24小时，未达成相应参团人数的团，则该拼团失败。开团及参团的会员支付金额按原路返回至您的支付账户。
						</li>
						<li>
							6、在拼团有效期24小时内，商品已提前售罄，若还未拼团成功的，则该拼团失败。
						</li>
					</ul>
				</div>
				<div class="button" @click="showFen">
					确定
				</div>
			</div>
		</div>
		<!--优惠券弹窗-->
		<div class="rule" style="height: 6.80rem;" v-show="getCouponList">
			<div class="ruleDetail">
				<img class="closeRule" :src="colseImg" @click="showFen"/>
				<div class="topName couSpecial" style="border-bottom: 0.01rem solid #f2f2f2;">
					领取优惠券
				</div>
				<div class="step clear couSpecial">
					可领优惠券
				</div>
				<div  style="padding: 0 .20rem; height: 5.00rem; overflow: scroll;">
					<div style="width: 100%;height: 100%;">
						<ul class="coupon" v-for="(item,index) in couponObj">
							<li class="couponDescribe">
								<div class="money"><span>￥</span>{{item.amount}}</div>
								<div class="describe">
									<div class="couponName">{{item.title}}</div>
									<div class="getCoupon">
										<span>剩余{{item.vaildNum}}张</span>
										<p style="background: url(../../../static/images/havenone.png) no-repeat center;background-size:1.40rem .42rem ;" v-show="item.vaildNum==0 && item.receivedStatus==1">已领完</p>
										<p v-show="item.receivedStatus ==1 && item.vaildNum!=0" @click="getCouponId(item.couponId,index)">点击领取</p>
										<p style="background: url(../../../static/images/havenone.png) no-repeat center;background-size:1.40rem .42rem ;" v-show="item.receivedStatus ==3 || item.receivedStatus ==2">已领取</p>
										
									</div>
								</div>
							</li>
							<li class="couponTime">
								有效期：{{item.startTime}} 至 {{item.endTime}}
							</li>
						</ul>
					</div>
				</div>
				
				
			</div>
		</div>
		<!--优惠券弹窗-->
	</div>
</template>

<script>
	import { Swiper, SwiperItem } from 'vux';
	import Scroll from '../../components/common/time.vue';
	import More from '../../components/common/timemore.vue';
	import $ from 'jquery';
	export default {
		
		data : function() {
			return{
				imgList:[],
				curObj:[],
				chooseImg:'/static/images/choose.png',
				rowImg:'/static/images/rowright.png',
				rowmoreImg:'/static/images/rowmore.png',
				trystepImg:'/static/images/trystep.png',
				kefuImg:'/static/images/kefu.png',
				shoucangImg:'/static/images/shoucang.png',
				houseImg:'/static/images/house.png',
				colseImg:'/static/images/colse.png',
				chaImg:'/static/images/cha.png',
				delImg:'/static/images/del.png',
				addImg:'/static/images/add.png',
				goTopImg:'/static/images/goTop.png',
				collectedImg:'/static/images/collected.png',
				erweiImg:'/static/images/erwei.png',
				ruleImg:'/static/images/ruleknow.png',
				clockImg:'/static/images/clock.png',
				oneImg:'/static/images/one.png',
				twoImg:'/static/images/two.png',
				threeImg:'/static/images/three.png',
				soldImg:'/static/images/soldOut.png',
				soldStopImg:'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/glbs/WechatIMG5255.jpeg',
				chooseNor:false,
				scroeEnt:false,
				pinKnowShow:false,
				pinFenShow:false,
				getCouponList:false,
				num:1,
				nomoreOne:[],
				nomoreTwo:[],
				nomoreThree:[],
				showShou:false,
				getNomoreObj:[],
				addSelect:-1,
				addSelectTwo:-1,
				memberScore:0,
				normalId:'',
				showTop:false,
				shareData : {
					'title': "",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':false
				},
				hour:'',
				mint:'',
				secon:'',
				EndTime:0,
				time:0,
				isCommon:0,
				isType:0,
				dingti:false,
				pinObj:[],
				limiId:0,
				timeSpecial:false,
				isShow:0,
				erweiObj:'',
				include:'',
				showLength:0,
				buyType:0,
				isLimit:0,
				showSure:true,
				couponMoney:[],
				couponObj:[],
				curTargetS:0,
			}
		},
		components: {
		    Swiper,
		    SwiperItem,
		    $,
		    Scroll,
		    More
		},
		created: function() {
			this.$store.commit('documentTitle','商品详情');
			this.getList();
			this.addRecord();
			//console.log(this.$route.query.isLimit)
			if(this.$route.query.isLimit==1){
				
				this.isLimit=1
			}
			if(this.$route.query.isLimit==0 || this.$route.query.isLimit=='undefined'){
				
				this.isLimit=0
			}
			//this.getMember();
			this.gotoTop();
			
		},
		mounted(){
			//window.addEventListener('scroll', this.getScroll);
			
			
		},
		methods:{
			addRecord(){
  				let data = {
  					terminalType:5,
  					pageuri:'index/goodsDetali'
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,data,this.addRecordBack,this);
  			},
  			addRecordBack(data){},
			closeFen(){
				this.pinFenShow=true;
			},
			showFen(){
				this.pinFenShow=false;
				this.getCouponList=false;
			},
			showCodeImg(){
				this.pinKnowShow=true;
			},
			showImg(){
				this.pinKnowShow=false;
			},
			//查看更多评价
			lookMore(){
				window.location.href=USE_URL+'ol/commentList.html?productId='+this.curObj.productId;
			},
			//查看详情说明
			getTryDetail(){
				window.location.href=USE_URL+'weixin/protocol/protocol?code=freeUseDesc';
			},
			//积分不足
			getCon(){
				this.scroeEnt=false;
			},
			getScroe(){
				this.$router.push({path:'/integral/uesget'+'?memberId='+this.$route.query.memberId});
			},
			//点击客服
			getkefu(){
				window.location.href='https://kefu.easemob.com/webim/im.html?tenantId=40231&ticket=false';	
			},
			getshop(){
				window.location.href=USE_URL+'weixin/sellerShop/sellerShop?sellerId='+this.curObj.sellerId+'&memberId='+this.$route.query.memberId;
			},
			
//			getScroll(){
//				//var offsetTop = document.querySelector('.goodsDetail').offsetTop;
//				//console.log(offsetTop)
//				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//				//console.log(scrollTop)
//				if(scrollTop>600){
//					this.showTop=true;
//				}else{
//					this.showTop=false;
//				}
//			},
			//点击回到顶部
			gotoTop(){
				document.body.scrollTop=0;
				document.documentElement.scrollTop = 0	
				
			},
			//获取会员信息
//			getMember(){
//				let data={
//					memberId:this.getCookie("memberId"),
//				}
//				//console.log(data)
//				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
//			},
//			getMemberBack(data){
//				this.memberScore=data.result.score;
//				//console.log(this.memberScore)
//			},
			closeShow(){
				this.chooseNor=false;
				this.showHeigth=false;
			},
			delNum(){
				this.num -=1;
				if(this.num<=0){
					this.num=1;
				}
			},
			addNum(){
				this.num +=1;
				if(this.num>this.curObj.limitCount){
					this.num=this.curObj.limitCount;
					this.$toast('该产品最多购买'+this.num+'件');
				}
			},
			//获取商品信息
			getList(){
				this.setCookie('number','')
				let data={
					togetherId:this.$route.params.id,
					//memberId:this.$route.query.memberId,
					isLimit:this.$route.query.isLimit
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.togetherProductDetail,data,this.getListBack,this);
			},
			getListBack(data){
				//console.log(data)
				if(data.result.type==11 || data.result.type==12){
						this.curObj=data.result;
					this.getGoods(data.result.productId);
					if(data.result.time){
						this.time=data.result.time;
					}
					
					
					if(this.curObj.isCollect==0){
						this.showShou=false
					}else{
						this.showShou=true;
					}
					this.imgList = data.result.images.map((item, index) => ({
					  url: 'javascript:',
					  img: item
					}));
					this.showLength=this.curObj.normals.length
	//				console.log('11')
	//				console.log(this.showLength);
					if(this.showLength>0){
						if(data.result.normals){
							if(data.result.normals.length>0 && data.result.normals.length<2){
								this.nomoreOne=data.result.normals[0];
								//console.log(this.nomoreOne)
								//this.getVlaueOne=data.result.normals[0].normses[0].valueId;
								//this.getValueDetail();
								
							}else if(data.result.normals.length>1){
								this.nomoreOne=data.result.normals[0];
								//console.log(this.nomoreOne)
								//this.getVlaueOne=data.result.normals[0].normses[0].valueId;
								this.nomoreTwo=data.result.normals[1];
								//this.getVlaueTwo=data.result.normals[1].normses[0].valueId;
								this.nomoreThree=data.result.normals[3]
								//this.getValueDetail();
							}
							//console.log(this.nomoreThree)
						}
					}
					
					this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/goodsDetali/id/'+this.curObj.togetherId+'?isLimit='+this.$route.query.isLimit);
					//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'index/goodsDetali/id/'+this.curObj.togetherId+'?isLimit='+this.$route.query.isLimit);
					this.shareData.title=this.curObj.productName;
					this.shareData.description=this.curObj.summary;
					this.shareData.picURL=this.curObj.image;
					console.log(this.shareData)
					this.addWeixinShare();//微信分享 
					this.isType=this.curObj.type;
					if(this.isType==1 && this.curObj.status==null){
						this.showSure=false;
					}else{
						this.showSure=true;
					}
					if(this.curObj.time!=null && this.curObj.status!=1){
						this.timeSpecial=true
					}
					//console.log(this.isType)
					//console.log("getNomoreObj")
					//console.log(this.getNomoreObj)
					let _this=this
					_this.EndTime= _this.time + new Date().getTime();
					setInterval(_this.getRtime,0)
					this.getPinNum();
				}else if(data.result.type==9 || data.result.type==4){
					window.location.href=CUR_URLBACK+'demo/iscroll/id/'+data.result.productId
				}else{
					window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+data.result.productId;
				}
				
			},
			//获取二维码图片
			getErwei(id){
				this.pinKnowShow=true;
				let data={
					productId:id,
					//memberId:this.$route.query.memberId,
					type:this.curObj.type,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTwoCodeUrl,data,this.getErweiBack,this);
			},
			getErweiBack(data){
				this.erweiObj=data.result;
			},
			//获取产品信息
			getGoods(id){
				let data={
					productId:id,
					//memberId:this.$route.query.memberId,
					uutype:1
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.productDetail,data,this.getGoodsBack,this);
			},
			getGoodsBack(data){
				
				this.couponMoney=data.result.couponPrices;
				
			},
			//获取拼团数据
			getPinNum(){
				
				let data ={
					productId:this.curObj.productId,
					//memberId:this.$route.query.memberId,
					isLimit:this.$route.query.isLimit
				}
				//console.log(this.curObj.productId)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getRandomTogetherRecord,data,this.getPinNumBack,this);
			},
			getPinNumBack(data){
				
				this.pinObj=data.result;
			},
			//点击去拼团
			pinGoBuy(id){
				//console.log(id)
				this.$router.push({path:'/share/share?id='+id+'&memberId='+this.$route.query.memberId});
			},
			//点击更多拼团
			getMorePin(){
				this.scroeEnt=true;
			},
			
			//关闭更多拼团
			closePin(){
				this.scroeEnt=false;
			},
			goBuything(){
				let data={
						num:this.num,
						normalId:this.normalId,
						//memberId:this.$route.query.memberId,
						uutype:1,
						togetherId:this.curObj.togetherId,
						type:this.isType
					}
				//console.log(this.curObj.status)
				//console.log(this.getNomoreObj)
				if(this.curObj.status==5){
					this.$toast('该商品已下架');
				}else if(this.num>this.getNomoreObj.store && this.normalId!='' && this.showLength!=0){
					this.$toast('库存不足');
				}else if(this.num>this.curObj.store){
					this.$toast('库存不足');
				}else{
					if(this.isCommon==1){
						if(this.normalId=='' && this.showLength!=0){
							this.$toast('请选择规格');
						}else{
							//console.log(data)
							window.location.href=USE_URL+'ol/confirmOrder1.html?num='+this.num+'&type=1'+'&normalId='+this.normalId+'&'+'memberId='+this.$route.query.memberId+'&productId='+this.curObj.productId+'&urlMark=ljgm'
						}
						
					}
					if(this.isCommon==2){
						if(this.normalId=='' && this.showLength!=0){
							this.$toast('请选择规格');
						}else{
							//console.log(data)
							window.location.href=USE_URL+'ol/confirmOrder1.html?num='+this.num+'&type='+this.isType+'&normalId='+this.normalId+'&'+'memberId='+this.$route.query.memberId+'&'+'togetherId='+this.curObj.togetherId
						}
						
						//window.location.href=API_HOST+'ol/confirmOrder1.html?num='+this.num+'&type='+this.isType+'&normalId='+this.normalId+'&'+'memberId='+this.$route.query.memberId+'&'+'togetherId='+this.curObj.togetherId
					}
				}
				
				

			},
			//提醒
			buyGoods(hourId,toId){
				//console.log(id);
				//console.log(hourId);
				//console.log(toId)
				let data={
					togetherId:toId,
					togetherHourTimeId:hourId,
					//memberId:this.$route.query.memberId
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addTogetherLimitRemind,data,this.buyGoodsBack);
				//window.location.href='http://test-mobile.olquan.cn/ol/confirmOrder1.html?num='+this.$route.query.num+'&'+'normalId='+'&'+'memberId='+this.getCookie("memberId")+'&'+'togetherId='+this.$route.query.togetherId +'&'+'togetherRecordId='+this.$route.query.id
			},
			buyGoodsBack(data){
				//console.log(data)
				if(data.ok){
					this.$toast('秒杀提醒成功');
					this.$set(this.curObj,'isAddTogetherLimitRemind',1);
				}
			},
			//取消提醒
			noBuyGoods(hourId,toId){
				//console.log(id);
				//console.log(hourId);
				//console.log(toId)
				let data={
					togetherId:toId,
					togetherHourTimeId:hourId,
					//memberId:this.$route.query.memberId
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addTogetherLimitRemind,data,this.noBuyGoodsBack);
				//window.location.href='http://test-mobile.olquan.cn/ol/confirmOrder1.html?num='+this.$route.query.num+'&'+'normalId='+'&'+'memberId='+this.getCookie("memberId")+'&'+'togetherId='+this.$route.query.togetherId +'&'+'togetherRecordId='+this.$route.query.id
			},
			noBuyGoodsBack(data){
				//console.log(data)
				if(data.ok){
					this.$toast('取消提醒成功');
					this.$set(this.curObj,'isAddTogetherLimitRemind',0);
				}
			},
			//普通购买
			commonBuy(){
				this.chooseNor=true;
				this.showHeigth=true;
				this.isCommon=1;
				this.buyType=''
				this.addSelect=-1;
				this.addSelectTwo=-1;
				this.getVlaueTwo='';
				this.getVlaueOne='';
				this.getValueDetail();
				//console.log(this.isCommon)
			},
			//拼团购买
			togoterBug(){
				this.chooseNor=true;
				this.showHeigth=true;
				this.isCommon=2;
				this.buyType=this.curObj.type;
				this.addSelect=-1;
				this.addSelectTwo=-1;
				this.getVlaueTwo='';
				this.getVlaueOne='';
				this.getValueDetail();
				//console.log(this.isCommon)
			},
			getVlaueone(index,valueId){
				this.addSelect=index;
				
				this.getVlaueOne=valueId;
				this.getValueDetail();
				//console.log(123)
			},
			getValueDetail(){
				if(this.showLength>0){
					let data={
						productId:this.curObj.productId,
						valueIds:this.getVlaueOne+','+this.getVlaueTwo,
						uutype:1,
						//memberId:this.$route.query.memberId,
						type:this.buyType,
					}
					//console.log(data)
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getNormal,data,this.getNormalBack,this);
				}else{
					console.log(1)
				}
				
			},
			getNormalBack(data){
				//console.log(data);
				if(data.result!=null){
					this.getNomoreObj=data.result;
				}else{
					this.getNomoreObj=[];
				}
				
				if(data.result!=null){
					this.normalId=data.result.id;
				}else{
					this.normalId=''
				}
				
			},
			getVlauetwo(index,valueId){
				this.addSelectTwo=index;
				this.getVlaueTwo=valueId;
				this.getValueDetail();
			},
			//倒计时
			getRtime(){
				//console.log(1)
			   
			    //console.log(EndTime)
			    var TimeEnd=this.EndTime
			    
			    var NowTime = new Date();
			    
			    //console.log(EndTime)
			    var t =TimeEnd - NowTime.getTime();
//			    console.log(1)
//			    console.log(t)
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
//			    console.log(h)
			    this.day=d;
			    this.hour=h;
			    this.mint=m;
			    this.secon=s;
			   
			    
			},
			//获取商品优惠券
			getCoupon(){
				
				let data={
				//	memberId:this.$route.query.memberId,
					productId:this.curObj.productId,
					page:1,
					rows:20
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.conponsByProduct,data,this.getCouponBack,this);
			},
			getCouponBack(data){
				this.getCouponList=true;
				this.couponObj=data.result;
				console.log(this.couponObj[0].vaildNum)
			},
			//点击立即领取
			getCouponId(id,index){
				console.log(index)
				this.curTargetS=index;
				let data={
					//memberId:this.$route.query.memberId,
					couponId:id
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.receiveCoupon,data,this.getCouponIdBack,this);
			},
			getCouponIdBack(data){
				console.log(this.couponObj)
				this.$toast(data.message);
				
				if(data.code==0){
					this.$set(this.couponObj[this.curTargetS],'vaildNum',this.couponObj[this.curTargetS].vaildNum-1);
					if(this.couponObj[this.curTargetS].isCanUse==0){
						this.$set(this.couponObj[this.curTargetS],'receivedStatus',2);
					}else{
						this.$set(this.couponObj[this.curTargetS],'receivedStatus',3);
					}
					
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
				//alert(JSON.stringify(this.shareData))
				console.log(this.shareData)
				//console.log(JSON.stringify(data.result))
				this.wxShareFun(data.result,this.shareData);
				//this.locationWx(data);
			},
		},
//		destroyed () {
//		  window.removeEventListener('scroll', this.getScroll)
//		},
	}
</script>

<style lang="scss" scoped>
	.spe{
		padding-bottom:1.00rem ;
		position: relative;
		background: #fff;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	.goodsDetail{
		padding-bottom:1.00rem ;
		position: relative;
		background: #fff;
		.soldOut{
			position: absolute;
	    	left: 50%;
	    	margin-left: -.90rem;
	    	top: 2.85rem;
	    	height: 1.80rem;
	    	width: 1.80rem;
			.isSold{
		    	display: block;
		    	
		    	height: 1.80rem;
		    	width: 1.80rem;
		    }
		}
		.notStart{
			background: #ffcbd9;
			color:#e71a77;
			padding: .20rem .24rem;
			overflow: hidden;
			.startL{
				float: left;
				font-size: .36rem;
			}
			.startC{
				float: left;
				margin-left: .20rem;
				font-size: .24rem;
				line-height: .36rem;
			}
			.startR{
				float: right;
				font-size: .24rem;
				line-height: .36rem;
				text-align: right;
			}
		}
		.detailTime{
			overflow: hidden;
			padding: .05rem .24rem .05rem;
			background: #ffcbd9;
			font-size: .24rem;	
			color:#e71a77;
			.timeLeft{
				
			}	
			.timeRight{
				float: right;
				text-align: right;
				height: 100%;
				.timespecial{
					margin-top: .05rem;
				}
			}	
			.timeEnd{
				margin-top: .12rem;
				.Endtiem{
					display: inline-block;
					width: 1.60rem;
					height: .40rem;
					background: #e50f71;
					color: #fff;
					
					text-align: center;
					margin-right: .12rem;
					border-radius: 0.05rem;
					line-height: .40rem;
					img{
						display: inline-block;
						height: .30rem;
						width: .30rem;
						margin-top: -0.02rem;
						vertical-align: middle;
					}
				}
				.timeEndS{
			font-size: .24rem;
			height: .40rem;
			display: inline-block;
			b{
				padding: 0 .05rem;
				display: inline-block;
				background: #000;
				text-align: center;
				color: #fff;
				line-height: .40rem;
				border-radius: 0.05rem;
				width: .30rem;
				font-weight: normal;
			}
			i{
				font-style: normal;
				color: #000;
			}
	}
			}	
		}
		.putongPin{
			padding: .30rem .24rem .00rem;
			
			overflow: hidden;
			.pintongL{
				float: left;
				font-size: .20rem;
				img{
					display: inline-block;
					width: .72rem;
				}
			}
			.pintongR{
				float: right;
				padding-top: .10rem;
				font-size: .24rem;
				color: #58595b;
			}
		}
		.goodsName{
			font-size:.30rem ;
			overflow: hidden;
			padding-left: .24rem;
			padding-right: .15rem;
			.goodsNameLeft{
				line-height: .52rem;
				width: 72.8%;
				height: 1.04rem;
				float: left;
				font-weight: 600;
				padding-top: .20rem;
				margin-right: .10rem;
			}
			.goodsNameRight{
				float: left;
				width: 20%;
				position: relative;
				margin-top: .25rem;
				padding-left: .29rem;
				margin-left: .10rem;
				img{
					display: block;
					height: .38rem;
					width: .50rem;
					position: absolute;
					left: 50%;
					margin-left: -.10rem;
				}
				p{
					padding-top: .45rem;
					font-size: .20rem;
					text-align: center;
					color: #9f9f9f;
				}
			}
		}
		.score{
			margin-top: .29rem;
			padding: 0 .24rem;
			font-size: .24rem;
			color: #9c9c9c;
			p{
				display: inline;
				color: #ec0070;
				font-size: .32rem;
				font-weight: 700;
			}
		}
		.goodsMoney{
			
			font-size: .24rem;
			
			color: #333;
			line-height: .48rem;
			padding-left: .24rem;
			padding-right: .24rem;
			
			
		}
		.pinProduct{
			padding:0 .20rem;
			background: #fff;
			.pinShuo{
				overflow: hidden;
				position: relative;
				font-size: .26rem;
				.pinShuoL{
					float: left;
					line-height: .64rem;
				}
				.pinshuoR{
					float: right;
					position: absolute;
					right: 0;
					top: 50%;
					margin-top: -.13rem;
					img{
						width: .16rem;
						height: .26rem;
						display: block;
					}
				}
			}
		}
		.getCoupon{
			
			padding:0 .20rem;
			background: #fff;
			.pinShuo{
				overflow: hidden;
				position: relative;
				font-size: .24rem;
				color:#333;
				.pinShuoL{
					float: left;
					line-height: .64rem;
					
				}
				.pinShuoC{
					float: left;
					line-height: .64rem;
					margin-left: .30rem;
					width: 5.86rem;
					height: .64rem;
					overflow: scroll;
					padding-right: .30rem;
					ul{
						
						height: .64rem;
						color: #d0006c;
						overflow-x: auto;
						white-space: nowrap;
						li{
							
							margin-right: .30rem;
							display: inline-block;
						}
					}
				}
				.pinshuoR{
					float: right;
					position: absolute;
					height: .26rem;
					right: 0;
					top: 50%;
					margin-top: -.13rem;
					img{
						width: .16rem;
						height: .26rem;
						display: block;
					}
				}
			}
		
		}
		.timeing{
	padding: 0 .20rem;
	background: #fff;
	
	.toping{
		overflow:hidden;
		line-height: .80rem;
		font-size: .28rem;
		border-bottom: 0.01rem solid #e5e5e5;
		color: #151516;
		.topDetailLeft{
			float: left;
		}
		.topDetailRight{
			float: right;
			font-size: .24rem;
			color: #9f9f9f;
			margin-right: .14rem;
		}
	}
	.peoplePin{
		overflow: hidden;
		font-size: .28rem;
		.pinLeft{
			float: left;
			width: 50%;
			position: relative;
			overflow: hidden;
			.pinImg{
				float: left;
				width: .90rem;
				height: .90rem;
				border-radius: 50%;
				
				line-height: 1.18rem;
				position: absolute;
				left: 0;
				top:50%;
				margin-top: -.45rem;
				img{
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.pinName{
				float: left;
				width: 60%;
				margin-left: 1.10rem;
				overflow: hidden;
				height: 1.20rem;
				line-height: 1.18rem;
				white-space : normal nowrap ;
			}
		}
		.pinRight{
			float: right;
			width: 50%;
			overflow: hidden;
			position: relative;
			.pinNeed{
				float: left;
				text-align: right;
				margin-top: .22rem;
				margin-right: .24rem;
			}
			.pinGo{
				float: left;
				position: absolute;
				right: 0;
				width: 1.36rem;
				height: .60rem;
				background: #ed0477;
				line-height: .60rem;
				color: #FFF;
				text-align: center;
				border-radius: 0.05rem;
				top: 0.30rem;
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
			background: #fff;
			height: .64rem;
			
			position: relative;
			.erwei{
				position: absolute;
				top: 50%;
				margin-top: -.20rem;
				right:0.24rem;
				
				img{
					display: block;
					
					width: .40rem;
					height: .40rem;
				}
			}
			.listSon{
				line-height: .64rem;
				position: relative;
				padding-left: .38rem;
				margin-right: .20rem ;
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
		.howtry{
			overflow: hidden;
			padding: 0 .24rem;
			border: 0.01rem solid #f2f2f2;
			line-height: .80rem;
			.tryleft{
				float: left;
				font-size: .26rem;
				color: gray;
			}
			.tryright{
				float: right;
				font-size: .24rem;
				color: #999;
				img{
					display: inline-block;
					vertical-align: middle;
					margin-left: .20rem;
					height: .19rem;
					width: .10rem;
				}
			}
		}
		.step{
			width: 100%;
			height: 1.38rem;
			img{
				display: block;
				height: 100%;
				widows: 100%;
			}
		}
		.assess{
			
			.top{
				padding: 0 .24rem;
				margin: .20rem 0;
				
				.detailImg{
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
					img{
						display: block;
						margin-right: 0.10rem;
						width: 32%;
						height:2.40rem;
					}
				}
				.topImg{
					overflow: hidden;
					color: #8c8c8c;
					font-size:.24rem;
					.topleft{
						float:left;
						
						img{
							display: inline-block;
							height: .60rem;
							width: .60rem;
							border-radius: 50%;
							vertical-align: middle;
							margin-right: .24rem;
						}
					}
					.topright{
						float: right;
						line-height: .60rem;
					}
				}
				.detail{
					font-size: .26rem;
					margin-top: .10rem;
					line-height: .46rem;
				}
				
			}
			.seemore{
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
				padding: .20rem 0;
				p{
					font-size: .28rem;
					width: 2.50rem;
					height: .68rem;
					line-height: .68rem;
					border: 0.01rem solid #f2f2f2;
					text-align: center;
					color: #999;
				}
				
			}
		}
		.shopname{
			overflow: hidden;
			padding: 0 .24rem;
			
			height: .80rem;
			.shopleft{
				float: left;
				height: 100%;
				line-height:.80rem;
				font-size:.32rem;
				img{
					display: inline-block;
					height: .60rem;
					width: .60rem;
					vertical-align: middle;
					margin-right: .20rem;
					margin-top: -0.07rem;
				}
			}
			.shopright{
				float: right;
				height: 100%;
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
				p{
					font-size: .28rem;
					border: 0.01rem solid #ec0070;
					width: 1.70rem;
					height: .48rem;
					line-height: .48rem;
					text-align: center;
					
					
					
				}
			}
		}
		.bottomshop{
			position: fixed;
			height: 1.00rem;
			background: #fff;
			width: 100%;
			overflow: hidden;
			font-size:.24 ;
			bottom: 0;
			left: 0;
			.trytouse{
				width: 75%;
				float: left;
				background: #ed0477;
				height: 100%;
				text-align: center;
				line-height: 1.00rem;
				overflow: hidden;
				color: #fff;
				font-size: .32rem;
				img{
					display: inline-block;
					width: .32rem;
					height: .32rem;
					vertical-align: middle;
					margin-top: -0.07rem;
				}
				.trytouseLeft{
					width: 50%;
					float: left;
					padding-top: .15rem;
					padding-bottom: .15rem;
					line-height: .38rem;
					background: #333;
				}
				.trytouseRigth{
					width: 50%;
					float: right;
					padding-top: .15rem;
					padding-bottom: .15rem;
					line-height: .38rem;
				}
			}
			.use{
				float: left;
				width: 25%;
				height: 100%;
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
				li{
					width: 50%;
					text-align: center;
					padding-top: .18rem;
					p{
						
						display: flex;
						display:-webkit-box;
					    display: -moz-box;
					    display: -ms-flexbox;
					    display: -webkit-flex;
					    display: -moz-flex;
						padding: 0 .24rem;
						-webkit-justify-content:center;
						justify-content:center;
						-moz-box-pack:center;
						-webkit--moz-box-pack:center;
						img{
							display: block;
							height: .34rem;
							width: .34rem;
						}
					}
				}
			}
		}
		.norms{
			position: fixed;
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
					height: 1.41rem;
					padding-top: .15rem;
					.money{
						line-height: .50rem;
						font-weight: 700;
						font-size: .36rem;
						color: #ed0477;
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
							padding: 0 .10rem;
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
		.tishi{
			position: fixed;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			left: 0;
			top:0;
			z-index: 1000;
			.morePin{
				height: 6.60rem;
				width: 5.20rem;
				background: #fff;
				border-radius: .15rem;
				position: fixed;
				left: 50%;
				margin-left: -2.60rem;
				top: 50%;
				margin-top: -3.30rem;
				.pinTopIng{
					line-height: .88rem;
					font-size: .32rem;
					color: #333;
					text-align: center;
					position: relative;
					border-bottom: 0.01rem solid #f2f2f2;
					img{
						display: block;
						width: .32rem;
						height: .32rem;
						position: absolute;
						right: 0.24rem;
						top: .24rem;
					}
				}
				.morPinBot{
					text-align: center;
					line-height: .64rem;
					font-size: .24rem;
					color: #a2a2a2;
				}
				.pinNum{
					height: 1.00rem;
					border-bottom: 0.01rem solid #f2f2f2;
					position: relative;
					.pinNumL{
						width: .80rem;
						height: .80rem;
						border-radius: 50%;
						position: absolute;
						left: 0;
						top: 50%;
						margin-top:-.40rem;
						img{
							display: block;
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.pinNumC{
						width: 2.80rem;
						margin-left: 0.90rem;
						
						padding-top: .18rem;
						overflow: hidden;
					}
					.pinBuy{
						width: 1.00rem;
						height: .50rem;
						background: #ed0477;
						line-height: .50rem;
						text-align: center;
						color: #fff;
						font-size: .24rem;
						position: absolute;
						border-radius: 0.05rem;
						right: 0;
						top: 50%;
						margin-top: -.25rem;
					}
				}
				
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
			.specialZhe{
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				
				top: 0;
				background: rgba(0,0,0,0);
			}
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
				z-index: 1005;
				top: 0.24rem;
			}
		}
		.pinFen{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
			background: rgba(0,0,0,.5);
		}
		.rule{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 9.50rem;
			background: #fff;
			z-index: 3;
			.ruleDetail{
				width: 100%;
				
				height: 100%;
				.topName{
					font-size: .32rem;
					color: #333;
					line-height: 1.08rem;
					text-align: center;
					width: 100%;
				}
				.step{
					padding: 0 .60rem;
					height: .90rem;
					.stepNext{
						margin: 0 .42rem;
						float: left;
						height: 100%;
						position: relative;
						img{
							display: block;
							height: .12rem;
							width: .08rem;
							position: absolute;
							left: 0;
							top: 50%;
							margin-top: -.24rem;
							
						}
					}
					.stepDetail{
						font-size: .24rem;
						color: #333;
						text-align: center;
						position: relative;
						float: left;
						img{
							display: block;
							height: .24rem;
							width: .24rem;
							position: absolute;
							left: 50%;
							margin-left: -.12rem;
						
						}
						span{
							display: inline-block;
							padding-top: .38rem;
						}
					}
				}
				.couSpecial{
					text-align: left; 
					padding: 0 .24rem;
					line-height: .88rem;
					font-size: .25rem;
				}
				.closeRule{
					position: absolute;
					right: .24rem;
					top: 0.24rem;
					display: block;
					height: .36rem;
					width: .36rem;
				}
				.button{
					position: fixed;
					bottom: 0;
					left: 0;
					width: 100%;
					color: #fff;
					font-size: .36rem;
					text-align: center;
					line-height: 1.06rem;
					background: #e50f71;
					
				}
				.explain{
					width: 100%;
					color: #666;
					font-size: .24rem;
					line-height: .40rem;
					height: 5.96rem;
					
					overflow-y: scroll;
					li{
						margin: .42rem 0;
					}
				}
				.coupon{
					margin-bottom: .20rem;
					background: url(../../../static/images/dihong.png) no-repeat;
					background-size: 7.10rem 2.33rem;
					width: 7.10rem;
					height: 2.33rem;
					.couponDescribe{
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
						.money{
							width: 2.00rem;
							color: #ed0276;
							line-height: 1.60rem;
							font-size: .60rem;
							text-align: center;
							font-weight: 600;
							span{
								font-size: .30rem;
								font-weight: normal;
							}
						}
						.describe{
							-webkit-box-flex: 1;
						    -webkit-flex: 1;
						    -ms-flex: 1;
						    flex: 1;
							margin-left: .20rem;
							padding-top: .28rem;
							font-size: .24rem;
							.couponName{
								color: #333;
								width: 4.70rem;
								line-height: .32rem;
								height: .64rem;
								overflow: hidden;
							}
							.getCoupon{
								padding: 0;
								margin-top: .28rem;
								color: #666;
								width: 4.00rem;
								position: relative;
								p{
									width: 1.40rem;
									line-height: .42rem;
									text-align: center;
									height: .42rem;
									font-size: .24rem;
									
									color: #fff;
									background: url(../../../dist/static/images/getting.png);
									background-size:1.40rem .42rem ;
									position: absolute;
									right: -.75rem;
									top: -50%;
								}
							}
						}
					}
					.couponTime{
						font-size: .24rem;
						color: #333;
						margin-left: .24rem;
						margin-top: 0.2rem;
					}
				
				}
			}
		}
	}
</style>