import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions'
import mutations from './mutations'
import state from './state'
Vue.use(Vuex);
const moduleA = {
  state: {
  	test:'mytest'
  }
 
};

const store = new Vuex.Store({
	
	state,
	actions,
	mutations,
	//分割模块
	modules: {
	    a: moduleA
	},
// 	mutations: {
// 		//test
// //		ADDFUN(state,n){
// //			state.message_count+=n
// //		},
// 		//通用标题设置 
// 		documentTitle(state,val){
// 			state.documentTitle = val;
// 		},
		
// 		SETTITLE(state,val){
// 			state.documentTitle = val;
// 		},
// 		//控制全局loading
// 		comAjax (state, obj) {
// 			console.log(obj)
// 	    	state.comAjax = obj;
// 	    },
// 		applyObj(state,val){
// 			state.applyObj = val;
// 		},
// 		add(state, n) {
// 	      state.count += n
// 	    },
// 		ADDFUN(state,payload){
// 			state.message_count+=payload.amount
// 		},
// 		// 设置登录
// 		ISLOGIN (state) {
// 			state.isLogin = true;
// 		},
// 		// 退出登录
// 		SIGNOUT (state) {
// 			state.isLogin = false;
// 		},
// 		// 设置登录用户信息
// 		SETUSERINFO (state, userInfo) {
// 			state.userInfo.loginname = userInfo.name;
// 			state.userInfo.avatar = userInfo.avatar;
// 			state.userInfo.id = userInfo.id;
// 			state.userInfo.accesstoken = userInfo.accesstoken;
// 		},
// 		// 设置tips弹窗的提示信息
// 		SETTIPCONTENT (state, content) {
// 			state.tipContent = content;
// 		},
// 		// 设置tips弹窗的显示隐藏状态
// 		SETTIPSHOW (state, status) {
// 			state.tipShow = status;
// 		},
// 		// 设置未读消息条数
// 		SETNOTMESSAGECOUNT (state, count) {
// 			state.message_count = count;
// 		},
// 		// 设置当前文章评论
// 		SETREPLIES (state, replies) {
// 			state.replies = replies;
// 		}
// 	},
	getters: {
		// getLoginState (state) {
		// 	return state.isLogin;
		// },
		// getUserInfo (state) {
		// 	return state.userInfo;
		// },
		// getUserInfoAccesstoken(state, getters) {
		// 	return getters.getUserInfo.accesstoken;
		// },
		// getTipShow (state) {
		// 	return state.tipShow;
		// },
		// getTipContent (state) {
		// 	return state.tipContent;
		// },
		// getNotMessageCount (state) {
		// 	return state.message_count;
		// },
		// getReplies (state) {
		// 	return state.replies;
		// }
	}
})

export default store;