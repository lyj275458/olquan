<template>
	<div class="goodsDetail">
		<Linking></Linking>
	    <Swiper :aspect-ratio="1/1" loop auto  dots-position='center' ref="swiper" >
	      <swiper-item style="overflow: hidden; height: 100%;" class="swiper-demo-img" v-for="(itemsSon, index) in imgList" :key="index"><img style="width: 100%;" :src="itemsSon.img" ></swiper-item>
	    </Swiper>
	    <div class="soldOut">
	    	
	    	<img :src="soldImg"  class="isSold" v-show="curObj.store==0 && curObj.type!=4"/>
	    </div>
	    <div class="soldOut">
	    	
	    	<img :src="tryImgone"  class="isSold" v-show="curObj.store==0 && curObj.type==4"/>
	    </div>
	    <div class="productMoney" v-show="curObj.type==9 && curObj.status!=1 && curObj.status!=2 || curObj.time==null">
	    	<div class="erwei" @click="getErwei(curObj.productId)">
				<img :src="erweiImg" />
			</div>
			<div class="moneySale">
				￥{{curObj.salePrice}}<span style="margin: 0 .05rem;font-size: .28rem;text-decoration: line-through;color: #AAAAAA;">￥{{curObj.marketPrice}}</span><span class="getMoney">{{curObj.score1}}</span>
			</div>
	    	
	    </div>
	    <div class="productMoney" v-show="curObj.type==4  && curObj.freeUseSubType!=4 && curObj.freeUseSubType!=3 && curObj.status!=1">
	    	<div class="erwei" @click="getErwei(curObj.productId)">
				<img :src="erweiImg" />
			</div>
			<div class="moneySale" style="font-size: .24rem;color: #777777;">
				<span style="line-height: .84rem;vertical-align: middle;">保证金 </span>
				<span class="getMoney" style="vertical-align: middle;display:inline;line-height:.84rem;color: #E5006E; font-size: .38rem;margin-left: 0;">￥{{curObj.salePrice}}</span>
			</div>
	    	
	    </div>
	    <div class="productMoney" style="border-bottom: none;" v-show="curObj.type==4  && curObj.freeUseSubType==4">
	    	<div class="erwei" @click="getErwei(curObj.productId)">
				<img :src="erweiImg" />
			</div>
			<div class="moneySale" style="font-size: .24rem;color: #777777;">
				<span style="line-height: .84rem;vertical-align: middle;">保证金 </span>
				<span class="getMoney" style="vertical-align: middle;display:inline;line-height:.84rem;color: #E5006E; font-size: .38rem;margin-left: 0;">￥{{curObj.salePrice}}</span>
			</div>
	    	
	    </div>
	    
	    <div class="todaySale" style="padding-top: 0;height: .94rem;" v-show="curObj.type==4 && curObj.freeUseSubType==3">
	    	<div style="padding-left: .24rem;font-size: 0;line-height: .94rem;">
	    		<span style="font-size: .24rem;display: inline-block; color: #dddddd;">保证金 </span>
	    		<span style="font-size: .38rem;display: inline-block;">￥{{curObj.salePrice}}</span>
				<!--<span class="getMoney"style="display: block; font-size: .22rem;margin-top: .10rem; color: #dddddd;">已试{{curObj.todaySoldCount}}件</span>-->
	    	</div>
			
			<div class="countDown">
				<span style="font-size: .24rem;" v-show="curObj.status!=1">距结束</span>
				<span style="font-size: .24rem;" v-show="curObj.status==1">距开始</span>
				<span class='timeEnd'><b>{{hour}}</b> : <b>{{mint}}</b> : <b>{{secon}}</b></span>
			</div>
		</div>
	    <div class="todaySale" v-show="curObj.time!=null && curObj.type==9 && curObj.status==1 ||curObj.time!=null && curObj.type==9 && curObj.status==2">
	    	<div style="padding-left: .24rem;">
	    		<span style="font-size: .30rem;">￥</span>{{curObj.salePrice}}<span class="getMoney" style="margin: 0 .05rem;text-decoration: line-through; color: #FADEE7;font-size: .28rem;">￥{{curObj.marketPrice}}</span><span class="getMoney">{{curObj.score1}}</span>
	    	</div>
			
			<div class="countDown">
				<span style="font-size: .24rem;" v-show="curObj.status!=1">距结束</span>
				<span style="font-size: .24rem;" v-show="curObj.status==1">距开始</span>
				<span class='timeEnd'><b>{{hour}}</b> : <b>{{mint}}</b> : <b>{{secon}}</b></span>
			</div>
		</div>
		<div class="con" v-if="curObj.countryIcon!=null">
    		<img v-show="curObj.countryIcon!=null" :src="curObj.countryIcon"/>
    		<p>{{curObj.countryName}}</p>
    		<span>{{curObj.countryName}}直邮(已包税)</span>
    	</div>
	    <div class="goodsName">{{curObj.productName}}
	    	<div class="fenxiang" v-show="curObj.type==4 && curObj.freeUseSubType==3 ">
	    		<div class="erwei" @click="getErwei(curObj.productId)">
					<img :src="erweiImg" />
				</div>
	    	</div>
	    	<div class="fenxiang" v-show="curObj.type==9 && curObj.time!=null && curObj.status==1 || curObj.type==9 && curObj.time!=null && curObj.status==2">
	    		<div class="erwei" @click="getErwei(curObj.productId)">
					<img :src="erweiImg" />
				</div>
	    	</div>
	    </div>
	    <div class="productDescrip">
	    	<p>
	    		{{curObj.summary}}
	    	</p>
	    	<!--<p v-show="curObj.type==4">
	    		{{curObj.descriptionText}}
	    	</p>-->
	    </div>
	    <div class="newProduct" v-show="curObj.trip!=null">
	    	<!--<span class="new">NEW</span>-->
	    	<span class="newTime">{{curObj.trip}}</span>
	    </div>
	    <!--<div class="newProduct" v-show="curObj.tip!=null">
	    	
	    	<span class="newTime">{{curObj.tip}}</span>
	    </div>-->
	    <div class="score" v-show="curObj.buyNeedScore!=0">
	    	<p>{{curObj.buyNeedScore}}</p> 积分
	    </div>
	    
	    <div class="moneyDetail ">
	    	<div style="overflow: hidden;" v-bind:class="{ 'moneyDetailSpe': curObj.tags!=null}">
	    		<div class="moneyTop">
		    		运费: <span v-show="curObj.postFee!='包邮'">￥</span>{{curObj.postFee}}
		    	</div>
		    	<div class="moneyTop" style="margin-left: .40rem;" v-show="curObj.type==4 || curObj.type==8">
		    		试用时间: {{curObj.freeUseDays}}天
		    	</div>
		    	<div class="moneyBot">
		    		<span v-show="curObj.type==4 || curObj.type==8">已有{{curObj.soldCount}}人试用 · </span>还剩{{curObj.store}}件
		    	</div>
	    	</div>
	    	
	    </div>
	    
	    <div class="list" v-show="curObj.tags!=null">
	    	<p class="listSon" v-for="item in curObj.tags"><img :src='chooseImg'/>{{item}}</p>
		</div>
		<div style="width: 100%;height: .20rem;background: #f2f2f2;" v-show="curObj.couponPrices!=null"></div>
		<div class="getCoupon" v-show="curObj.couponPrices!=null" @click="getCoupon">
			<div class="pinShuo" >
				<p class="pinShuoL">领券</p>
				<p class="pinShuoC">
					<ul>
						<li v-for="item in curObj.couponPrices">
							<p>
								<img :src="couponleftImg"/>
								<span>{{item}}元</span>
								<img :src="couponrightImg"/>
							</p>	
						</li>
					</ul>
				</p>
				<p class="pinshuoR">
					<img :src="rowImg" />
				</p>
			</div>
		</div>
		<div style="width: 100%;height: .20rem;background: #f2f2f2;" v-show="showLength>0"></div>
		<div class="getCoupon" v-show="showLength>0" @click="buyGoods">
			<div class="pinShuo" >
				<p class="pinShuoL" v-show="!isChooseNormal" style="color: #777777; font-size: .26rem;">选择</p>
				<p class="pinShuoL" v-show="isChooseNormal" style="color: #777777; font-size: .26rem;">已选</p>
				<p class="pinShuoC" style="color: #333; font-size: .26rem;">
					{{chooseNormal.normalValue}}
				</p>
				<p class="pinshuoR">
					<img :src="rowImg" />
				</p>
			</div>
		</div>
		<div style="width: 100%;height: .20rem;background: #f2f2f2;" v-show="curObj.type==4 || curObj.type==8"></div>
		<div class="howtry" v-show="curObj.type==4">
			<p class="tryleft">试用流程</p>
			<p class="tryright" @click='getTryDetail' >
				试用说明
				<img :src='rowImg'/>
			</p>
		</div>
		<!--<div class="step" v-show="curObj.type==4">
			<img :src='trystepImg' />
		</div>-->
		<!--<div class="step" v-show="curObj.type==4 && curObj.countryIcon!=null">
			<img :src='trySixImg' />
		</div>-->
		<div class="stepNew" v-show="curObj.type==4">
			<p>申请试用</p>
			<img :src="rowmoreImgone"/>
			<p>付保证金</p>
			<img :src="rowmoreImgone"/>
			<p>试用{{curObj.freeUseDays}}天</p>
			<img :src="rowmoreImgone"/>
			<p>试用报告</p>
			<img :src="rowmoreImgone"/>
			<p>退保证金</p>
		</div>
		<div style="width: 100%;height: .20rem;background: #f2f2f2;" v-show='curObj.commentCount>0'></div>
		<div class="howtry" v-show='curObj.commentCount>0'>
			<p class="tryleft" v-show="curObj.type==4">试用报告 ({{curObj.commentCount}})</p>
			<p class="tryleft" v-show="curObj.type==9">用户评价 ({{curObj.commentCount}})</p>
			<div class="tryright" @click="lookMore">
				查看全部
				<img  :src="rowImg"/>
			</div>
			
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
			
		</div>
		<div style="width: 100%;height: .20rem;background: #f2f2f2;"></div>
		<div class="shopname">
			<div class="shopleft">
				<img :src="curObj.sellerLogo" />{{curObj.sellerName}}
			</div>
			<div class="shopright" @click="getshop">
				<img :src="houseImg" />
				<p>进店逛逛</p>
			</div>
		</div>
		<div style="width: 100%;height: .20rem;background: #f2f2f2;"></div>
		<div class="howtry">
			<p class="tryleft" style="font-size: .30rem;color: #333; width: 100%;text-align: center;">—— 商品详情  ——</p>
		</div>
		<!--<div style="width: 100%;height: .10rem;background: #f2f2f2;"></div>
		<p style="width: 100%;"><img :src="soldStopImg" style="display: block; width: 100%;"/></p>-->
		
		<div class="imgdetail" v-html="curObj.detail" style="width: 100%;">
			<p style="width: 100%;">{{curObj.detail}}</p>
				
		</div>
		<div class="bottomshop">
			<ul class="use">
				<li >
					<div style="border-right: 0.01rem solid #e1e1e1;">
						<p v-if="isShare==1" @click="getPinkIndex"><img :src="moreSaleImg"/></p>
						<p @click='getkefu' v-else=""><img :src="kefuImg"/></p>
						<span v-if="isShare==1" @click="getPinkIndex" style="font-size: .20rem; display: block;color: #939393; margin-top: .10rem;">更多特卖</span>
						<span v-else @click='getkefu' style="font-size: .20rem; display: block;color: #939393; margin-top: .10rem;">客服</span>
					</div>
					
				</li>
				<li>
					<div style="border-right: 0.01rem solid #e1e1e1;">
						<p v-if="isShare==1" @click="getMineIndex"><img :src="myIconImg"/></p>
						<p @click='getshop' v-else=""><img :src="houseImg"/></p>
						<span v-if="isShare==1" @click="getMineIndex" style="font-size: .20rem; display: block;color: #939393; margin-top: .10rem;">我的</span>
						<span v-else style="font-size: .20rem; display: block;color: #939393; margin-top: .10rem;">店铺</span>
					</div>
				</li>
				<li @click='shoucang'>
					<p>
						<img :src="shoucangImg" v-show='showShou==false'/>
						<img :src="collectedImg" v-show='showShou==true'/>
					</p>
					<span v-show='showShou==false' style="font-size: .20rem; display: block;color: #939393; margin-top: .10rem;">收藏</span>
					<span v-show='showShou==true'style="font-size: .20rem; display: block;color: #939393; margin-top: .10rem;">已收藏</span>
				</li>
			</ul>
			<div class="trytouse" @click="buyGoods" v-show="curObj.type==4 && curObj.status!=1">
				<div class="notPink">
					<p>申请试用</p>
				</div>
				
			</div>
			<div class="trytouse" v-show="curObj.type==9 && memberlevel==false && curObj.status!=1">
				<div class="addCart" @click="buyGoods">
					<div class="buy">
						<p>买</p>
					</div>
				</div>
				<div class="getGoods" @click="openShare">
					<div class="buy">
						<p>卖</p>
					</div>
				</div>
			</div>
			<div class="trytouse" v-show="curObj.status==1 || curObj.wholePointBuyStatus==1">
				<div class="notPink" >
					<p style="background: #bdbcbc;">尚未开始</p>
				</div>
			</div>
			<div class="trytouse" @click="buyGoods" v-show="curObj.type==9 && memberlevel && curObj.status!=1">
				<div class="notPink">
					<p>立即购买</p>
				</div>
			</div>
			<div class="trytouse" v-show="curObj.type==1">
				<div class="addCart" @click="addGoods">加入购物车</div>
				<div class="getGoods" @click="buyGoods">立即购买</div>
			</div>
		</div>
		<div class="norms" v-show="chooseNor">
			<div class="choose">
				<img class="close" :src="colseImg" @click="closeShow"/>
				<img :src="curObj.image"  class="productImage" v-if="getNomoreObj.length<=0 || getNomoreObj.image==null"/>
				<img :src="getNomoreObj.image"  class="productImage" v-else/>
				
				<p class="detail" v-show="curObj.type!=1">
					<span style="display: block; line-height: .30rem;" class="money" v-if="needScroe==false"><b style="color: #ed0477;">{{curObj.buyNeedScore}}</b><i style="font-size: .26rem;font-style: normal;font-weight: normal;">积分</i><br /><i style="font-style: normal;font-size: .26rem;">保证金:￥{{curObj.activePriceInterval}}</i></span>
					<span style="display: block;" class="money" v-if="getNomoreObj.salePrice!=undefined && needScroe==true && getNomoreObj.id!=0"><i style="font-size: .28rem;font-style: normal; font-weight: normal;" v-show="curObj.type==4">保证金 : </i><b style="color: #ed0477; font-weight: normal;">￥{{getNomoreObj.salePriceView}}</b></span>
					<span style="display: block;" class="money" v-if="getNomoreObj.salePrice==undefined && needScroe==true || getNomoreObj.id==0"><i style="font-size: .28rem;font-style: normal; font-weight: normal;" v-show="curObj.type==4">保证金 : </i><b style="color: #ed0477; font-weight: normal;">￥{{curObj.activePriceInterval}}</b></span><br />
					<span class="num" v-if='getNomoreObj.store!=undefined && normalId!=""'>&nbsp;库存{{getNomoreObj.store}}件</span>
					<span class="num" v-if="normalId=='' && showLength>0">&nbsp;请选择规格</span>
					<span class="num" v-if='getNomoreObj.store==undefined && showLength==0'>&nbsp;库存{{curObj.store}}件</span>
					<!--<span class="num" v-else>&nbsp;库存{{curObj.store}}件</span>-->
				</p>
				<!--<p class="detail" v-show="curObj.type==1">
					<span style="display: block; line-height: .30rem;" class="money" v-if="needScroe==false"><b style="color: #ed0477;">{{curObj.buyNeedScore}}</b><i style="font-size: .26rem;font-style: normal;font-weight: normal;">积分</i><br /><i style="font-style: normal;font-size: .26rem;">￥{{curObj.salePrice}}</i></span>
					<span style="display: block;" class="money" v-if="getNomoreObj.salePrice!=undefined && needScroe==true"><i style="font-size: .28rem;font-style: normal; font-weight: normal;"></i><b style="color: #ed0477; font-weight: normal;">￥{{getNomoreObj.salePriceView}}</b></span>
					<span style="display: block;" class="money" v-if="getNomoreObj.salePrice==undefined && needScroe==true"><i style="font-size: .28rem;font-style: normal; font-weight: normal;"></i><b style="color: #ed0477; font-weight: normal;">￥{{curObj.salePrice}}</b></span><br />
					<span class="num" v-if='getNomoreObj.store!=undefined && normalId!=0'>&nbsp;库存{{getNomoreObj.store}}件</span>
					<span class="num" v-if='getNomoreObj.store==undefined && normalId==0'>&nbsp;库存{{curObj.store}}件</span>
				</p>-->
				<!--<div class="noMores" v-for="item in curObj.normals">
					<p class="name">
						{{item.key}}
					</p>
					<p class="size" >
						<span class="special" v-for="(items,index) in item.normses" v-model="getVlaueOne" @click="getValue(index,items.keyId,items.valueId)">{{items.value}}</span>
						
					</p>
				</div>-->
				
				<div class="noMores" v-if="nomoreOne!=undefined" v-show="showLength>0">
					<div style="border-bottom: .01rem solid #f1f1f1; padding-left: .02rem;">
						<p class="nameClass">
							{{nomoreOne.key}}
						</p>
						<p class="size" >
							<span v-bind:class="{ 'special': index===addSelect}" v-for="(item,index) in nomoreOne.normses"   v-model="getVlaueOne" @click="getVlaueone(index,item.valueId)">{{item.value}}</span>
							
						</p>
					</div>
				</div>
				<div class="noMores" v-if="nomoreTwo!=undefined" v-show="showLength>1">
					<div style="border-bottom: .01rem solid #f1f1f1; padding-left: .02rem;">
						<p class="nameClass">
							{{nomoreTwo.key}}
						</p>
						<p class="size" >
							<span v-bind:class="{ 'special': index===addSelectTwo}" v-for="(item,index) in nomoreTwo.normses" @click="getVlauetwo(index,item.valueId)"  v-model="getVlaueTwo" >{{item.value}}</span>
							
						</p>
					</div>
				</div>
				<div class="noMores" v-if="nomoreThree!=undefined" v-show="showLength>2">
					<div style="border-bottom: .01rem solid #f1f1f1; padding-left: .02rem;">
						<p class="nameClass">
							{{nomoreThree.key}}
						</p>
						<p class="size" >
							<span v-bind:class="{ 'special': index===addSelectThree}" v-for="(item,index) in nomoreThree.normses"   v-model="getVlaueThree" >{{item.value}}</span>
							
						</p>
					</div>
				</div>
				<div class="buyNum">
					<p class="left">购买数量</p>
					<p class="right">
						<span class="del" @click="delNum">
							<img :src="delNewImg" class="delnum"/>
						</span>
						<span class="num">{{num}}</span>
						<span class="add" @click="addNum">
							<img :src="addNewImg" class="addnum"/>
						</span>
					</p>
				</div>
				<div class="surePay">
					<div class="surePaySon" @click="goBuything">
						<p>确 定</p>
					</div>
					
				</div>
			</div>
			
			<div class="tishi"  v-show="scroeEnt">
				
				<div class="tiCen">
					您的积分不足
				</div>
				<div class="tiBots">
					<p class="tiBleft" @click='getCon'>取消</p>
					<p class="tiBright" @click="getScroe">如何获得积分</p>
				</div>
			</div>
			<div class="tishi"  v-show="levelEnt">
				
				<div class="tiCen">
					您还不是粉领会员，是否开通粉领会员
				</div>
				<div class="tiBots">
					<p class="tiBleft" @click='getlevel'>取消</p>
					<p class="tiBright" @click="getPink">开通粉领</p>
				</div>
			</div>
		</div>
		<div class="pinKnow" v-show="pinKnowShow" @click="showImg"></div>
		<div class="pinGoods" v-show="pinKnowShow">
			<img :src="erweiObj" class="codeImage"/>
			<img :src="colseImg" class="closeImg" @click="showImg"/>
		</div>
		<!--<div class="goFortop" v-show="showTop">
			<img :src="goTopImg" @click="gotoTop"/>
		</div>-->
		<!--分享图标-->
		<div class="shareDetail" v-show="shareSure" @click="colseShare">
			<div class="fenxiangDetail">
				<div style="position: relative;">
					<img :src="fenxiangImg"/>
					<p class="share">点击右上角分享</p>
					<div class="descript">
						<span style="font-size: .36rem;">赚</span>
						<span style="margin-left: -.20rem;margin-bottom: -.08rem;">{{getMoney}}</span>
					</div>
					<p class="moreDes">
						只要你的好友通过你的链接购买此商品，你就能赚到<span style="color: #E50F72;">{{getMoney}}</span>元利润哦~
					</p>
					<div class="sureBut">确定</div>
					
				</div>
				
			</div>
		</div>
		<!--分享图标-->
		<!--领取优惠券-->
		<div class="pinFen" v-show="getCouponList"></div>
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
		<!--领取优惠券-->
		
	</div>
</template>

<script>
	var timer;
	import { Swiper, SwiperItem } from 'vux';
	import Scroll from '../../components/common/time.vue'
	import $ from 'jquery';
	export default {
		
		data : function() {
			return{
				imgList:[],
				curObj:[],
				isShare:this.$route.query.isShare,
				chooseImg:'/static/images/choose.png',
				rowImg:'/static/images/rowright.png',
				trystepImg:'/static/images/trystep.png',
				trySixImg:'/static/images/trySix.png',
				myIconImg:'/static/images/mineIndex.png',
				moreSaleImg:'/static/images/moresale.png',
				kefuImg:'/static/images/kefu.png',
				shoucangImg:'/static/images/shoucang.png',
				houseImg:'/static/images/house.png',
				colseImg:'/static/images/colse.png',
				delImg:'/static/images/del.png',
				delNewImg:'/static/images/delNew.png',
				addImg:'/static/images/add.png',
				addNewImg:'/static/images/addNew.png',
				goTopImg:'/static/images/goTop.png',
				collectedImg:'/static/images/collected.png',
				erweiImg:'/static/images/erwei.png',
				soldImg:'/static/images/soldOut.png',
				productdetailShareImg:'/static/images/productdetail_share.png',
				shareImg:'/static/images/share.png',
				soldStopImg:'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/glbs/WechatIMG5255.jpeg',
				couponleftImg:'/static/images/couponleft.png',
				couponrightImg:'/static/images/couponright.png',
				todaysaleImg:'/static/images/todaysale.png',
				fenxiangImg:'/static/images/fenxiang.png',
				tryImgone:'/static/images/tryOut.png',
				rowmoreImgone:'/static/images/rowmore.png',
				chooseNor:false,
				shareSure:false,
				scroeEnt:false,
				pinKnowShow:false,
				num:1,
				nomoreOne:[],
				nomoreTwo:[],
				nomoreThree:[],
				couponObj:[],
				showShou:false,
				getNomoreObj:[],
				addSelect:-1,
				addSelectTwo:-1,
				memberScore:0,
				normalId:'',
				showTop:false,
				shareData : {
					'title': "OL圈 试用中心",
					'description': "试,是一种态度。每日10,20点限量开抢！",
					'url': "",
					'picURL': "http://ol-site.olquan.com/plug/mobile/img/logoo.jpg",
					'hide':true,
					'share':false
				},
				needScroe:true,
				erweiObj:'',
				memberlevel:'',
				levelEnt:false,
				showLength:0,
				isAddGoods:false,
				getCouponList:false,
				getVlaueOne:'',
				getVlaueTwo:'',
				chooseNormal:{
					"normalValue":"规格"
				},
					
				isChooseNormal:false,
				day:'',
				hour:'',
				mint:'',
				secon:'',
				EndTime:0,
				getMoney:'',
				showButton:false,
				
				
			}
		},
		
		created: function() {
			if(this.$route.query.memberId=='undefined'){
				this.$route.query.memberId='';
			}
			this.addRecord();
			this.$store.commit('documentTitle','商品详情');
			this.getList();
			this.getMember();
			this.gotoTop();
			
			//console.log(this.isShare)
			
		},
		components: {
		    Swiper,
		    SwiperItem,
		    $,
		    Scroll
		},
		mounted(){
			window.addEventListener('scroll', this.getScroll);
			
			
		},
		methods:{
			//添加访问记录
			addRecord(){
  				let data = {
  					terminalType:5,
  					pageuri:'demo/iscroll'
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,data,this.addRecordBack,this);
  			},
  			addRecordBack(data){},
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
				//this.$router.push({path:'/rule/trydetail'+'?memberId='+this.getCookie("memberId")});
				//window.location.href=CUR_URLBACK+'rule/trydetail'+'?memberId='+this.getCookie("memberId");
				window.location.href=USE_URL+'/weixin/protocol/protocol?code=freeUseDesc'

			},
			//积分不足
			getCon(){
				this.scroeEnt=false;
				
			},
			//优惠券
			showFen(){
				
				this.getCouponList=false;
			},
			//不是粉领
			getlevel(){
				this.levelEnt=false;
			},
			//更多特卖
			getPinkIndex(){
				this.$router.push({path:'/index/pinkIndex'+'?memberId='+this.$route.query.memberId});
			},
			//我的
			getMineIndex(){
				window.location.href=USE_URL+'weixin/member/membercore?mmm='+this.$route.query.memberId;
			},
			//开通粉领
			getPink(){
				if(this.showButton){
					window.location.href=USE_URL+'weixin/member/renewConfirmOrder';
				}else{
					window.location.href=USE_URL+'weixin/member/openStore?&memberId='+this.$route.query.memberId;
				}
				
			},
			getScroe(){
				this.$router.push({path:'/integral/uesget'+'?memberId='+this.$route.query.memberId});
			},
			//点击客服
			getkefu(){
				window.location.href='https://kefu.easemob.com/webim/im.html?tenantId=40231&ticket=false';	
			},
			getshop(){
				window.location.href=USE_URL+'weixin/sellerShop/sellerShop?sellerId='+this.curObj.sellerId+'&memberId='+this.curObj.memberId;
			},
			shoucang(){
				let data={
					objId:this.curObj.productId,
//					memberId:this.$route.query.memberId,
					type:1
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.doCollect,data,this.shoucangBack,this);
				//console.log(data)
			},
			shoucangBack(data){
				this.showShou=!this.showShou;
				if(this.showShou){
					this.$toast('收藏成功',1000);
				}else{
					this.$toast('取消收藏',1000);
				}
				console.log(this.curObj.isCollect)
			},
			getScroll(){
				//var offsetTop = document.querySelector('.goodsDetail').offsetTop;
				//console.log(offsetTop)
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(scrollTop)
				if(scrollTop>600){
					this.showTop=true;
				}else{
					this.showTop=false;
				}
			},
			//点击回到顶部
			gotoTop(){
				document.body.scrollTop=0;
				document.documentElement.scrollTop = 0	
//				$('html,body').animate({scrollTop:0},1000);
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
					this.memberlevel=false;
				}else{
					this.memberlevel=true;
				}
				if(data.result.isShowRenewButton==0){
					this.showButton=false;
				}else{
					this.showButton=true;
				}
				//console.log(this.memberlevel)
			},
			closeShow(){
				this.chooseNor=false;
				this.showHeigth=false;
				this.scroeEnt=false;
			},
			delNum(){
				this.num -=1;
				if(this.num<=0){
					this.num=1;
				}
			},
			addNum(){
				if(this.curObj.type==4){
					this.$toast('该产品最多购买1件');
				}else{
					this.num +=1;
					if(this.num>this.curObj.limitBuyCount){
						this.num=this.curObj.limitBuyCount;
						this.$toast('该产品最多购买'+this.num+'件');
					}
				}
				
			},
			//获取商品信息
			getList(){
				console.log(this.$route.query.memberId)
				let data={
					productId:this.$route.params.id,
					//productId:140,
//					memberId:this.$route.query.memberId,
					viewType:this.$route.query.viewType,
					uutype:1
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.productDetail,data,this.getListBack,this);
			},
			getListBack(data){
				console.log(data)
				if(data.result.type==9 || data.result.type==4){
						//console.log(data)this.getCookie("memberId")
					if(data.code==-1){
						this.$toast(data.message);
						return false;
					}
					this.curObj=data.result;
	//				this.downTime=this.curObj.time;
					this.getMoney=this.curObj.score1.split("￥")[1];
					
					this.moveTime(this.curObj.time)
					
					//console.log(this.curObj.type==9 && this.curObj.status!=1 && this.curObj.status!=2)
	//				console.log(this.curObj.time)
					if(this.curObj.buyNeedScore>0){
						this.needScroe=false;
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
					this.showLength=this.curObj.normals.length;
					//console.log(this.showLength);
					if(this.showLength>0){
						if(data.result.normals){
							if(data.result.normals.length>0 && data.result.normals.length<2){
								this.nomoreOne=data.result.normals[0];
								//console.log(this.nomoreOne)
	//							this.getVlaueOne=data.result.normals[0].normses[0].valueId;
	//							this.getValueDetail();
								
							}else if(data.result.normals.length>1){
								this.nomoreOne=data.result.normals[0];
		//						console.log(this.nomoreOne)
	//							this.getVlaueOne=data.result.normals[0].normses[0].valueId;
								this.nomoreTwo=data.result.normals[1];
	//							this.getVlaueTwo=data.result.normals[1].normses[0].valueId;
								this.nomoreThree=data.result.normals[3]
	//							this.getValueDetail();
							}
							//console.log(this.nomoreThree)
						}
					}
					
					this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'demo/iscroll/id/'+this.curObj.productId+'?isShare=1');
					//this.shareData.url=USE_URL+"weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'demo/iscroll/id/'+this.curObj.productId+"?isShare=1");
					this.shareData.title=this.curObj.productName;
					this.shareData.description=this.curObj.summary;
					this.shareData.picURL=this.curObj.image;
					//console.log(this.getNomoreObj.store)
					this.moreWeixinShare();//微信分享 
					
				}else if(data.result.type==11 || data.result.type==12){
					window.location.href=CUR_URLBACK+'index/goodsDetali/id/'+data.result.togetherId+'?memberId='+this.$route.query.memberId+'&isLimit=0'
				}else{
					window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+data.result.productId;
				}
				
			},
			//获取二维码图片
			getErwei(id){
				this.pinKnowShow=true;
				let data={
					productId:id,
//					memberId:this.$route.query.memberId,
					type:this.curObj.type,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTwoCodeUrl,data,this.getErweiBack,this);
			},
			getErweiBack(data){
				this.erweiObj=data.result;
			},
			goBuything(){
				//console.log(this.normalId)
				if(this.curObj.type==8 && this.memberScore<this.curObj.buyNeedScore){
					this.scroeEnt=true;
				}else if(this.memberlevel==true && this.curObj.type==4){
					this.levelEnt=true;
				}else if(this.curObj.status==1){
					this.$toast('活动尚未开始，敬请期待');
				}else if(this.curObj.time==0){
					this.$toast('活动已结束，下次请早');
				}else if( this.normalId=='' && this.showLength!=0){
					this.$toast('请选择规格');
				}else if(this.curObj.status==5){
					this.$toast('该商品已经下架');
				}else if(this.num>this.curObj.store || this.num>this.getNomoreObj.store){
					console.log(this.getNomoreObj.store)
					this.$toast('库存不足');
				}else{
					if(this.isAddGoods){
						let data={
							num:this.num,
							normalId:this.normalId,
//							memberId:this.$route.query.memberId,
							productId:this.$route.params.id
						}
						this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addProduct,data,this.addGoodsBack,this);
					}else{
						this.setCookie('number','')
						let data={
							num:this.num,
							normalId:this.normalId,
//							memberId:this.$route.query.memberId,
							type:this.curObj.type,
							productId:this.curObj.productId
						}
						localStorage.setItem('orderObj',JSON.stringify(data))
//		  				let ObjObj=JSON.parse(localStorage.getItem("orderObj"))
//		  				console.log(ObjObj)
		  				if(this.curObj.type==4){
		  					//this.$router.push({path:'/fightAlone/ordersure/payorder?memberId='+this.$route.query.memberId});
//		  					this.$router.push({path:'/common/scroll?memberId='+this.$route.query.memberId});
		  					window.location.href=CUR_URLBACK+'fightAlone/ordersure/payorder?memberId='+this.$route.query.memberId
		  					//window.location.href=API_HOST+'ol/confirmOrder1.html?num='+this.num+'&urlMark=ljgm'+'&normalId='+this.normalId+'&'+'memberId='+this.getCookie("memberId")+'&type='+this.curObj.type+'&productId='+this.curObj.productId
		  				}else{
		  					window.location.href=USE_URL+'ol/confirmOrder1.html?num='+this.num+'&urlMark=ljgm'+'&normalId='+this.normalId+'&'+'memberId='+this.$route.query.memberId+'&type='+this.curObj.type+'&productId='+this.curObj.productId
		  				}
						//console.log(data)
						
					}
					
				}
			},
			
			//试用商品
			buyGoods(){
				//console.log(id);
//				console.log(this.getNomoreObj.values)
//				console.log(this.normalId)
//				console.log(this.showLength)
				
//				this.addSelect=-1;
//				this.addSelectTwo=-1;
//				this.getVlaueTwo='';
//				this.getVlaueOne='';
				this.chooseNor=true;
				this.showHeigth=true;
//				this.getValueDetail();
				//window.location.href='http://test-mobile.olquan.cn/ol/confirmOrder1.html?num='+this.$route.query.num+'&'+'normalId='+'&'+'memberId='+this.getCookie("memberId")+'&'+'togetherId='+this.$route.query.togetherId +'&'+'togetherRecordId='+this.$route.query.id
			},
			//添加购物车
			addGoods(){
				this.addSelect=-1;
				this.addSelectTwo=-1;
				this.getVlaueTwo='';
				this.getVlaueOne='';
				this.chooseNor=true;
				this.showHeigth=true;
				this.isAddGoods=true;
				this.getValueDetail();
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
//						memberId:this.$route.query.memberId,
						type:this.curObj.type,
					}
					//console.log(data)
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getNormal,data,this.getNormalBack,this);
				}else{
					console.log(1)
				}
				
			},
			getNormalBack(data){
				if(data.result!=null){
					this.getNomoreObj=data.result;
				}else{
					this.getNomoreObj='';
				}
				
				if(data.result!=null){
					if(data.result.id==0){
						this.normalId=''
					}else{
						this.normalId=data.result.id;
					}
				}else{
					this.normalId=''
				}
				if(data.result.values!=''){
					this.$set(this.chooseNormal,'normalValue',data.result.values);
					this.isChooseNormal=true;
				}
				
			},
			getVlauetwo(index,valueId){
				this.addSelectTwo=index;
				this.getVlaueTwo=valueId;
				this.getValueDetail();
			},
			//点击分享
			colseShare(){
				this.shareSure=false;
			},
			openShare(){
				this.shareSure=true;
			},
			//获取商品优惠券
			getCoupon(){
				
				let data={
//					memberId:this.$route.query.memberId,
					productId:this.curObj.productId,
					page:1,
					rows:20
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.conponsByProduct,data,this.getCouponBack,this);
			},
			getCouponBack(data){
				this.getCouponList=true;
				this.couponObj=data.result;
//				console.log(this.couponObj[0].vaildNum)
			},
			//点击立即领取
			getCouponId(id,index){
				//console.log(index)
				this.curTargetS=index;
				let data={
//					memberId:this.$route.query.memberId,
					couponId:id
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.receiveCoupon,data,this.getCouponIdBack,this);
			},
			getCouponIdBack(data){
				//console.log(this.couponObj)
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
			      h=check(Math.floor(t/1000/60/60));
			      m=check(Math.floor(t/1000/60%60));
			      s=check(Math.floor(t/1000%60));
			    }else{
					d=check(0);
					h=check(0);
					m=check(0);
					s=check(0);
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
			moveTime(time){
				let _this=this
				_this.EndTime= time + new Date().getTime();
				timer = setInterval(_this.getRtime,0)
				
				
			},
			//微信分享 
			moreWeixinShare:function(){
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
		},
	}
</script>

<style lang="scss" scoped>
	.goodsDetail{
		padding-bottom:1.00rem ;
		position: relative;
		background: #fff;
		width: 100%;
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
		.con{
			
			padding: .24rem .24rem 0;
			font-size: 0;
			height: .35rem;
			overflow: hidden;
			span{
				display: inline-block;
				font-size: .24rem;
				color: #fff;
				margin-left: .10rem;
				padding: 0rem 0.05rem;
				/*width: 2.00rem;*/
				line-height: .34rem;
				background: #E50F72;
			}
			p{
				display: inline-block;
				font-size: .26rem;
				color: #333;
				height: .30rem;
				margin-left: .10rem;
			}
			img{
				vertical-align: middle;
				margin-top: -0.15rem;
				display: inline-block;
				width: .46rem;
				height: .30rem;
			}
		}
		.productMoney{
			padding: 0 .24rem 0rem; 
			line-height: .80rem;
			position: relative;
			border-bottom: 0.01rem solid #E1E1E1;
			.erwei{
				position: absolute;
				top: 50%;
				background: #f0f0f0;
				margin-top: -.20rem;
				right:0.24rem;
				img{
					display: block;
					
					width: .40rem;
					height: .40rem;
				}
			}
			
			.moneySale{
				
				font-size: 0.50rem;
				color: #333;
			}
			
			.getMoney{
				display: inline-block;
				font-size: .28rem;
				color: #E50F72;
				margin-left: .10rem;
			}
		}
		.todaySale{
			background: url(../../../static/images/todaysale.png) no-repeat center center;
			background-size: 100% 1rem;
			height: .70rem;
			padding-top: .24rem;
			color: #fff;
			position: relative;
			font-size: .60rem;
			.getMoney{
				font-size: .28rem;
			}
			.countDown{
				position: absolute;
				text-align: center;
				right: 0.10rem;
				top: -.17rem;
				.timeEnd{
					display: block;
					font-size: .24rem;
					margin-top: .08rem;
					color: #333;
					line-height: .36rem;
					b{
						padding: 0 .05rem;
						background: #000;
						display: inline-block;
						width: .30rem;
						color: #fff;
						font-weight: normal;
					}
				}
			}
		}
		.goodsName{
			font-size:.28rem ;
			line-height: .46rem;
			position: relative;
			padding: 0.20rem .78rem 0 .24rem;
			.fenxiang{
				position: absolute;
				right: .24rem;
				top: 0;
				.erwei{
					position: absolute;
					top: .29rem;
					background: #f0f0f0;
					
					right:0;
					img{
						display: block;
						
						width: .40rem;
						height: .40rem;
					}
				}
				
			}
		}
		.productDescrip{
			
			color: #777;
			margin-top: .20rem;
			font-size: .24rem;
			line-height: .30rem;
			padding: 0 .24rem;
			p{
				width: 100%;
				word-wrap:break-word;
			}
		}
		.newProduct{
			overflow: hidden;
			margin-top: .20rem;
			display: flex;
			padding:  0 .24rem;
			span{
				float: left;
			}
			.new{
				border-radius: .04rem;
				color: #fff;
				font-size: .22rem;
				line-height: .26rem;
				padding: 0 0.05rem;
				text-align: center;
				background: #E50F72;
			}
			.newTime{
				flex: 1;
				
				font-size: .24rem;
				color: #E50F72;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				line-height: .26rem;
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
				font-size: .36rem;
				font-weight: 700;
			}
		}
		.goodsMoney{
			overflow: hidden;
			font-size: .24rem;
			color: #333;
			padding: 0 .24rem;
			margin-top: .26rem;
			padding-bottom: .34rem;
		}
		.moneyDetail{
			overflow: hidden;
			font-size: .24rem;
			line-height: .72rem;
			color: #777;
			padding: 0 .24rem;
			.moneyDetailSpe{
				border-bottom: 0.01rem solid #e1e1e1;
			}
			.moneyTop{
				float: left;
			}
			.moneyBot{
				float: right;
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
			height: .80rem;
			position: relative;
			
			.erwei{
				position: absolute;
				top: 50%;
				background: #f0f0f0;
				margin-top: -.20rem;
				right:0.24rem;
				img{
					display: block;
					
					width: .40rem;
					height: .40rem;
				}
			}
			.listSon{
				line-height: .80rem;
				position: relative;
				/*-webkit-box-flex: 1;
		        -ms-flex: 1;
		        flex: 1;*/
		        width: 20%;
				padding-left: .38rem;
				/*margin-right: .40rem ;*/
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
		.getCoupon{
			
			padding:0 .24rem;
			background: #fff;
			.pinShuo{
				overflow: hidden;
				position: relative;
				font-size: .26rem;
				color:#333;
				.pinShuoL{
					float: left;
					line-height: .90rem;
					
				}
				.pinShuoC{
					float: left;
					line-height: .90rem;
					margin-left: .30rem;
					width: 5.86rem;
					height: .90rem;
					overflow: scroll;
					padding-right: .30rem;
					ul{
						
						height: .90rem;
						color: #d0006c;
						overflow-x: auto;
						overflow-y: hidden;
						white-space: nowrap;
						li{
							height: 100%;
							
							margin-right: .30rem;
							
							display: inline-block;
							p{
								height: 100%;
								display:-webkit-box;
								display: flex;
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
								overflow: hidden;
								img{
									float: left;
									height: .36rem;
								}
								span{
									float: left;
									line-height: .36rem;
									height: .32rem;
									padding: 0 0.02rem;
									border-bottom: 0.02rem solid #E50F72;
									border-top: 0.02rem solid #E50F72;
								}
							}
							
						}
					}
				}
				.pinshuoR{
					float: right;
					position: absolute;
					height: .19rem;
					right: 0;
					top: 50%;
					margin-top: -0.09rem;
					img{
						height: .19rem;
						width: .10rem;
						display: block;
					}
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
				color: #333;
			}
			.tryright{
				float: right;
				font-size: .24rem;
				color: #999;
				img{
					display: inline-block;
					
					margin-left: .10rem;
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
		.stepNew{
			font-size: .26rem;
			height: 1.16rem;
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
			p{
				width: .58rem;
				height: .56rem;
			}
			img{
				display: block;
				width: .12rem;
				height: .20rem;
				margin: 0 .40rem;
			}
		}
		.assess{
			padding: 0 .24rem;
			.top{
				border-bottom: 0.01rem solid #e1e1e1;
				padding-bottom: .20rem;
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
						width: 32%;
						height:2.40rem;
						margin-right: 0.10rem;
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
			.top:last-child{
				border: none;
				padding-bottom: 0;
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
			position: relative;
			padding: 0.10rem .24rem;
			height: .80rem;
			.shopleft{
				
				height: 100%;
				line-height: .80rem;
				font-size:.32rem;
				img{
					display: inline-block;
					height: .60rem;
					width: .60rem;
					vertical-align: middle;
					margin-right: .20rem;
					margin-top: -0.05rem;
				}
			}
			.shopright{
				position: absolute;
				right: 0.24rem;
				top: 50%;
				margin-top: -.27rem;
				height: .54rem;
				width: 1.60rem;
				border: 0.01rem solid #999999;
				border-radius: 0.04rem;
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
			   
			    -webkit-justify-content:space-around;
				justify-content:space-around;
				-moz-box-pack:space-around;
				-webkit--moz-box-pack:space-around;
				box-pack:space-around;
			    img{
			    	display: block;
					height: .34rem;
					width: .34rem;
			    }
				p{
					font-size: .24rem;
					margin-left: -0.04rem;
					color: #333;
					line-height: .56rem;
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
			border-top: 0.02rem solid #e1e1e1;
			font-size:.24rem;
			bottom: 0;
			left: 0;
			.trytouse{
				width: 60%;
				float: left;
				background: #fff;
				height: 100%;
				text-align: center;
				line-height: 1.00rem;
				color: #fff;
				overflow: hidden;
				font-size: .36rem;
				.notPink{
					display: flex;
					align-items:center;
					padding-right: .10rem;
					height: 100%;
					p{
						background: #E50F72;
						line-height: .84rem;
						width: 100%;
						font-size: .36rem;
						border-radius: .04rem;
					}
				}
				.addCart{
					float: left;
					width: 50%;
					.buy{
						display: flex;
						display:-webkit-box;
						display: -moz-box;
						display: -ms-flexbox;
						display: -webkit-flex;
						display: -moz-flex;
						-webkit-box-pack: center;
					    -moz-box-pack: center;
					    -ms-flex-align:center;
					      
					    -webkit-align-items: center;
					    -moz-align-items: center;
					    align-items: center;
						height: 1rem;
						padding-right: .10rem;
						
						p{
							line-height: .84rem;
							background: #333;
							width: 100%;
							border-radius: .04rem;
						}
					}
				}
				.getGoods{
					float: left;
					width: 50%;
					.buy{
						display: flex;
						display:-webkit-box;
						display: -moz-box;
						display: -ms-flexbox;
						display: -webkit-flex;
						display: -moz-flex;
						-webkit-box-pack: center;
					    -moz-box-pack: center;
					    -ms-flex-align:center;
					      
					    -webkit-align-items: center;
					    -moz-align-items: center;
					    align-items: center;
						height: 1rem;
						padding-right: .10rem;
						
						p{
							line-height: .84rem;
							background: #E50F72;
							width: 100%;
							border-radius: .04rem;
						}
					}
				}
			}
			.use{
				float: left;
				width: 40%;
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
					width: 33.33%;
					font-size: .20rem;
					color: #939393;
					padding-bottom: .18rem;
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
					height: 1.53rem;
					width: 1.54rem;
					display: block;
					border: 0.01rem solid #e1e1e1;
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
					padding-bottom: .10rem;
					padding-left: 2.04rem;
					border-bottom: .01rem solid #e1e1e1;
					height: 1.41rem;
					padding-top: .15rem;
					.money{
						line-height: .50rem;
						font-weight: 700;
						font-size: .36rem;
						
						
					}
					.num{
						font-size: .20rem;
						color: #a2a2a2;
					}
				}
				
				.noMores{
					padding: 0 .28rem;
					.nameClass{
						font-size: .26rem;
						padding-top: .06rem;
						line-height: .74rem;
					}
					.size{
						overflow: hidden;
						
						span{
							margin: 0 .20rem .24rem 0.01rem;
							float: left;
							height: .54rem;
							min-width: 1.20rem;
							border: 0.01rem solid #cfcfcf;
							font-size: .24rem;
							text-align: center;
							line-height: .56rem;
							border-radius: 0.02rem;
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
				padding:.18rem .26rem .26rem;
				
				
				.left{
					padding-bottom: .20rem;
					line-height: .50rem;
				}
				.right{
					
					overflow: hidden;
					.num{
						float: left;
						line-height: .56rem;
						font-size: .32rem;
						min-width: .48rem;
						text-align: center;
						color: #000;
					}
					.del{
						
						float: left;
						height: .56rem;
						width: .86rem;
						background: #F5F3F3;
						vertical-align: middle;
						text-align: center;
						line-height: .56rem;
						font-size: .48rem;
						margin-right: .20rem;
						.delnum{
							display: block;
							height: 100%;
							width: 100%;
						}
					}
					.add{
						float: left;
						height: .56rem;
						width: .86rem;
						background: #F5F3F3;
						line-height: .56rem;
						font-size: .48rem;
						background: #F5F3F3;
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
				background: #fff;
				font-size: .34rem;
				color: #fff;
				
				text-align: center;
				.surePaySon{
					border-top: 0.01rem solid #E1E1E1;
					padding: 0.18rem .26rem;
					
					p{
						line-height:.96rem;
						background: #E50F72;
						border-radius: .04rem;
					}
				}
			}
		}
		.tishi{
			position: fixed;
			width: 5.00rem;
			height: 2.00rem;
			background: #fff;
			left: 50%;
			margin-left: -2.50rem;
			top:50%;
			margin-top: -1.50rem;
			z-index: 444;
			border-radius: .10rem;
			border: 0.01rem solid #e5e5e5;
			overflow: hidden;
			
			.tiCen{
				line-height: 1.00rem;
				text-align: center;
				font-size: .26rem;
				border-bottom: .01rem solid #f2f2f2;
			}
			.tiBots{
				overflow: hidden;
				font-size: .26rem;
				text-align: center;
				line-height: 1.00rem;
				.tiBleft{
					float: left;
					width: 40%;
					border-right: 0.01rem solid #f2f2f2;
				}
				.tiBright{
					float: left;
					width: 59.5%;
					color: #08c1f6;
				}
			}
			
		}
		.goFortop{
			position: fixed;
			bottom: 1.30rem;
			right: .60rem;
			z-index: 333;
			img{
				display: block;
				width: .60rem;
				height: .60rem;
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
				top: 0.24rem;
				z-index: 1005;
				
			}
		}
		.shareDetail{
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 222;
			background: rgba(0,0,0,.5);
			.fenxiangDetail{
				position: fixed;
				top: 50%;
				margin-top: -4.83rem;
				left: 50%;
				margin-left: -2.85rem;
				
				width: 5.70rem;
				height: 7.66rem;
				.specialZhe{
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					z-index: 22;
					top: 0;
					background: rgba(0,0,0,0);
				}
				.share{
					position: absolute;
					width: 100%;
					text-align: center;
					left: 0;
					top: 2.40rem;
					color: #333;
					font-size: .34rem;
				}
				.descript{
					position: absolute;
					
					width: 100%;
					text-align: center;
					left: 0;
					top: 3.62rem;
					color: #E50F72;
					font-size: .72rem;
					vertical-align: bottom;
					font-weight: normal;
					span{
						display: inline-block;
						vertical-align: bottom;
					}
					
				}
				.moreDes{
					position: absolute;
					width: 4.16rem;
					left: 50%;
					text-align: center;
					line-height: .28rem;
					margin-left: -2.08rem;
					top: 4.68rem;
					font-size: .22rem;
					color: #333;
					
				}
				.sureBut{
					position: absolute;
					bottom: .36rem;
					width: 4.67rem;
					height: .93rem;
					left: 50%;
					margin-left: -2.33rem;
					background: url(../../../static/images/fenBut.png) no-repeat center center;
					background-size: 4.67rem .93rem;
					color: #F2E9E9;
					font-size: .34rem;
					text-align: center;
					line-height: .93rem;
				}
				img{
					display: block;
					width: 100%;
					height: 100%;
					pointer-events:none;
				}
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