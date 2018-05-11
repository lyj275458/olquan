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
				<input  class="words" placeholder="对本次交易的说明,限45字" maxlength="45" v-model="inputMemo"/>
			</div>
			<!--<div class="order">
				<p class="order-L">合计</p>
				<p class="order-R" style="color: #e61d79;">{{finalPriceObj}}</p>
			</div>-->
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
		</div>
		<div class="totalDetail">
			<div style="font-size:.28rem;line-height: .72rem;">合计</div>
			<div class="detailFee">
				<div class="soloDetail">
					<p class="solo-l">商品总额</p>
					<p class="solo-r">￥{{prodrctFee}}</p>
				</div>
				<div class="soloDetail">
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
			</div>
		</div>
		<div class="orderSure">
			<div class="chooseOrder">
				支付方式
			</div>
			<div class="orderWay">
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
					<span style="color: #e61d79;">￥<i>{{finalPriceObj}}</i></span>
					<span>共{{curObj.totalNum}}件</span>
					<div class="putOrder" @click="payOrder">提交订单</div>
				</div>
			</div>
		</div>
		<!--输入密码弹框-->
		<transition name="slide-fade">
		<div class="mask" v-show="payPasswordShow"></div>
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
				sureCheckone:true,
				sureChecktwo:false,
				sureCheckthree:false,
				totalFee:0,
				coffersFee:0,
				amountFee:0,
				payPassword:'',
				payPasswordShow:false,
				amountFeeShow:false,
				coffersFeeShow:false,
				orderObj:JSON.parse(localStorage.getItem("orderObj")),
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
			}
		},
		created: function() {
			this.$store.commit('documentTitle','确认订单');
			this.getList();
			this.addWeixinShare();
		},
		mounted(){

			
		},
		computed: {
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
		methods:{
			
			getAddressMore(){
				this.$router.push({path:'/payMain/address?memberId='+this.$route.query.memberId+'&isBuyGoods=1'});
			},
			getList(){
				let data={
					productId:this.orderObj.productId,
					num:this.orderObj.num,
					normalId:this.orderObj.normalId,
					type:this.orderObj.type,
					//memberId:this.$route.query.memberId,
					
					uutype:1,
					
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.buyNowConfirmOrder,data,this.getListBack,this);
			},
			getListBack(data){
				this.curObj=data.result;
				if(data.result.receiveAddress==null){
					this.$router.push({path:'/add/addAdress?memberId='+this.$route.query.memberId+'&isBuyGoods=1'});
				}
				console.log(this.curObj)
				this.totalFee=this.curObj.totalFee;
				this.prodrctFee=this.curObj.productsFee.toFixed(2);
				if(this.curObj.postFee==null){
					this.curObj.postFee=0;
				}
				this.postFee=this.curObj.postFee.toFixed(2);
				console.log(this.$route.query.addressId);
				if(this.$route.query.addressId != undefined){
					this.addressId=this.$route.query.addressId
				}else{
					
					this.addressId=data.result.receiveAddress.id
				}
				this. getAddress(this.addressId);
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
				if(this.amountFeeShow){
					if(this.curObj.amount<=this.curObj.totalFee){
						this.amountFee=this.curObj.amount;
					}else{
						this.amountFee=this.curObj.totalFee;
					}
				}else{
					this.amountFee=0;
				}
//				this.totalFee=this.curObj.totalFee-this.amountFee;
			},
			//点击余额
			inputCoofers(){
				this.coffersFeeShow=!this.coffersFeeShow;
				this.amountFeeShow=false;
				
				if(this.coffersFeeShow){
					if(this.curObj.coffers<=this.curObj.totalFee){
						this.coffersFee=this.curObj.coffers;
					}else{
						this.coffersFee=this.curObj.totalFee;
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
				this.payMethod=3
				
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
				if(!this.curObj.enabledPayPassword){
					let data ={
						productId:this.orderObj.productId,
						num:this.orderObj.num,
						normalId:this.orderObj.normalId,
						type:this.orderObj.type,
						//memberId:this.$route.query.memberId,
						addressId:77974,
						payMethod:this.payMethod,
						memo:this.inputMemo,
						amount:Number(this.amountFee),
						coffers:Number(this.coffersFee),
						uutype:1,
					}
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.buyNowCreateOrder,data,this.payOrderBack,this);
				}else{
					this.payPasswordShow=true;
				}
				
			},
			payOrderBack(data){
				console.log(this.totalFee)
				if(data.code==0){
					if(this.totalFee==0){
						window.location.href=USE_URL+'ol/finish.html?orderPayRecordNo='+data.result.orderPayRecordNo
					}else{
						if(this.payMethod==1){
							this.payInfo=data.result.payInfo
							this.onBridgeReady(data.result.payInfo,data.result.orderPayRecordNo,data.result.type);
							
						}else if(this.payMethod==3){
							window.location.href=USE_URL+'ol/weixin/index/alipay?type=1&recordId='+data.result;
						}
					}
				}else if(data.code==2){
					window.location.href=USE_URL+'ol/finish.html?orderPayRecordNo='+data.result.orderPayRecordNo
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
					//memberId:this.$route.query.memberId,
					addressId:77974,
					payMethod:this.payMethod,
					memo:this.inputMemo,
					payPassword:md5(this.payPassword),
					amount:Number(this.amountFee),
					coffers:Number(this.coffersFee),
					uutype:1,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.buyNowCreateOrder,data,this.payOrderBack,this);
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
			    if(this.coffersFee>=this.curObj.coffers){
			    	this.coffersFee=this.curObj.coffers;
			    }
			    if(this.coffersFee>=this.curObj.totalFee){
			    	console.log(1111)
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
			            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
							window.location.href = 'finish.html?memberId=' + memberId + '&orderNo=' + orderNo + '&type=' + type + '&status=';
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
			padding:.48rem .20rem .58rem .30rem;
			.addtop{
				font-size: .28rem;
			}
			.addbbot{
				font-size: .28rem;
				color: #666;
				margin-top: .36rem;
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
		.password{
			width: 85%;
			height: 4.55rem;
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
	}
</style>