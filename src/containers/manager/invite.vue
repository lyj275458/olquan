<template>
	<div class="manInvite">
		<div class="listOut" v-show="isAppleSure">
			<div class="listTop">
				<div style="height: .20rem;width: 100%;background: #F7F7F7;"></div>
				<div class="inviteTop">
					{{memList.nickName}}邀请你成为OL圈经理
				</div>
				<div class="inviteTop" style="background: #F7F7F7;">
					请提交资料等待审核：
				</div>
				<div class="inviteCell">
					<div class="inviteCellOut">
						<div class="cellLeft">
							申请人
						</div>
						<div class="cellRight">
							<input  readonly="readonly" placeholder="请输入昵称" v-model="nickName"/>
						</div>
					</div>
				</div>
				<div class="inviteCell">
					<div class="inviteCellOut">
						<div class="cellLeft">
							手机号
						</div>
						<div class="cellRight">
							<input type="tel" :maxlength="11" pattern="[0-9]*" v-on:input ="clearMoreCode()" placeholder="请输入手机号" v-model="setTelNum"/>
						</div>
					</div>
				</div>
				<div class="inviteCell">
					<div class="inviteCellOut" style="border: none;">
						<div class="cellLeft">
							验证码
						</div>
						<div class="cellRight">
							<input type="number" pattern="[0-9]*" placeholder="请输入验证码" v-model="code"/>
						</div>
					</div>
					<div class="lookCode">
						<p v-show="isSendFlag" @click="getCodeFun">获取验证码</p>
						<p v-show="!isSendFlag" style="color: #999;background: #e1e1e1;font-size: .24rem;">{{sendCodeText}}</p>
					</div>
				</div>
				<div style="height: .20rem;width: 100%;background: #F7F7F7;"></div>
				<div class="inviteCell">
					<div class="inviteCellOut">
						<div class="cellLeft">
							真实姓名
						</div>
						<div class="cellRight">
							<input type="text" placeholder="请输入真实姓名" v-model="realName" v-on:input ="clearMoreText()"/>
						</div>
					</div>
				</div>
				<div class="chooseCityList">
					<div class="chooseCityListOut">
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
							
							<!--<span style="display: block;font-size: .24rem;">Selected: {{ prov }} :{{city}}:{{district}}</span>  -->
					   	</div>
					</div>
			   		
			   	</div>
			    <div class="inviteCell">
					<div class="inviteCellOut">
						<div class="cellLeft">
							详细地址
						</div>
						<div class="cellRight">
							<input type="text" placeholder="请输入详细地址" v-model="address"/>
						</div>
					</div>
				</div>
				
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
			</div>
			
		</div>
		<div class="bot" v-show="isAppleSure">
			<p v-show="isClickSure" @click="applyManager"><span>提交申请</span></p>
			<p v-show="!isClickSure"><span style="background: #ddd;">提交申请</span></p>
		</div>
		<div class="isApplyOut" v-show="!isAppleSure">
			<img :src="applyManagerImg" />
			<p>资料提交成功！请等待审核</p>
		</div>
		
		<div class="zhezhao" v-show="zhezhaoSure"></div>
	</div>
	
</template>

<script>
	import axios from 'axios';
	var regCodeInterval;
	export default {
		
		data : function(){
			return{
				chaImg:'/static/images/cha.png',
				applyManagerImg:'/static/images/applyManager.png',
				arr:[],
		    	cityList:[],
		    	districtList:[],
		    	memList:[],
		    	cityId:0,
		    	districtId:0,
			    isChoose:1,
				graphCode:false,
				imgCode:'',
				iconImg:'',
				isCilckSure:true,
				isSendFlag:true,
				isAppleSure:true,
				sendCodeNum:60,
				nickName:'',//会员昵称
				setTelNum:'',//手机号码
				code:'',//验证码
				city:0,//市id
				prov:0,//省id
				district:0,//区县id
				address:'',//地址
				realName:'',//真实姓名
				zhezhaoSure:true,
				isClickSure:true,
				memListTwo:[],
				shareData : {
					'title': "",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':true
				},
			}
		},
		components: {
		   axios,
		},
		watch:{
			prov(){
	  			this.chooseCity();
				this.chooseDistrict();
			},
	  		city(){
	  			this.chooseDistrict();
	  			this.isChoose=1;
	  		},
	  		imgCode(){
	  			if(this.imgCode.length==4){
	  				this.isCilckSure=false;
	  			}else{
	  				this.isCilckSure=true;
	  			}
	  		},
		},
		created: function() {
			if(this.$route.query.memberId==undefined){
				this.$route.query.memberId='';
			}
			this.isCanApply();
			this.addWeixinShare();
			this.$store.commit('documentTitle','申请经理');
			
		},
		computed: {
			sendCodeText() {
				return this.sendCodeNum+'s后重新发送';
			},
		},
		mounted(){
			
			
		},
		methods:{
			//提交申请
			applyManager(){
				if(this.setTelNum=='' || this.setTelNum.length!=11){
					this.$toast('请输入手机号',1000);
		    		return;
				}
				if(this.code==''){
					this.$toast('请输入验证码',1000);
		    		return;
				}
				if(this.prov==0 || this.city==0 || this.district==0 || this.address==''){
					this.$toast('请确认省市区县详情地址是否输入',1000);
		    		return;
				}
				if(this.realName==''){
					this.$toast('请输入真实姓名',1000);
		    		return;
				}
				if(this.nickName==''){
					this.$toast('请输入昵称',1000);
		    		return;
				}
				let data ={
//						memberId:this.$route.query.memberId,
						inviteMemberId:this.$route.query.inviteMemberId,
						mobile:this.setTelNum,
						code:this.code,
						realName:this.realName,
						nickName:this.nickName,
						provinceId:this.prov,
						cityId:this.city,
						districtId:this.district,
						address:this.address,
					}
				this.isClickSure=false;
//					console.log(data)
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.submitApply,data,this.applyManagerBack,this);
			},
			applyManagerBack(data){
				this.isClickSure=true;
				if(data.code==0){
					this.isAppleSure=false;
				}else{
					this.$toast(data.message,1000);
				}
			},
			//判断是否可以提交申请督导
			isCanApply(){
				let data = {
//		  			memberId:this.$route.query.memberId,
		  			inviteMemberId:this.$route.query.inviteMemberId,
		  		}
				
		  		this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.canSubmitApply,data,this.isCanApplyBack,this);
			},
			isCanApplyBack(data){
				if(data.code==0){
					this.getMember();
				}else if(data.code==1){
					this.zhezhaoSure=false;
					this.isAppleSure=false;
				}else{
					window.location.href=CUR_URLBACK+'supervisor/buySuper?inviteId='+this.$route.query.inviteId;
				}
			},
			//获取邀请人会员信息
			getMember(){
				let data={
					memberId:this.$route.query.inviteMemberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				if(data.result.inviteSupervisorCount==0){
					window.location.href=CUR_URLBACK+'supervisor/buySuper?inviteId='+this.$route.query.inviteId;
				}else{
					this.zhezhaoSure=false;
					this.memList=data.result;
					this.getMemberTwo();
					this.getAllCity();
				}
			},
			//获取被邀请人的会员信息
			getMemberTwo(){
				let data={
//					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberTwoBack,this);
			},
			getMemberTwoBack(data){
				this.memListTwo=data.result;
				this.nickName=data.result.nickName;
			},
			//获取所有城市
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
		  	},
		  	chooseCity(){
		  		for(let i=0;i<this.arr.length;i++){
		  			if(this.prov==this.arr[i].id){
		  				this.cityList=this.arr[i].childreList;
		  				if(this.isChoose){
		  					this.city=0;
		  					this.district=0;
		  				}else{
		  					this.city=this.cityId;
		  				}
						
		  				break;
		  			}
		  		}
		  		//console.log(this.cityList)
		  	},
		  	chooseDistrict(){
				
		  		for(let i=0;i<this.cityList.length;i++){
		  			if(this.city==this.cityList[i].id){
		  				this.districtList=this.cityList[i].childreList;
		  				if(this.isChoose){
		  					this.district=0;
		  				}else{
		  					this.district=this.districtId
		  				}
						
		  				
		  			}
		  			
		  		}
		  		
		  		//console.log(this.districtList)
		  	},
		  	//点击获取验证码
			getCodeFun(){
				if(this.setTelNum==''){
					this.$toast('请输入手机号',1000);
		    		return;
				}else{
					this.getIcon();
					this.imgCode='';
					this.graphCode=true;
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
			//获取验证码
			sureCode(){
		    	let data={
//					memberId:this.$route.query.memberId,
					mobile:this.setTelNum,
					graphCode:this.imgCode
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.sendCode,data,this.sureCodeBack,this);
		    },
		    sureCodeBack(data){
		    	if(data.code==0){
		    		this.sendCodeFun();
		    		this.$toast('发送成功',1000);
		    		this.graphCode=false;
		    		
		    	}else{
		    		this.$toast(data.message,1000);
		    		this.getSpecialImg();
		    	}
		    },
		    //只能输入数字
			clearMoreCode(){
				this.imgCode = this.imgCode.replace(/[^\d]/g,'');
				this.setTelNum = this.setTelNum.replace(/[^\d]/g,'');
			},
			clearMoreText(){
				this.realName=this.realName.replace(/[^\u4e00-\u9fa5]/g,'')
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
		destroyed () {
		
		},
	}
</script>

<style lang="scss" scoped>
	.manInvite{
		background: #fff;
		height: 100%;
		width: 100%;
		display:-webkit-box;
	    display: -moz-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
		-webkit-flex-wrap:wrap;
	    -webkit-box-lines:multiple;
	    -moz-flex-wrap:wrap;
	    flex-wrap:wrap;
		
		.listOut{
			width: 100%;
		}
		.listTop{
			width: 100%;
			-webkit-box-flex: 1;
      		-ms-flex: 1;
         	flex: 1;
		}
		.isApplyOut{
			width: 100%;
			padding-top:4.40rem;
			img{
				margin: 0 auto;
				display: block;
				width: 1.59rem;
				height: 1.17rem;
			}
			p{
				font-size: .30rem;
				text-align: center;
				color: #333;
				margin-top: .44rem;
			}
		}
		.inviteTop{
			
			padding-left: .30rem;
			line-height: .92rem;
			font-size: .28rem;
			color: #333333;
			background: #fff;
		}
		.inviteCell{
			position: relative;
			padding-left: .30rem;
			background: #fff;
			.inviteCellOut{
				overflow: hidden;
				border-bottom:0.02rem solid #e1e1e1;
				.cellLeft{
					float: left;
					width: 24%;
					font-size: .30rem;
					color: #333333;
					line-height: .92rem;
				}
				.cellRight{
					float: left;
					overflow: hidden;
					width: 76%;
					input{
						display: block;
						line-height: .92rem;
						font-size: .30rem;
						width: 100%;
						border: none;
					}
				}
			}
			.lookCode{
				background: #E50F72;
				width: 1.90rem;
				line-height: .60rem;
				border-radius: .30rem;
				text-align: center;
				font-size: .30rem;
				color: #fff;
				position: absolute;
				right: 0.30rem;
				top: 50%;
				margin-top: -.30rem;
			}
		}
		.chooseCityList{
			padding-left: .30rem;
			
			background:#fff;
			.chooseCityListOut{
				border-bottom: 0.01rem solid #E1E1E1;
				display: flex;
				width: 100%;
			}
			.left{
				width: 24%;
				line-height: .92rem;
				color: #333;
				font-size: .30rem;
				
			}
			.selectCity{
				display: flex;
				width: 76%;
				font-size: 0;
				justify-content:flex-start;
				.chooseKuang{
					width: 33%;
					margin-right: .10rem;
				}
			}
			select{
				flex: 1;
				width: 100%;
				height: .92rem;
				border: none;
			    appearance:none;
				-moz-appearance:none;
				-webkit-appearance:none;
				background: url("../../../static/images/selectarrow.png") no-repeat scroll right center transparent;
				padding-right: .28rem;
				/*outline: none;*/
				
			}
		}
		.bot{
			position: relative;
			width: 100%;
			p{
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 0.50rem;
				
				span{
					margin: 0 auto;
					color: #fff;
					display: block;
					text-align: center;
					font-size: .36rem;
					background: #E50F72;
					border-radius: .08rem;
					display: block;
					width: 6.90rem;
					line-height: .90rem;
				}
			}
		}
		.zhezhao{
			position: fixed;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			z-index: 999;
		}
		.getGraphCode{
			position: fixed;
			width: 100%;
			z-index: 9;
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