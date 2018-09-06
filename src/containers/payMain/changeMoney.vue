<template>
	<div class="changeMoney">
		<div class="changeWay" @click="getAmountList">
			<div class="changeIMg">
				<img :src="amountImg" v-show="chooseChangeWay==1" />
				<img :src="storesImg" v-show="chooseChangeWay==2" />
				<img :src="coffersImg" v-show="chooseChangeWay==3" />
			</div>
			<div class="moneyDetail" v-show="chooseChangeWay==1">
				<p>账户余额</p>
				<p style="font-size: .28rem;color: #777;margin-top: .14rem;">￥{{memList.amount}}元</p>
			</div>
			<div class="moneyDetail" v-show="chooseChangeWay==2">
				<p>积分</p>
				<p style="font-size: .28rem;color: #777;margin-top: .14rem;">{{memList.score}}积分</p>
			</div>
			<div class="moneyDetail" v-show="chooseChangeWay==3">
				<p>小金库</p>
				<p style="font-size: .28rem;color: #777;margin-top: .14rem;">{{memList.coffers}}元</p>
			</div>
			<div class="getMoreWay">
				<img :src="moneyRowImg" />
			</div>
			
			
		</div>
		<div class="changeDetail">
			<div class="changeList">
				<div class="top">
					兑换数量(个)
				</div>
				<div class="importMoney">
					<input placeholder="请输入需要兑换金豆个数" pattern="[0-9]*" v-on:input ="clearNoNum()" v-model="amountNum"/>
					<div class="cancelBean" v-show="amountNum!=''" @click="celearAmountBean">
						<img :src="cancelBeanImg"/>
					</div>
				</div>
				<div class="changeNum">
					<p style="float: left;">可兑换金豆总数：{{goldenDou}}个</p>
					<p style="float: right;color: #029BFC;" @click="changeAll">全部兑换</p>
				</div>
			</div>
		</div>
		<div class="changeBot">
			<div class="bottomSure" @click="sureChangeMoney">兑换</div>
		</div>
		<div class="changeRecord" @click="getDetailBean">
			兑换记录
		</div>
		<div class="accountList" v-show="successBean || levelEnt || chooseAccountList || payPasswordShow || payCodeSure"  @click="colseAccountList">
			
		</div>
		<transition name="slide-fade">
			<div class="tellCode" v-show="payCodeSure">
				<div class="tellNum">你当前绑定的手机号码为：{{memList.viewMobile}}</div>
				<div class="getCodeOut">
					<input type="tel" placeholder="请输入验证码" v-model="setTelCode"/>
					<p v-show="isSendFlag" @click="getCodeFun">获取验证码</p>
					<p v-show="!isSendFlag" style="color: #999;">{{sendCodeText}}</p>
				</div>
				<div class="sureBot" v-show="doubleClick" @click="telSureChange">确认</div>
				<div class="sureBot" v-show="!doubleClick">确认</div>
			</div>
		</transition>
		<transition name="slide-fade">
			<div class="password" v-show="payPasswordShow">
				<div class="tipe">请输入支付密码</div>
				<input type="password" name="payPassword" value="" placeholder="请输入支付密码" v-model="payPassword">
				<div class="btn">
					<p @click="cancelPassword">
						<span style="border-right: 0.01rem solid #e5e5e5;display: block;">取消</span>
					</p>
					<p  v-show="doubleClick" @click="surePassword">
						<span style="color: #e7317d;display: block;">确定</span>
					</p>
					<p v-show="!doubleClick">
						<span style="color: #e7317d;display: block;">确定</span>
					</p>
				</div>
			</div>
		</transition>
		<transition name="slide-fade">
			<div  v-show="chooseAccountList" style="position: fixed;bottom: 0;left: 0;width:100% ; z-index: 9999;background: #fff;">
				<div class="chooseWayList">
					<p>选择兑换方式</p>
					<p @click="colseAccountList" class="colseCHoose"><img :src="duiCloseImg"/></p>
				</div>
				<div style="padding-left: .30rem;background: #fff;">
					<div class="changeWay" @click="changeAmountList(1)" style="border-bottom: 0.01rem solid #E1E1E1 ;">
						<div class="changeIMg" style="margin: 0;">
							<img :src="amountImg" />
						</div>
						<div class="moneyDetail">
							<p>账户余额</p>
							<p style="font-size: .28rem;color: #777;margin-top: .14rem;">￥{{memList.amount}}(可兑{{parseInt(memList.amount*10)}}个金豆)</p>
						</div>
						<div class="getMoreWay">
							<img :src="chooseMoneyImg" class="chooseIMg" v-show="chooseChangeWay==1"/>
						</div>
					</div>
				</div>
				
				<div style="padding-left: .30rem;background: #fff;">
					<div class="changeWay" @click="changeAmountList(2)" style="border-bottom: 0.01rem solid #E1E1E1 ;">
						<div class="changeIMg" style="margin: 0;">
							<img :src="storesImg" />
						</div>
						<div class="moneyDetail">
							<p>积分</p>
							<p style="font-size: .28rem;color: #777;margin-top: .14rem;">{{memList.score}}(可兑{{parseInt(memList.score/10)}}个金豆)</p>
						</div>
						<div class="getMoreWay">
							<img :src="chooseMoneyImg" class="chooseIMg" v-show="chooseChangeWay==2"/>
						</div>
					</div>
				</div>
				<div style="padding-left: .30rem;background: #fff;">
					<div class="changeWay" @click="changeAmountList(3)">
						<div class="changeIMg" style="margin: 0;">
							<img :src="coffersImg" />
						</div>
						<div class="moneyDetail">
							<p>小金库</p>
							<p style="font-size: .28rem;color: #777;margin-top: .14rem;">￥{{memList.coffers}}(可兑{{parseInt(memList.coffers*10)}}个金豆)</p>
						</div>
						<div class="getMoreWay">
							<img :src="chooseMoneyImg" class="chooseIMg" v-show="chooseChangeWay==3" />
						</div>
					</div>
				</div>
			</div>
		</transition>
		<div class="getGraphCode" v-show="graphCode">
			<div class="graphCode">
				<div class="codeTop">
					请在下方输入图片验证码
				</div>
				<div class="entrtCode">
					<input type="number"  pattern="[0-9]*" v-model="imgCode" v-on:input ="clearMoreCode()" placeholder="请输入" />
					<p class="shuaCode" @click="getSpecialImg">
						<img :src="iconImg" />
					</p>
				</div>
				<div class="colseCode" @click="colseCodeFun">
					<img :src="chaImg" />
				</div>
				<div class="sureCode" v-show="isCilckSure">确定</div>
				<div class="sureCode" v-show="!isCilckSure" style="background: #e50f72;" @click="sureCode">确定</div>
			</div>
		</div>
		<div class="tishi" v-show="levelEnt">
				
			<div class="tiCen">
				<p>
					兑换金豆请先绑定手机号码，是否前往绑定
				</p>
				
			</div>
			<div class="tiBots">
				<p class="tiBleft" @click='getlevel'>否</p>
				<p class="tiBright" @click="getPink">去绑定</p>
			</div>
		</div>
		<div class="tishi" v-show="successBean">
				
			<div class="tiCen">
				<p>
					兑换金豆成功，点击查看详情
				</p>
				
			</div>
			<div class="tiBots">
				
				<p class="tiBright" style="text-align: center;width: 100%;" @click="getDetailBean">去查看</p>
			</div>
		</div>
	</div>
	
</template>
<script>
	import md5 from 'js-md5';
	import axios from 'axios';
	var regCodeInterval;
export default{
	data : function() {
		return {
			amountImg:'/static/images/amount.png',
			storesImg:'/static/images/stores.png',
			moneyRowImg:'/static/images/moneyRow.png',
			coffersImg:'/static/images/coffers.png',
			chooseMoneyImg:'/static/images/chooseMoney.png',
			duiCloseImg:'/static/images/duiClose.png',
			chaImg:'/static/images/cha.png',
			cancelBeanImg:'/static/images/cancelBean.png',
			chooseAccountList:false,
			payPasswordShow:false,
			showCancel:false,
			payCodeSure:false,
			graphCode:false,
			isSendFlag:true,
			successBean:false,
			levelEnt:false,
			doubleClick:true,
			isCilckSure:true,
			sendCodeNum:60,
			amountNum:'',
			iconImg:'',
			imgCode:'',
			setTelCode:'',
			payPassword:'',
			memList:[],
			chooseChangeWay:1,
			goldenDou:'',
			shareData : {
				'title': "OL圈 发现",
				'description':'发现好物 分享赚钱' ,
				'url': '',
				'picURL': "https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/aaa.png",
				'hide':true,
				'share':true,
				'video':true,
			},
		};
	},
	 
	components: {
      
    },
	created: function() {
		this.$store.commit('documentTitle','兑换');
		this.getMemList();
		this.addWeixinShare();
		//this.getIcon();
		
	},
	
	computed: {
     	sendCodeText() {
			return this.sendCodeNum+'s后重新发送';
		},
    },
    mounted() {
     
      
    },
    watch:{
    	imgCode(){
  			if(this.imgCode.length==4){
  				this.isCilckSure=false;
  			}else{
  				this.isCilckSure=true;
  			}
  			
  		},
//		amountNum(){
//			if(this.amountNum!=''){
//				
//				this.showCancel=true;
//			}else{
//				this.showCancel=false;
//			}
//		},
    },
	methods:{
		celearAmountBean(){
			
			this.amountNum='';
			
		},
		getDetailBean(){
			window.location.href=USE_URL+'weixin/member/amountRecord?type=6';
		},
		//绑定手机号
		getPink(){
			this.$router.push({path:'/mine/setTel'});
		},
		getlevel(){
			this.levelEnt=false;
		},
		//输入密码确认
		surePassword(){
			if(this.payPassword==''){
				this.$toast('支付密码不能为空',1000);
				return false;
			}
			this.doubleClick=false;
			this.changeGolden();
		},
		//手机验证支付
		telSureChange(){
			if(this.setTelCode==''){
				this.$toast('验证码不能为空',1000);
				return false;
			}
			this.doubleClick=false;
			this.changeGolden();
		},
		//兑换金豆
		changeGolden(){
			let data = {
//				memberId:this.$route.query.memberId,
				exchangeMethod:this.chooseChangeWay,
				amount:this.amountNum,
				payPassword:md5(this.payPassword),
				code:this.setTelCode,
			}
			
			this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.exchangeGoldbean,data,this.changeGoldenBack,this);
		},
		changeGoldenBack(data){
			this.doubleClick=true;
			if(data.code!=0){
				this.$toast(data.message,1000);
			}else{
				this.payPasswordShow=false;
				this.payCodeSure=false;
				this.successBean=true;
			}
		},
		changeAll(){
			this.amountNum=this.goldenDou;
		},
		//点击获取验证码
		getCodeFun(){
			this.getIcon();
			this.imgCode='';
			this.graphCode=true;
			
		},
		
		sendCodeFun(){
			if(this.isSendFlag){
				this.isSendFlag=false;
				let _this=this;
				regCodeInterval = setInterval(function() {
					_this.regCodeTimeinterval();
				}, 1000);
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
		//刷新图形码
	    getSpecialImg(){
	    	this.getIcon();
	    },
	    colseCodeFun(){
			this.graphCode=false;
		},
		sureCode(){
	    	let data={
//				memberId:this.$route.query.memberId,
				mobile:this.memList.mobile,
				graphCode:this.imgCode
			}
			//console.log(data)
			this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.sendCode,data,this.sureCodeBack,this);
	    },
	    sureCodeBack(data){
	    	if(data.code==0){
	    		this.$toast('发送成功',1000);
	    		this.graphCode=false;
	    		this.sendCodeFun()
	    	}else{
	    		this.$toast(data.message,1000);
	    		this.getSpecialImg();
	    	}
	    },
	    //获取图形码
		getIcon() {
			axios.get(API_HOST+"mobile/code/wxGraphCode", {
			        responseType: 'arraybuffer'
			      }).then(response => {
			        return 'data:image/png;base64,' + btoa(
			          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
			        )
			      }).then(data => {
			        this.iconImg = data;
			})
	    },
		sureChangeMoney(){
			if(this.amountNum=='' || this.amountNum==0){
				this.$toast('兑换金豆数量不能为空或0');
				return;
			}
			if(this.memList.enabledPayPassword==1){
				this.payPasswordShow=true;
				return;
			}else{
				if(this.memList.mobile!='' && this.memList.mobile!=null){
					this.payCodeSure=true;
				}else{
					this.levelEnt=true;
					
				}
			}
			
		},
		cancelPassword(){
			this.payPasswordShow=false;
		},
		getAmountList(){
			this.chooseAccountList=true;
		},
		colseAccountList(){
			this.chooseAccountList=false;
			this.payCodeSure=false;
		},
		changeAmountList(id){
			this.chooseChangeWay=id;
			if(id==1){
				this.goldenDou=parseInt(this.memList.amount*10);
			}else if(id==2){
				this.goldenDou=parseInt(this.memList.score/10);
			}else if(id==3){
				this.goldenDou=parseInt(this.memList.coffers*10);
			}
			if(this.amountNum>this.goldenDou){
				this.amountNum=this.goldenDou;
			}
			this.chooseAccountList=false;
			
		},
		getMemList(){
			let data = {
//					memberId:this.$route.query.memberId,
				
			}
			this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemListBack);
		},
		getMemListBack(data){
//			console.log(data)
			if(data.code!=0){
				this.$toast(data.message);
			}else{
				this.memList=data.result;
				this.goldenDou=parseInt(this.memList.amount*10);
			}
			
		},
		//只能输入数字
		clearMoreCode(){
			this.imgCode = this.imgCode.replace(/[^\d]/g,'');
		},
		clearNoNum(){
			this.amountNum=this.amountNum.replace(/\D/g,'')
			if(this.amountNum >= this.goldenDou){
				this.amountNum=this.goldenDou;
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
	
}
</script>
<style lang="scss" scoped>
	.changeMoney{
		overflow: hidden;
		.slide-fade-enter-active {
		  transition: all .3s ease;
		}
		.slide-fade-leave-active {
		  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.slide-fade-enter, .slide-fade-leave-to
		/* .slide-fade-leave-active for below version 2.1.8 */ {
		  transform: translateY(100px);
		  opacity: 0;
		}
		.changeWay{
			overflow: hidden;
			font-size: .32rem;
			height: 1.20rem;
			background: #fff;
			.changeIMg{
				float: left;
				height: 100%;
				position: relative;
				margin-left: .30rem;
				img{
					position: absolute;
					top: 50%;
					margin-top: -.25rem;
					display: block;
					width: .50rem;
					height: .50rem;
				}
			}
			.moneyDetail{
				float: left;
				color: #333;
				margin-left: .78rem;
				padding-top: .28rem;
			}
			.getMoreWay{
				float: right;
				padding-top: .48rem;
				margin-right: .30rem;
				img{
					display: block;
					width: .14rem;
					height: .24rem;
				}
				.chooseIMg{
					width: .34rem;
					height: .23rem;
				}
			}
		}
		.changeDetail{
			margin-top: .20rem;
			padding-left:.30rem ;
			padding-right:.30rem ;
			background: #fff;
			.changeList{
				.top{
					padding-top: .28rem;
					font-size: .32rem;
					color: #333;
				}
				.importMoney{
					position: relative;
					margin-top: .32rem;
					padding-bottom: .16rem;
					font-size: 0;
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
					-webkit-box-pack: center;
				    -moz-box-pack: center;
				    -ms-flex-align:center;/* IE 10 */
				    -webkit-align-items: center;
				    -moz-align-items: center;
				    align-items: center;
					border-bottom: 0.01rem solid #E1E1E1;
					position: relative;
					.cancelBean{
						position: absolute;
						right: 0;
						bottom: 0.16rem;
						img{
							display: block;
							width: .48rem;
							height: .48rem;
						}
					}
					input::-webkit-input-placeholder {
						font-size: .32rem; 
						color: #AAAAAA;
					}
					input{
						display:block;
						height: .68rem;
						font-size: .68rem;
						color: #333333;
						line-height: .68rem;
						border:0;
						padding: 0;
						outline: none;	
					}
				}
				.changeNum{
					font-size: .30rem;
					color: #777777;
					line-height: .88rem;
					overflow: hidden;
				}
			}
		}
		.changeBot{
			margin-top: .40rem;
			.bottomSure{
				width: 6.90rem;
				margin: 0 auto;
				line-height: .88rem;
				background: #931EFF;
				border-radius: .06rem;
				font-size: .34rem;
				color: #fff;
				text-align: center;
			}
		}
		.changeRecord{
			padding: 0 .30rem;
			margin-top: .28rem;
			text-align: right;
			font-size: .30rem;
			color: #029BFC;
		}
		.accountList{
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.5);
			height: 100%;
			width: 100%;
			z-index: 99;
			
		}
		.chooseWayList{
			border-bottom: 0.01rem solid #E1E1E1;
			background: #fff;
			position: relative;
			p{
				font-size: .36rem;
				text-align: center;
				line-height: 1.14rem;
				color: #333;
			}
			.colseCHoose{
				position: absolute;
				right: 0.30rem;
				top: 0.44rem;
				img{
					display: block;
					width: .28rem;
					height: .28rem;
				}
			}
			
		}
		.tellCode{
			width: 85%;
			height: 4.70rem;
			position: fixed;
			left: 50%;
			margin-left: -42.5%;
			top: 50%;
			margin-top: -2.50rem;
			background: #f5f5fa;
			z-index: 100;
			.tellNum{
				font-size: .28rem;
				color: #666666;
				line-height: 1.00rem;
				width: 90%;
				margin: 0 auto;
				margin-top: .30rem;
			}
			.getCodeOut{
				background: #fff;
				width: 90%;
				margin: 0 auto;
				margin-top: .60rem;
				padding: .15rem 0;
				line-height: .50rem;
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
				input{
					border: 0;
					-webkit-appearance:none;
					line-height:.50rem;
					width: 100%;
				}
				p{
					font-size: .28rem;
					padding: .15rem 0;
					color: #e50f72;
					border-left: 1px solid #e5e5e5;
					
					width: 55%;
					text-align: center;
				}
			}
			.sureBot{
				width: 90%;
				margin: 0 auto;
				
				background: #e50f72;
				font-size: .28rem;
				margin-top: .70rem;
				text-align: center;
				line-height: .90rem;
				color: #fff;
				border-radius: .02rem;
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
			z-index: 100;
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
		.getGraphCode{
			position: fixed;
			width: 100%;
			height: 100%;
			z-index: 101;
			background: rgba(0,0,0,.5);
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
		    -webkit-justify-content:center;
			justify-content:center;
			-moz-box-pack:center;
			-webkit--moz-box-pack:center;
			left: 0;
			top: 0;
			.graphCode{
				width: 5.60rem;
				height: 3.60rem;
				background: #fff;
				border-radius: .10rem;
				font-size: .32rem;
				position: relative;
				color: #333;
				.codeTop{
					text-align: center;
					padding-top: .50rem;
				}
				.entrtCode{
					margin-top: .40rem;
					position: relative;
					input{
						display: block;
						border: 0;
						width: 4.80rem;
						height: .90rem;
						line-height: .90rem;
						background: #F3F0F3;
						margin: 0 auto;
						border-radius: .08rem;
					}
					.shuaCode{
						position: absolute;
						right: 10%;
						top: 50%;
						margin-top: -.30rem;
						width: 1.40rem;
						height: .60rem;
					}
					img{
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.colseCode{
					position: absolute;
					right: .30rem;
					top: .30rem;
					width: .24rem;
					height: .24rem;
					img{
						display: block;
						height: 100%;
						width: 100%;
					}
				}
				.sureCode{
					width: 4.00rem;
					line-height:.90rem;
					text-align: center;
					background: #F798C4;
					color: #fff;
					border-radius: .08rem;
					margin: 0 auto;
					margin-top: .30rem;
				}
			}
		}
		.tishi{
			position: fixed;
			width: 5.00rem;
			/*height: 2.50rem;*/
			background: #fff;
			left: 50%;
			margin-left: -2.50rem;
			top:50%;
			margin-top: -1.25rem;
			z-index: 99999;
			border-radius: .10rem;
			border: 0.01rem solid #e5e5e5;
			overflow: hidden;
			
			.tiCen{
				padding: .20rem .50rem;
				line-height: .56rem;
				text-align: center;
				font-size: .28rem;
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
					color: #E50F72;
				}
			}
			
		}
	}
</style>