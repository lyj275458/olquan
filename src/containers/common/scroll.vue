<template>
	<div>
		<div style="display: none;">
		    <canvas width="800" height="1200" id="canvas" style="background: #fff;width: 7.50rem;">
		    	
		    </canvas>
		</div>
		<div style="width: 7.50rem;">
		    <img id="img" style="background: #fff;width:100%;display: block;" src="#" alt="">
		    
		</div>
		<div v-show="isClock" @click="getIndex"> 点我</div>
	</div>
	
</template>
<script>
	import md5 from 'js-md5';
	import $ from 'jquery';
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default{
	data : function() {
		return {
			time:29357029,
			day:'',
			hour:'',
			mint:'',
			secon:'',
			EndTime:0,
			birthDay:'',
			showbotton:false,
			isClock:true,
			colseImg:'/static/images/colse.png',
			rowImg:'/static/images/row.png',
			goodsImg:'/static/images/weixingoodnew.png',
			specialImg:'/static/images/weixingoodnew.png',
			erweiImg:'/static/images/qr_cord.jpg',
			oneImg:'/static/images/one.png',
			twoImg:'/static/images/two.png',
			threeImg:'/static/images/three.png',
			logoImg:'/static/images/goodsImg.png',
			lbt: [  
		        {  
		          'imgs': '/static/images/one.png'  
		        }, {  
		          'imgs': '/static/images/two.png'  
		        }, {  
		          'imgs': '/static/images/three.png'  
		        }  
		      ],
		    swiperOption: {
	          autoplay: 3500,
	          setWrapperSize :true,
	          loop:true,
	          pagination : '.swiper-pagination',
	          paginationClickable :true,
	          mousewheelControl : true,
	          observeParents:true,
	          preventClicks:false,
	        },
	        swiperSlides: [
		        {
		        	'img':'/static/images/one.png',
		        	'url':'http//www.baidu.com'
		        },{
		        	'img':'/static/images/two.png',
		        	'url':'http//www.163.com'
		        },{
		        	'img':'/static/images/three.png',
		        	'url':'http//www.17173.com'
		        },
	        ],
	        curObj:[],
	        birth:'设置生日',
	        time:'',
			
		};
	},
	 
	components: {
      swiper,
      swiperSlide,
      $
    },
	created: function() {
//		this.getListFast();
//		this.getMember();
//		this.getNowFormatDate();
		
//		this.getListFast()
	},
	
	computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // you can use current swiper instance object to do something(swiper methods)
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log( )
      
    },
	methods:{
		getIndex(){
			this.isClock=false;
			this.draw();
		},
		draw(){
			
		    var canvas = document.getElementById('canvas');
		    
		   
		    var ctx = canvas.getContext("2d");
			var imgLogo = new Image();
		    imgLogo.src= this.logoImg;
		    var imgGoods = new Image();
		    imgGoods.src = this.specialImg;
		    var img1 = new Image();
		    img1.src = this.erweiImg;
		   
		   	imgGoods.onload=function(){
		   		ctx.fillStyle = "#fff";
		   		ctx.fillRect(0,0,800,1220);
				ctx.save();
		        var R=50;
			    var d =2 * R;
			    var cx =30 + R;
			    var cy =50  + R;
			    ctx.beginPath();
			    ctx.arc(cx, cy,R, 0, 2 * Math.PI);
			    ctx.clip();
			    ctx.drawImage(imgLogo, 30, 50,d,d);
			    ctx.restore();
		        ctx.drawImage(imgGoods,0,202,800,750)
		        ctx.drawImage(img1,590,981,180,180)//设置图片比例和位置,匹配手机屏幕
		        

		        
//		        ctx.drawImage(imgLogo,30,40,80,65)//设置图片比例和位置,匹配手机屏幕
				var str ='日本狮王Lion米奇儿童宝宝防蛀固齿可吞食牙膏60g桃子味 3支装 610'
		        //绘制简单的文字
		        ctx.fillStyle = "#333"; // black color
		        ctx.font="30px PingFangSC-Regular";
		        ctx.lineWidth=1; 
		        
		        var lineWidth = 0;
		        var canvasWidth = 500;//计算canvas的宽度
				var initHeight=1011;//绘制字体距离canvas顶部初始的高度
				var lastSubStrIndex= 0; //每次开始截取的字符串的索引
				for(let i=0;i<str.length;i++){ 
				    lineWidth+=ctx.measureText(str[i]).width; 
				    if(lineWidth>canvasWidth){  
				        ctx.fillText(str.substring(lastSubStrIndex,i),30,initHeight,600);//绘制截取部分
				        initHeight+=36;//20为字体的高度
				        lineWidth=0;
				        lastSubStrIndex=i;
				       
				    } 
				    if(i==str.length-1){//绘制剩余部分
				        ctx.fillText(str.substring(lastSubStrIndex,i+1),30,initHeight,600);
				        
				    }
				}
				ctx.fillStyle = "#E50F72";
				ctx.fillText('￥49.00',30,initHeight+45);
				ctx.fillStyle = "#777";
				ctx.font="24px PingFangSC-Regular";
				ctx.fillText('长按识别二维码查看详情',30,initHeight+85);
				ctx.font="28px PingFangSC-Regular";
				ctx.fillText('小猪佩奇',150,84);
				ctx.fillStyle = "#333333";
				ctx.font="28px PingFangSC-Regular";
				ctx.fillText('发现好物，与您分享！',150,132);
		        //生成的data的路径,可以通过php生成图片存到数据库,单存data路径不合适,高清图片情况下会出现图片的残缺
		        var srccc = canvas.toDataURL("image/png");
		        $("#img").attr("src",srccc);
		    }
		},
		
			
	},
	
}
</script>
<style lang="scss" scoped>
@import url("../../css/swiper.min.css"); 
input[type="date"]:before{
    content: attr(placeholder);
    color:#ddd;
}
.gallery-top{    
    height:1.00rem;    
    width:100%;  
}    
.gallery-thumbs{    
    height:20%;    
    box-sizing:border-box;    
    padding:10px 0;    
    background: rgba(0, 0, 0, 0.4);  
    cursor: pointer;  
}    
.gallery-thumbs .swiper-slide{    
    width:30%;    
    height:1.0rem;    
    opacity:0.3;    
}    
.gallery-thumbs .swiper-slide-active{    
    opacity:1;   
}   
.swiper-slide{  
  background-size: 100% 160%;  
  -webkit-background-size: 100% 160%;  
}
.father{
	display: flex;
	flex-wrap:wrap ;
	width: 100%;
	.sonTop{
		width: 25%;
		height: 2.00rem;
		background: #E5006E;
	}
}
.bei{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	z-index: 99999;
	background: rgba(0,0,0,.5);
	display: flex;
	display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: -moz-flex;
    margin: 0 auto;
    -webkit-justify-content:center;
	justify-content:center;
	-moz-box-pack:center;
	-webkit--moz-box-pack:center;
	box-pack:center;
	-webkit-box-pack: center;
    -moz-box-pack: center;
    -ms-flex-align:center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
}
</style>