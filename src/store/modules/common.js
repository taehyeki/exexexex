import myAxios from "@/api"

export default {
  namespaced : true,
  state : {
    loading : false,
    wsteList1 : [],
    wsteList2 : [],
    navItems : [],

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
    setNavItems(state,isLogged){
      if(isLogged){
        state.navItems = [
          { title: '회원목록', icon: 'mdi-clipboard-text-outline', route : '/admin/main2/permit2' },
          { title: '사용자 추가', icon: 'mdi-account', route : '/admin/main2/add-admin' },
          { title: '통계📊', icon: 'mdi-chart-bar', route : '/admin/main2/chart' },
          { title: '로그아웃', icon: 'mdi-account-cancel', route : '/logout' },
        ]
      } else {
        state.navItems = [{ title: '로그인', icon: 'mdi-account', route : '/login' }]
      }
    },

    //   if (to == true){
    //     this.items = [
    //       { title: '회원목록', icon: 'mdi-clipboard-text-outline', route : '/admin/main2/permit2' },
    //       { title: '로그아웃', icon: 'mdi-account-cancel', route : '/logout' },
    //     ]
    //   } else {
    //     this.items = [{ title: '로그인', icon: 'mdi-account', route : '/login' }]

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
    checkIsLogged({commit,rootGetters}){
      commit('setNavItems',(rootGetters['auth/isLogged']))
    },

  },
  getters : {
    getNowLoadingState(state){
      return state.loading
    },
    showWsteLists(state){
      return { wsteList1 : state.wsteList1, wsteList2 : state.wsteList2 }
    },
    getNavList(state){
      return state.navItems
    }
  }
}
