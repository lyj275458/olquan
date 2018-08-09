<template>
	<div class="ues"> 
		
		<div class="top">
			<ul :class="searchBarFixed == true ? 'isFixed' :''">
				<li>
					<span @click="changeOne" v-bind:class="{ 'special': addSelect===0}"><i>/</i> &nbsp;&nbsp;<b>小积分大用处</b>&nbsp;&nbsp; <i>/</i></span>
				</li>
				<li>
					<span @click="changeTwo" v-bind:class="{ 'special': addSelect===1}"><i>/</i> &nbsp;&nbsp;<b>积分哪儿来</b>&nbsp;&nbsp; <i>/</i></span>
				</li>
			</ul>
		</div>
		<!--<div class="usefor">
			<img :src="goownImg" v-show='addSelect===1' @click="gotoZhuan"/>
		</div>-->
		<!--<div class="howuse" @click="getDetailOne" v-show='addSelect===0'>
			<div class="left">
				<img :src="no1Img" />
				<p class="tittle">攒积分试商品</p>
				<span>参与积分试用</span><br />
				<span>支付所需积分加保证金</span><br />
				<span>随心试用</span><br />
				<span>保证金全退</span><br />
				<span style="color: #000; line-height: .64rem;">去试用 >></span><br />
			</div>
			<div class="right">
				<img :src="one2Img"/>
			</div>
		</div>-->
		<div class="howuse" @click="getDetailThree" v-show='addSelect===0'>
			<div class="left">
				<img :src="no1Img" />
				<p class="tittle">积分可提现</p>
				<span>申请提现</span><br />
				<span>想怎么花就怎么花</span><br />
				<span style="color: #000; line-height: .64rem;">去提现 >></span><br />
			</div>
			<div class="right">
				<img :src="three2Img"/>
			</div>
		</div>
		<div class="howuse" @click="getDetailTwo" v-show='addSelect===0'>
			<div class="right">
				<img :src="two2Img" />
			</div>
			<div class="left" style=" text-align: right;">
				<img :src="no2Img" style="margin-left: 2.40rem;"/>
				<p class="tittle">小积分当钱用</p>
				<span>100积分=1元钱</span><br />
				<span>购物选择积分支付</span><br />
				<span>轻松抵现</span><br />
				<span style="color: #000; line-height: .64rem;">去下单 >></span><br />
			</div>
			
		</div>
		
		<div class="howuse" @click="getDetailTwo" v-show='addSelect===1'>
			<div class="left">
				<img :src="no1Img" />
				<p class="tittle">购物送积分</p>
				<span>商城购物,可获得产品相应积分</span><br />
				<span>注：店主可获得vip双倍积分</span><br />
				<span style="color: #000; line-height: .64rem;">去购物 >></span><br />
			</div>
			<div class="right">
				<img :src="four2Img"/>
			</div>
		</div>
		<div class="howuse" @click="getDetailFour" v-show='addSelect===1'>
			<div class="right">
				<img :src="five2Img"/>
			</div>
			<div class="left" style=" text-align: right;">
				<img :src="no2Img" style="margin-left: 2.40rem;"/>
				<p class="tittle">推荐会员送积分</p>
				<span>①每推荐1个会员，送10积分</span><br />
				<span>②每推荐1个vip，送100积分</span><br />
				<!--<span>③每推荐1个店主，送3000积分</span><br />-->
				<span style="color: #000; line-height: .64rem;">去推荐 >></span><br />
			</div>
			
		</div>
		<div class="howuse" @click="getDetailFive" v-show='addSelect===1'>
			<div class="left">
				<img :src="no3Img" />
				<p class="tittle">拼团赚积分</p>
				<span>一键开团</span><br />
				<span>即可成为团长</span><br />
				<span>邀请好友参团</span><br />
				<span>团长可获得相应的产品积分</span><br />
				<span style="color: #000; line-height: .64rem;">去拼团 >></span><br />
			</div>
			<div class="right">
				<img :src="six2Img"/>
			</div>
		</div>
		<!--<div class="howuse" @click="gotoZhuan" v-show='addSelect===1'>
			<div class="right">
				<img :src="seven2Img"/>
			</div>
			<div class="left" style=" text-align: right;">
				<img :src="no4Img" style="margin-left: 2.40rem;"/>
				<p class="tittle">店主专享送积分</p>
				<span>购买店主专享产品</span><br />
				<span>可获得相应积分</span><br />
				<span>粉圈内的店主购买店主专享产品</span><br />
				<span>你可获得相应积分</span><br />
				<span style="color: #000; line-height: .64rem;">去专享 >></span><br />
			</div>
			
		</div>-->
		<div class="howuse" v-show='addSelect===1'>
			
			<div class="right">
				<img :src="eight2Img" />
			</div>
			<div class="left" style=" text-align: right;">
				<img :src="no4Img" style="margin-left: 2.40rem;"/>
				<p class="tittle">分享送积分</p>
				<span>一键分享</span><br />
				<span>锁定好友进入我的粉圈</span><br />
				<span>粉圈好友购物</span><br />
				<span>即可获得相应积分</span><br />
				<span>积分等同于自己购物的积分</span><br />
				<!--<span>你可获得相应积分。</span><br />-->
				<!--<span style="color: #000; line-height: .64rem;">去专享 >></span><br />-->
			</div>
		</div>
		<div class="answer">
			<p class="sep"><i>/</i> &nbsp;&nbsp;<b>小积分大用处</b>&nbsp;&nbsp; <i>/</i></p>
			<div class="question">
				<p class="ques">Q1：积分有什么用？</p>
				<p class="ans">参与平台购物当钱用、可提现（详情请见以上“小积分 大用处”）</p>
				<p class="ques">Q2：如何获取积分呢？</p>
				<p class="ans">购物、分享、推荐会员、拼团均可获取积分（详情请见以上“积分哪儿来”）</p>
				<p class="ques">Q3：积分和钱的比例是怎样的？</p>
				<p class="ans">100积分=1元，<br />例：商品价格为10元，我有100积分可进行抵用，只需再付款9元即可购买此商品。</p>
				<p class="ques">Q4：用钱可以购买积分吗？</p>
				<p class="ans">积分不可以直接用钱购买。</p>
				<p class="ques">Q5: OL圈积分有有效期吗？</p>
				<p class="ans">积分永久有效。</p>
				<!--<p class="ques">Q6：什么是积分试用？</p>
				<p class="ans">积分试用是OL圈平台联合商家推出的VIP会员回馈活动，新品，爆款，好货不断更新。首页-试用-积分试用，选择心仪的试用商品，支付所需积分及试用保证金，即可参与积分试用。</p>-->
				<!--<p class="ques">Q7：积分试用的积分和钱退吗？</p>
				<p class="ans">“积分试用”所支付的试用保证金全额退，积分不退还。</p>
				<p class="ques">Q8：积分试用的钱退到哪儿？要多久？</p>
				<p class="ans">“积分试用”申请退款后，次日开始计算，30天到账，除小金库支付退回小金库，其他方式支付一律退至OL圈余额账户，余额可消费，可申请提现。</p>
				<p class="ques">Q9：积分试用的产品支持7天无理由退换么？</p>
				<p class="ans">支持退换，但是客户需要承担退回的快递费用（需向客服提供退回的快递单号，客服与商家确认核实后会在3个工作日内返还支付金额与使用积分。）<br/>注：偏远地区会支付商家寄件产生的费用作为商家的补偿。</p>-->
				<p class="ques">Q6：怎么查看我的积分？</p>
				<p class="ans">查看方式：个人中心-我的钱包-可用积分/待定积分</p>
				<p class="ques">Q11：赚的积分什么时候能到？</p>
				<p class="ans">①通过推荐会员赚的积分将即时进入“可用积分”。<br/>②通过其他方式获得或者赚的积分将进入“待定积分”，15天后转为“可用积分”。</p>
				<!--<p class="ques">Q12：购买了68.9元的店主专享商品，为什么积分只有68？</p>
				<p class="ans">购买“店主专享”商品获得的积分，数值中小数点后的积分值自动舍弃，68.9的产品获得的积分为68。</p>-->
				<p class="ques">Q7：余额账户的钱提现后多久能到账？</p>
				<p class="ans">提现申请开始，15个工作日后到账。（15不包含周末及法定节假日）。</p>
				<p class="ques">Q8：推荐会员赚积分，怎样推荐呢？</p>
				<p class="ans">
					<span>1、如何推荐会员？</span><br/>
					vip、店主可通过：<br />
					a、分享商城任意链接，非会员点击，授权登录OL圈；<br />
					b、分享商品二维码/个人二维码，非会员点击，授权登录OL圈；<br/>
					成功推荐会员，获得10积分/个。<br />
					<span style="margin-top: .30rem;display: inline-block;">2、如何推荐vip？</span><br />
					vip、店主可通过：<br />
					a、粉圈内会员在平台任意消费一笔；<br />
					b、分享平台商品，非会员直接购买；<br />
					成功推荐vip，获得100积分/个。<br />
					<span style="margin-top: .30rem;display: inline-block;">3、如何推荐店主？</span><br />
					店主可通过：<br />
					a、粉圈内会员/vip自主开通店主(不填写邀请码)；<br />
					b、非粉圈好友开通店主时填写推荐人的领邀请码；<br />
					成功推荐店主，获得余额15元/个。
				</p>
				<p class="ques">Q9：推荐店主时，被推荐人邀请码填错了一个字符怎么办？</p>
				<p class="ans">
					店主的推荐，以邀请码为准，即开通时填写的谁的邀请码，就进入谁的粉圈。<br />
					若邀请码因错误而无效，则被推荐人仍停留在原粉圈。<br />
					账号默认为你的邀请码，为避免出错，建议复制粘贴。
				</p>
				<p class="ques">Q10：怎么理解：“一键开团当团长，赚与团内订单总额等数值的积分。”？</p>
				<p class="ans">
					例：用户A开团，拼团商品售价100元，有10人（含自己）参与拼团成功。用户A将会获得100X10=1000积分。
				</p>
				<!--<p class="ques">Q17：怎么理解：“自购/粉圈购店主专享商品，赚与商品价格等数值的积分”？</p>
				<p class="ans">
					例：自己购买店主专享商品价格为68元，即可获得68积分；你粉圈内的店主购买此商品，你也会获得68积分。
				</p>-->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'b',
		data : function(){
			return{
				addSelect:0,
				no1Img:'/static/images/no1.png',
				no2Img:'/static/images/no2.png',
				no3Img:'/static/images/no3.png',
				no4Img:'/static/images/no4.png',
				no5Img:'/static/images/no5.png',
				one2Img:'/static/images/one2.png',
				two2Img:'/static/images/two2.png',
				three2Img:'/static/images/three2.png',
				four2Img:'/static/images/four2.png',
				five2Img:'/static/images/five2.png',
				six2Img:'/static/images/six2.png',
				seven2Img:'/static/images/seven2.png',
				eight2Img:'/static/images/eight2.png',
				isAndroid:'',
				isiOS:'',
				searchBarFixed:false,
				shareData : {
					'title': "小积分，大用处",
					'description': "OL圈积分使用说明",
					'url': "",
					'picURL': "http://ol-site.olquan.com/plug/mobile/img/logoo.jpg",
					'hide':true,
					'share':false
				},
				iPhone:false,
				Pc:false
				
			}
		},
		beforeCreate(){
			
		},
		created: function() {
			this.browserRedirect();
			this.showPhone();
			this.getUrl();
			
			
			this.$store.commit('documentTitle','积分说明');
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
			
			
		},
		methods:{
			
			//分析链接
			getUrl(){
				this.shareData.url="https://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'integral/uesget');
				//this.shareData.url="https://test-mobile.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+'integral/uesget');
				this.addWeixinShare();//微信分享	
			},
			//悬浮
			handleScroll () {
			  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			 //console.log(scrollTop)
			  var offsetTop = document.querySelector('.top').offsetTop;
			  //console.log(offsetTop)
				if (scrollTop > offsetTop) {
				    this.searchBarFixed = true;
				} else {
				    this.searchBarFixed = false;
				}
				//console.log(this.searchBarFixed)
			},
			changeOne(){
				this.addSelect=0;
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			changeTwo(){
				this.addSelect=1;
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			showPhone(){
				var u = navigator.userAgent;
				this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//				console.log('是否是Android：'+this.isAndroid);
//				console.log('是否是iOS：'+this.isiOS);
			},
			getDetailOne(){
				if(this.iPhone){
					if(tsApp.getClientBrowser()=='wx'){
						window.location.href=CUR_URLBACK+'try/newCenter';
					}else{
						if(this.isAndroid){
							OLquan.toProduct("2")
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/syzx";//点击去试用  小积分页面 去试用2
						}
					}
				}else{
					window.location.href=CUR_URLBACK+'try/newCenter';
				}
				
				
			},
			getDetailTwo(){
				if(this.iPhone){
					if(tsApp.getClientBrowser()=='wx'){
						window.location.href=CUR_URLBACK+'index/newIndex';
					}else{
						if(this.isAndroid){
							OLquan.toProduct("3")
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/scsy";//小积分页面 去下单 去购物3
						}
					}
				}else{
					window.location.href=CUR_URLBACK+'index/newIndex';
				}
				
				
			},
			getDetailThree(){
				if(this.iPhone){
					if(tsApp.getClientBrowser()=='wx'){
						window.location.href=USE_URL+'ol/withdraw.html';
					}else{
						if(this.isAndroid){
							OLquan.toProduct("4")
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/wdqb";//小积分页面  去提现4
						}
					}
				}else{
					window.location.href=USE_URL+'ol/withdraw.html';
				}
				
				
			},
			gotoZhuan(){
				window.location.href=CUR_URLBACK+'mine/index';
			},
			getDetailFour(){
				if(this.iPhone){
					if(tsApp.getClientBrowser()=='wx'){
						window.location.href=USE_URL+'weixin/member/memberTwoCode2';
					}else{
						if(this.isAndroid){
							OLquan.toProduct("6")
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/tghb";//点击去推荐  小积分页面 去推荐6
						}
					}
				}else{
					window.location.href=USE_URL+'weixin/member/memberTwoCode2';
				}
				
				
			},
			getDetailFive(){
				if(this.iPhone){
					if(tsApp.getClientBrowser()=='wx'){
						window.location.href=CUR_URLBACK+'index/index';
					}else{
						if(this.isAndroid){
							OLquan.toProduct("5")
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/ptlb";//小积分页面  去提现5
						}
					}
				}else{
					window.location.href=CUR_URLBACK+'index/index';
				}
				
			},
			//PC和移动端判断
			browserRedirect() {
		      var sUserAgent = navigator.userAgent.toLowerCase();
		      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		      var bIsAndroid = sUserAgent.match(/android/i) == "android";
		      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		      
		      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		        this.iPhone=true
		        console.log( this.iPhone);
		        
		      } else {
		      	this.Pc=true
		        console.log(this.Pc);
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
		//调用共用的分享接口\
		if(data.result=='fail'){
			this.shareData.share=true;
		}
		//console.log(JSON.stringify(data.result))
		this.wxShareFun(data.result,this.shareData);
		//this.locationWx(data);
	  },
	  
		},
		destroyed () {
		  window.removeEventListener('scroll', this.handleScroll)
		},
	}
</script>

<style lang="scss" scoped>
	.ues{
		background: #fff;
		font-size: .30rem;
		
		.top{
			line-height: 1.40rem;
			margin-bottom: .20rem;
			.isFixed{
				position:fixed;
			    background-color:#Fff;
			    top:0;
			    z-index:22;
			    width: 100%;
				
				padding:0 ;
				margin: 0;
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
			    
			}
			ul{
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
				li{
					span{
						i{
							font-style: normal;
						}
					}
					.special{
						border-bottom: 0.01rem solid #fc469a;
						color: #fc469a;
						
					}
				}
			}
			
			
		}
		
		.howuse{
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
			margin-bottom: .80rem;
			padding: 0 .20rem;
			.left{
				width: 50%;
				img{
					display: block;
					height: .82rem;
					width: .82rem;
					border-radius: 50%;
					margin-top: .60rem;
				}
				.tittle{
					font-size: .32rem;
					font-weight: 700;
					color: #000;
					line-height: .72rem;
				}
				span{
					font-size: .24rem;
					color: #666;
					line-height: .38rem;
				}
			}
			.right{
				width: 50%;
				display: flex;
				display:-webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: -moz-flex;
				-webkit-box-orient:vertical;
			    -webkit-box-direction:normal;
			    -moz-box-orient:vertical;
			    -moz-box-direction:normal;
			    flex-direction:column;
			    -webkit-flex-direction:column;
				-webkit-justify-content:center;
				justify-content:center;
				-moz-box-pack:center;
				-webkit--moz-box-pack:center;
				box-pack:center;
				img{
					display: block;
					width: 100%;
					
				}
			}
		}
		.answer{
			.sep{
				text-align: center;
				font-size: .36rem;
				line-height: .72rem;
				i{
					font-style: normal;
				}
			}
			.question{
				padding: .20rem;
				.ques{
					font-size: .32rem;
					font-weight: 700;
					line-height: .64rem;
					margin-bottom: .10rem;
				}
				.ans{
					font-size: .28rem;
					color: #666;
					line-height: .42rem;
					margin-bottom: .20rem;
				}
			}
		}
		
	}
</style>