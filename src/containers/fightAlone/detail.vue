<template>
  <div>
    <swiper loop auto :list="urlList" height='3.20rem' dots-position='center'></swiper>
    <div class="cent">
			<ul class="init">
				<li v-for='item in curObj' @click="goBuy(item.productId)">
					<img :src=item.image />
					<p class="top">{{item.title}}</p>
					<p class="bot">
						<span class="left"><b>￥{{item.salePrice}}</b><br />
							<i>￥{{item.marketPrice}}</i>
						</span>
						<span class="right" >去购买</span>
					</p>
				</li>
				<li v-show="showTrue" class="special">没有更多了</li>
			</ul>
		</div>

    
    
  </div>
</template>

<script>
import { Swiper} from 'vux'
var time;




export default {
	name:'b',
	data : function(){
			return{
				imgObj:{},
				urlList:[],
				curObj:{},
				
				pageObj:{
					page:1,
				},
				isMore:true,
				showTrue:false,
				activity:0,
			}
		},
  components: {
    Swiper,
    
  },
  mounted(){
			window.addEventListener('scroll', this.handleScroll);
		},
  ready () {
  },
  created: function() {
			this.$store.commit('documentTitle','活动商品');
			this.getList();
			this.getImg({});
			
			console.log(this.getCookie("memberId"))
	
		},
  methods: {
  	handleScroll () {
  			  var height=document.body.scrollHeight;
  				console.log(height)
			  this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(this.scrollTop)
			  var windowH=window.innerHeight;
			  if(this.scrollTop + windowH >=height-200){
			  	console.log(21)
			  	if(this.isMore){
	 				this.isMore=false;
	 				let data={
	  					page:this.pageObj.page+1,
	  					rows:20,
	  					activityId:this.$route.query.activityId
	  				};
	  				this.pageObj.page=this.pageObj.page+1
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.activityProductList,data,this.getListMoreBack);
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
				console.log(this.curObj)
			
			},
  	getList(){
    	let data={
    		activityId:this.$route.query.activityId
    	}
			this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.activityProductList,data,this.getListBack);
		},
		getListBack(data){
			console.log("data")
			this.curObj=data.result;
				console.log(this.curObj)
//				console.log(this.curObj.productId)
//				console.log(2)
		},
  	curUrlParam(name,url) {
  		console.log(123)
  		console.log(url)
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");		   
		    var r = url.match(reg);
		   
		    if (r != null) return unescape(r[2]);
		    return null;
		},
  	loadMore() {
			if (this.loading) {
			    return false
			  }
			  this.loading = true;
			  //console.log(this.$refs.detal.scrollTop)
			  
				 time = setTimeout(() => {
					let data={
						page:this.pageObj.page+1,
					}
					this.pageObj.page=this.pageObj.page+1;
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTogetherList,data,this.moreFun);
				}, 500);
				
//				  if(this.curObj.length > 10){
//				  	
//				  }
			},
			moreFun(data){
				console.log(data.result);
				for(let i=0;i<data.result.length;i++){
					this.curObj.push(data.result[i]);
				}
				console.log(this.curObj)
				if(data.result.length<20){
					clearTimeout(time);
					this.showTrue=true;
				}
			},
    onSwiperItemIndexChange (index) {
      console.log('demo item change', index)
    },
    
   	getImg(){
   		let data={
   			id:this.$route.query.activityId
   		}
				
			this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.activityImg,data,this.getImgBack);
		},
		getImgBack(data){
			this.imgObj=data.result.images;
			this.urlList = this.imgObj.map((one, index) => ({
			  url: 'javascript:',
			  img: one
			}))
			
			console.log('data')
			console.log(this.imgObj)
			
		},
		goBuy(id){
			console.log(id)
				//window.location.href='http://ol-site.olquan.com/weixin/product/newProductDetail?productId=7755&memberId=949574'
			window.location.href=USE_URL+'weixin/product/newProductDetail?productId='+id+'&memberId='+this.$route.query.memberId
		},
		goUrl(){
			this.$nextTick(() => {
         	console.log(123)
  	 	});
		}
    
  },
  destroyed () {
	  window.removeEventListener('scroll', this.handleScroll)
	},
  
}
</script>

<style lang="scss" scoped>
li{
	font-size: .24rem;
	img{
		display: block;
		width: 100%;
	}
}
.copyright {
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}
.cent{
		
		padding: .20rem .12rem;
		background: #f2f2f2;
		ul{
			width:100%;
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
			box-pack:space-between;
			flex-wrap:wrap;
			-webkit-flex-wrap:wrap;
		  -webkit-box-lines:multiple;
		  -moz-flex-wrap:wrap;
			.special{
				width: 100%;
				height: .56rem;
				background: none;
				color: #9C9C9C;
				line-height: .56rem;
				text-align: center;
				font-size:.28rem ;
			}
			li{
				width: 3.60rem;
				height: 5.20rem;
				background: #fff;
				margin-bottom:.10rem;
				position: relative;
				img{
					display: block;
					width: 100%;
					height: 3.59rem;
				}
				.top{
					font-weight: normal;
					font-size: .24rem;
					color: #333;
					line-height: .30rem;
					padding: .08rem;
				}
				.bot{
					position: absolute;
					left: .08rem;
					bottom:.12rem ;
					width: 100%;
					overflow: hidden;
					.left{
						font-weight: normal;
						font-size: .28rem;
						float: left;
						color: #e20630;
						b{
							
							
						}
						i{
							font-size: .20rem;
							color: #b2b2b2;
							font-style: normal;
							text-decoration:line-through;
						}
					}
					.right{
						font-size: .20rem;
						color: #ff3893;
						float: right;
						text-align: center;
						width: 1.18rem;
						height: .48rem;
						font-size: .26rem;
						line-height: .50rem;
						border: .01rem solid #ff3893;
						border-radius: .05rem;
						position: absolute;
						right: .24rem;
						bottom: 0.02rem;
						
					}
				}
			}
		}
	}
</style>