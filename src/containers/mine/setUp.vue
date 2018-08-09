<template>
	<div class="setUp">
		<div class="topMessage">
			<p>基本信息</p>
		</div>
		<div class="setMessage" style="height: 1.28rem;">
			<div class="setLeft">
				<p><img :src="seLogoImg" style="width: .28rem;height: .28rem;"/></p>
				<p style="margin-left: .07rem;">头像</p>
			</div>
			<div class="setRight">
				<img :src="memList.logo" class="memLogo" />
			</div>
		</div>
		<div class="setMessage" @click="changeNickname">
			<div class="setLeft">
				<p><img :src="setNickImg" /></p>
				<p style="margin-left: .14rem;">昵称</p>
			</div>
			<div class="setRight">
				<p style="margin-right: .20rem; color: #666;" v-show="memList.nickName==null">未填写</p>
				<p style="margin-right: .20rem;" v-show="memList.nickName!=null">{{memList.nickName}}</p>
				<p><img :src="setRowImg"/></p>
			</div>
		</div>
		<div class="setMessage" @click="changeRelname">
			<div class="setLeft">
				<p><img :src="setNameImg"/></p>
				<p style="margin-left: .14rem;">姓名</p>
			</div>
			<div class="setRight">
				<p style="margin-right: .20rem; color: #666;" v-show="memList.realName==null">未填写</p>
				<p style="margin-right: .20rem;" v-show="memList.realName!=null">{{memList.realName}}</p>
				<p><img :src="setRowImg"/></p>
			</div>
		</div>
		<div class="setMessage" @click="sexChange">
			<div class="setLeft">
				<p><img :src="sexImg"/></p>
				<p style="margin-left: .14rem;">性别</p>
			</div>
			<div class="setRight">
				<p style="margin-right: .20rem; color: #666;" v-show="memList.sex==null">未填写</p>
				<p style="margin-right: .20rem;" v-show="memList.sex==1">男</p>
				<p style="margin-right: .20rem;" v-show="memList.sex==2">女</p>
				<p><img :src="setRowImg"/></p>
			</div>
		</div>
		<div class="setMessage" @click="chooseDay">
			<div class="setLeft">
				<p><img :src="birthdayImg"/></p>
				<p style="margin-left: .14rem;">生日</p>
			</div>
			<div class="setRight">
				<p style="margin-right: .20rem; color: #666;" v-show="memList.birthday==null">未填写</p>
				<p style="margin-right: .20rem;" v-show="memList.birthday!=null">{{memList.birthday}}</p>
				<p><img :src="setRowImg"/></p>
			</div>
		</div>
		<div class="setMessage" @click="changeIdcard">
			<div class="setLeft">
				<p><img :src="idCardImg"/></p>
				<p style="margin-left: .14rem;">身份证</p>
			</div>
			<div class="setRight">
				<p style="margin-right: .20rem;" v-show="memList.identityNo!=null">{{memList.identityNo}}</p>
				<p style="margin-right: .20rem; color: #666;" v-show="memList.identityNo==null">未填写</p>
				<p><img :src="setRowImg"/></p>
			</div>
		</div>
		<div class="setMessage">
			<div class="setLeft">
				<p><img :src="bangTelImg"/></p>
				<p style="margin-left: .14rem;">绑定手机号</p>
			</div>
			<div class="setRight">
				<p style="margin-right: .20rem; color: #666;" v-show="memList.viewMobile==null">未填写</p>
				<p style="margin-right: .20rem;" v-show="memList.viewMobile!=null">{{memList.viewMobile}}</p>
				<p><img :src="setRowImg"/></p>
			</div>
		</div>
		<div class="topMessage" v-show="memList.accounts.length>1">
			<p>账户切换</p>
		</div>
		<div class="setMessage" @click="chooseAccountList" v-show="memList.accounts.length>1">
			<div class="setLeft">
				<p><img :src="chooseMemImg"/></p>
				<p style="margin-left: .14rem;">选择账号</p>
			</div>
			<div class="setRight">
				<p style="margin-right: .20rem; color: #666;">{{memList.accountNo}}</p>
				<p><img :src="setRowImg"/></p>
			</div>
		</div>
		<div class="setMessage" v-show="memList.accounts.length>1">
			<div class="setLeft">
				<p><img :src="chooseMemImg"/></p>
				<p style="margin-left: .14rem;">设置默认账号</p>
			</div>
			<div class="setRight">
				<p style="margin-right: .20rem; color: #666;">{{memList.defaultAccountNo}}</p>
				<p><img :src="setRowImg"/></p>
			</div>
		</div>
		<div class="topMessage">
			<p>安全提升</p>
		</div>
		<div class="setMessage">
			<div class="setLeft">
				<p><img :src="pasWadImg"/></p>
				<p style="margin-left: .14rem;">支付密码设置</p>
			</div>
			<div class="setRight">
				<p style="margin-right: .20rem; color: #666;" v-show="memList.hasPayPassWord!=1">未设置</p>
				<p style="margin-right: .20rem; color: #D23172;" v-show="memList.hasPayPassWord==1">修改</p>
				<p><img :src="setRowImg"/></p>
			</div>
		</div>
		<div class="choosePas" style="">
			<div class="protuct">
				<p><img :src="protuctImg"/></p>
				<p style="margin-left: .10rem;">开启账号保护</p>
			</div>
			<label class="ui-switch">
			      <input type="checkbox" :checked="isChecked" @click="changeChecked">
			</label>
		</div>
		<div class="topMessage">
			<p>更多</p>
		</div>
		<div class="setMessage" @click="getAdress">
			<div class="setLeft">
				<p><img :src="addressSetImg"/></p>
				<p style="margin-left: .14rem;">收货地址</p>
			</div>
			<div class="setRight">
				<!--<p style="margin-right: .20rem; color: #666;">15658160809</p>-->
				<p><img :src="setRowImg"/></p>
			</div>
		</div>
		<div class="openPasward" v-show="changeRealNameS">
			<div class="message">
				<div class="messageTop">
					设置真实姓名
				</div>
				<div class="inputName">
					<input type="text" placeholder="请输入姓名" v-model="realName"/>
				</div>
				<div class="sureOrdel">
					<div class="delBot" @click="delChange">取消</div>
					<div class="sureBot" @click="changeRealName">确定</div>
				</div>
			</div>
			
		</div>
		<div class="openPasward" v-show="changeNickNameS">
			<div class="message">
				<div class="messageTop">
					设置昵称
				</div>
				<div class="inputName">
					<input type="text" placeholder="请输入昵称" v-model="nickName"/>
				</div>
				<div class="sureOrdel">
					<div class="delBot" @click="delChange">取消</div>
					<div class="sureBot" @click="changeNickName">确定</div>
				</div>
			</div>
			
		</div>
		<div class="openPasward" v-show="changePaw">
			<div class="message">
				<div class="messageTop">
					请输入支付密码
				</div>
				<div class="inputName">
					<input type="password" placeholder="请输入支付密码" v-model="payPassword"/>
				</div>
				<div class="sureOrdel">
					<div class="delBot" @click="delChange">取消</div>
					<div class="sureBot" @click="changePawd">确定</div>
				</div>
			</div>
			
		</div>
		<div class="openPasward" v-show="changeSex">
			<div class="message">
				<div class="messageTop">
					设置性别
				</div>
				<div class="inputName">
					<select v-model="sexIndex">
			   			<option value="0">请选择</option>
						<option v-for="option in arr" :value="option.id">
							{{ option.name }}
						</option>
					</select>
				</div>
				<div class="sureOrdel">
					<div class="delBot" @click="delChange">取消</div>
					<div class="sureBot" @click="changeSecSure">确定</div>
				</div>
			</div>
			
		</div>
		<div class="openPasward" v-show="changeDay">
			<div class="message">
				<div class="messageTop">
					设置性别
				</div>
				<div class="inputName">
					<input class="chooseDay" placeholder="设置生日" ref="setInput" id="date" @blur="lostInput" v-on:focus="getInput" v-model="birthDay" :max="time" type="date" name="birthday" style=""/>
				</div>
				<div class="sureOrdel">
					<div class="delBot" @click="delChange">取消</div>
					<div class="sureBot" @click="setBird">确定</div>
				</div>
			</div>
			
		</div>
		<div class="openPasward" v-show="changeIDcard">
			<div class="message">
				<div class="messageTop">
					设置身份证
				</div>
				<div class="inputName">
					<input type="text" placeholder="请输入身份证号码" v-model="IDcard"/>
				</div>
				<div class="sureOrdel">
					<div class="delBot" @click="delChange">取消</div>
					<div class="sureBot" @click="setIdcard">确定</div>
				</div>
			</div>
			
		</div>
		<div class="mask" v-show="chooseAccount">
			<transition name="slide-fade">
				<div class="accountList" v-show="chooseAccount">
					<ul>
						<li v-for="item in memList.accounts" @click="chooseAmountList(item.account)">{{item.account}}</li>
					</ul>
					<div class="cancelAccount" @click="cancelChooseAount">取消</div>
				</div>
			</transition>
		</div>
		
		
		
	</div>
</template>

<script>
	import md5 from 'js-md5';
	export default{
		data : function() {
			return{
				sexImg:'/static/images/sex.png',
				setRowImg:'/static/images/setRow.png',
				birthdayImg:'/static/images/birthday.png', 
				idCardImg:'/static/images/idCard.png', 
				bangTelImg:'/static/images/bangTel.png',  
				chooseMemImg:'/static/images/chooseMem.png', 
				protuctImg:'/static/images/protuct.png', 
				addressSetImg:'/static/images/addressSet.png', 
				pasWadImg:'/static/images/pasWad.png', 
				setNameImg:'/static/images/setName.png', 
				setNickImg:'/static/images/nick.png',
				seLogoImg:'/static/images/memlogo.png',
				memList:[],
				time:'',
				isChecked:false,
				changeRealNameS:false,
				changePaw:false,//支付密码change
				changeSex:false,
				changeDay:false,
				changeIDcard:false,
				changeNickNameS:false,
				chooseAccount:false,
				birthDay:'',//生日
				payPassword:'',//支付密码
				realName:'',//真实姓名
				sexIndex:'0',//性别
				IDcard:'',//身份证
				nickName:'',//昵称
				arr:[
					{name: '男', id: 1},
          			{name: '女', id: 2}
				],
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
			
			this.$store.commit('documentTitle','我的资料');
			this.getMember();
			this.addWeixinShare();
		},
		mounted(){
			
			
		},
		computed: {
			
            
        },
		methods:{
			//选择账号
			cancelChooseAount(){
				this.chooseAccount=false;
			},
			chooseAccountList(){
				this.chooseAccount=true;
			},
			chooseAmountList(id){
				if(this.memList.accountNo==id){
					this.chooseAccount=false;
				}else{
					let data = {
						memberId:this.$route.query.memberId,
						accountNo:id,
					}
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.tabAcount,data,this.chooseAmountListBack,this);
				}
				
			},
			chooseAmountListBack(data){
				if(data.code!=0){
					
					this.$toast(data.message,200);
				}else{
					window.location.href=USE_URL+'weixin/member/membercore?mmm='+data.result.id;
				}
			},
			
			getInput(){
				let o = document.getElementById('date')
				this.$refs.setInput.removeAttribute('placeholder');
			},
			lostInput(){
				let o = document.getElementById('date')
				if(this.birthDay == ''){
					this.$refs.setInput.setAttribute('placeholder','设置生日');
				}
			},
			changeChecked(){
				this.changePaw=true;
			},
			
			delChange(){
				this.changePaw=false;
				this.changeRealNameS=false;
				this.changeSex=false;
				this.changeDay=false;
				this.changeIDcard=false;
				this.changeNickNameS=false;
			},
			changeNickname(){
				this.changeNickNameS=true;
				console.log(1)
			},
			changeNickName(){
				if(this.nickName==''){
					this.$toast('请输入昵称',200);
					return false;
				}
				let data = {
					memberId:this.$route.query.memberId,
					nickName:this.nickName,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.update,data,this.changeNickNameBack,this);
			},
			changeNickNameBack(data){
				this.delChange();
				if(data.code!=0){
					this.$toast(data.message,200);
				}else{
					this.$toast('修改成功',200);
					this.$set(this.memList,'nickName',this.nickName);
				}
			},
			//打开修改姓名框
			changeRelname(){
				this.changeRealNameS=true;
			},
			//打开性别修改
			sexChange(){
				this.changeSex=true;
			},
			//修改身份证
			changeIdcard(){
				this.changeIDcard=true;
			},
			//修改会员信息
			changeRealName(){
				if(this.realName==''){
					this.$toast('请输入姓名',200);
					return false;
				}
				let data = {
					memberId:this.$route.query.memberId,
					realName:this.realName,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.update,data,this.changeRealNameBack,this);
			},
			changeRealNameBack(data){
				this.delChange();
				if(data.code!=0){
					this.$toast(data.message,200);
				}else{
					this.$toast('修改成功',200);
					this.$set(this.memList,'realName',this.realName);
				}
			},
			//修改性别
			changeSecSure(){
				if(this.sexIndex=='0' || this.sexIndex==''){
					this.$toast('请选择性别',200);
					return false;
				}
				let data = {
					memberId:this.$route.query.memberId,
					sex:this.sexIndex,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.update,data,this.changeSecSureBack,this);
			},
			changeSecSureBack(data){
				this.delChange();
				if(data.code!=0){
					this.$toast(data.message,200);
				}else{
					this.$toast('修改成功',200);
					this.$set(this.memList,'sex',this.sexIndex);
				}
			},
			//修改生日
			chooseDay(){
				this.changeDay=true;
			},
			setBird(){
				if(this.birthDay==''){
					this.$toast('请选择生日',200);
					return false;
				}
				let data = {
					memberId:this.$route.query.memberId,
					birthday:this.birthDay,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.update,data,this.setBirdBack,this);
			},
			setBirdBack(data){
				this.delChange();
				if(data.code!=0){
					this.$toast(data.message,200);
				}else{
					this.$toast('修改成功',200);
					this.$set(this.memList,'birthday',this.birthDay);
				}
			},
			//设置身份证
			setIdcard(){
				if(this.IDcard.length!=18){
					this.$toast('请输入正确身份证号码',200);
					return false;
				}
				let data = {
					memberId:this.$route.query.memberId,
					identityNo:this.IDcard,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.update,data,this.setIdcardBack,this);
			},
			setIdcardBack(data){
				this.delChange();
				if(data.code!=0){
					this.$toast(data.message,200);
				}else{
					this.$toast('修改成功',200);
					this.$set(this.memList,'identityNo',this.IDcard);
				}
			},
			//打开或关闭支付密码
			changePawd(){
				let data ={
					memberId:this.$route.query.memberId,
					payPassword:md5(this.payPassword),
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.openPayPassword,data,this.changePawdBack,this);
			},
			changePawdBack(data){
				this.changePaw=false;
				if(data.code==0){
					this.isChecked=!this.isChecked;
					this.$toast('修改成功',200);
				}else{
					this.$toast(data.message);
				}
			},
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
//				this.time=this.memList.validTime.split("至")[1];
				if(this.memList.enabledPayPassword==1){
					this.isChecked=true;
				}else{
					this.isChecked=false;
				}
//				if(data.result.isGetStoreCommission){
//					this.showMember=true;
//				}else{
//					this.showMember=false;
//				}
			},
			//设置地址
			getAdress(){
				this.$router.push({path:'/payMain/address'});
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
input[type="date"]:before{
    content: attr(placeholder);
    color:#ddd;
}
	.setUp{
		background: #F5F5FA;
		min-height: 100%;
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
		.mask{
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.5);
			height: 100%;
			width: 100%;
			z-index: 99;
			
		}
		.accountList{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			
			background: #efeff4;
			z-index: 100;
			ul{
				margin-bottom:.12rem;
				li{
					background: #fff;
					text-align: center;
					padding: .30rem 0;
					font-size: .36rem;
					border-bottom: .01rem solid #E1E1E1;
				}
			}
			.cancelAccount{
				text-align: center;
				font-size: .36rem;
				background: #fff;
				padding: .30rem 0;
			}
		}
		.topMessage{
			line-height: .64rem;
			background: #F5F5FA;
			font-size: .24rem;
			color: #666;
			p{
				padding-left: .24rem;
			}
		}
		.setMessage{
			background: #fff;
			height: .88rem;
			padding: 0 .26rem;
			border-bottom: 0.01rem solid #e1e1e1;
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
		    -webkit-justify-content:space-between;
			justify-content:space-between;
			-moz-box-pack:space-between;
			-webkit--moz-box-pack:space-between;
			font-size: .26rem;
			color: #333;
			.setLeft{
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
				img{
					display: block;
					width: .21rem;
					height: .26rem;
				}
			}
			.setRight{
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
				
				img{
					display: block;
					width: .16rem;
					height: .28rem;
				}
				.memLogo{
					display: block;
					width: .80rem;
					height: .80rem;
					border-radius: 50%;
					margin-right: .18rem;
				}
			}
		}
		.choosePas{
			position: relative;
			height: .88rem;
			background: #fff;
			.protuct{
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
			    -webkit-justify-content:flex-start;
				justify-content:flex-start;
				-moz-box-pack:flex-start;
				-webkit--moz-box-pack:flex-start;
				font-size: .26rem;
				line-height: .88rem;
				color: #333;
				padding: 0 .26rem;
				img{
					display: block;
					width: .26rem;
					height: .30rem;
				}
			}
			.ui-switch {
				display: block;
			    position: absolute;
			    right: .70rem;
			    top:0;
			    font-size: .16rem;
			    height:.88rem;
			   
			    width: .7rem;
			    
			   
				input {
				    width: .7rem;
				    height: .54rem;
				    position: absolute;
				    top: 50%;left: 0;  
				    margin-top: -.27rem;
				    z-index: 2;
				    border: 0;
				    background: 0 0;
				    -webkit-appearance: none;
				    outline: 0
				}
				input:before {
				    content: '';
				    width: 1rem;
				    height: .52rem;
				    border: 1px solid #dfdfdf;
				    background-color: #fdfdfd;
				    border-radius: .52rem;
				    cursor: pointer;
				    display: inline-block;
				    position: relative;
				    vertical-align: middle;
				    -webkit-box-sizing: content-box;
				    box-sizing: content-box;
				    border-color: #dfdfdf;
				    -webkit-box-shadow: #dfdfdf 0 0 0 0 inset;
				    box-shadow: #dfdfdf 0 0 0 0 inset;
				    -webkit-transition: border .4s,-webkit-box-shadow .4s;
				    transition: border .4s,box-shadow .4s;
				    -webkit-background-clip: content-box;
				    background-clip: content-box
				}
				input:checked:before {
				    border-color: #64bd63;
				    -webkit-box-shadow: #64bd63 0 0 0 0.16rem inset;
				    box-shadow: #64bd63 0 0 0 0.16rem inset;
				    background-color: #64bd63;
				    transition: border .4s,box-shadow .4s,background-color 1.2s;
				    -webkit-transition: border .4s,-webkit-box-shadow .4s,background-color 1.2s;
				    background-color: #64bd63
				}
				input:checked:after {
				    left: .53rem
				}
				input:after {
				    content: '';
				    width:.5rem;
				    height: .5rem;
				    position: absolute;
				    top: 53%;
				    left: 0;
				    -webkit-transform:translateY(-50%);
				    border-radius: 100%;
				    background-color: #fff;
				    -webkit-box-shadow: 0 0.01rem 0.03rem rgba(0,0,0,.4);
				    box-shadow: 0 0.01rem 0.03rem rgba(0,0,0,.4);
				    -webkit-transition: left .2s;
				    transition: left .2s
				}
			}
		}
		.openPasward{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.6);
			z-index: 333;
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
			.message{
				background: #fff;
				width: 85%;
				border-radius: .06rem;
				font-size: .34rem;
				.messageTop{
					text-align: center;
					padding:.40rem .20rem;
				}
				.inputName{
					padding:0 .40rem;
					input{
						display: block;
						width: 100%;
						height: .60rem;
						border: 0;
						-webkit-appearance:none;
					}
					.chooseDay{
						width: 100%;
						height: 1rem;
						background: #fff;
						line-height: 1rem; 
						font-size: .28rem; 
						border: 0;outline: 0; 
						-webkit-appearance: none; 
						display: block;
					}
					
				}
				select{
					/*background: #fff;*/
					width: 100%;
					border: none;
				    appearance:none;
					-moz-appearance:none;
					-webkit-appearance:none;
					background: url(../../../static/images/selectarrow.png) no-repeat scroll right center transparent;
				}
				.sureOrdel{
					width: 100%;
					margin-top: .40rem;
					font-size: .34rem;
					color: #333;
					display: flex;
					display:-webkit-box;
				    display: -moz-box;
				    display: -ms-flexbox;
				    display: -webkit-flex;
				    display: -moz-flex;
				    line-height: .84rem;
				    border-top: 0.01rem solid #E1E1E1;
				    .delBot{
				    	width: 50%;
				    	text-align: center;
				    	border-right:0.01rem solid #E1E1E1 ;
				    }
				    .sureBot{
				    	width: 50%;
				    	color: #0BB20C;
				    	text-align: center;
				    }
				}
			}
		}
	}
</style>