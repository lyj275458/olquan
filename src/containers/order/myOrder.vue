<template>
	<div>
		<div class="swiper-container gallery-top">
		    <div class="swiper-wrapper">
		      <div class="swiper-slide" style="background:#f49"></div>
		      <div class="swiper-slide" style="background:#f99"></div>
		      <div class="swiper-slide" style="background:red"></div>
		      <div class="swiper-slide" style="background:green"></div>
		      <div class="swiper-slide" style="background:yellow"></div>
		    </div>
		</div>
	  
	</div>
</template>

<script>
	import Swiperion from 'swiper';
	
	export default {
		data : function() {
			return{
				useImg:'/static/images/use.jpg',
				iconImg:'/static/images/pinicon.png',
				
				curObj:{},
				
			}
		},
		components: {
			Swiperion,
		},
		mounted(){
			var swiperion = new Swiper('.swiper-container', {
		      slidesPerView: 3,
		      freeMode: true,
		      pagination: {
		        el: '.swiper-pagination',
		        clickable: true,
		      },
		    });
		},
		methods:{
			
		}
		
	}
</script>

<style lang="scss" scoped>
@import "../../../static/swiper.min.css";
.swiper-container {
      width: 100%;
      height: 6.0rem;
      margin-left: auto;
      margin-right: auto;
    }
    .swiper-slide {
      background-size: cover;
      background-position: center;
    }
    .gallery-top {
      height: 2.4rem;
      width: 100%;
    }
    .gallery-thumbs {
      height:0.6rem;
      box-sizing: border-box;
      padding: 0.10rem 0;
    }
    .gallery-thumbs .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
    }
    .gallery-thumbs .swiper-slide-active {
      opacity: 1;
    }
</style>