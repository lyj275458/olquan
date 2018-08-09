<template>
	<div class="payorder">
		<div class="addrese" @click="getAddressMore" v-show="!showAddress">
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
		<div style="height: .20rem;width: 100%;background: #f2f2f2;" v-show="!showAddress"></div>
		<div class="codeSure">
			<div style="background: #fff;">
				<!--<div class="telNum">
					<input placeholder="请输入图形码" :maxlength="11" v-model="imgCode" pattern="[0-9]*" v-on:input ="clearMoreCode()"/>
					<p @click="getSpecialImg" class="sendNum" style="background: none; width: 1.40rem;height: .60rem;margin-top: -.30rem;">
						<img :src="iconImg" />
					</p>
					
				</div>
				<div class="telNum">
					<input placeholder="请输入你的手机号" :maxlength="11" v-model="telNumber" pattern="[0-9]*" v-on:input ="clearMoretelNum()"/>
					<p class="sendNum" v-show="isSendFlag" @click="getCode">发送验证码</p>
					<p class="sendNum" v-show="!isSendFlag" style="background: #fff; color: #999;">{{sendCodeText}}</p>
				</div>
				<div class="telNum">
					<input placeholder="请输入验证码" pattern="[0-9]*" v-model="codeNum" v-on:input ="clearMorecodeNum()" />
					
				</div>-->
				<div class="telNum">
					<p class="chooseSure">邀请人：</p>
					<input readonly="readonly" placeholder="邀请码" style="color: #333333;" v-model="inviteCode"/>
					
				</div>
			</div>
		</div>
		<div class="goodsDetail">
		<div v-for="item in curObj.sellers">
			<!--<div class="saleName">{{item.sellerName}}</div>-->
			<div class="productDetail" v-for="itemSon in item.productDetails">
				<div class="productImage">
					<p><img style="display: block;width: 100%;" :src="itemSon.productImage"></p>
				</div>
				<div class="productName">
					<div class="nameTop">
						<p class="nameT-T">{{itemSon.productName}}</p>
						<p style="color: #FA0072;margin-top: .40rem;">￥{{itemSon.price}}</p>
					</div>
				</div>
				<!--<div class="productNum">x{{itemSon.num}}</div>
				<div class="prodtctNor">{{itemSon.normal}}</div>-->
			</div>
		</div>
		<div class="addressDetail" v-show="showAddress">
			<div class="peopleName">
				<p class="left">收件人</p>
				<input class="right" placeholder="请填写真实姓名" v-model="addressName"/>
			</div>
			<div class="peopleName">
				<p class="left">收件人手机号</p>
				<input class="right" placeholder="收货手机号码" pattern="[0-9]*" v-model="getGifTel"  v-on:input ="clearMoregetGifTel()"/>
			</div>
			<div class="chooseCityList">
		   		<div class="left">
		   			<p>省市区</p>
		   			
		   		</div>
		   		<div class="selectCity">
		   			<div class="chooseKuang">
		   				<select v-model="prov">
				   			<option value="0">请选择</option>
							<option v-for="option in arr" :value="option.id">
								{{ option.name }}
							</option>
						</select>
		   			</div>
		   			<div class="chooseKuang">
			   			<select v-model="city">
				   			<option value="0">请选择</option>
							<option v-for="option in cityList" :value="option.id">
								{{ option.name }}
							</option>
						</select>
			   		</div>
			   		<div class="chooseKuang">
			   			<select v-model="district">
							<option value="0">请选择</option>
							<option v-for="option in districtList" :value="option.id">
								{{ option.name }}
							</option>
						</select>
			   		</div>
					
					
			   	</div>
		   	</div>
		   	<div class="peopleName">
				<p class="left">地址</p>
				<input class="right" placeholder="请填写详细地址，5-60个字" v-model="address" />
			</div>
		</div>
			
		</div>
		<div class="payment">
			<div class="account">账户</div>
			<!--<div class="choosestores">
				<div class="stores">
					<p class="stores-l">积分<span> ({{curObj.score}}可抵现{{curObj.scoreAmount}}元)</span></p>
					<p class="stores-r">
						<span>-￥20.00</span>
						<img :src="nochoseImg"/>
					</p>
					
				</div>
				<div class="usestore">
					<input class="storeNum" pattern="[0-9]*" v-on:input ="clearNoNum()" v-model="useStores" type="number"/>
					<span>积分 <i style="font-style: normal; color: #888;font-size: .24rem;">(最低100积分)</i></span>
				</div>
			</div>-->
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
				<!--<div class="usestore" v-show="coffersFeeShow">
					<input class="storeNum" v-on:input ="clearMoreCoff()" v-model="coffersFee"/>
					<span>元 </span>
				</div>-->
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
				<!--<div class="usestore" v-show="amountFeeShow">
					<input class="storeNum" v-on:input ="clearMoreNum()" v-model="amountFee"/>
					<span>元 </span>
				</div>-->
			</div>
		</div>
		<div class="totalDetail">
			<div style="font-size:.28rem;line-height: .72rem;">合计</div>
			<div class="detailFee">
				<div class="soloDetail">
					<p class="solo-l">商品总额</p>
					<p class="solo-r">￥{{prodrctFee}}</p>
				</div>
				<!--<div class="soloDetail">
					<p class="solo-l">运费</p>
					
					<p class="solo-r">￥{{postFee}}</p>
				</div>-->
				<div class="soloDetail" v-show="coffersFeeShow">
					<p class="solo-l">小金库</p>
					<p class="solo-r">-￥{{coffersFeeObj}}</p>
				</div>
				<div class="soloDetail" v-show="amountFeeShow">
					<p class="solo-l">余额</p>
					<p class="solo-r">-￥{{amountFeeObj}}</p>
				</div>
				<div class="soloDetail">
					<p class="solo-l">应付</p>
					<p class="solo-r">￥{{finalPriceObj}}</p>
				</div>
			</div>
		</div>
		<div class="orderSure">
			<div class="chooseOrder">
				支付方式
			</div>
			<div class="orderWay" v-show="showWXpay">
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
			<div class="password" v-show="payPasswordShow ">
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
		<div class="paySucessOut" v-show="orderSucessBak">
			<div class="paySucess">
				<div class="sureMIne">
					<img :src="pinkGiftImg" />
				</div>
				<div class="sureSucess">
					恭喜您成功开通店主
				</div>
				<div class="sureSucess" style="color: #333333;font-size: .28rem;">
					接下来的日子里面祝您购物愉快！
				</div>
				<div class="orderSureBack">
					<div class="orderSureBackOut" @click="getPinkIndex">去特卖</div>
					<div class="orderSureBackOut" @click="getTrycenter">去试用</div>
				</div>
			</div>
		</div>
		<!--图形码弹窗-->
		<div class="codeImg" v-show="getCodeSure">
			<div class="codeTan">
				<div style="position: relative;">
					<p>请在下方输入图片验证码</p>
					<div class="inputCode">
						<input pattern="[0-9]*" v-model="imgCode" v-on:input ="clearMoreCode()"/>
						<p >
							<img :src="iconImg" />
						</p>
						
					</div>
					<div class="sureBot">
						<p v-show="isCilckSure">确定</p>
						<p v-show="!isCilckSure" @click="tellMessage" style="background: #e50f72;">确定</p>
					</div>
					<div class="colse" @click="closeCodeImg">
						<img :src="colseImg"/>
					</div>
				</div>
				
			</div>
		</div>
		
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import { XInput, XSwitch, TransferDomDirective as TransferDom } from 'vux';
	import { Group, XAddress, ChinaAddressV4Data, XButton, Cell, Value2nameFilter as value2name } from 'vux';
	import axios from 'axios';
	var regCodeInterval;
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
				superSureImg:'/static/images/superSure.png',
				rowMoreImg:'/static/images/rowmore.png',
				colseImg:'/static/images/colse.png',
				pinkGiftImg:'/static/images/pinkGift.png',
				sureCheckone:true,
				sureChecktwo:false,
				sureCheckthree:false,
				showAddress:false,
				isCodeTrue:false,
				totalFee:'',
				coffersFee:0,
				amountFee:0,
				payPassword:'',
				payPasswordShow:false,
				amountFeeShow:false,
				coffersFeeShow:false,
				orderObj:JSON.parse(localStorage.getItem("pinkIdObj")),
				curObj:[],
				addressObj:[],
				prodrctFee:0,
				postFee:0,
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
				pledgeMethod:'',
				orderSucessBak:false,
				telNumber:'',//收验证码手机号码
				sendCodeNum:60,
				isCilckSure:true,
				isSendFlag:true,
				isCodeSure:false,
				arr:[],
		    	cityList:[],
		    	districtList:[],
		    	city:'',
		    	cityId:0,
		    	districtId:0,
		    	prov:'',
		    	district:'',
		    	iconImg:'',
		    	imgCode:'',
		    	getGifTel:'',//收件人手机
		    	codeNum:'',//验证码
		    	inviteCode:localStorage.getItem('inviteCode'),//邀请码
		    	address:'',//详细地址
		    	addressName:'',//收件人姓名
		    	getCodeSure:false,
		    	isShowPass:false,
		    	isOrderGet:false,
		    	showWXpay:true,
		    	memberScore:[],
			}
		},
		components:{
		    XButton,
		    Group,
		    XSwitch,
		    XInput,
		    XAddress,
		    
		},
		created: function() {
			if(tsApp.getClientBrowser()=='wx'){
				this.showWXpay=true;
			}else{
				this.showWXpay=false;
			}
			if(this.$route.query.memberId=='undefined' || this.$route.query.memberId==undefined){
				this.$route.query.memberId='';
			}
			if(localStorage.getItem('inviteCode')==undefined || localStorage.getItem('inviteCode')=='undefined'){
				this.inviteCode='';
			}else{
				this.inviteCode=localStorage.getItem('inviteCode');
			}
			
			this.addRecord();
			
			this.getMember();
			this.$store.commit('documentTitle','确认订单');
			this.getList();
			this.getIcon();
			
			this.addWeixinShare();
		},
		mounted(){

			
		},
		computed: {
			sendCodeText() {
				return this.sendCodeNum+'s后重新发送';
			},
			amountFeeObj(){
				return Number(this.amountFee).toFixed(2);
			},
			coffersFeeObj(){
				return Number(this.coffersFee).toFixed(2);
			},
            finalPriceObj(){
            	if(!this.amountFeeShow){
            		this.amountFee=0;
            	}
            	if(!this.coffersFeeShow){
            		this.coffersFee=0;
            	}
            	this.totalFee=this.curObj.totalFee-this.amountFee-this.coffersFee;
				
				return this.totalFee.toFixed(2);
			},
            
        },
        watch:{
	  		prov(){
	  			this.chooseCity();
				this.chooseDistrict();
				
	  		},
	  		city(){
	  			this.chooseDistrict();
	  			
	  			
	  		},
	  		imgCode(){
	  			if(this.imgCode.length==4){
	  				this.isCilckSure=false;
	  			}
	  		},
	  	},
		methods:{
			//添加访问记录
			addRecord(){
  				let data = {
  					terminalType:5,
  					pageuri:'fightAlone/ordersure/pinkorder'
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,data,this.addRecordBack,this);
  			},
  			addRecordBack(data){},
			//获取会员信息
			getMember(){
				let data={
//					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				this.memberScore=data.result;
				if(data.result.mobile!='' && data.result.mobile!=null){
					this.telNumber=data.result.mobile;
				}else{
					this.telNumber='';
				}
				//console.log(this.memberlevel)
			},
			getIcon() {
				axios.get(API_HOST+"mobile/code/wxGraphCode", {
				        responseType: 'arraybuffer'
				      }).then(response => {
				        return 'data:image/png;base64,' + btoa(
				          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
				        )
				      }).then(data => {
				        this.iconImg = data
				        
				})
		    },
		    getSpecialImg(){
		    	this.getIcon();
		    },
			getAllCity(){
		  		let data = {
		  			
		  		}
		  		this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getAllCity,data,this.getAllCityBack,this);
		  		
		  	},
		  	getAllCityBack(data){
		//		console.log(data)
		  		this.arr=data.result;
		//		this.prov=this.arr[0].id;
		  		this.chooseCity();
		  		
		  		this.addWeixinShare();
		  	},
			chooseCity(){
		  		for(let i=0;i<this.arr.length;i++){
		  			if(this.prov==this.arr[i].id){
		  				this.cityList=this.arr[i].childreList;
		  				this.city=this.cityId;
		  				break;
		  			}
		  		}
		  		//console.log(this.cityList)
		  	},
		  	chooseDistrict(){
				
		  		for(let i=0;i<this.cityList.length;i++){
		  			if(this.city==this.cityList[i].id){
		  				this.districtList=this.cityList[i].childreList;
		  				
		  				this.district=this.districtId
		  			}
		  			
		  		}
		  		
		  		//console.log(this.districtList)
		  	},
			//获取验证码
			getCode(){
//				let _this=this;
				console.log(this.telNumber.length)
				if(this.telNumber==''){
					this.$toast('请输入手机号码');
					return false;
				}else if(this.telNumber.length!=11){
					this.$toast('请输入正确验证手机号码');
					
				}else if(this.imgCode.length!=4){
					this.$toast('请输入正确规格图形码');
					return false;
				}else{
					this.judgeMobile();
				}
			},
			closeCodeImg(){
				this.getCodeSure=false;
			},
			//判断手机号存不存在
			judgeMobile(){
				let data={
					
					mobile:this.telNumber,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.judgeMobile,data,this.judgeMobileBack,this);
			},
			judgeMobileBack(data){
				if(data.code==1){
					
					this.tellMessage();
				}else if(data.code==0){
					this.$toast('号码已存在');
				}else{
					this.$toast(data.message);
				}
			},
			tellMessage(){
				if(this.isSendFlag){
					this.isSendFlag=false;
					let _this=this;
					regCodeInterval = setInterval(function() {
						_this.regCodeTimeinterval();
					}, 1000);
				}
				let data={
//						memberId:this.$route.query.memberId,
						mobile:this.telNumber,
						graphCode:this.imgCode,
						
					}
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.sendCode,data,this.getCodeBack,this);
			},
			getCodeBack(data){
				
				if(data.code==0){
					this.$toast('发送成功');
					this.getCodeSure=false;
				}else{
					this.getIcon();
					this.$toast(data.message);
					
				}
				
			},
			regCodeTimeinterval(){
		    	this.sendCodeNum=this.sendCodeNum-1;
		    	
		    	if(this.sendCodeNum==0){
		    		this.isSendFlag=true;
		    		this.sendCodeNum=60;
		    		clearInterval(regCodeInterval);
		    	}
	
		    },
		    //去特卖
		    getPinkIndex(){
		    	window.location.href=CUR_URLBACK+'index/pinkIndex'
		    },
		    getTrycenter(){
		    	window.location.href=CUR_URLBACK+'try/newCenter'
		    },
			getAddressMore(){
				this.$router.push({path:'/payMain/address?getPink=1'});
			},
			getList(){
				let data={
//					memberId:this.$route.query.memberId,
					giftBagId:this.orderObj.bagId,
					uutype:1
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.applyToStoreConfirm,data,this.getListBack,this);
			},
			getListBack(data){
				if(data.code==-1){
					this.$toast(data.message);
				}else{
					this.curObj=data.result;
					if(data.result.receiveAddress==null){
						this.getAllCity();
						this.showAddress=true;
						this.city=0;
						this.prov=0;
						this.district=0;
					}
					
					this.totalFee=this.curObj.totalFee;
					this.prodrctFee=this.curObj.totalFee.toFixed(2);
					if(this.curObj.postFee==null){
						this.curObj.postFee=0;
					}
	//				this.postFee=this.curObj.postFee.toFixed(2);
					console.log(this.$route.query.addressId);
					if(this.$route.query.addressId != undefined){
						this.addressId=this.$route.query.addressId;
						this. getAddress(this.addressId);
					}else{
						if(data.result.receiveAddress==null){
							this.addressId=''
						}else {
							this.addressId=data.result.receiveAddress.id;
							this. getAddress(this.addressId);
						}
						
					}
					
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
			//点击余额
			inputAmount(){
				this.amountFeeShow=!this.amountFeeShow;
				this.coffersFeeShow=false;
				
				if(this.amountFeeShow){
					this.pledgeMethod=3;
					if(this.curObj.amount<=this.curObj.totalFee){
						this.amountFee=this.curObj.amount;
					}else{
						this.amountFee=this.curObj.totalFee;
					}
				}else{
					this.amountFee=0;
					this.pledgeMethod='';
				}
//				this.totalFee=this.curObj.totalFee-this.amountFee;
			},
			//点击小金库
			inputCoofers(){
				this.coffersFeeShow=!this.coffersFeeShow;
				this.amountFeeShow=false;
				
				if(this.coffersFeeShow){
					this.pledgeMethod=2;
					if(this.curObj.coffers<=this.curObj.totalFee){
						this.coffersFee=this.curObj.coffers;
					}else{
						this.coffersFee=this.curObj.totalFee;
					}
				}else{
					this.coffersFee=0;
					this.pledgeMethod='';
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
				this.payMethod=4
				
			},
			checkThree(){
				this.sureCheckone=false;
				this.sureChecktwo=false;
				this.sureCheckthree=true;
				
			},
			clearNoNum(){
				this.useStores=this.useStores.replace(/\D/g,'')
				//console.log(this.useStores)
			},
			//提交订单
			payOrder(){
//				if(this.inviteCode=='' || this.inviteCode==undefined){
//					this.$toast('请输入邀请码');
//					return false;
//				}
				if(Number(this.amountFee)==0 && Number(this.coffersFee)==0){
					this.isShowPass=true;
				}else{
					this.isShowPass=false;
				}
//				if(this.telNumber=='' || this.telNumber.length!=11 ){
//					this.$toast('请输入正确的手机号码');
//					return false;
//				}
//				if(this.codeNum==''){
//					this.$toast('请输入验证码');
//					return false;
//				}
				if(this.curObj.receiveAddress==null){
					if(this.addressName==''){
						this.$toast('请输入收货人姓名');
						return false;
					}
					if(this.getGifTel=='' || this.getGifTel.length!=11){
						this.$toast('请输入正确收货手机号码');
						return false;
					}
					if(this.prov==0 || this.city==0 || this.district==0 || this.address==''){
						this.$toast('请输入收货地址');
						return false;
					}
					
				}
				
				//console.log(this.memberScore.enabledPayPassword)
				if(this.memberScore.enabledPayPassword && !this.isShowPass){
						this.payPasswordShow=true;
						
						
				}else{
					let data ={
//						mobile:this.telNumber,
						giftBagId:this.orderObj.bagId,
//						memberId:this.$route.query.memberId,
						addressId:this.addressId,
						payMethod:this.payMethod,
						pledgeMethod:this.pledgeMethod,
						inviteCode:this.inviteCode,
						uutype:1,
						provinceId:this.prov,
						cityId:this.city,
						districtId:this.district,
						address:this.address,
						addressName:this.addressName,
						addressMobile:this.getGifTel,
//						code:this.codeNum,
					}
					this.isOrderGet=true;
						
					let defaultStyle = 'fading-circle';
					this.$indicator.open({
					    spinnerType: defaultStyle
					});
					console.log(data)
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.newApplyToStore,data,this.payOrderBack,this);
				
				}
				
			},
			payOrderBack(data){
				this.isOrderGet=false;
				let _this=this;
//				console.log(this.isOrderGet)
				setTimeout(function() {
				    _this.$indicator.close();
				  }, 400);
//				console.log(this.totalFee)
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
							window.location.href=USE_URL+'ol/weixin/index/alipay?type=1&recordId='+data.result;
						}
					}
				}else if(data.code==2){
					window.location.href=USE_URL+'ol/finish.html?orderPayRecordNo='+data.result.orderPayRecordNo
				}else if(data.code==1){
					this.orderSucessBak=true;
				}else{
					this.$toast(data.message);
				}
			},
			getMine(){
				//window.location.href=USE_URL+'weixin/member/membercore'+this.$route.query.memberId;
			},
			//取消密码支付
			removePassPay(){
				this.payPasswordShow=false;
			},
			//输入密码提交订单
			passPay(){
				
				//console.log(md5(this.payPassword));
					let data ={
//						mobile:this.telNumber,
						giftBagId:this.orderObj.bagId,
//						memberId:this.$route.query.memberId,
						addressId:this.addressId,
						payMethod:this.payMethod,
						pledgeMethod:this.pledgeMethod,
						inviteCode:this.inviteCode,
						uutype:1,
						provinceId:this.prov,
						cityId:this.city,
						districtId:this.district,
						address:this.address,
						addressName:this.addressName,
						addressMobile:this.getGifTel,
//						code:this.codeNum,
						payPassword:md5(this.payPassword),
						
					}
					//console.log(data)
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.newApplyToStore,data,this.payOrderBack,this);
				
				
			},
			//只能输入数字
			clearMoreCode(){
				this.imgCode = this.imgCode.replace(/[^\d]/g,'');
			},
			clearMoretelNum(){
				this.telNumber = this.telNumber.replace(/[^\d]/g,'');
			},
			clearMoregetGifTel(){
				this.getGifTel = this.getGifTel.replace(/[^\d]/g,'');
			},
			clearMorecodeNum(){
				this.codeNum = this.codeNum.replace(/[^\d]/g,'');
			},
			clearMoreinviteCode(){
				this.inviteCode = this.inviteCode.replace(/[^\d]/g,'');
			},
			//余额
			clearMoreCoff(){
				//清除"数字"和"."以外的字符
			    this.coffersFee = this.coffersFee.replace(/[^\d.]/g,"");
	
			    //验证第一个字符是数字而不是.
			    this.coffersFee = this.coffersFee.replace(/^\./g,"");
	
			    //只保留第一个. 清除多余的
			   // console.log(this.addObj.totalFee)
		
			    this.coffersFee = this.coffersFee.replace(/\.{2,}/g,".");
			    this.coffersFee = this.coffersFee.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	
			    //只能输入两个小数
			    this.coffersFee = this.coffersFee.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); 
			    if(this.coffersFee>=this.curObj.coffers){
			    	this.coffersFee=this.curObj.coffers;
			    }
			    if(this.coffersFee>=this.curObj.totalFee){
			    	//console.log(1111)
			    	this.coffersFee=this.curObj.totalFee;
			    }
			},
			//小金库
			clearMoreNum(){
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
			    if(this.amountFee>=this.curObj.totalFee){
			    	
			    	this.amountFee=this.curObj.totalFee;
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
			        	
			            if(res.err_msg == "get_brand_wcpay_request:ok") {
//			            	alert(USE_URL)
			            	window.location.href=USE_URL+"weixin/member/membercore"
							
			            }else{
			            	
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
//				if(data.result=='fail'){
//					this.shareData.share=true;
//				}
//				this.timeObj=data.result;
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
		width: 100%;
		overflow-x: hidden;
		/*padding-top: .20rem;*/
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
		.codeSure{
			
			.telNum{
				position: relative;
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
			    justify-content: center;
		    	-moz-box-pack: center;
		    	-webkit--moz-box-pack: center;
				padding-left: .26rem;
				border-bottom: .02rem solid #EBEBEB;
				
				input{

					display: block;
					-webkit-box-flex: 1;
				    -ms-flex: 1;
				    flex: 1;
					border: none;
					line-height: .90rem;
					font-size: .26rem;
					color: #999;
				}
				.sendNum{
					position: absolute;
					right: .26rem;
					top: 50%;
					margin-top: -.24rem;
					height: .48rem;
					min-width: 1.60rem;
					text-align: center;
					line-height: .48rem;
					background: #FF2893;
					color: #fff;
					font-size: .26rem;
					border-radius: .48rem;
				}
				.chooseSure{
					
					
					font-size: .26rem;
					color: #333;
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
			.addressDetail{
				font-size: .26rem;
				line-height: .90rem;
				border-top: 0.01rem solid #EBEBEB;
				padding: 0 .24rem;
				background: #fff;
				.peopleName{
					border-bottom: 0.01rem solid #EBEBEB;
					overflow: hidden;
					.left{
						float: left;
						width: 26%;
					}
					.right{
						float: left;
						line-height: .90rem;
						border: none;
						width: 70%;
					}
					input::-webkit-input-placeholder {
					   	text-align: right;
					   	color: #999999;
					    }
				}
			}
			.productDetail{
				overflow: hidden;
				padding: .20rem .50rem .20rem .30rem;
				background: #fff;
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
							/*float: left;
							width: 65%;*/
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
			    	/*outline: none;*/
				}
			}
			.chooseCityList{
				border-bottom: 0.01rem solid #EBEBEB;
				display: flex;
				background:#fff;
				.left{
					width: 26%;
				
					p{
						
					}
				}
				.selectCity{
					display: flex;
					width: 74%;
					font-size: 0;
					justify-content:flex-start;
					.chooseKuang{
						width: 33%;
						margin-right: .10rem;
					}
				}
				select{
					-webkit-box-flex: 1;  
				    -moz-box-flex: 1;                
				    -webkit-flex: 1;      
				    -ms-flex: 1;           
				    flex: 1;
					width: 100%;
					height: .92rem;
					border: none;
				    appearance:none;
					-moz-appearance:none;
					-webkit-appearance:none;
					
					background: url("../../../../static/images/selectarrow.png") no-repeat scroll right center transparent;
					padding-right: .28rem;
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
			padding:.20rem 0;
			background: #fff;
			position: fixed;
			bottom: 0rem;
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
				p{
					display: inline-block;
					width: 50%;
					font-size: .30rem;
					line-height: 1.00rem;
					color: #000;
					text-align: center;
				}
			}
		}
		.paySucessOut{
			background: rgba(0,0,0,.4);
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			.paySucess{
				width: 5.70rem;
				height: 3.90rem;
				
				border-radius: .08rem;
				background: #fff;
				position: fixed;
				left: 50%;
				margin-left: -2.85rem;
				top:50%;
				margin-top: -1.95rem;
			}
			.sureMIne{
				width: 100%;
				font-size: 0;
				height: 1.28rem;
				text-align: center;
				img{
					display: inline-block;
					width: 2.40rem;
					margin-top: -.98rem;
					height: 1.96rem;
				}
			}
			.sureSucess{
				text-align: center;
				font-size: .32rem;
				color: #E50F72;
				margin-bottom: .24rem;
				
			}
			.orderSureBack{
				display: flex;
				display:-webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: -moz-flex;
				-webkit-justify-content:space-around;
				justify-content:space-around;
				-moz-box-pack:space-around;
				-webkit--moz-box-pack:space-around;
				box-pack:space-around;
				width: 100%;
				margin-top: .58rem;
				.orderSureBackOut{
					
					
					font-size: .26rem;
					text-align: center;
					line-height: .88rem;
					color: #fff;
					width: 2.52rem;
					height: .88rem;
					background: #E50F72;
					border-radius: .44rem;
				}
			}
		}
		.codeImg{
			background: rgba(0,0,0,.56);
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			.codeTan{
				width: 5.60rem;
				height: 3.10rem;
				position: fixed;
				padding-top: .50rem;
				left: 50%;
				font-size: .32rem;
				text-align: center;
				margin-left: -2.80rem;
				top: 50%;
				margin-top: -1.80rem;
				background: #fff;
				border-radius: .10rem;
				.inputCode{
					width: 100%;
					height: .90rem;
					margin-top: .40rem;
					position: relative;
					input{
						display: block;
						position: absolute;
						left: 50%;
						margin-left: -2.40rem;
						border: none;
						background: #F3F0F3;
						width: 4.80rem;
						line-height: .90rem;
						border-radius: .08rem;
					}
					p{
						position: absolute;
						right: .60rem;
						top: 50%;
						margin-top:-.30rem;
						img{
							display: block;
							
						}
					}
					
				}
				.sureBot{
					width: 100%;
					height: .90rem;
					margin-top: .30rem;
					position: relative;
					p{
						width: 4.00rem;
						text-align: center;
						font-size: .32rem;
						color: #FFF;
						background: #F798C4;
						line-height: .90rem;
						border-radius: .08rem;
						position: absolute;
						left: 50%;
						margin-left: -2.00rem;
					}
				}
				.colse{
					position: absolute;
					right: .24rem;
					top: -.26rem;
					width: .24rem;
					height: .24rem;
					img{
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.specialImg{
			img{
				display: block;
			}
		}
	}
</style>