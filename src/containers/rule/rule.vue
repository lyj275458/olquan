<template>
	<div>
		<div>
		    <canvas id="canvas"style="width: 6.40rem;"></canvas>
		</div>
		<div>
		    <img id="img" style="width:6.40rem;" src="#" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		name:'b',
		data : function() {
			return{
				oneImg:'/static/images/one.png',
				twoImg:'/static/images/two.png',
				threeImg:'/static/images/three.png',
				rowtopImg:'/static/images/rowtop.png',
			}
		},
	}
</script>

<style lang="scss" scoped>
.rule{
	background: #fff;
	padding-top: .20rem;
	.step{
		
		overflow: hidden;
		display: flex;
		display:-webkit-box;
	    display: -moz-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: -moz-flex;
		padding: 0 .24rem;
		-webkit-justify-content:center;
		justify-content:center;
		-moz-box-pack:center;
		-webkit--moz-box-pack:center;
		height: .90rem;
		.stepNext{
			
			margin: 0 .46rem;
			float: left;
			height: 100%;
			position: relative;
			img{
				display: block;
				height: .12rem;
				width: .08rem;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -.12rem;
			}
		}
		.stepDetail{
			position: relative;
			text-align: center;
			font-size: .24rem;
			float: left;
			
			img{
				display: block;
				height: .24rem;
				width: .24rem;
				position: absolute;
				left: 50%;
				margin-left: -.12rem;
			}
			span{
				display: inline-block;
				padding-top: .38rem;
			}
		}
	}
	.explain{
		color: #666;
		font-size: .24rem;
		line-height: .40rem;
		padding: 0rem .26rem .05rem;
		li{
			margin: .42rem 0;
		}
	}
}
</style>