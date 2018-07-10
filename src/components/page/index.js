import loadingComponent from './page.vue'

const videoImg={
    install:function(Vue){
        Vue.component('VideoImg',loadingComponent)
    }  //'Linking'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default videoImg;