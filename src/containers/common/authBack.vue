<template>
	<div class="onlyWxopen">
		
	</div>
</template>

<script>

  export default {
    data() {
      return {      	
		
      };
    },    
	created: function() {
        //根据授权后的code与state获取ticket
       let data=this.getUrlParam('code');
       if(this.getCookie('codeuid')=='undefined'){
       		data.codeuid='';
       }else{
       		data.codeuid=this.getCookie('codeuid');
       }
       
       this.init(data);	

	},
	components: {
	  
	},
    methods: {
    	init(data){
            if(tsApp.getClientBrowser()=='wx'){
             this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.authResult,data,this.autoBack,this);
            }else if(tsApp.getClientBrowser()=='Alipay'){
              this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.alipayResult,data,this.autoBack,this);
            }else{
              this.$toast('请求异常！！！',100000);
              return;
            }
    		
    	},
    	autoBack(data){
            //记录当前授权的ticket;
            this.setCookie('ticket',data);
            //this.$toast(this.getCookie('authJump'))
            if(this.getCookie('codeuid')!='undefined'){//有codeuid则做特殊处理把地址拼接上
              window.location.href=this.getCookie('authJump')+'='+this.getCookie('codeuid');
            }else{
               window.location.href=this.getCookie('authJump');
            }
           
            
    	},
        //获取参数
        getUrlParam:function(name){
         // var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");       
          //var r = window.location.href.substr(1).match(reg); 
          var url =location.search; //获取url中"?"符后的字串 
          // console.log(r)
          // if (r!=null) return unescape(r[2]); return null;    
          console.log(location.search)
          var theRequest = new Object(); 
          if (url.indexOf("?") != -1) { 
            var str = url.substr(1); 
           
            let strs = str.split("&"); 
           
            for(var i = 0; i < strs.length; i ++) { 
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
            } 

          } 
          return theRequest; 
        }

    }
  };
</script>

<style lang="scss" scoped>
	.onlyWxopen{font-size: .26rem;padding-top: 1.6rem;text-align: center;}
</style>