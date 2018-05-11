<template>
	<div class="share">
		<div class="time">23:00:00.00</div>
		<img :src="shareImg" />
		<div class="people">还差<span>1</span>人，赶紧邀请好友来拼团吧</div>
		<div class="sure">点击右上角分享拼团</div>
	</div>
</template>

<script>
	export default{
		data : function() {
			return{
				shareImg:'/static/images/share.png',
				
				curObj:{},
				
			}
		},
		created: function() {
			this.$store.commit('documentTitle','拼团');

		},
	}
</script>

<style lang="scss" scoped>
	.share{
		background: #252525;
		height: 100%;
		width: 100%;
		position: relative;
		.time{
			font-size: .28rem;
			text-align: center;
			width: 100%;
			color: #fff;
			line-height: .76rem;
		}
		img{
			width: 1.60rem;
			height: 1.64rem;
			position: absolute;
			right: .40rem;
			top: .40rem;
		}
		.people{
			margin-top: 1.66rem;
			color: #fff;
			font-size: .36rem;
			text-align: center;
			span{
				color: #ff3892;
				
			}
		}
		.sure{
			font-size: .28rem;
			text-align: center;
			color: #fff;
			margin-top: .50rem;
		}
	}
</style>