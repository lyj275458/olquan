<template>
	<div>
		 <swiper :options="swiperOption"  ref="mySwiper">
		 	
		    <swiper-slide v-for="(slide,index) in swiperSlides">
		    	<a :href="slide.url">
		    		<img :src="slide.img" />
		    	</a>
		    </swiper-slide>
		    <div class="swiper-pagination" slot="pagination"></div>
		  </swiper>
		 <div class="father">
		 	<div class="sonTop">
		 		
		 	</div>
		 	<div class="sonTop"></div>
		 	<div class="sonTop"></div>
		 	<div class="sonTop"></div>
		 	<div class="sonTop"></div>
		 	<div class="sonTop"></div>
		 	<div class="sonTop"></div>
		 	<div class="sonTop"></div>
		 	<div class="sonTop"></div>
		 </div>
		 
		 	<input placeholder="设置生日" ref="setInput" id="date" @blur="lostInput" v-on:focus="getInput" v-model="birthDay" :max="time" type="date" name="birthday" style="width: 4rem;height: 1rem;line-height: 1rem; font-size: .28rem; border: 0;outline: 0; -webkit-appearance: none; display: block;"/>
		 
		 <div @click="isShow" style="margin-top: 1rem;">点击出现</div>
		 <div class="bei" v-show="showbotton">
		 	<div>
		 		<div style="background: #fff;margin-bottom: .20rem;" >设置身份证</div>
			 	<input type="datetime" style="border: 0;outline: 0; -webkit-appearance: none; display: block;"/>
				<div style="background: #fff;margin-top: .20rem;" @click="colseShow">取消</div>
		 	</div>
		 </div>
		 <div v-for="item in curObj" style="margin-bottom: .20rem;">
		 	<img style="display: block;height: 3.34rem;width: 7.50rem;" :src='item.productImage' />
		 </div>
	</div>
	
</template>
<script>
	import md5 from 'js-md5';
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
			colseImg:'/static/images/colse.png',
			rowImg:'/static/images/row.png',
			oneImg:'/static/images/one.png',
			twoImg:'/static/images/two.png',
			threeImg:'/static/images/three.png',
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
      swiperSlide
    },
	created: function() {
//		this.getListFast();
//		this.getMember();
//		this.getNowFormatDate();
//		
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
		getNowFormatDate() {
		    let date = new Date();
		    let seperator1 = "-";
		    let seperator2 = ":";
		    let month = date.getMonth() + 1;
		    let strDate = date.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		            + " " + date.getHours() + seperator2 + date.getMinutes()
		            + seperator2 + date.getSeconds();
		    
		    this.time=currentdate.split(" ")[0];
		    console.log(this.time)
		},
		isShow(){
			this.showbotton=true;
		},
		colseShow(){
			this.showbotton=false;
		},
		getIndex(index){
			console.log(index)
		},
		getListFast(){
			
			let data={
				memberId:this.getCookie("memberId"),
				
			}
			this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.recommendProduct,data,this.getListBack);
//				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.togetherJoinRecordList,data,this.getListBack,this);
		},
		getListBack(data){
			if(data.result){
				this.curObj=data.result;
				
			}else{
				this.curObj=[]
			}
			console.log(this.curObj)
			
			
		},
		//获取会员信息
			getMember(){
				let data={
					memberId:this.getCookie("memberId"),
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				console.log(data)
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