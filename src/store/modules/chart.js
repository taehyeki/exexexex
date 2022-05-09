import myAxios from "@/api"

export default {
  namespaced : true,
  state: {
    nowYear : new Date().getFullYear(),
    nowMonth : '전체',
    barEmitMonth : [0,0,0,0,0,0,0,0,0,0,0,0],
    barColMonth : [0,0,0,0,0,0,0,0,0,0,0,0],
    barEmitDay : [],
    barColDay : [],
    barYear : [],
  },
  getters: {
    getNowYear(state){
      return state.nowYear
    },
    getNowMonth(state){
      return state.nowMonth
    },
  },
  mutations: {
    // setBarYear(state,payload){

    // }
    setBarMonth(state,payload){
      state.barMonth = payload
    }
  },
  _actions: {
    async getBarChartInfo({ rootState }) {
      const userId = rootState.auth.userId
      const url = 'api/admin/common/get_stats'
      const method = 'post'
      const data = {
        params: JSON.stringify(
          [
            {
              USER_ID: userId,
              PARAM_YEAR: 2022,
              PARAM_MONTH: 3,
            }
          ]
        )
      }


      let res
      const lastDay = [0,31,28,31,30,31,30,31,31,30,31,30,31]
      try {
        res = await myAxios(url, method, data)
        // 년 단위
        console.log(res.data.data[0])
        const inputMonth = res.data.data[0].INPUT_PARAM[0].PARAM_MONTH

        const stats = res.data.data[0].STAT
        if (inputMonth == null){

        // 월 단위
        } else {
          let monthSet1 = []
          let monthSet2 = []
          for(let i=0;i<lastDay[inputMonth];i++){
            monthSet1.push(0)
            monthSet2.push(0)
          }
          for (const stat  of stats) {
            console.log(stat)
          }
          // console.log(monthSet)
        }

      } catch (e) {
        console.log(e)
      }
    }
  },
  get actions() {
    return this._actions
  },
  set actions(value) {
    this._actions = value
  },
}
