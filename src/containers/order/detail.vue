<template>
	<div class="orderstaus">
		<div class="staus" v-show='curObj.status==1'>
			<img :src='successImg'/>
			<span>拼团成功</span>
		</div>
		<div class="staus"  v-show='curObj.status==2'>
			<img :src='failImg'/>
			<span style="color: #d81e06;">拼团失败</span>
		</div>
		<div class="staus"  v-show='curObj.status==0'>
			<img :src='underWay'/>
			<span style="color: #f4ea2a;">正在拼团中</span>
		</div>
		<div class="name" :class="{specialName:curObj.status==3}">
			<ul class="name-list">
				<li v-for="(item,index) in curObj.joinMemberData" v-if="index<15">
					<img :src='item.memberLogo'/>
					<img :src="speImg"  class="special" v-show="item.isOwner==1"/>
				</li>
				
				<li v-show="length>=16"><img :src="moreImg"/></li>
			</ul>
			
		</div>
				
		<div class="botton" v-show="curObj.status==2" >
			<p style="background: #fb2c8d;" @click="goDetail(curObj.productId)">重新拼团</p>
		</div>
		<div class="botton" v-show="curObj.status==1">
			<p style="background: #fb2c8d;" @click="shareFriend">去商城逛逛</p>
		</div>
		<div class="botton" v-show="curObj.status==0">
			<p style="background: #fb2c8d;" @click="joinFight">邀请好友拼团</p>
		</div>
		<div class="botton" v-show="curObj.status==3" >
			<p>产品已下架无法拼团</p>
		</div>
		<div class="showorder" @click="getDetail(curObj.orderId)" v-show="curObj.isSuccess!=2">
			<span>订单详情</span>
			<img :src='gomoreImg' v-show="curObj.orderId==null"/>
			<img :src='gomoreImg'  v-show="curObj.orderId!=null"/>
		</div>
		<div class="orderlist" v-show="curObj.isSuccess!=2">
			<ul>
				<li v-show="curObj.orderNo!=''">
					<span>订单编号：</span>
					<span>{{curObj.orderNo}}</span>
				</li>
				<li v-show="curObj.payMethod">
					<span>支付方式：</span>
					<span>{{curObj.payMethod}}</span>
				</li>
				<li v-show="curObj.openTime">
					<span>下单时间：</span>
					<span>{{curObj.openTime}}</span>
				</li>
				<li v-show="curObj.joinTogetherTime">
					<span>拼团时间：</span>
					<span>{{curObj.joinTogetherTime}}</span>
				</li>
				
			</ul>
		</div>
		<div class="shareDetail" v-show="shareSure"  @click="colseSure">
			<div class="share">
				<img :src="shareImg" />
				<div class="people">赶紧邀请好友来拼团吧</div>
				<div class="sure">点击右上角分享拼团</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data : function() {
			return{
				successImg:'/static/images/success.png',
				failImg:'/static/images/fail.png',
				moreImg:'/static/images/more.png',
				gomoreImg:'/static/images/gomore.png',
				nameImg:'/static/images/name.png',
				speImg:'/static/images/pin.png',
				copyImg:'/static/images/copy.png',
				shareImg:'/static/images/share.png',
				underWay:'/static/images/underway.png',
				curObj:{},
				shareSure:false,
				length:0,
				shareData : {
					'title': "我们一起来拼团吧",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':false
				},
				
				
			}
		},
		created: function() {
			this.$store.commit('documentTitle','拼团详情');
			this.getList({});
			this.locationHref();
			
		},
		mounted(){
			 	
		},
		methods:{
			getList(){
				let data={
					//memberId:this.$route.query.memberId,
					togetherRecordId:this.$route.params.id,
					//togetherRecordId:24,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.togetherRecordDetail,data,this.getListBack,this);
			},
			getListBack(data){
				if(data.result){
					this.curObj=data.result;
					this.shareData.picURL=this.curObj.productImage;
					this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'share/share?id='+this.$route.params.id);
					//this.shareData.url="http://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'share/share?id='+this.$route.params.id);
					this.shareData.title='【OL圈拼团】我花了'+this.curObj.togetherPrice+'元买了'+this.curObj.productName;
					this.shareData.description=this.curObj.productDesc;
				}else{
					this.curObj=[]
				}
				if(data.result.joinMemberData){
					this.length=data.result.joinMemberData.length
				}else{
					this.length=0;
				}
				this.addWeixinShare();//微信分享
				console.log(data.result.joinMemberData.length)
				//console.log(this.curObj[0].isSuccess)
			},
			shareFriend(){
				window.location.href=CUR_URLBACK+'index/newIndex?memberId='+this.$route.query.memberId
			},
			colseSure(){
				this.shareSure=false;
			},
			goDetail(id){
				console.log(id);
				window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id+'&memberId='+this.$route.query.memberId
			},
			getDetail(id){
				console.log(id)
				window.location.href=USE_URL+'ol/orderdDetail.html?orderId='+id
				

			},
			joinFight(){
				this.shareSure=true;
			},
			locationHref(){
				//
				//window.location.reload(true)
				this.keyId=this.getCookie('number')
				if(this.keyId=='1'){
					//window.location.href="javascript"
					return false;
				}
				window.location.href=location.href;
				this.addWeixinShare();
				this.setCookie('number','1');
				//this.addWeixinShare()
				
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
.orderstaus{
	height: 100%;
	position: relative;
	overflow: auto;
	.staus{
		
		text-align: center;
		background:#fff;
		
		img{
			display: inline-block;
			height: .30rem;
			vertical-align: middle;
			width: .30rem;
			
			
			
		}
		span{
			font-size:.32rem;
			vertical-align: middle;
			color: #1afa29;
			margin-left: -.20rem;
		}
	}
	.reson{
		background: #fff;
		font-size: .20rem;
		color: #a2a2a2;
		text-align: center;
	}
	.name{
		background: #fff;
		width: 100%;
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
		.name-list{
			width: 6.10rem;
			display: flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
		    display: -moz-flex;
			flex-wrap:wrap;
			-webkit-flex-wrap:wrap;
		  -webkit-box-lines:multiple;
		  -moz-flex-wrap:wrap;
			-webkit-justify-content:flex-start;
			justify-content:flex-start;
			-moz-box-pack:flex-start;
			-webkit--moz-box-pack:flex-start;
			
			li{
				margin: 0 .21rem;
				position: relative;
				img{
					display: inline-block;
					height: .80rem;
					width: .80rem;
					border-radius: 50%;
				}
				.special{
					display: inline-block;
					width: .58rem;
					height: .32rem;
					position: absolute;
					left: -.12rem;
					top: -.06rem;
					
				}
			}
			
			
			
		}
		
	}
	.specialName{
		padding-top: .20rem;
	}
	.botton{
			background:#fff;
			position: relative;
			height: 1.28rem;
			p{
				width: 7.02rem;
				height: .88rem;
				background: -webkit-linear-gradient(left, #bbbbbb , #949594); /* Safari 5.1 - 6.0 */
			    background: -o-linear-gradient(right, #bbbbbb, #949594); /* Opera 11.1 - 12.0 */
			    background: -moz-linear-gradient(right, #bbbbbb, #949594); /* Firefox 3.6 - 15 */
			    background: linear-gradient(to right, #bbbbbb , #949594); /* 标准的语法 */

				font-size: .32rem;
				color: #fff;
				text-align: center;
				line-height: .88rem;
				border-radius: .05rem;
				position: absolute;
				left: 50%;
				margin-left: -3.51rem;
				top: 50%;
				margin-top: -.44rem;
				
			}
	}
	.showorder{
		background: #fff;
		border-bottom: .01rem #f2f2f2;
		line-height: .88rem;
		font-size: .28rem;
		padding: 0 .20rem;
		position: relative;
		margin-top: .10rem;
		img{
			display: inline-block;
			width: .22rem;
			height: .40rem;
			position: absolute;
			right: .20rem;
			top: 50%;
			margin-top: -.20rem;
		}
	}
	.orderlist{
		background: #fff;
		color: #9c9c9c;
		font-size: .24rem;
		padding: .26rem 0 .26rem .20rem;
		li{
			line-height: .56rem;
			img{
				display: inline-block;
				height: .44rem;
				width: .80rem;
				vertical-align: middle;
				margin-left: .10rem;
			}
		}
	}
	.shareDetail{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(0,0,0,.8);
		.share{
			
			.time{
				font-size: .28rem;
				text-align: center;
				width: 100%;
				color: #fff;
				line-height: .76rem;
				position: absolute;
				top: 0;
			}
			img{
				width: 1.60rem;
				height: 1.64rem;
				position: absolute;
				right: .40rem;
				top: .40rem;
			}
			.people{
				margin-top: 2.36rem;
				color: #fff;
				font-size: .36rem;
				text-align: center;
				span{
					color: #ff3892;
					
				}
				i{
					font-style: normal;
				}
			}
			.sure{
				font-size: .28rem;
				text-align: center;
				color: #fff;
				margin-top: .50rem;
			}
		}
	}
}
</style>