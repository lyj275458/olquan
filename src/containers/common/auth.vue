<template>
	<div class="onlyWxopen">
		
	</div>
</template>

<script>

  export default {
    data() {
      return {      	
		    initObj:{
	          //redirectUri:'https://wap.youxms.com/auth/back',
	          //redirectUri:'http://wap.test.youxms.com/auth/back',
	          redirectUri:CUR_URLBACK+'auth/back',
	          codeuid:''
	        }
      };
    },    
    created: function() {    
    	if(this.getCookie('codeuid')=='undefined'){
    		this.initObj.codeuid='';
    	}else{
    		this.initObj.codeuid=this.getCookie('codeuid');
    	}
        if(tsApp.getClientBrowser()=='wx'){
         this.initWx();
        }else if(tsApp.getClientBrowser()=='Alipay'){
           this.initAli();  
        }else{
          this.$toast('请在微信或支付宝打开',100000);
          return;
        }
    	

    },
    methods: {

      //微信授权
    	initWx(){    	
    		console.log('wx')
    		console.log(this.initObj)
    		let data={
    			redirectUri:this.initObj.redirectUri,
    			codeuid:this.initObj.codeuid
    		}
    		this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.authUrl,data,this.autoBack,this);
    	},
      //支付宝授权
      initAli(){  
        let data={
    			redirectUri:this.initObj.redirectUri,
    			codeuid:this.initObj.codeuid
  		  }
        this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.alipayUrl,data,this.autoBack,this);
      },      
    	autoBack(data){
        //this.$toast(data)
        window.location.href=data;
    		console.log(data);
    	}

    }
  };
</script>

// <style lang="scss" scoped>
	.onlyWxopen{font-size: .26rem;padding-top: 1.6rem;text-align: center;}
</style>