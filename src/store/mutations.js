import * as types from './mutation-types'
//同步
const mutations = {
  [types.documentTitle](state, val) {
    console.log(val)
   state.documentTitle = val;
  },
  [types.comAjax](state, obj) {
   state.comAjax = obj;
  },
  //申请合伙人
  [types.applyObj](state, val) {
   state.applyObj = val;
  },
  //选择的地址
	
}
export default mutations