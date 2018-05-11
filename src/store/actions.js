import * as types from './mutation-types'
//异步操作state
export const setDocumentTitle = function ({commit}, value) {
	
  commit(types.SET_DOC_TITLE, value) 
}