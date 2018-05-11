<template>
  <div id="app" >
    <div style="display:none">{{documentTit}}</div>   
    <transition name="fade"  mode="out-in">
			<keep-alive>
         <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
    data(){
      return {
        isLoading:true
      }
    },
    computed: {
      //设置标题
        documentTit(){
          document.title=this.$store.state.documentTitle;
          return this.$store.state.documentTitle;
        },
      
    },
    created() {     
       document.title=this.$store.state.documentTitle;//设置标题
    },
    components: {
      
    }
    
    
  }

</script>
<style lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
    /*transform: translateX(0px);*/
  }
  .fade-enter, .fade-leave-active {
    /*transform: translateX(-100%);*/
    opacity: 0;
  }
</style>