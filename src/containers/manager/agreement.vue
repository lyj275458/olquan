<template>
	<div class="agreement">
		<div style="line-height:.91rem;background: #fff;text-align: center;font-size: .32rem;">【您还剩<span style="color: #E5006E;">{{memList.inviteSupervisorCount}}</span>个邀请名额】</div>
		<div class="agreeListTop" v-bind:class="{ 'agreeListTopSpe': agreeListSpe==true}">
			<ul>
				<li v-for="(item,index) in list" v-bind:class="{ 'speAgreeMent': speListAgree==index}" @click="getDifferent(index)">{{item}}</li>
			</ul>
		</div>
		<div class="applyList" v-for="(item , index) in applyList">
			<div class="listLeft">
				<img :src="item.logo"/>
			</div>
			<div class="listCent">
				<p class="top">{{item.realName}}({{item.nickName}})</p>
				<p class="bot">手机号:{{item.mobile}}</p>
			</div>
			<div class="listRight" v-show="item.status==1">
				<span>已同意</span>
			</div>
			<div class="listRight" v-show="item.status==2">
				<span>已拒绝</span>
			</div>
			<div class="agreeOrNot" v-show="item.status==0">
				<p class="agree" @click="argeeApplySure(item.realName,item.nickName,item.recordId,index)">
					同意
				</p>
				<p class="agreeNo" @click="refuseApplySure(item.realName,item.nickName,item.recordId,index)">
					拒绝
				</p>
			</div>
		</div>
		<div class="tishiOut" v-show="isSureOrNot" @touchmove.prevent>
			<div class="tishi">
				<div class="tiCen">
					<p>
						您确定要通过{{realName}}({{nickName}})的申请吗？
					</p>
					
				</div>
				<div class="tiBots">
					<p class="tiBleft" @click="cancelSure">取消</p>
					<p class="tiBright" v-show="isCilck" @click="agreeApply">确定</p>
					<p class="tiBright" v-show="!isCilck">确定</p>
				</div>
			</div>
		</div>
		<div class="tishiOut" v-show="isSure" @touchmove.prevent>
			<div class="tishi">
				<div class="tiCen">
					<p>
						您确定要拒绝{{realName}}({{nickName}})的申请吗？
					</p>
					
				</div>
				<div class="tiBots">
					<p class="tiBleft" @click="cancelSure">取消</p>
					<p class="tiBright" v-show="isCilck" @click="refuseApply">确定</p>
					<p class="tiBright" v-show="!isCilck">确定</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		
		data : function(){
			return{
				list:['全部','申请中','已同意','已拒绝'],
				speListAgree:0,
				actstartImg: '/static/images/actstart.png',
				isSureOrNot:false,
				isSure:false,
				isMore:true,
				isCilck:true,
				applyList:[],
				memList:[],
				indexId:'',
				applyId:'',
				realName:'',
				agreeListSpe:false,
				nickName:'',
				status:'',
				pageObj:{
					page:1,
				},
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
		   
		},
		watch:{
			
		},
		created: function() {
			if(this.$route.query.memberId==undefined){
				this.$route.query.memberId='';
			}
			
			this.getApplyList();
			this.getMember();
			this.$store.commit('documentTitle','申请列表');
//			newFinds
			
			
		},
		computed: {
		
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
			window.addEventListener('scroll', this.xuanfuScroll);
			this.addWeixinShare();
		},
		methods:{
			//悬浮 
  			xuanfuScroll(){
  				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				
				let offsetTop = document.querySelector('.agreeListTop').offsetTop;
				
				if(scrollTop > offsetTop){
					this.agreeListSpe = true;
					
				}else{
					this.agreeListSpe = false;
				}
				if(scrollTop<45){
					this.agreeListSpe = false;
				}
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
				
				this.memList=data.result;
				
				
			},
			//同意
			argeeApplySure(realName,nickName,id,index){
				this.realName=realName;
				this.nickName=nickName;
				this.isSureOrNot=true;
				this.applyId=id;
				this.indexId=index;
			},
			cancelSure(){
				this.isSureOrNot=false;
				this.isSure=false;
			},
			agreeApply(){
				this.isCilck=false;
				let data = {
//					memberId:this.$route.query.memberId,
					recordId:this.applyId,
					status:1,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.doAudit,data,this.agreeApplyBack,this);
				
			},
			agreeApplyBack(data){
				this.isCilck=true;
				if(data.code==0){
					this.isSureOrNot=false;
					this.$set(this.applyList[this.indexId],'status',1);
				}else{
					this.isSureOrNot=false;
					this.$toast(data.message,1000);
				}
			},
			//点击拒绝
			refuseApplySure(realName,nickName,id,index){
				this.realName=realName;
				this.nickName=nickName;
				this.isSure=true;
				this.applyId=id;
				this.indexId=index;
			},
			refuseApply(){
				this.isCilck=false;
				let data = {
//					memberId:this.$route.query.memberId,
					recordId:this.applyId,
					status:2,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.doAudit,data,this.refuseApplyBack,this);
				
			},
			refuseApplyBack(data){
				this.isCilck=true;
				if(data.code==0){
					this.isSure=false;
					this.$set(this.applyList[this.indexId],'status',2);
				}else{
					this.isSureOrNot=false;
					this.$toast(data.message,1000);
				}
			},
			//获取列表
			getApplyList(status){
				let data={
//					memberId:this.$route.query.memberId,
					status:status,
					page:1,
					row:10,
				}
//				console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.inviteRecords,data,this.getApplyListBack,this);
			},
			getApplyListBack(data){
				if(data.code!=0){
					this.$toast(data.message,1000);
				}else{
					this.applyList=data.result;
				}
//				console.log(data)
				
			},
		    getDifferent(index){
		    	this.pageObj.page=1;
		    	this.isMore=true;
		    	this.speListAgree=index;
		    	this.status=index-1;
		    	if(this.status<0){
		    		this.status='';
		    	}
		    	this.getApplyList(this.status)
		    },
		    //下拉加载更多
			handleScroll () {
  			  var height=document.body.scrollHeight;
  				//console.log(height)
			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(this.scrollTop)
			  var windowH=window.innerHeight;
			  if(this.scrollTop + windowH >=height-200){
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	  					page:this.pageObj.page+1,
	  					rows:10,
//	  					memberId:this.$route.query.memberId,
						status:this.status,
	  				};
	  				this.pageObj.page=this.pageObj.page+1
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.inviteRecords,data,this.getListMoreBack);
	 			}
			  }
	 			
			},
			getListMoreBack(data){
				if(data.result.data.length<10){
					this.isMore=false;
				}else{
					this.isMore=true;
				}
				for(let i=0; i<data.result.length; i++){
					this.applyList.push(data.result[i])
				}
				//console.log(this.curObj)	
			
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
		 	window.removeEventListener('scroll', this.handleScroll);
		 	window.removeEventListener('scroll', this.xuanfuScroll);
		},
	}
</script>

<style lang="scss" scoped>
	.agreement{
		
		.agreeListTopSpe{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
		}
		.agreeListTop{
			
			background: #fff;
			z-index: 999;
			font-size: .32rem;
			color: #777;
			line-height: .90rem;
			border-bottom: 0.01rem solid #E1E1E1;
			ul{
				position: relative;
				left: 0;
				top: 0;
				padding: 0 .64rem;
				display: flex;
				display:-webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: -moz-flex;
				-webkit-justify-content:space-between;
				justify-content:space-between;
				-moz-box-pack:space-between;
				webkit--moz-box-pack:space-between;
			}
			.speAgreeMent{
				border-bottom: 0.04rem solid #E50F72;
				color: #E50F72;
			}
		}
		.applyList{
			background: #fff;
			margin-bottom:.20rem ;
			padding: .26rem .70rem .26rem .30rem;
			overflow: hidden;
			position: relative;
			.agreeOrNot{
				position: absolute;
				right: 0.30rem;
				padding-top: .20rem;
				top: .24rem;
				font-size: 0;
				p{
					display: inline-block;
					font-size: .28rem;
					text-align: center;
					width: 1.00rem;
					line-height: .52rem;
				}
				.agree{
					background: #E50F72;
					color: #fff;
					border-radius: .26rem;
				}
				.agreeNo{
					border: 0.01rem solid #AAAAAA;
					line-height: .50rem;
					width: .98rem;
					color: #333;
					border-radius: .26rem;
					margin-left: .18rem;
				}
			}
			.listLeft{
				float: left;
				width: .90rem;
				height: .90rem;
				
				border-radius: 50%;
				img{
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.listCent{
				float: left;
				font-size: .30rem;
				color: #333;
				margin-left: .12rem;
				.top{
					line-height: .46rem;
				}
				.bot{
					margin-top: .12rem;
					font-size: .26rem;
					color: #777;
				}
			}
			.listRight{
				float: right;
				font-size: .28rem;
				color: #777;
				line-height: .90rem;
			}
		}
		.tishiOut{
			position: fixed;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			background: rgba(0,0,0,.5);
			z-index: 1002;
		}
		.tishi{
			position: fixed;
			width: 5.00rem;
			margin-top: 4.00rem;
			background: #fff;
			left: 50%;
			margin-left: -2.50rem;
			
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