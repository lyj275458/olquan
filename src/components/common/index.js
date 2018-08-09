import loadingComponent from './search.vue'

const search={
    install:function(Vue){
        Vue.component('Seacrh',loadingComponent)
    }  //'Seacrh'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default search;