import Vue from 'vue';
const focus = Vue.directive('focus',{
	// 当绑定元素插入到 DOM 中。
	inserted: function (el) {
	    // 聚焦元素
	    el.focus();
	    
	}
});

export {focus}