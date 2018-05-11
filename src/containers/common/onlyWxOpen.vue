<template>
	<div class="onlyWxopen">
		当前页面只支持微信打开！
	</div>
</template>

<script>

  export default {
    data() {
      return {      	
		
      };
    },
    
	created: function() {
		this.$store.commit('documentTitle','微信打开');
		
	},
	components: {
	  
	},
    methods: {
      

    }
  };
</script>

<style lang="scss" scoped>
	.onlyWxopen{font-size: .32rem;padding-top: 1.6rem;text-align: center;}
</style>