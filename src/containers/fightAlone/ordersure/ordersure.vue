<template>
	<div class="orderSure">
		<div class="chooseOrder">
			请选择支付方式
		</div>
		<div class="orderWay">
			<div class="wayLeft">
				<img :src="weixinImg"/>
				微信
			</div>
			<div class="wayRight" @click="checkOne">
				<img :src="nochoseImg" v-show="sureCheckone==false" />
				<img :src="checkImg"  v-show="sureCheckone==true"/>
			</div>
		</div>
		<div class="orderWay">
			<div class="wayLeft">
				<img :src="zhifubImg"/>
				支付宝
			</div>
			<div class="wayRight" @click="checkTwo">
				<img :src="nochoseImg" v-show="sureChecktwo==false"/>
				<img :src="checkImg"  v-show="sureChecktwo==true"/>
			</div>
		</div>
		<div class="orderWay">
			<div class="wayLeft">
				<img :src="payforanotherImg"/>
				找人代付
			</div>
			<div class="wayRight" @click="checkThree">
				<img :src="nochoseImg" v-show="sureCheckthree==false"/>
				<img :src="checkImg" v-show="sureCheckthree==true"/>
			</div>
		</div>
		<div class="sureOrder" @click="sureOrder">
			<p>立即支付</p>
		</div>
	</div>
</template>

<script>
	export default {
		data : function() {
			return{
				weixinImg:'/static/images/weixin.png',
				nochoseImg:'/static/images/nochose.png',
				choseImg:'/static/images/waychose.png',
				zhifubImg:'/static/images/zhifub.png',
				payforanotherImg:'/static/images/payforanother.png',
				checkImg:'/static/images/checked.png',
				sureCheckone:true,
				sureChecktwo:false,
				sureCheckthree:false,
				payMethod:1,
				isPayAnother:0,
				payInfo:{},
				shareData : {
					'title': "",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':false,
					'share':false,
					'close':true
				}
			}
		},
		created: function() {
			this.$store.commit('documentTitle','立即支付');
			//this.addWeixinShare();
			this.addRecord();
			this.locationHref();
		},
		methods:{
			//添加访问记录
			addRecord(){
  				let data = {
  					terminalType:5,
  					pageuri:'fightAlone/ordersure/ordersure'
  				}
  				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,data,this.addRecordBack,this);
  			},
  			addRecordBack(data){},
			locationHref(){
				//
				//window.location.reload(true)
				this.keyId=this.getCookie('number')
				if(this.keyId=='1'){
					//window.location.href="javascript"
					return false;
				}
				window.location.href=location.href;
				
				this.setCookie('number','1');
				
				
			},
			checkOne(){
				this.sureCheckone=true;
				this.sureChecktwo=false;
				this.sureCheckthree=false,
				this.payMethod=1;
				this.isPayAnother=0
			},
			checkTwo(){
				this.sureCheckone=false;
				this.sureChecktwo=true;
				this.sureCheckthree=false,
				this.payMethod=4;
				this.isPayAnother=0;
				console.log(this.payMethod)
			},
			checkThree(){
				this.sureCheckone=false;
				this.sureChecktwo=false;
				this.sureCheckthree=true,
				this.payMethod=1;
				this.isPayAnother=1;
				console.log(this.payMethod)
			},
			sureOrder(){
				
				let data={
					togetherJoinRecordId:this.$route.params.id,
//					memberId:this.$route.query.memberId,
					payMethod:this.payMethod,
					isPayAnother:this.isPayAnother,
					uutype:1
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.singleOrderPay,data,this.sureOrderBack);
				
			},
			sureOrderBack(data){
				//console.log(data.result.payInfo)
				if(this.payMethod==1 && this.isPayAnother==0){
					if(data.code!=0){
						this.$toast(data.message);
					}else{
						this.payInfo=data.result.payInfo
						this.addWeixinPay();
					}
					
				}else if(this.isPayAnother==1){
					if(data.code!=0){
						this.$toast(data.message);
					}else{
						window.location.href=USE_URL+'weixin/member/payAnother?payRecordNo='+data.result.payRecordNo;	
					}
				
				}else if(this.payMethod==4 && this.isPayAnother==0){
					if(data.code!=0){
						this.$toast(data.message);
					}else{
						window.location.href=USE_URL+'ol/weixin/index/alipay?type=1&recordId='+data.result;
					}
					
				}
				
			},
			//微信支付
		addWeixinPay:function(){
			var data = {                 
				"url":location.href,
				"callback":'',
		    };
		   
		    
		    this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.payBack,this);			
		},
		payBack:function(data){
	      	this.wxPayFun(data.result,this.payInfo);
			
			
			//this.locationWx(data);
			
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
//		  	console.log("data")
//		  	console.log(data)
			if(data.result=='fail'){
				this.shareData.share=true;
			}
	      	//console.log()
			//调用共用的分享接口
			//console.log(JSON.stringify(data.result))
			
			
			this.wxShareFun(data.result,this.shareData);
			
			
			//this.locationWx(data);
			
		  },
		},
		
	}
</script>

<style lang="scss" scoped>
	.orderSure{
		height: 100%;
		
		.chooseOrder{
			padding:0 .24rem; 
			background: #f2f2f2;
			line-height: .56rem;
			font-size: .24rem;
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
</style>