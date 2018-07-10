<template>
	<div class="moreTry">
		<Linking></Linking>
		<div class="top">
			<div class="atuoPage">
				<ul class="list" v-bind:class="{ 'listSpecial': showFive==true}">
					<li class="listItem" @click="getMoreGood(itemS.id,index)" v-bind:class="{ 'special': itemS.id==cateId}" v-for="(itemS,index) in cateObj" v-show="itemS.categoryType==1">{{itemS.categoryName}}</li>
				</ul>
			</div>
			<div class="score">
				<p class="scoreL" v-bind:class="{ 'scoreS': order=='-1'}" @click="higPrice">积分从高到低
					<img :src="godownImg"  v-show="order=='1'"/>
					<img :src="xiaupImg" v-show="order=='-1'"/>
				</p>
				<p class="scoreR" v-bind:class="{ 'scoreS': order=='1'}" @click="lowPrice">积分从低到高
					<img :src="gofotopImg" v-show="order=='1'"/>
					<img :src="shangupImg" v-show="order=='-1'"/>
				</p>
			</div>
		</div>
		<div class="goods-name" v-for="item in curObj" @click='gototry(item.productId)'>
			<div class="food" >
				<div class="fodImg">
					<img :src="item.image"/>
					<img :src="soldImg"  class="isSold" v-show="item.percent=='100%'"/>
				</div>
				<div class="fodName">
					<p style="height: 1.16rem; overflow: hidden;">{{item.productName}}</p>
					<div class="gotry">
						<span style="font-size:.24rem ; color: #959595;"><b style="color: #ed0276;font-size: .36rem;">{{item.score}}</b>
							积分</span>
						<span class="spebot">去试用</span>
					</div>
					<div class="progress">
						<p class="use"></p>
						<p class="number">已试用{{item.percent}}</p>
						<div class="bei">
							<p v-bind:style="{width:item.percent}"></p>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	export default {
		data : function(){
			return{
				curObj:[],
				searchBarFixed:false,
				selectVlaue:'默认',
				downImg:'/static/images/download.png',
				godownImg:'/static/images/godown.png',
				gofotopImg:'/static/images/gofotop.png',
				shangupImg:'/static/images/shangup.png',
				xiaupImg:'/static/images/xiaup.png',
				soldImg:'/static/images/soldOut.png',
				showChoose:false,
				cateId:this.$route.params.id,
				order:'1',
				addIndex:0,
				scoreIndex:0,
				cateObj:[],
				pageObj:{
					page:1,
				},
				isMore:true,
				showFive:true,
			}
			
		},
		created: function() {
			this.$store.commit('documentTitle','更多积分试用');	
			this.getList();
			this.getCate();
		},
		components: {
		    $
		},
		mounted(){
			//this.addWeixinShare();//微信分享 	
			window.addEventListener('scroll', this.moreTrygoods);
		},
		methods:{
			//价格筛选
			lowPrice(){
				this.order= '1';
				this.isMore=true;
				this.getList();
			},
			higPrice(){
				this.order= '-1';
				this.isMore=true;
				this.getList();
			},
			getShow(){
				this.showChoose=!this.showChoose;
			},
			//获取试用分类
			getCate(){
				let data={
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.cateGories,data,this.getCateBack,this);
			},
			getCateBack(data){
				console.log(data)
				this.cateObj=data.result;
				if(data.result.length>5){
					this.showFive=false;
				}else{
					this.showFive=true;
				}
			},
			//点击分类
			getMoreGood(id,index){
				$('html,body').animate({scrollTop:0},0);
				this.cateId=id;
				this.addIndex=index;
				this.isMore=true;
				this.pageObj.page=1;
				this.getList();
			},
			//获取列表
			getList(){
				let data={
					page:1,
					rows:20,
					categoryId:this.cateId,
					orderby:this.order
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getScoreDataAll,data,this.getListBack);
			},
			getListBack(data){
				console.log(data)
				this.curObj=data.result;
				
			},
			//点击产品
			gototry(id){
				console.log(id)
				this.$router.push({path:'/try/trygoods/id/'+id});
				//window.location.href=CUR_URLBACK+'try/trygoods/id/'+id+'?memberId='+this.getCookie("memberId");
			},
			moreTrygoods(){
			  var height=document.body.scrollHeight;
				//console.log(height)
			  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			  
			  var windowH=window.innerHeight;
			   
				var windowH=window.innerHeight;
			  if(scrollTop + windowH >=height-200){
			  	
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	  					page:this.pageObj.page+1,
	  					rows:20,
	  					categoryId:this.cateId,
						orderby:this.order
	  				};
	  				this.pageObj.page=this.pageObj.page+1
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getScoreDataAll,data,this.getListMoreBack);
	 			}
			  }
			},
			getListMoreBack(data){
				if(data.result.length<20){
					this.isMore=false;
					this.showTrue=true;
				}else{
					this.isMore=true;
				}
				
				
				for(let i=0; i<data.result.length; i++){
					this.curObj.push(data.result[i])
				}
				for(let i=0;i<this.curObj.length;i++){
					if(Number(this.curObj[i].percent.replace("%",""))<5 && Number(this.curObj[i].percent.replace("%",""))>0){
						this.curObj[i].parent=5+'%'
					}else if(Number(this.curObj[i].percent.replace("%",""))==0){
						this.curObj[i].parent=0+'%'
					}else{
						this.curObj[i].parent=this.curObj[i].percent;
					}
				}
				//console.log(this.curObj)
			
			},
		},
		destroyed () {
		  window.removeEventListener('scroll', this.moreTrygoods)
		},
	}
</script>

<style lang="scss" scoped>
.moreTry{
	padding-top: 1.48rem;
	.top{
			padding: .12rem 0;
			background: #fff;
			border-bottom: 0.01rem solid #f2f2f2;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			z-index: 2222;
			.score{
				border-top: 0.01rem solid #f2f2f2;
				font-size: .24rem;
				padding-top: .10rem;
				color: #dddddd;
				width: 100%;
				overflow: hidden;
				.scoreS{
					color: #000;
				}
				img{
					display: inline-block;
					height: .20rem;
					width: .20rem;
				}
				.scoreL{
					float: left;
					width: 49.9%;
					text-align: center;
					line-height: .46rem;
					
				}
				.scoreR{
					float: left;
					width: 48.9%;
					text-align: center;
					line-height: .46rem;
					border-left: 0.01rem solid #e5e5e5;
				}
			}
			.atuoPage{
				overflow-x: scroll;
				padding-left:.24rem ;
				
				.select{
					font-size: .24rem;
					color: #666;
					float: left;
					width: 1.90rem;
					text-align: center;
					border: 0.01rem solid #f2f2f2;
					background: #fff;
					height: .62rem;
					line-height: .64rem;
					/*border-radius: .05rem 0 0 .05rem;*/
					margin-left: .24rem;
					
				}
				.selectImg{
					width: .50rem;
					height: .62rem;
					border: 0.01rem solid #f2f2f2;
					border-left: none;
					/*border-radius: 0 .05rem 0.05rem 0;*/
					position: relative;
					float: left;
					img{
						display: block;
						position: absolute;
						left: 50%;
						margin-left: -.08rem;
						width: .16rem;
						height: .10rem;
						top: 50%;
						margin-top: -0.05rem;
					}
				}
				.list{
					white-space:nowrap;
					width: 100%;
					height: .65rem;
					float: left;
					overflow-y: hidden;
					z-index: 333;
					overflow-x: auto;
					.listItem{
						font-size: .28rem;
						line-height: .64rem;
						color: #666;
						margin-right: .20rem;
						vertical-align: text-top;
						display: inline-block;
					}
					.special{
						color: #ed0477;
						font-weight: 600;
					}
				}
				.listSpecial{
					display: flex;
					display:-webkit-box;
					display: -moz-box;
					display: -ms-flexbox;
					display: -webkit-flex;
					display: -moz-flex;
					-webkit-justify-content:space-around ;
					justify-content:space-around ;
					-moz-box-pack:space-around ;
					-webkit--moz-box-pack:space-around ;
					box-pack:space-around;
				}
			}
			.choose{
				font-size: .24rem;
				position: absolute;
				line-height: .62rem;
				width: 2.41rem;
				text-align: center;
				background: #fff;
				border: 0.01rem solid #f2f2f2;
				z-index: 22;
				left: 0.24rem;
				top: 0.76rem;
				border-top: none;
			}
			
			
		}
		.isFixed{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			z-index: 2222;
		}
	.goods-name{
			overflow: hidden;
		.food{
			padding:  .20rem .24rem;
			overflow: hidden;
			background: #fff;
			margin-bottom: .10rem;
			border-bottom: .01rem solid #f2f2f2;
			float: left;
			/*display: flex;
			display:-webkit-box;
			display: -webkit-flex;
			display: -moz-box;
			display: -moz-flex;
			display: -ms-flexbox;
			-webkit-box-pack: center;
		    -moz-box-pack: center;
		    -ms-flex-align:center;
		    -webkit-align-items: center;
		    -moz-align-items: center;
		    align-items: center;*/
			.fodImg{
				position: relative;
				width: 40%;
				border-radius: .05rem;
				float: left;
				display: flex;
				display:-webkit-box;
				display: -webkit-flex;
				display: -moz-box;
				display: -moz-flex;
				display: -ms-flexbox;
				-webkit-box-pack: center;
			    -moz-box-pack: center;
			    -ms-flex-align:center;/* IE 10 */
			    -webkit-align-items: center;
			    -moz-align-items: center;
			    align-items: center;
			    .isSold{
			    	display: block;
			    	position: absolute;
			    	left: 50%;
			    	margin-left: -.90rem;
			    	top: 50%;
			    	margin-top: -.90rem;
			    	height: 1.80rem;
			    	width: 1.80rem;
			    }
				img{
					display: block;
					
					width: 100%;
				}
				
			}
			.fodName{
				float: left;
				width: 56.58%;
				margin-left: .24rem;
				font-size: .28rem;
				line-height: .38rem;
				word-wrap: break-word;
				.gotry{
					margin: .35rem 0 .25rem;
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
					.spebot{
						display: inline-block;
						width: 1.10rem;
						height: .50rem;
						color: #FFF;
						background: #ed0477;
						text-align: center;
						border-radius: .50rem;
						line-height: .50rem;
					}
					
				}
				.progress{
					width: 100%;
					height: .28rem;
					border-radius: .28rem;
					
					position: relative;
					.use{
						position: absolute;
						left: 0;
						top: 0;
						height: .32rem;
						width: 100%;
						border-radius: .34rem;
						border: 0.01rem solid #ed0477;
						line-height: .34rem;
						text-align: center;
						font-size: .24rem;
						color: #fff;
						background: #fd89b2;
						z-index: 333;
					}
					.number{
						width: 100%;
						height: 100%;
						text-align: center;
						position: absolute;
						left: 0;
						top: 0;
						z-index: 1111;
						color: #fff;
						font-size: .20rem;
						
					}
					.bei{
						position: absolute;
						width: 100%;
						height: .34rem;
						border-radius: .34rem;
						overflow: hidden;
						
						z-index: 444;
						p{
							height: .32rem;
							border: 0.01rem solid #ed0477;
							background: #ed0477;
						}
					}
				}
			}
		}
	}
}
</style>