<template>
	<div class="payorder">
		<div class="addrese" @click="getAddressMore">
			<div class="addtop">
				<span style="color: #333;">{{addressObj.name}}</span>
				<span style="color: #666; margin-left: .20rem;">{{dh}}</span>
			</div>
			<div class="addbbot">
				{{addressObj.provinceName}} {{addressObj.cityName}} {{addressObj.districtName}} {{addressObj.address}}
			</div>
			<div class="getAddressList">
				<img :src="rowMoreImg" />
			</div>
		</div>
		<div class="goodsDetail">
		<div v-for="item in curObj.sellers">
			<div class="saleName">{{item.sellerName}}</div>
			<div class="productDetail" v-for="itemSon in item.productDetails">
				<div class="productImage">
					<p><img style="display: block;width: 100%;" :src="itemSon.productImage"></p>
				</div>
				<div class="productName">
					<div class="nameTop">
						<p class="nameT-T">{{itemSon.productName}}</p>
						<p class="nameT-B">￥{{itemSon.price.toFixed(2)}}</p>
					</div>
				</div>
				<div class="productNum">x{{itemSon.num}}</div>
				<div class="prodtctNor">{{itemSon.normal}}</div>
			</div>
		</div>
			
			<div class="order">
				<p class="order-L">运费</p>
				<p class="order-R">{{curObj.postFeeView}}</p>
			</div>
			<div class="order">
				<span>订单留言：</span>
				<input  class="words" v-on:input ="clearinputMemo()" placeholder="对本次交易的说明,限45字" maxlength="45" v-model="inputMemo"/>
			</div>
			<!--<div class="order">
				<p class="order-L">合计</p>
				<p class="order-R" style="color: #e61d79;">{{finalPriceObj}}</p>
			</div>-->
		</div>
		<div class="payment">
			<div class="account">账户</div>
			<div class="choosestores" v-show="curObj.canUseScore==1 && curObj.score>0">
				<div class="stores">
					<p class="stores-l">积分<span> ({{curObj.score}}可抵现{{curObj.scoreAmount}}元)</span></p>
					<div class="stores-r">
						<span v-show="useStores>=100 && storeFeeShow">-￥{{storeFeeObj}}</span>
						<span v-show="useStores<100 && storeFeeShow">{{storeFeeObj}}</span>
						<div class="choosePay" @click="inputStore">
							<img :src="nochoseImg" v-show="!storeFeeShow"/>
							<img :src="checkImg" v-show="storeFeeShow"/>
						</div>
						
					</div>
					
				</div>
				<div class="usestore" v-show="storeFeeShow">
					<input class="storeNum" pattern="[0-9]*" v-on:input ="clearNoNum()" v-model="useStores"/>
					<span>积分 <i style="font-style: normal; color: #888;font-size: .24rem;">(最低100积分)</i></span>
				</div>
			</div>
			<div class="choosestores" v-show="curObj.coffers>0">
				<div class="stores">
					<p class="stores-l">小金库<span> ({{curObj.coffers}}元)</span></p>
					<div class="stores-r">
						<span v-show="coffersFee!=''">-￥{{coffersFeeObj}}</span>
						<div class="choosePay"  @click="inputCoofers">
							<img :src="nochoseImg" v-show="!coffersFeeShow"/>
							<img :src="checkImg" v-show="coffersFeeShow"/>
						</div>
						
					</div>
					
				</div>
				<div class="usestore" v-show="coffersFeeShow">
					<input class="storeNum" v-on:input ="clearMoreCoff()" v-model="coffersFee"/>
					<span>元 </span>
				</div>
				<!--<div class="usestore">
					<input class="storeNum" v-on:input ="clearMoreNum()" v-model="useStores"/>
					<span>积分 <i style="font-style: normal; color: #888;font-size: .24rem;">(最低100积分)</i></span>
				</div>-->
			</div>
			<div class="choosestores" v-show="curObj.amount>0">
				<div class="stores">
					<p class="stores-l">余额<span> ({{curObj.amount}}元)</span></p>
					<div class="stores-r">
						<span v-show="amountFee!=''">-￥{{amountFeeObj}}</span>
						<div class="choosePay" @click="inputAmount">
							<img v-show="!amountFeeShow" :src="nochoseImg"/>
							<img :src="checkImg"  v-show="amountFeeShow"/>
						</div>
						
					</div>
					
				</div>
				<div class="usestore" v-show="amountFeeShow">
					<input class="storeNum" v-on:input ="clearMoreNum()" v-model="amountFee"/>
					<span>元 </span>
				</div>
			</div>
			<div class="choosestores" v-show="curObj.goldBean>0">
				<div class="stores">
					<p class="stores-l">金豆<span> ({{curObj.goldBean}}可抵现{{curObj.goldBeanAmount}}元)</span></p>
					<div class="stores-r">
						<span v-show="useGoldBean>=10 && beanFeeShow">-￥{{goldBeanFeeObj}}</span>
						<span v-show="useGoldBean<10 && beanFeeShow">{{goldBeanFeeObj}}</span>
						<div class="choosePay" @click="inputGoldBean">
							<img :src="nochoseImg" v-show="!beanFeeShow"/>
							<img :src="checkImg" v-show="beanFeeShow"/>
						</div>
						
					</div>
					
				</div>
				<div class="usestore" v-show="beanFeeShow">
					<input class="storeNum" pattern="[0-9]*" v-on:input ="clearNoNumBena()" v-model="useGoldBean"/>
					<span>金豆 <i style="font-style: normal; color: #888;font-size: .24rem;">(最低10金豆)</i></span>
				</div>
			</div>
			<div class="choosestores" v-if="curObj.coupons!=null && curObj.coupons!=''" @click="getCouponList">
				<div class="stores">
					<p class="stores-l">优惠券<span v-show="couponAmount==0"> ({{curObj.coupons[0].coupons.length}}张可用/未选择)</span></p>
					<div class="stores-r">
						<span v-show="couponAmount!=0">-￥{{couponAmount}}</span>
						<img style="width:.16rem ;height: .26rem;" :src="rowMoreImg">
					</div>
					
				</div>
			
			</div>
		</div>
		<div class="totalDetail">
			<div style="font-size:.28rem;line-height: .72rem;">合计</div>
			<div class="detailFee">
				<div class="soloDetail">
					<p class="solo-l">商品总额</p>
					<p class="solo-r">￥{{prodrctFee}}</p>
				</div>
				<div class="soloDetail" v-show="postFee!=0">
					<p class="solo-l">运费</p>
					
					<p class="solo-r">￥{{postFee}}</p>
				</div>
				<div class="soloDetail" v-show="coffersFeeShow">
					<p class="solo-l">小金库</p>
					<p class="solo-r">-￥{{coffersFeeObj}}</p>
				</div>
				<div class="soloDetail" v-show="amountFeeShow">
					<p class="solo-l">余额</p>
					<p class="solo-r">-￥{{amountFeeObj}}</p>
				</div>
				<div class="soloDetail" v-show="storeFeeShow && useStores>=100">
					<p class="solo-l">积分</p>
					<p class="solo-r">-￥{{storeFeeObj}}</p>
				</div>
				<div class="soloDetail" v-show="beanFeeShow && useGoldBean>=10">
					<p class="solo-l">金豆</p>
					<p class="solo-r">-￥{{goldBeanFeeObj}}</p>
				</div>
				<div class="soloDetail" v-show="couponAmount!=0">
					<p class="solo-l">优惠券</p>
					<p class="solo-r">-￥{{couponAmount}}</p>
				</div>
			</div>
		</div>
		<div class="orderSure">
			<div class="chooseOrder">
				支付方式
			</div>
			<div class="orderWay" v-show="showWXpay==true">
				<div class="wayLeft">
					<img :src="weixinImg"/>
					微信
				</div>
				<div class="wayRight" @click="checkOne">
					<img :src="nochoseImg" v-show="sureCheckone==false" />
					<img :src="choseImg"  v-show="sureCheckone==true"/>
				</div>
			</div>
			<div class="orderWay">
				<div class="wayLeft">
					<img :src="zhifubImg"/>
					支付宝
				</div>
				<div class="wayRight" @click="checkTwo">
					<img :src="nochoseImg" v-show="sureChecktwo==false"/>
					<img :src="choseImg"  v-show="sureChecktwo==true"/>
				</div>
			</div>
			<!--<div class="orderWay">
				<div class="wayLeft">
					<img :src="payforanotherImg"/>
					找人代付
				</div>
				<div class="wayRight" @click="checkThree">
					<img :src="nochoseImg" v-show="sureCheckthree==false"/>
					<img :src="choseImg" v-show="sureCheckthree==true"/>
				</div>
			</div>-->
			<div class="orderPay">
				<div class="moneyPay">
					<span>应付金额 :</span>
					<span style="color: #e61d79;">￥<i>{{finalPriceObj<0?0:finalPriceObj}}</i></span>
					<span>共{{curObj.totalNum}}件</span>
					<div class="putOrder" v-show="!isOrderGet" @click="payOrder()">提交订单</div>
					<div class="putOrder" style="background: #ddd;" v-show="isOrderGet">提交订单</div>
				</div>
			</div>
		</div>
		<!--输入密码弹框-->
		<transition name="slide-fade">
		<div class="mask" v-show="payPasswordShow || isOrderGet"></div>
		</transition>
		<transition name="slide-fade">
			<div class="password" v-show="payPasswordShow">
				<div class="tipe">请输入支付密码</div>
				<input type="password" name="payPassword" value="" placeholder="请输入支付密码" v-model="payPassword">
				<div class="btn">
					<p @click="removePassPay">
						<span style="border-right: 0.01rem solid #e5e5e5;display: block;">取消</span>
					</p>
					<p @click="passPay">
						<span style="color: #e7317d;display: block;">确定</span>
					</p>
				</div>
			</div>
		</transition>
		<!--输入密码弹框-->
		<div class="changeAdd" v-show="needIdcard" @touchmove.prevent>
			<div class="change">
				<div style="padding: .40rem;line-height: .52rem;">海关要求购买跨境商品需提供购买人实名信息。</div>
				<div class="addAddress">
					<div class="addLeft" @click="cancelAdd">取消</div>
					<div class="addRight" @click="suerAddAdress">去完善</div>
				</div>
			</div>
		</div>
		<div class="chooseCoupon" v-show="couponShow" >
			<div class="couponListOut">
				<div class="listTop">
					<div>可用优惠券</div>
					<img :src="colseImg" @click="colseCouponList"/>
				</div>
				<div class="couponList">
					<div v-for="item in curObj.coupons">
						<div class="couponDetail" v-for="(itemSon,index) in item.coupons" @click="getCouponDetail(index,itemSon.amount,itemSon.id)">
							<div class="couponDescribe">
								<div class="money"><span>￥<span style="font-size: .60rem;font-weight: 700;">{{itemSon.amount}}</span></span></div>
								<div class="describe">
									<div class="couponName">{{itemSon.title}}</div>
									<div class="getCoupon">
										<img :src="nochoseImg" v-show="itemSon.selectM==false"/>
										<img :src="choseImg" v-show="itemSon.selectM==true"/>
									</div>
								</div>
								
							</div>
							<div class="couponTime">
								{{itemSon.startDate}} 至  {{itemSon.endDate}}
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	export default{
		data : function() {
			return{
				phone:'15658160809',
				dh:'',
				addressId:0,
				weixinImg:'/static/images/weixin.png',
				nochoseImg:'/static/images/nochose.png',
				choseImg:'/static/images/waychose.png',
				zhifubImg:'/static/images/zhifub.png',
				payforanotherImg:'/static/images/payforanother.png',
				checkImg:'/static/images/checked.png',
				rowMoreImg:'/static/images/rowmore.png',
				colseImg:'/static/images/colse.png',
				sureCheckone:true,
				sureChecktwo:false,
				sureCheckthree:false,
				useGoldBean:0,
				totalFee:'',
				coffersFee:0,
				amountFee:0,
				useStoresUse:0,
				useBeanUse:0,
				payPassword:'',
				payPasswordShow:false,
				amountFeeShow:false,
				coffersFeeShow:false,
				storeFeeShow:false,
				beanFeeShow:false,
				isShowPass:false,
				isOrderGet:false,
				showWXpay:true,
				couponShow:false,
				couponAmount:0,
				useStores:0,
				needIdcard:false,
				needNameAndCode:'',
				orderObj:JSON.parse(localStorage.getItem("orderObj")),
				curObj:[],
				addressObj:[],
				prodrctFee:0,
				postFee:0,
				couponId:'',
				payMethod:1,
				inputMemo:'',
				payInfo:{},
				addressId:'',
				shareData : {
					'title': "",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':true,
					'close':true
				},
				timeObj:{},
				resultS:{
					orderNO:122,
				},
				
			}
		},
		created: function() {
			if(this.$route.query.memberId=='undefined'){
				this.$route.query.memberId='';
			}
			if(tsApp.getClientBrowser()=='wx'){
				this.showWXpay=true;
			}else{
				this.showWXpay=false;
				this.sureCheckone=false;
				this.sureChecktwo=true;
				this.sureCheckthree=false;
				this.payMethod=4;
			}
//			console.log(this.showWXpay)
			this.addRecord();
			this.$store.commit('documentTitle','确认订单');
			this.getList();
			this.addWeixinShare();
		},
		mounted(){

			
		},
		computed: {
			amountFeeObj(){
				return Number(this.amountFee);
			},
			coffersFeeObj(){
				return Number(this.coffersFee);
			},
			storeFeeObj(){
				if(this.useStores<100){
					return '最低100积分';
				}else{
					return Number(this.useStores/100);
				}
			},
			goldBeanFeeObj(){
				if(this.useGoldBean<10){
					return '最低10金豆';
				}else{
					return Number(this.useGoldBean/10);
				}
			},
            finalPriceObj(){
            	if(!this.amountFeeShow){
            		this.amountFee=0;
            	}
            	if(!this.coffersFeeShow){
            		this.coffersFee=0;
            	}
            	if(!this.storeFeeShow){
            		this.useStoresUse=0;
            	}else{
            		if(this.useStores<100){
	            		this.useStoresUse=0;
	            	}else{
	            		this.useStoresUse=this.useStores/100
	            	}
            	}
            	if(!this.beanFeeShow){
            		this.useBeanUse=0;
            	}else{
            		if(this.useGoldBean<10){
	            		this.useBeanUse=0;
	            	}else{
	            		this.useBeanUse=this.useGoldBean/10
	            	}
            	}
            	
            	this.totalFee=this.curObj.totalFee-this.amountFee-this.coffersFee-this.useStoresUse-this.couponAmount-this.useBeanUse;
				
				return this.totalFee.toFixed(2);
			},
            
        },
		methods:{
			getCouponList(){
				this.couponShow=true;
			},
			colseCouponList(){
				this.couponShow=false;
			},
			getCouponDetail(index,amount,couponRecordId){
				
				if(this.curObj.coupons[0].coupons[index].selectM){
					this.curObj.coupons[0].coupons[index].selectM=false;
				}else{
					for(let i =0 ;i<this.curObj.coupons[0].coupons.length;i++){
						this.curObj.coupons[0].coupons[i].selectM=false;
					}
					this.curObj.coupons[0].coupons[index].selectM=!this.curObj.coupons[0].coupons[index].selectM;
				}
				if(this.curObj.coupons[0].coupons[index].selectM){
					this.couponAmount=amount;
					this.couponId=couponRecordId;
				}else{
					this.couponAmount=0;
					this.couponId='';
				}
//				console.log(this.couponId)
				if(this.amountFeeShow){
					if(this.amountFee==this.curObj.totalFee || this.amountFee > this.curObj.totalFee-amount){
						this.amountFee=this.curObj.totalFee-amount;
					}
            		
            	}
            	if(this.coffersFeeShow){
            		if(this.coffersFee==this.curObj.totalFee || this.coffersFee> this.curObj.totalFee-amount){
            			this.coffersFee=this.curObj.totalFee-amount;
            		}
            		
            	}
            	if(this.storeFeeShow){
            		if(this.useStores==(this.curObj.totalFee)*100 ||this.useStores >(this.curObj.totalFee-amount)*100){
            			this.useStores=(this.curObj.totalFee-amount)*100;
            		}
            		
            	}
            	if(this.beanFeeShow){
            		if(this.useGoldBean==(this.curObj.totalFee)*10 ||this.useStores >(this.curObj.totalFee-amount)*10){
            			this.useGoldBean=(this.curObj.totalFee-amount)*10;
            		}
            		
            	}
//				console.log(this.couponAmount)
			},
			//添加访问记录
			addRecord(){
  				let data = {
  					terminalType:5,
  					pageuri:'fightAlone/ordersure/payorder'
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,data,this.addRecordBack,this);
  			},
  			addRecordBack(data){},
			getAddressMore(){
				this.$router.push({path:'/payMain/address?isPinkGoods=1&isOverseasDirectMailProduct='+this.curObj.isOverseasDirectMailProduct+'&isCrossBorderProduct='+this.curObj.isCrossBorderProduct});
			},
			getList(){
				let data={
					productId:this.orderObj.productId,
					num:this.orderObj.num,
					normalId:this.orderObj.normalId,
					type:this.orderObj.type,
//					memberId:this.$route.query.memberId,
					
					uutype:1,
					
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.buyNowConfirmOrder,data,this.getListBack,this);
			},
			getListBack(data){
				//console.log(123)
				if(data.code!=0){
					this.$toast(data.message);
				}else{
					this.curObj=data.result;
					if(data.result.receiveAddress==null){
						this.$router.push({path:'/add/addAdress?isPinkGoods=1&isOverseasDirectMailProduct='+data.result.isOverseasDirectMailProduct+'&isCrossBorderProduct='+data.result.isCrossBorderProduct});
					}
					if(data.result.coupons!=null && data.result.coupons!=''){
						for(let i=0; i<data.result.coupons[0].coupons.length;i++){
							this.$set(data.result.coupons[0].coupons[i],'selectM',false);
						}
					}
//					console.log(this.curObj.coupons[0].coupons)
					//console.log(this.curObj)
					this.totalFee=this.curObj.totalFee;
					this.prodrctFee=this.curObj.productsFee;
					if(this.curObj.postFee==null){
						this.curObj.postFee=0;
					}
					this.postFee=this.curObj.postFee;
					console.log(this.$route.query.addressId);
					if(this.$route.query.addressId != undefined){
						this.addressId=this.$route.query.addressId
					}else{
						
						this.addressId=data.result.receiveAddress.id
					}
					this. getAddress(this.addressId);
				}
				
			},
			//获取地址详情
		    getAddress(id){
		    	let data = {
		    		addressId:id,
		    	}
		    	//console.log(data)
		    	this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getAddress,data,this.getAddressBack,this);
		    },
		    getAddressBack(data){
		    	this.addressObj=data.result;
		    	this.dh=this.addressObj.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		    },
			//点击小金库
			inputAmount(){
				this.amountFeeShow=!this.amountFeeShow;
				this.coffersFeeShow=false;
				this.storeFeeShow=false;
				this.beanFeeShow=false;
				if(this.amountFeeShow){
					if(this.curObj.amount<=this.curObj.totalFee){
						this.amountFee=this.curObj.amount;
					}else{
						this.amountFee=(this.curObj.totalFee-this.couponAmount);
					}
				}else{
					this.amountFee=0;
				}
//				this.totalFee=this.curObj.totalFee-this.amountFee;
			},
			//取消添加地址
			cancelAdd(){
				this.needIdcard=false;
			},
			suerAddAdress(){
				this.$router.push({path:'/add/addAdress?isPinkGoods=1'+'&addressId='+this.addressId+'&isOverseasDirectMailProduct='+this.curObj.isOverseasDirectMailProduct+'&isCrossBorderProduct='+this.curObj.isCrossBorderProduct});
			},
			//点击积分
			inputStore(){
				this.storeFeeShow=!this.storeFeeShow;
				this.amountFeeShow=false;
				this.coffersFeeShow=false;
				this.beanFeeShow=false;
				if(this.storeFeeShow){
					if(this.curObj.scoreAmount<=this.curObj.totalFee){
						console.log(this.curObj.coffers)
						this.useStores=this.curObj.score;
					}else{
						console.log(this.curObj.totalFee)
						this.useStores=(this.curObj.totalFee-this.couponAmount)*100;
					}
				}else{
					this.useStores=0;
				}
			},
			//点击金豆
			inputGoldBean(){
				this.beanFeeShow=!this.beanFeeShow;
				this.coffersFeeShow=false;
				this.amountFeeShow=false;
				this.storeFeeShow=false;
				if(this.beanFeeShow){
					if(this.curObj.goldBeanAmount<=this.curObj.totalFee){
						console.log(this.curObj.coffers)
						this.useGoldBean=this.curObj.goldBean;
					}else{
						console.log(this.curObj.totalFee)
						this.useGoldBean=(this.curObj.totalFee-this.couponAmount)*10;
					}
				}else{
					this.useGoldBean=0;
				}
			},
			//点击余额
			inputCoofers(){
				this.coffersFeeShow=!this.coffersFeeShow;
				this.amountFeeShow=false;
				this.storeFeeShow=false;
				this.beanFeeShow=false;
				if(this.coffersFeeShow){
					if(this.curObj.coffers<=this.curObj.totalFee){
						this.coffersFee=this.curObj.coffers;
					}else{
						this.coffersFee=(this.curObj.totalFee-this.couponAmount);
					}
				}else{
					this.coffersFee=0;
				}
			},
			checkOne(){
				this.sureCheckone=true;
				this.sureChecktwo=false;
				this.sureCheckthree=false;
				this.payMethod=1;
				
			},
			checkTwo(){
				this.sureCheckone=false;
				this.sureChecktwo=true;
				this.sureCheckthree=false;
				this.payMethod=4;
				
			},
			checkThree(){
				this.sureCheckone=false;
				this.sureChecktwo=false;
				this.sureCheckthree=true;
				
			},
			
			//提交订单
			payOrder(){	
					if(this.useStores<100 && this.storeFeeShow){
						this.$toast('最低使用100积分');
						return;
					}
					if(this.useGoldBean<10 && this.beanFeeShow){
						this.$toast('最低使用10金豆');
						return;
					}
					if(Number(this.amountFee)==0 && Number(this.coffersFee)==0 && this.useStores==0 && this.useGoldBean==0){
						this.isShowPass=true;
					}else{
						this.isShowPass=false;
					}
					
					if(this.curObj.isCrossBorderProduct==1){
						if(this.addressObj.identityNo==''){
							this.needNameAndCode='跨境商品需填写身份证号';
							this.needIdcard=true;
							return;
						}
						
					}
					if(this.curObj.isOverseasDirectMailProduct==1){
						
						if(this.addressObj.identityNo==''){
							
							this.needIdcard=true;
							return;
						}else if(this.addressObj.identityFrontImage==null){
							
							this.needIdcard=true;
							return;
						}else if(this.addressObj.identityOppImage==null){
							
							this.needIdcard=true;
							return;
						}
						
					}
					
					if(this.curObj.enabledPayPassword && !this.isShowPass){
						this.payPasswordShow=true;
						
						
					}else{
						let data ={
							productId:this.orderObj.productId,
							num:this.orderObj.num,
							normalId:this.orderObj.normalId,
							type:this.orderObj.type,
//							memberId:this.$route.query.memberId,
							addressId:this.addressId,
							payMethod:this.payMethod,
							memo:this.inputMemo,
							amount:Number(this.amountFee),
							coffers:Number(this.coffersFee),
							score:this.useStores,
							goldBean:this.useGoldBean,
							recId:this.orderObj.recId,
							couponRecordId:this.couponId,
							uutype:1,
						}
//						console.log(data)
						this.isOrderGet=true;
						
						let defaultStyle = 'fading-circle';
						this.$indicator.open({
						    spinnerType: defaultStyle
						});
						this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.buyNowCreateOrder,data,this.payOrderBack);
						
					}
					
				
			
				
			},
			payOrderBack(data){
				
				this.isOrderGet=false;
				let _this=this;
				
//				console.log(this.isOrderGet)
				setTimeout(function() {
				    _this.$indicator.close();
				  }, 400);
				if(data.code==0){
					if(data.result.payInfo==undefined || data.result.payInfo=="undefined"){
						if(this.payMethod==4 && data.result>0){
							window.location.href=USE_URL+"ol/weixin/index/alipay?type=1&recordId="+data.result;
						}else{
							window.location.href=USE_URL+'ol/finish.html?orderPayRecordNo='+data.result.orderPayRecordNo;
						}
					}else{
						if(this.payMethod==1){
							this.payInfo=data.result.payInfo
							this.onBridgeReady(data.result.payInfo,data.result.orderPayRecordNo,data.result.type);
							
						}else if(this.payMethod==4){
							window.location.href=USE_URL+"ol/weixin/index/alipay?type=1&recordId="+data.result;
						}
					}
				
				}else if(data.code==2){
					window.location.href=USE_URL+"ol/finish.html?orderPayRecordNo="+data.result.orderPayRecordNo
				}else{
					this.$toast(data.message);
				}
			},
			//取消密码支付
			removePassPay(){
				this.payPasswordShow=false;
			},
			//输入密码提交订单
			passPay(){
				//console.log(md5(this.payPassword));
					let data ={
						productId:this.orderObj.productId,
						num:this.orderObj.num,
						normalId:this.orderObj.normalId,
						type:this.orderObj.type,
//						memberId:this.$route.query.memberId,
						addressId:this.addressId,
						payMethod:this.payMethod,
						memo:this.inputMemo,
						payPassword:md5(this.payPassword),
						amount:Number(this.amountFee),
						coffers:Number(this.coffersFee),
						score:this.useStores,
						goldBean:this.useGoldBean,
						recId:this.orderObj.recId,
						couponRecordId:this.couponId,
						uutype:1,
					}
					//console.log(data)
					this.isOrderGet=true;
						
					let defaultStyle = 'fading-circle';
					this.$indicator.open({
					    spinnerType: defaultStyle
					});
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.buyNowCreateOrder,data,this.payOrderBack,this);
				
				
			},
			clearinputMemo(){
				var reg2=/([\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614-\u2615\u2618\u261D\u2620\u2622-\u2623\u2626\u262A\u262E-\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665-\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B-\u269C\u26A0-\u26A1\u26AA-\u26AB\u26B0-\u26B1\u26BD-\u26BE\u26C4-\u26C5\u26C8\u26CE-\u26CF\u26D1\u26D3-\u26D4\u26E9-\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733-\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF])|(\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6])|(\uD83E[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0])/g;
				this.inputMemo=this.inputMemo.replace(reg2, '');
			},
			//积分
			clearNoNum(){
				this.useStores=this.useStores.replace(/\D/g,'')
				if(this.useStores >= this.curObj.score){
					this.useStores=this.curObj.score;
				}
				if(this.useStores>=(this.curObj.totalFee-this.couponAmount)*100){
					this.useStores=(this.curObj.totalFee-this.couponAmount)*100
				}
				//console.log(this.useStores)
			},
			//金豆
			clearNoNumBena(){
				this.useGoldBean=this.useGoldBean.replace(/\D/g,'')
				if(this.useGoldBean >= this.curObj.goldBean){
					this.useGoldBean=this.curObj.goldBean;
				}
				if(this.useGoldBean>=(this.curObj.totalFee-this.couponAmount)*10){
					this.useGoldBean=(this.curObj.totalFee-this.couponAmount)*10
				}
			},
			//余额
			clearMoreCoff(){
				
				//清除"数字"和"."以外的字符
			    this.coffersFee = this.coffersFee.replace(/[^\d.]/g,"");
	
			    //验证第一个字符是数字而不是
			    this.coffersFee = this.coffersFee.replace(/^\./g,"");
	
			    //只保留第一个. 清除多余的
			   // console.log(this.addObj.totalFee)
		
			    this.coffersFee = this.coffersFee.replace(/\.{2,}/g,".");
			    this.coffersFee = this.coffersFee.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	
			    //只能输入两个小数
			    this.coffersFee = this.coffersFee.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); 
			  
			    if(Number(this.coffersFee)>=this.curObj.coffers){
			    	this.coffersFee=this.curObj.coffers;
			    }
			    if(Number(this.coffersFee)>=(this.curObj.totalFee-this.couponAmount)){
			    	
			    	this.coffersFee=(this.curObj.totalFee-this.couponAmount);
			    }
			    
			},
			//小金库
			clearMoreNum(){
				console.log(1)
				//清除"数字"和"."以外的字符
			    this.amountFee = this.amountFee.replace(/[^\d.]/g,"");
	
			    //验证第一个字符是数字而不是
			    this.amountFee = this.amountFee.replace(/^\./g,"");
	
			    //只保留第一个. 清除多余的
			   // console.log(this.addObj.totalFee)
		
			    this.amountFee = this.amountFee.replace(/\.{2,}/g,".");
			    this.amountFee = this.amountFee.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	
			    //只能输入两个小数
			    this.amountFee = this.amountFee.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); 
			    if(this.amountFee>=this.curObj.amount){
			    	this.amountFee=this.curObj.amount;
			    }
			   
			    if(this.amountFee>=(this.curObj.totalFee-this.couponAmount)){
			    	
			    	this.amountFee=(this.curObj.totalFee-this.couponAmount);
			    }
			    
			    //console.log(this.addObj.totalFee.split("."))
			},
			onBridgeReady(data,orderNo,type){
			    WeixinJSBridge.invoke(
			        'getBrandWCPayRequest',
			        {
			            "appId" : data.appId,     //公众号名称，由商户传入
			            "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
			            "nonceStr" :data.nonceStr, //随机串
			            "package": data.package_,
			            "signType" : data.signType,         //微信签名方式：
			            "paySign" : data.paySign //微信签名
			        },
			        function(res){
			            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
			            	
							window.location.href=USE_URL+"ol/finish.html?orderPayRecordNo="+orderNo;
			            }
			        }
			    );
			},
			
			//微信分享
			  addWeixinShare:function(){
				var data = {                 
					"url":location.href,
					"callback":'',
			    };
			   //console.log(location.href)
			    
			    this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);			
			  },
			  shareBack:function(data){
	//		  	console.log("data")
	//		  	console.log(data)
				if(data.result=='fail'){
					this.shareData.share=true;
				}
				this.timeObj=data.result;
		      	//console.log()
				//调用共用的分享接口
				//console.log(JSON.stringify(data.result))
				
				
				this.wxShareFun(data.result,this.shareData);
				
				
				//this.locationWx(data);
				
			  },
		}
	}
</script>

<style lang="scss" scoped>
	.payorder{
		padding-top: .20rem;
		padding-bottom: 1.20rem;
		.slide-fade-enter-active {
		  transition: all .3s ease;
		}
		.slide-fade-leave-active {
		  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.slide-fade-enter, .slide-fade-leave-to
		/* .slide-fade-leave-active for below version 2.1.8 */ {
		  transform: translateX(10px);
		  opacity: 0;
		}
		.addrese{
			background:#fff;
			position: relative;
			padding:.48rem .20rem .58rem .30rem;
			.addtop{
				font-size: .28rem;
			}
			.addbbot{
				font-size: .28rem;
				color: #666;
				margin-top: .36rem;
			}
			.getAddressList{
				position: absolute;
				right: .24rem;
				top: 50%;
				margin-top: -.13rem;
				width: .16rem;
				height: .26rem;
				img{
					display: block;
					height: 100%;
					width: 100%;
				}
			}
		}
		.goodsDetail{
			margin-top: .20rem;
			margin-bottom: .20rem;
			background: #fff;
			.saleName{
				padding-left: .30rem;
				line-height: .84rem;
				font-size: .28rem;
				color: #333;
				border-bottom: 0.02rem solid #e5e5e5;
			}
			.productDetail{
				overflow: hidden;
				padding: .20rem .50rem .20rem .30rem;
				background: #f7f7f7;
				.productImage{
					float: left;
					p{
						display:-webkit-box;
					    display: -moz-box;
					    display: -ms-flexbox;
					    display: -webkit-flex;
					    display: flex;
						align-items:center;
						-webkit-align-items:center;
						box-align:center;
						-moz-box-align:center;
						-webkit-box-align:center;
						width: 2.00rem;
						height: 2.00rem;
						
					}
				}
				.productName{
					float: left;
					padding-left: .30rem;
					width: 65.67%;
					
					.nameTop{
						padding-top: .08rem;
						overflow: hidden;
						font-size: .26rem;
						line-height: .48rem;
						color: #333;
						.nameT-T{
							float: left;
							width: 65%;
							height: .96rem;
							overflow: hidden;
						}
						.nameT-B{
							float: right;
							width: 35%;
							overflow: hidden;
							font-weight: 700;
							text-align: right;
						}
					}
				}
				.productNum{
					font-size: .24rem;
					color: #666;
					text-align: right;
				}
				.prodtctNor{
					font-size: .24rem;
					width: 40%;
					padding-left: 2.30rem;
					line-height: .48rem;
					color: #666;
				}
				
			}
			.order{
				font-size: .28rem;
				line-height: .84rem;
				padding: 0 .30rem;
				border-bottom: 0.01rem solid #e5e5e5;
				overflow: hidden;
				.order-L{
					float: left;
					color: #333;
				}
				.order-R{
					float: right;
					color: #707070;
				}
				.words{
					border:none;
					width: 77%;
			    	padding: 0;
			    	line-height: .84rem;
			    	/*outline: none;*/
				}
			}
		}
		.payment{
			background: #fff;
			font-size: .28rem;
			
			line-height: .84rem;
			.account{
				border-bottom: 0.01rem solid #f2f2f2;
				padding: 0 .30rem;
			}
			.stores{
				overflow: hidden;
				border-bottom: 0.01rem solid #f2f2f2;
				padding: 0 .30rem;
				.stores-l{
					float: left;
					span{
						font-size: .24rem;
						color: #888;
					}
				}
				.stores-r{
					float: right;
					.choosePay{
						height: .40rem;
						display: inline-block;
						width: .40rem;
					}
					span{
						margin-right: .20rem;
						color: #d33778;
					}
					img{
						display: inline-block;
						height: .40rem;
						width: .40rem;
						vertical-align: middle;
						margin-top: -.08rem;
					}
				}
			}
			.usestore{
				padding: 0 .30rem;
				border-bottom: 0.01rem solid #f2f2f2;
				.storeNum{
					display: inline-block;
					width: 1.78rem;
					font-size: .28rem;
					color: #6e94f6;
					-moz-border-radius: 0.03rem; 
					-webkit-border-radius: 0.03rem; 
					border-radius: 0.03rem;  
					border:  0.01rem solid #b5b5b5;
					moz-border: 0.01rem solid #b5b5b5; 
					-webkit-border: 0.01rem solid #b5b5b5; 
					height: .48rem;
					padding: 0 0 0 0.20rem;
					margin-right: .20rem;
					outline: none;
				}
			}
		}
		.totalDetail{
			margin-top: .20rem;
			padding: 0 .21rem;
			background: #fff;
			color: #919191;
			font-size: .24rem;
			.detailFee{
				line-height: .46rem;
				overflow: hidden;
			}
			.soloDetail{
				overflow: hidden;
				.solo-l{
					float: left;
				}
				.solo-r{
					float: right;
					color: #D33778;
				}
			}
		}
		.orderSure{
			margin-top: .20rem;
			.chooseOrder{
				padding:0 .24rem; 
				background: #fff;
				line-height: .56rem;
				font-size: .24rem;
				border-bottom:0.01rem solid #e5e5e5;
			}
			.orderWay{
				padding: .24rem .24rem;
				overflow: hidden;
				position: relative;
				background: #fff;
				border-bottom:0.01rem solid #e5e5e5;
				.wayLeft{
					
					font-size: .28rem;
					img{
						display: inline-block;
						width: .60rem;
						height: .60rem;
						vertical-align: middle;
					}
				}
				.wayRight{
					position: absolute;
					top: 50%;
					margin-top: -.20rem;
					right:.24rem;
					img{
						display: block;
						height: .40rem;
						width: .40rem;
						
					}
				}
			}
			.sureOrder{
				padding: 0 .24rem;
				margin-top: .80rem;
				p{
					font-size: .26rem;
					color: #fff;
					background: #e30067;
					text-align: center;
					line-height: .80rem;
				}
			}
		}
		.orderPay{
			
			background: #fff;
			position: fixed;
			bottom: 0;
			width: 100%;
			font-size: .30rem;
			border-top: 0.01rem solid #e1e1e1;
			left: 0;
			.moneyPay{
				padding: 0 .30rem;
				color: #666;
				position: relative;
				line-height: 1.20rem;
				i{
					font-style: normal;
					font-weight: 700;
					font-size: .36rem;
				}
				.putOrder{
					position: absolute;
					width: 30%;
					right: .30rem;
					top: 50%;
					margin-top: -.40rem;
					background: #e61d79;
					line-height: .80rem;
					height: .80rem;
					border-radius: .08rem;
					color: #fff;
					font-size: .32rem;
					text-align: center;
				}
			}
		}
		.mask{
			width: 100%;
			height: 100%;
			position: fixed;
			background: rgba(0,0,0,0.5);
			left: 0;
			top: 0;
		}
		.chooseCoupon{
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,0.5);
			width: 100%;
			height: 100%;
			.couponListOut{
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				background: #fff;
				height: 8.00rem;
				.listTop{
					font-size: .25rem;
				    color: #333;
				    line-height: .88rem;
				    padding-left: .24rem;
				    border-bottom: 0.01rem solid #e5e5e5;
				    overflow: hidden;
				    div{
				    	float: left;
				    }
				    img{
				    	float: right;
					    display: block;
					    height: .36rem;
					    width: .36rem;
					    margin-right: .24rem;
					    margin-top: .24rem;
				    }
				}
				.couponList{
					height: 6.50rem;
				    padding: .26rem .26rem .42rem;
				    overflow: scroll;
				    background: #fff;
				    .couponDetail{
				    	margin-bottom: .20rem;
						background: url(../../../../static/images/dihong.png) no-repeat;
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
									
									color: #666;
									width:100%;
									position: relative;
									img{
										display: block;
										position: absolute;
										right: .48rem;
										top: 0;
										height: .40rem;
										width: .40rem;
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
		.changeAdd{
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,0.5);
			width: 100%;
			height: 100%;
			display: flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
		    display: -moz-flex;
		    -webkit-box-pack: center;
		    -moz-box-pack: center;
		    -ms-flex-align:center;/* IE 10 */
		    -webkit-align-items: center;
		    -moz-align-items: center;
		    align-items: center;
			.change{
				text-align: center;
				font-size: .30rem;
				
				color: #333;
				width: 70%;
				margin: 0 auto;
				background: #fff;
				.addAddress{
					border-top: 0.01rem solid #E1E1E1;
					display: flex;
					display:-webkit-box;
				    display: -moz-box;
				    display: -ms-flexbox;
				    display: -webkit-flex;
				    display: -moz-flex;
					text-align: center;
					line-height: .88rem;
					.addLeft{
						width: 50%;
						
					}
					.addRight{
						width: 50%;
						background: #E5006E;
						color: #fff;
					}
				}
			}
		}
		.password{
			width: 85%;
			height: 4.70rem;
			position: fixed;
			left: 50%;
			margin-left: -42.5%;
			top: 50%;
			margin-top: -2.50rem;
			background: #fff;
			.tipe{
				font-size: .30rem;
				padding-top: .60rem;
				text-align: center;
			}
			input{
				display: block;
				width: 80%;
				background: #FAFAFA;
				border: 0.01rem solid #e5e5e5;
				font-size: .32rem;
				margin: .80rem auto;
				line-height: 1.00rem;
				padding-left: .20rem;
				outline: none;
			}
			.btn{
				border-top: 0.01rem solid #e5e5e5;
				font-size: 0;
				height: 1rem;
				p{
					display: inline-block;
					width: 50%;
					height: 1rem;
					font-size: .30rem;
					line-height: 1.00rem;
					color: #000;
					text-align: center;
				}
			}
		}
	}
</style>