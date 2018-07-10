<template>
  <div class="videoIndex" @touchmove.prevent >
			 	<video width="100%" 
					   height=""
					   controls
					   autoplay
					   preload="auto"
					   id="myMusic"
					   x-webkit-airplay="allow"
					   webkit-playsinline="true"  
					   x5-video-player-fullscreen="true"
  				   playsinline="true" 
  				   style="object-fit: fill;"
  				   x5-video-orientation="portraint"
	  				 >
					<source :src="videoUrl" type="video/mp4"></source>
					<source :src="videoUrl" type="video/ogg"></source>
					<source :src="videoUrl" type="video/webm"></source>
					
					
				</video>
			
		</div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['Url'],
    data : function() {
			return {
				videoUrl:this.Url,
				};
		},
		created: function() {
			var video =document.getElementById('myMusic')
			console.log(video)
			
		},
    methods: {
     
    }
  }
</script>

<style lang="scss" scoped>
		.videoIndex{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			min-height: 100%;
			z-index: 999;
			background: rgba(0,0,0,.5);
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
		    .videoBox{
		    	width: 100%;
		    	height: 5.00rem;
		    	background: #fff;
		    }
		}
</style>
