import loadingComponent from './divsion.vue'

const loading={
    install:function(Vue){
        Vue.component('Linking',loadingComponent)
    }  //'Linking'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default loading;