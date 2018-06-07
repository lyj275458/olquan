<template>
	<div class="setTel">
		<div class="bindingTei">
			你当前绑定的手机号为 : {{memList.viewMobile}}
		</div>
		<div class="getCodeOut">
			<input type="tel" placeholder="请输入验证码"/>
			<p v-show="isSendFlag" @click="getCodeFun" >获取验证码</p>
			<p v-show="!isSendFlag" style="color: #999;">{{sendCodeText}}</p>
		</div>
		<div class="sureBot">下一步</div>
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
				<div class="sureCode" v-show="!isCilckSure" style="background: #e50f72;">确定</div>
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
			return{
				chaImg:'/static/images/cha.png',
				isSendFlag:true,
				isCilckSure:true,
				sendCodeNum:60,
				graphCode:false,
				memList:[],
				iconImg:'',
				imgCode:'',
				shareData : {
					'title': "",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':true,
					'close':true
				},
				
				
			}
		},
		created: function() {
			if(this.$route.query.memberId=='undefined' || this.$route.query.memberId==undefined){
				this.$route.query.memberId='';
			}
			
			this.$store.commit('documentTitle','验证手机号码');
			this.getMember();
			this.addWeixinShare();
			
		},
		mounted(){
			
			
		},
		computed: {
			sendCodeText() {
				return this.sendCodeNum+'s后重新发送';
			},
			
            
        },
        watch:{
        	imgCode(){
	  			if(this.imgCode.length==4){
	  				this.isCilckSure=false;
	  			}else{
	  				this.isCilckSure=true;
	  			}
	  		},
        },
		methods:{
			//获取会员信息
			getMember(){
				let data={
					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				this.memList=data.result;
				
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
				        this.iconImg = data
				        
				})
		    },
		    //刷新图形码
		    getSpecialImg(){
		    	this.getIcon();
		    },
		    colseCodeFun(){
				this.graphCode=false;
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
		    //只能输入数字
			clearMoreCode(){
				this.imgCode = this.imgCode.replace(/[^\d]/g,'');
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
	.setTel{
		min-height: 100%;
		background: #F5F5FA;
		.bindingTei{
			width: 90%;
			margin: 0 auto;
			line-height: 1.00rem;
			font-size: .28rem;
			color: #666;
		}
		.getCodeOut{
			background: #fff;
			width: 90%;
			margin: 0 auto;
			padding: .15rem 0;
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
			input{
				border: 0;
				-webkit-appearance:none;
				line-height:.50rem;
				width: 64%;
			}
			p{
				font-size: .28rem;
				line-height: .50rem;
				color: #e50f72;
				border-left: 1px solid #e5e5e5;
				
				width: 33%;
				text-align: center;
			}
		}
		.sureBot{
			width: 90%;
			margin: 0 auto;
			background: #e50f72;
			font-size: .28rem;
			margin-top: .40rem;
			text-align: center;
			line-height: .90rem;
			color: #fff;
			border-radius: .02rem;
		}
		.getGraphCode{
			position: fixed;
			width: 100%;
			height: 100%;
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
	}
</style>