<template>
	<div class="personal">
		
		<div class="perTop">
			<div class="personalImg">
				<img :src="memList.logo"/>
			</div>
			<div class="personalName">
				{{memList.nickName}}
			</div>
			<div class="personalLevel">
				{{memList.levelName}}
			</div>
			<div class="personalTime" v-show="showMember">
				店主有效期：{{time}}
			</div>
			
			<!--白，vip-->
			<div class="white">
				<div class="father">
					<!--<img :src="whiteBotImg" v-show="memList.levelCode!='white'"/>-->
					<img :src="whiteCentImg" v-show="memList.levelCode!='white'"/>
					
				</div>
			</div>
			<div class="whiteImg" v-show="memList.levelCode=='white'">
				<div style="position: relative;height: .15rem;">
					<img :src="whiteTopImg" style="position: absolute;left: 50%;margin-left: -.17rem;"/>
				</div>
				<img :src="memList.logo" class="special"/>
			</div>
			<div class="levelName" v-show="memList.levelCode!='white'" style="position: absolute;left: .80rem;top: 4.94rem;">会员</div>
			<div class="levelName levelSpecial" v-show="memList.levelCode=='white'" style="position: absolute;left: .92rem;top: 5.06rem;">会员</div>
			<!--白，vip-->
			<!--店主-->
			<div class="white" style="top: 3.72rem;left: 2.06rem;">
				<div class="father">
					<img :src="pinkBotImg" v-show="memList.levelCode=='white'"/>
					<img :src="pinkCentImg" v-show="memList.levelCode!='white'"/>
					
				</div>
			</div>
			<div class="whiteImg" style="top: 3.48rem;left: 1.92rem;" v-show="memList.levelCode=='golden'">
				<div style="position: relative;height: .15rem;">
					<img :src="pinkTopImg" style="position: absolute;left: 50%;margin-left: -.17rem;"/>
				</div>
				
				<img :src="memList.logo" class="special"/>
			</div>
			<div class="levelName" v-show="memList.levelCode!='golden'" style="position: absolute;left: 2.18rem;top: 4.74rem;">VIP</div>
			<div class="levelName levelSpecial" v-show="memList.levelCode=='golden'" style="position: absolute;left: 2.22rem;top: 4.72rem;">VIP</div>
			<!--店主-->
			<!--督导-->
			<div class="white" style="top: 3.32rem;left: 3.48rem;">
				<div class="father">
					<img :src="supervisorBotImg"  v-show="memList.levelCode=='white' || memList.levelCode=='golden'"/>
					<img :src="supervisorCentImg" v-show="memList.levelCode!='white' && memList.levelCode!='golden' && memList.levelCode!='store'"/>
					
				</div>
			</div>
			<div class="whiteImg" style="top: 3.30rem;left: 3.30rem;" v-show="memList.levelCode=='store'">
				<div style="position: relative;height: .15rem;">
					<img :src="supervisorTopImg" style="position: absolute;left: 50%;margin-left: -.17rem;"/>
				</div>
				
				<img :src="memList.logo" class="special"/>
			</div>
			<div class="levelName" v-show="memList.levelCode!='store'" style="position: absolute;left:3.52rem;top: 4.26rem;">店主</div>
			<div class="levelName levelSpecial" v-show="memList.levelCode=='store'" style="position: absolute;left:3.52rem;top: 4.56rem;">店主</div>
			<!--督导-->
			<!--高级督导-->
			<div class="white" style="top: 2.82rem;left: 4.84rem;">
				<div class="father">
					<img :src="highSupervisorBotImg"  v-show="memList.levelCode=='white' || memList.levelCode=='golden' || memList.levelCode=='store'"/>
					<img :src="highSupervisorCentImg" v-show="memList.levelCode!='white' && memList.levelCode!='golden' && memList.levelCode!='store' && memList.levelCode!='supervisor'"/>
					
				</div>
			</div>
			<div class="whiteImg" style="top: 2.70rem;left: 4.68rem;" v-show="memList.levelCode=='supervisor'">
				<div style="position: relative;height: .15rem;">
					<img :src="highSupervisorTopImg" style="position: absolute;left: 50%;margin-left: -.17rem;"/>
				</div>
				
				<img :src="memList.logo" class="special"/>
			</div>
			<div class="levelName" v-show="memList.levelCode!='supervisor'" style="position: absolute;left:4.91rem;top: 3.80rem;">经理</div>
			<div class="levelName levelSpecial" v-show="memList.levelCode=='supervisor'" style="position: absolute;left:4.92rem;top: 3.96rem;">经理</div>
			<!--高级督导-->
			<!--联创-->
			<div class="white" style="top: 2.12rem;left: 6.20rem;">
				<div class="father">
					<img :src="starSupervisorBotImg"  v-show="memList.levelCode=='white' || memList.levelCode=='golden' || memList.levelCode=='store' || memList.levelCode=='supervisor'"/>
					<!--<img :src="highSupervisorCentImg" v-show="memList.levelCode!='white' && memList.levelCode!='golden' && memList.levelCode!='store' && memList.levelCode!='supervisor' && memList.levelCode!='highSupervisor'"/>-->
					
				</div>
			</div>
			<div class="whiteImg" style="top: 1.98rem;left: 5.90rem;" v-show="memList.levelCode=='highSupervisor'">
				<div style="position: relative;height: .15rem;">
					<img :src="starSupervisorTopImg" style="position: absolute;left: 50%;margin-left: -.17rem;"/>
				</div>
				
				<img :src="memList.logo" class="special"/>
			</div>
			<div class="levelName" v-show="memList.levelCode!='highSupervisor'" style="position: absolute;left:6.28rem;top: 3.08rem;">总监</div>
			<div class="levelName levelSpecial" v-show="memList.levelCode=='highSupervisor'" style="position: absolute;left:6.14rem;top: 3.24rem;">总监</div>
			<!--联创-->
		</div>
		<div class="imgdetail" v-html="gifObj.content" style="width: 100%;" v-show="memList.levelCode=='golden'">
			{{gifObj.content}}
		</div>
		<div v-show="memList.levelCode=='store'" class="getSuperversion">
			<div class="getSuper">
				
				<div>距 <span style="color: #E50F71;">经理</span></div>
				<div class="getHighter" @click="getSuper" v-show="memBerIds">
					<span>直接升级</span>
					<img :src="rowrightImg"/>
				</div>
			</div>
			<div id="myChart" :style="{width: '100%', height: '3.00rem'}"></div>
			<div class="howGetSuper">粉圈累计销售额{{growList.saleRequireAmount}}元</div>
			<div class="takeCare">注：销售额统计含特卖订单、拼团订单、普通订单、礼包订单。试用订单除外</div>
		</div>
		
		<div v-show="memList.levelCode=='supervisor'" style="background: #fff;" class="getHighSuper">
			<div class="getSuper">
				<div>距 <span style="color: #E50F71;">总监</span></div>
				<!--<div class="getHighter">
					<span>直接升级</span>
					<img :src="rowrightImg"/>
				</div>-->
			</div>
			<div class="speOutDiv">
				<div>
					<div id="supervisorList" :style="{width: '2.50rem', height: '3.00rem'}"></div>
					<div class="queshao">团队累计销售额{{growList.supervisorRequireAmount}}元</div>
				</div>
				<div>
					<div id="supervisorStore" :style="{width: '2.50rem', height: '3.00rem'}"></div>
					<div class="queshao">团队{{growList.storeRequireCount}}个店主</div>
				</div>
				<div class="plusSuper">
					<div id="supervisor" :style="{width: '2.50rem', height: '3.00rem'}"></div>
					<div class="queshao">直属培养{{growList.supervisorRequireCount}}个经理</div>
				</div>
				
				
			</div>
		</div>
		<div v-show="memList.levelCode=='highSupervisor'" style="background: #fff;" class="getHighSuper">
			<!--<div class="getSuper">
				<div>距离 <span style="color: #E50F71;">联创</span></div>
				<div class="getHighter">
					<span>直接升级</span>
					<img :src="rowrightImg"/>
				</div>
			</div>-->
			<div class="speOutDiv">
				<div class="plusSuper">
					<div id="highSupervisor" :style="{width: '1.87rem', height: '3.00rem'}"></div>
					<div class="queshao" style="padding: 0 .20rem;">直属推荐{{growList.storeRequireCount}}个店主</div>
				</div>
				<div>
					<div id="highSupervisorList" :style="{width: '1.87rem', height: '3.00rem'}"></div>
					<div class="queshao" style="padding: 0 .20rem;">经理收益{{growList.supervisorRequireAmount}}元</div>
				</div>
				<div>
					<div id="highSupervisorNum" :style="{width: '1.87rem', height: '3.00rem'}"></div>
					<div class="queshao" style="padding: 0 .20rem;">直属培养{{growList.highSupervisorRequireCount}}个总监</div>
				</div>
				<!--<div>
					<div id="highSupervisorNum" :style="{width: '1.87rem', height: '3.00rem'}"></div>
					<div class="queshao" style="padding: 0 .20rem;">直属培养{{growList.highSupervisorRequireCount}}个总监</div>
				</div>-->
			</div>
		</div>
		
		<!--<div class="botDetail" v-show="showMember">
			<div class="botTop">您当前</div>
			<div class="memberDetail">
				<div class="memBerD">
					<div class="top">￥{{storeAmount}}<span v-show="growList.storeAmount>=10000">万</span>元</div>
					<div class="cent">累计收益</div>
					<div class="bot" v-show="memBerIds">
						<p @click="getMoney">查看</p>
					</div>
				</div>
				<div class="memBerD">
					<div class="top">{{memList.fansCount}}人</div>
					<div class="cent" v-show="memList.levelCode!='starSupervisor'">粉圈人数</div>
					<div class="cent" v-show="memList.levelCode=='starSupervisor'">团队人数</div>
					<div class="bot" v-show="memBerIds">
						<p @click="getFans">查看</p>
					</div>
				</div>
				<div class="memBerD">
					<div class="top">{{memList.storeFansCount}}人</div>
					<div class="cent">已推荐店主</div>
					<div class="bot" v-show="memBerIds">
						<p @click="getInvited">去邀请</p>
					</div>
				</div>
			</div>
		</div>-->
	</div>
	
</template>

<script>
	var echarts = require('echarts')
	export default {
		
		data : function(){
			return{
				perBackImg:'/static/images/perBack.png',
				index01Img:'/static/images/icon-index.png',
				cartImg:'/static/images/icon-cart.png',
				findImg:'/static/images/icon-find.png',
				serviceImg:'/static/images/icon-service.png',
				myImg:'/static/images/icon-my02.png',
				rowrightImg:'/static/images/rowright.png',
				whiteBotImg:'/static/images/white01.png',
				whiteCentImg:'/static/images/white02.png',
				whiteTopImg:'/static/images/white03.png',
				pinkBotImg:'/static/images/pink01.png',
				pinkCentImg:'/static/images/pink02.png',
				pinkTopImg:'/static/images/pink03.png',
				supervisorBotImg:'/static/images/supervisor01.png',
				supervisorCentImg:'/static/images/supervisor02.png',
				supervisorTopImg:'/static/images/supervisor03.png',
				highSupervisorBotImg:'/static/images/highSupervisor01.png',
				highSupervisorCentImg:'/static/images/highSupervisor02.png',
				highSupervisorTopImg:'/static/images/highSupervisor03.png',
				
				starSupervisorBotImg:'/static/images/starSupervisor01.png',
				starSupervisorCentImg:'/static/images/starSupervisor02.png',
				starSupervisorTopImg:'/static/images/starSupervisor03.png',
				memList:[],
				growList:[],
				gifObj:[],
				storeAmount:'',
				time:'',
				cartNum:'',
				showMember:false,
				isAndroid:'',
				isiOS:'',
				memBerIds:false,
				supervisorPllusAmout:0,
				salePlusCount:'',
				
			}
		},
		components: {
		    
		},
		created: function() {
			
			if(this.$route.query.memberId=='undefined' || this.$route.query.memberId==undefined){
				this.$route.query.memberId='';
				this.memBerIds=true;
			}else{
				this.memBerIds=false;
			}
			
			this.$store.commit('documentTitle','我的成长');
			this.getMember();
			this.getGiftBag();
			this.showPhone();
		},
		mounted(){
			
			window.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			showPhone(){
				var u = navigator.userAgent;
				this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//				console.log('是否是Android：'+this.isAndroid);
//				console.log('是否是iOS：'+this.isiOS);
			},
			getGiftBag(){
					
				let data={
					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.newGiftbags,data,this.getGiftBagBack,this);
			},
			getGiftBagBack(data){
				this.gifObj=data.result;
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
				this.time=this.memList.validTime.split("至")[1];
				if(data.result.isGetStoreCommission){
					this.showMember=true;
				}else{
					this.showMember=false;
				}
				this.growData();
			},
			//获取我的成长
			growData(){
				let data={
					memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.growData,data,this.growDataBack,this);
			},
			growDataBack(data){
				this.growList=data.result
				
				if(this.growList.storeAmount>=10000){
					this.storeAmount=(this.growList.storeAmount/10000).toFixed(2)
				}else{
					this.storeAmount=this.growList.storeAmount;
				}
				if(this.growList.supervisorPllusAmout>=10000){
					this.supervisorPllusAmout=(this.growList.supervisorPllusAmout/10000).toFixed(2) + '万';
				}else{
					this.supervisorPllusAmout=this.growList.supervisorPllusAmout;
				}
				if(this.growList.salePlusCount>=10000){
					this.salePlusCount=(this.growList.salePlusCount/10000).toFixed(2) + '万';
				}else if(this.growList.salePlusCount<=0){
					this.salePlusCount=0;
				}else{
					this.salePlusCount=this.growList.salePlusCount;
				}
				
				if(this.memList.levelCode=='store'){
					this.drawLine();
				}
				if(this.memList.levelCode=='supervisor'){
					this.superVison();
					this.supervisorList();
					this.supervisorStore();
				}
				if(this.memList.levelCode=='highSupervisor'){
					this.highSupervisor();
					this.highSupervisorList();
					this.highSupervisorNum();
				}
				
				
			},
			getSuper(){
				
				if(tsApp.getClientBrowser()=='wx'){
					window.location.href=CUR_URLBACK+'supervisor/buysuper';
				}else{
					if(this.isAndroid){
						OLquan.growJump(4)
					}
					if(this.isiOS){
						window.location.href="https://www.baidu.com/ktdd";//邀请店主  3
					}
				}
				
				
			},
			getFans(){
				if(tsApp.getClientBrowser()=='wx'){
						window.location.href=USE_URL+'weixin/member/fans';
				}else{
					if(this.isAndroid){
						OLquan.growJump(2)
					}
					if(this.isiOS){
						window.location.href="https://www.baidu.com/fqlb";//粉圈  2
					}
				}
				
			},
			getInvited(){
				if(tsApp.getClientBrowser()=='wx'){
					window.location.href=CUR_URLBACK+'supervisor/buyPink';
				}else{
					if(this.isAndroid){
						OLquan.growJump(3)
					}
					if(this.isiOS){
						window.location.href="https://www.baidu.com/yqfl";//邀请店主  3
					}
				}
				
			},
			getMoney(){
				if(this.memList.levelCode=='store'){
					if(tsApp.getClientBrowser()=='wx'){
						window.location.href=USE_URL+'weixin/member/amountRecord?type=1';
					}else{
						if(this.isAndroid){
							OLquan.growJump(1)
						}
						if(this.isiOS){
							window.location.href="https://www.baidu.com/zhye";//店主收益  1
						}
					}
					
				}else{
					window.location.href=USE_URL+'weixin/member/supervisorAmountRecord';
				}
			},
			//督导
			superVison(){
				let labelTopValue=this.growList.supervisorCount;
				let labelBottomValue=this.growList.supervisorPlusCount;
				if(this.growList.supervisorPlusCount<=0){
					this.growList.supervisorPlusCount=0;
					labelBottomValue=0;
					labelTopValue=1;
				}
				let labelTop = {
				    normal : {
				    	color: '#5A95DC',
				        label : {
				            show : true,
				           
				            position : 'center',
				            formatter : '{b}',
				            textStyle: {
				                baseline : 'bottom'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    }
				};
				let labelFromatter = {
				    normal : {
				        label : {
				        	show:false,
				            formatter : function (params){
				                return 100 - params.value + '%'
				            },
				            textStyle: {
				                baseline : 'top'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    },
				}
				let labelBottom = {
				    normal : {
				        color: '#E3E3E3',
				        label : {
				            show : true,
				            position : 'center'
				        },
				        labelLine : {
				            show : false
				        }
				    },
				    
				    emphasis: {
				        color: '#f7f7f7'
				    }
				};
				let radius = [48, 55];
				
   
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = echarts.init(document.getElementById('supervisor'))
		        // 绘制图表
				myChart.setOption({
					title : {
				        text: '还差'+this.growList.supervisorPlusCount+'人',
				        subtext: '',
				        top:'center',
				        left:'center',
				        textStyle:{
				          color:'#333',
				          fontSize:12,
				          align:'center'
				        },
				        
				    },
				    series : [
				    	{
				            type : 'pie',
				            center : ['50%', '50%'],
				            radius : radius,
				            x: '20%', // for funnel
				            itemStyle:labelFromatter,
				            clockWise:false,
				            data : [
				                {name:'other', value:labelBottomValue, itemStyle : labelBottom},
				                {name:'GoogleMaps', value:labelTopValue,itemStyle : labelTop}
				            ]
				        },
				    ]
				});
		    
			},
			//督导
			supervisorList(){
				let labelTopValue=this.growList.saleAmount;
				let labelBottomValue=this.growList.saleRequireAmount;
				//console.log(this.growList.saleAmount)
				if(this.growList.salePlusCount<=0){
					this.growList.salePlusCount=0;
					labelBottomValue=0;
					labelTopValue=1;
				}
				let labelTop = {
				    normal : {
				    	color: '#F6B800',
			                
				        label : {
				            show : true,
				           
				            position : 'center',
				            formatter : '{b}',
				            textStyle: {
				                baseline : 'bottom'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    }
				};
				let labelFromatter = {
				    normal : {
				        label : {
				        	show:false,
				            formatter : function (params){
				                return 100 - params.value + '%'
				            },
				            textStyle: {
				                baseline : 'top'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    },
				}
				let labelBottom = {
				    normal : {
				        color: '#E3E3E3',
				        label : {
				            show : true,
				            position : 'center'
				        },
				        labelLine : {
				            show : false
				        }
				    },
				    
				    emphasis: {
				        color: '#f7f7f7'
				    }
				};
				let radius = [48, 55];
				
   
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = echarts.init(document.getElementById('supervisorList'))
		        // 绘制图表
				myChart.setOption({
					title : {
				        text: '还差'+this.salePlusCount+'元',
				        subtext: '',
				        top:'center',
				        left:'center',
				        textStyle:{
				          color:'#333',
				          fontSize:12,
				          align:'center'
				        },
				        
				    },
				    series : [
				    	{
				            type : 'pie',
				            center : ['50%', '50%'],
				            radius : radius,
				            x: '20%', // for funnel
				            itemStyle:labelFromatter,
				            clockWise:false,
				            data : [
				                {name:'other', value:labelBottomValue, itemStyle : labelBottom},
				                {name:'GoogleMaps', value:labelTopValue,itemStyle : labelTop}
				            ]
				        },
				    ]
				});
		    
			},
			//团队店主
			supervisorStore(){
				let labelTopValue=this.growList.storeCount;
				let labelBottomValue=this.growList.storeRequireCount;
				//console.log(this.growList.saleAmount)
				if(this.growList.salePlusCount<=0){
					this.growList.salePlusCount=0;
					labelBottomValue=0;
					labelTopValue=1;
				}
				let labelTop = {
				    normal : {
				    	color: '#F6B800',
			                
				        label : {
				            show : true,
				           
				            position : 'center',
				            formatter : '{b}',
				            textStyle: {
				                baseline : 'bottom'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    }
				};
				let labelFromatter = {
				    normal : {
				        label : {
				        	show:false,
				            formatter : function (params){
				                return 100 - params.value + '%'
				            },
				            textStyle: {
				                baseline : 'top'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    },
				}
				let labelBottom = {
				    normal : {
				        color: '#E3E3E3',
				        label : {
				            show : true,
				            position : 'center'
				        },
				        labelLine : {
				            show : false
				        }
				    },
				    
				    emphasis: {
				        color: '#f7f7f7'
				    }
				};
				let radius = [48, 55];
				
   
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = echarts.init(document.getElementById('supervisorStore'))
		        // 绘制图表
				myChart.setOption({
					title : {
				        text: '还差'+this.growList.storePlusCount+'个',
				        subtext: '',
				        top:'center',
				        left:'center',
				        textStyle:{
				          color:'#333',
				          fontSize:12,
				          align:'center'
				        },
				        
				    },
				    series : [
				    	{
				            type : 'pie',
				            center : ['50%', '50%'],
				            radius : radius,
				            x: '20%', // for funnel
				            itemStyle:labelFromatter,
				            clockWise:false,
				            data : [
				                {name:'other', value:labelBottomValue, itemStyle : labelBottom},
				                {name:'GoogleMaps', value:labelTopValue,itemStyle : labelTop}
				            ]
				        },
				    ]
				});
		    
			
				
			},
			//店主收益
			drawLine(){
				let labelTopValue=this.growList.saleAmount;
				let labelBottomValue=this.growList.saleRequireAmount;
				//console.log(this.growList.saleAmount)
				if(this.growList.salePlusCount<=0){
					this.growList.salePlusCount=0;
					labelBottomValue=0;
					labelTopValue=1;
				}
				
				
				let labelTop = {
				    normal : {
				    	color: '#5D92DC',
				        label : {
				            show : true,
				           
				            position : 'center',
				            formatter : '{b}',
				            textStyle: {
				                baseline : 'bottom'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    }
				};
				let labelFromatter = {
				    normal : {
				        label : {
				        	show:false,
				            formatter : function (params){
				                return 100 - params.value + '%'
				            },
				            textStyle: {
				                baseline : 'top'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    },
				}
				let labelBottom = {
				    normal : {
				        color: '#E3E3E3',
				        label : {
				            show : true,
				            position : 'center'
				        },
				        labelLine : {
				            show : false
				        }
				    },
				    
				    emphasis: {
				        color: '#f7f7f7'
				    }
				};
				let radius = [48, 55];
				
   
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = echarts.init(document.getElementById('myChart'))
		        // 绘制图表
				myChart.setOption({
					title : {
				        text: '还差'+this.storePlusCount+'元',
				        subtext: '',
				        top:'center',
				        left:'center',
				        textStyle:{
				          color:'#333',
				          fontSize:12,
				          align:'center'
				        },
				        
				    },
				    series : [
				    	{
				            type : 'pie',
				            center : ['50%', '50%'],
				            radius : radius,
				            x: '20%', // for funnel
				            itemStyle:labelFromatter,
				            clockWise:false,
				            data : [
				                {name:'other', value:labelBottomValue, itemStyle : labelBottom},
				                {name:'GoogleMaps', value:labelTopValue,itemStyle : labelTop}
				            ]
				        },
				    ]
				});
		   },
		    highSupervisor(){
		   	
				let labelTopValue=this.growList.storeCount;
				let labelBottomValue=this.growList.storeRequireCount;
				//console.log(this.growList.saleAmount)
				if(this.growList.storePlusCount<=0){
					this.growList.storePlusCount=0;
					labelBottomValue=0;
					labelTopValue=1;
				}
				
				
				let labelTop = {
				    normal : {
				    	color: '#5A95DC',
				        label : {
				            show : true,
				           
				            position : 'center',
				            formatter : '{b}',
				            textStyle: {
				                baseline : 'bottom'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    }
				};
				let labelFromatter = {
				    normal : {
				        label : {
				        	show:false,
				            formatter : function (params){
				                return 100 - params.value + '%'
				            },
				            textStyle: {
				                baseline : 'top'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    },
				}
				let labelBottom = {
				    normal : {
				        color: '#E3E3E3',
				        label : {
				            show : true,
				            position : 'center'
				        },
				        labelLine : {
				            show : false
				        }
				    },
				    
				    emphasis: {
				        color: '#f7f7f7'
				    }
				};
				let radius = [30, 33];
				
   
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = echarts.init(document.getElementById('highSupervisor'))
		        // 绘制图表
				myChart.setOption({
					title : {
				        text: '还差'+this.growList.storePlusCount+'人',
				        subtext: '',
				        top:'center',
				        left:'center',
				        textStyle:{
				          color:'#333',
				          fontSize:12,
				          align:'center'
				        },
				        
				    },
				    series : [
				    	{
				            type : 'pie',
				            center : ['50%', '50%'],
				            radius : radius,
				            x: '20%', // for funnel
				            itemStyle:labelFromatter,
				            clockWise:false,
				            data : [
				                {name:'other', value:labelBottomValue, itemStyle : labelBottom},
				                {name:'GoogleMaps', value:labelTopValue,itemStyle : labelTop}
				            ]
				        },
				    ]
				});
		   
		   },
		   highSupervisorList(){
		   		
		   	
				let labelTopValue=this.growList.supervisorAmount;
				let labelBottomValue=this.growList.supervisorRequireAmount;
				//console.log(this.growList.saleAmount)
				if(this.growList.supervisorPllusAmout<=0){
					this.growList.supervisorPllusAmout=0;
					labelBottomValue=0;
					labelTopValue=1;
				}
				
				
				let labelTop = {
				    normal : {
				    	color: '#F6B800',
				        label : {
				            show : true,
				           
				            position : 'center',
				            formatter : '{b}',
				            textStyle: {
				                baseline : 'bottom'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    }
				};
				let labelFromatter = {
				    normal : {
				        label : {
				        	show:false,
				            formatter : function (params){
				                return 100 - params.value + '%'
				            },
				            textStyle: {
				                baseline : 'top'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    },
				}
				let labelBottom = {
				    normal : {
				        color: '#E3E3E3',
				        label : {
				            show : true,
				            position : 'center'
				        },
				        labelLine : {
				            show : false
				        }
				    },
				    
				    emphasis: {
				        color: '#f7f7f7'
				    }
				};
				let radius = [30, 33];
				
   
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = echarts.init(document.getElementById('highSupervisorList'))
		        // 绘制图表
				myChart.setOption({
					title : {
				        text: '还差'+this.supervisorPllusAmout+'元',
				        subtext: '',
				        top:'center',
				        left:'center',
				        textStyle:{
				          color:'#333',
				          fontSize:12,
				          align:'center'
				        },
				        
				    },
				    series : [
				    	{
				            type : 'pie',
				            center : ['50%', '50%'],
				            radius : radius,
				            x: '20%', // for funnel
				            itemStyle:labelFromatter,
				            clockWise:false,
				            data : [
				                {name:'other', value:labelBottomValue, itemStyle : labelBottom},
				                {name:'GoogleMaps', value:labelTopValue,itemStyle : labelTop}
				            ]
				        },
				    ]
				});
		   
		   
		   },
		   highSupervisorNum(){
		   		let labelTopValue=this.growList.highSupervisorCount;
				let labelBottomValue=this.growList.highSupervisorRequireCount;
				//console.log(this.growList.saleAmount)
				if(this.growList.highSupervisorPlusCount<=0){
					this.growList.highSupervisorPlusCount=0;
					labelBottomValue=0;
					labelTopValue=1;
				}
//				console.log(labelTopValue);
//				console.log(labelBottomValue)
				
				let labelTop = {
				    normal : {
				    	color: '#E50F72',
				        label : {
				            show : true,
				           
				            position : 'center',
				            formatter : '{b}',
				            textStyle: {
				                baseline : 'bottom'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    }
				};
				let labelFromatter = {
				    normal : {
				        label : {
				        	show:false,
				            formatter : function (params){
				                return 100 - params.value + '%'
				            },
				            textStyle: {
				                baseline : 'top'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    },
				}
				let labelBottom = {
				    normal : {
				        color: '#E3E3E3',
				        label : {
				            show : true,
				            position : 'center'
				        },
				        labelLine : {
				            show : false
				        }
				    },
				    
				    emphasis: {
				        color: '#f7f7f7'
				    }
				};
				let radius = [30, 33];
				
   
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = echarts.init(document.getElementById('highSupervisorNum'))
		        // 绘制图表
				myChart.setOption({
					title : {
				        text: '还差'+this.growList.highSupervisorPlusCount+'人',
				        subtext: '',
				        top:'center',
				        left:'center',
				        textStyle:{
				          color:'#333',
				          fontSize:12,
				          align:'center'
				        },
				        
				    },
				    series : [
				    	{
				            type : 'pie',
				            center : ['50%', '50%'],
				            radius : radius,
				            x: '20%', // for funnel
				            itemStyle:labelFromatter,
				            clockWise:false,
				            data : [
				                {name:'other', value:labelBottomValue, itemStyle : labelBottom},
				                {name:'GoogleMaps', value:labelTopValue,itemStyle : labelTop}
				            ]
				        },
				    ]
				});
		   
		   
		   
		   },
			
		},
		destroyed () {
		  window.removeEventListener('scroll', this.handleScroll)
		},
	}
</script>

<style lang="scss" scoped>
	.personal{
		width: 7.50rem;
		margin: 0 auto;
		img{
			pointer-events:none;
		}
		background: #F6F6F6;
		.speOutDiv{
			display: flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
			display: -moz-flex;
			justify-content: center;
			-moz-box-pack: center;
	    	-webkit--moz-box-pack: center;
		}
		.perTop{
			background: url(../../../static/images/myGrow.png) no-repeat;
			background-size: 100% 6.20rem ;
			height: 6.20rem;
			width: 100%;
			position: relative;
			.personalImg{
				position: absolute;
				width: 1.40rem;
				height: 1.40rem;
				left: .30rem;
				
				top:.80rem;
				
				img{
					display: block;
					width: 1.28rem;
					background: #fff;
					height: 1.28rem;
					border-radius: 50%;
					border: .06rem solid #FA499B;
				}
			}
			.personalName{
				font-size: .30rem;
				color: #fff;
				position: absolute;
				left: 1.98rem;
				top: .98rem;
			}
			.personalLevel{
				padding: .06rem .16rem;
				font-size: .20rem;
				color: rgba(225,225,225,.8);
				border: 0.01rem solid rgba(225,225,225,.8);
				max-width: 1.10rem;
				text-align: center;
				position: absolute;
				left: 1.98rem;
				top: 1.38rem;
				border-radius: .16rem;
			}
			.personalTime{
				position: absolute;
				left: 1.98rem;
				top: 1.82rem;
				font-size: .22rem;
				color: #fff;
			}
			.levelName{
				color: rgba(225,225,225,.5);
				font-size: .24rem;
			}
			.levelSpecial{
				color: #fff;
			}
			.white{
				position: absolute;
				width: .90rem;
				height: .90rem;
				left: .74rem;
				top: 4.02rem;
				.father{
					position: relative;
					img{
						position: absolute;
						left: 0;
						top: 0;
						display: block;
						width: .60rem;
						height: .78rem;
					}
				}
				
			}
			.whiteImg{
				position: absolute;
				left: .70rem;
				top: 3.80rem;
				font-size: 0;
				img{
					display: block;
					width: .33rem;
					height: .15rem;
				}
				.special{
					width: .90rem;
					height: .90rem;
					display: block;
					margin-top: .04rem;
					border-radius: 50%;
				}
			}
			
		}
		.getSuper{
			display: flex;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
		    display: -moz-flex;
			-webkit-justify-content:space-between;
			justify-content:space-between;
			-moz-box-pack:space-between;
			-webkit--moz-box-pack:space-between;
			padding: .40rem .30rem 0;
			font-size: .24rem;
			color: #aaaaaa;
			.getHighter{
				display: flex;
				color: #777777;
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
				img{
					display: block;
					width: .10rem;
					height: .19rem;
					margin-left: .14rem;
				}
			}
			
		}
		.getSuperversion{
			background: #fff;
			
			
			#myChart{
				background: #fff;
			}
			.howGetSuper{
				font-size: .24rem;
				padding-bottom: .50rem;
				color: #333333;
				text-align: center;
				margin-top: -.25rem;
			}
			.takeCare{
				background: #F7F7F7;
				padding: .22rem 1.75em .22rem .30rem;
				font-size: .24rem;
				line-height: .28rem;
				color: #AAAAAA;
			}
		}
		.getHighSuper{
			font-size: .24rem;
			color: #333;
			text-align: center;
			margin-bottom: .20rem;
			padding-bottom: .50rem;
			.queshao{
				margin-top: -.25rem;
			}
		}
	    #supervisor{
	    	background: #fff;
	    }
	    #supervisorList{
	    	background: #fff;
	    }
	    .botDetail{
	    	background: #fff;
	    	padding-top: .40rem ;
	    	padding-bottom: .50rem;
	    	.botTop{
	    		padding-left: .28rem;
	    		font-size: .24rem;
	    		padding-bottom: .50rem;
	    		color: #AAAAAA;
	    	}
	    	.memberDetail{
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
	    		.memBerD{
	    			width:33.3%;
	    			
				    
	    			.top{
	    				text-align: center;
	    				color: #333333;
	    				font-size: .36rem;
	    				
	    			}
	    			.cent{
	    				text-align: center;
	    				color: #777777;
	    				font-size: .24rem;
	    				margin: .12rem 0;
	    				
	    			}
	    			.bot{
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
	    				p{
	    					width: 1.10rem;
		    				height: .44rem;
		    				line-height: .44rem;
		    				text-align: center;
		    				color: #fff;
		    				background: #FA499B;
		    				border-radius: .44rem;
		    				font-size: .26rem;
	    				}
	    				
	    			}
	    		}
	    	}
	    }
	}

</style>