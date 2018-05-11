//通用组件
import Vue from 'vue';
import Toast from './toast';
import Indicator from './indicator';
import MessageBox from './message-box';
Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$indicator = Vue.prototype.$indicator = Indicator;
module.exports = {
    Toast,
    Indicator,
    MessageBox,
};