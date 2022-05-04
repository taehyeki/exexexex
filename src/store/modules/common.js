import myAxios from "@/api"
export default {
  namespaced : true,
  state : {
    loading : false,
    wsteList1 : [],
    wsteList2 : []
  },
  mutations : {
    getLoading(state){
      state.loading = true
    },
    endLoading(state){
      state.loading = false
    },
    setWsteLists(state,payload){
      state.wsteList1 = payload.wste1
      state.wsteList2 = payload.wste2
    },
  },
  actions : {
    async getWsteLists({commit}){
      const method = 'post'
      const url = 'api/admin/common/get_wste_lists'
      const wste1 = await myAxios(url,method)
      const method2 = 'post'
      const url2 = 'api/admin/common/get_wste_appearance'
      const wste2 = await myAxios(url2,method2)
      commit('setWsteLists',{
        wste1 : wste1.data.data,
        wste2 : wste2.data.data
      })
    },
  },
  getters : {
    getNowLoadingState(state){
      return state.loading
    },
    showWsteLists(state){
      return { wsteList1 : state.wsteList1, wsteList2 : state.wsteList2 }
    },
  }
}
