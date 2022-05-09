import myAxios from "@/api"

export default {
  namespaced : true,
  state: {
    nowYear : new Date().getFullYear(),
    nowMonth : null,
    barMonth : [],
    barEmitMonth : [0,0,0,0,0,0,0,0,0,0,0,0],
    barColMonth : [0,0,0,0,0,0,0,0,0,0,0,0],
    barEmitDay : [],
    barColDay : [],
    barTotalDay : [''],
    isYearOrMonth : true,
  },
  getters: {
    getNowYear(state){
      return state.nowYear
    },
    getNowMonth(state){
      return state.nowMonth
    },
    getEmitColDay(state){
      return { emit : state.barEmitDay, col : state.barColDay}
    },
    // 데이터가 있는 월 가져오기
    getBarMonth(state){
      return state.barMonth.map(v => {if (v==null) return '전체'; else return v})
    },
    getEmitColMonth(state){
      return { emit : state.barEmitMonth, col : state.barColMonth}
    },
    getBarTotalDay(state){
      return state.barTotalDay
    },
    getBarTotalMonth(){
      return  [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월'
      ]
    },
    getDataSet(state,getters){
      if (state.isYearOrMonth){
        return {
          labels : getters.getBarTotalMonth,
          datasets: [
            {
              label: '수거자',
              backgroundColor: '#f87979',
              data: getters.getEmitColMonth.col
            },
            {
              label: '배출자',
              backgroundColor: '#1868c1',
              data: getters.getEmitColMonth.emit
            },

          ],
        }
      }
      return {
        labels: getters.getBarTotalDay,
        datasets: [
          {
            label: '수거자',
            backgroundColor: '#f87979',
            data: getters.getEmitColDay.col
          },
          {
            label: '배출자',
            backgroundColor: '#1868c1',
            data: getters.getEmitColDay.emit
          },

        ],
      }
    }
  },
  mutations: {
    setNowYear(state,payload){
      state.nowYear = payload
    },
    setNowMonth(state,payload){
      state.nowMonth = payload
    },
    setBarEmitMonth(state,payload){
      state.barEmitMonth = payload
    },
    setBarColMonth(state,payload){
      state.barColMonth = payload
    },
    setBarEmitDay(state,payload){
      state.barEmitDay = payload
    },
    setBarColDay(state,payload){
      state.barColDay = payload
    },
    setMonth(state,payload){
      state.barMonth = [...payload]
      state.barMonth.unshift(null)
    },
    setBarTotalDay(state,payload){
      state.barTotalDay = payload
    },
    setIsYearOrMonth(state,payload){
      state.isYearOrMonth = payload
    }
  },
  actions: {
    async getBarChartInfo({ rootState,commit,state }) {
      const userId = rootState.auth.userId
      const url = 'api/admin/common/get_stats'
      const method = 'post'
      const data = {
        params: JSON.stringify(
          [
            {
              USER_ID: userId,
              PARAM_YEAR: state.nowYear,
              PARAM_MONTH: state.nowMonth,
            }
          ]
        )
      }
      let res
      const lastDay = [0,31,28,31,30,31,30,31,31,30,31,30,31]
      try {
        res = await myAxios(url, method, data)
        const inputMonth = res.data.data[0].INPUT_PARAM[0].PARAM_MONTH
        const stats = res.data.data[0].STAT
        console.log(stats)
        // 년 단위
        if (inputMonth == null){

          let yearEmi = []
          let yearCol = []
          let setMonth = new Set()
          for(let i=0;i<12;i++){
            yearEmi.push(0)
            yearCol.push(0)
          }
          for (const stat  of stats) {
            const month = stat.PARAM_MONTH - 1
            const num = stat.QTY
            if(stat.USER_TYPE == 9){
              yearEmi[month] = num
            } else {
              yearCol[month] = num
            }
            setMonth.add(stat.PARAM_MONTH)

          }
          commit('setMonth',setMonth)
          commit('setBarEmitMonth',yearEmi)
          commit('setBarColMonth',yearCol)
          commit('setIsYearOrMonth',true)
        // 월 단위
        } else {
          let monthEmi = []
          let monthCol = []
          let setBarTotalDay = []

          for(let i=0;i<lastDay[inputMonth];i++){
            setBarTotalDay.push(i+1)
            monthEmi.push(0)
            monthCol.push(0)
          }
          setBarTotalDay = setBarTotalDay.map(v => {return String(v)+'일'})
          commit('setBarTotalDay',setBarTotalDay)
          for (const stat  of stats) {

            const day = stat.PARAM_DAY - 1
            const num = stat.QTY
            if(stat.USER_TYPE == 9){
              monthEmi[day] = num
            } else {
              monthCol[day] = num
            }
          }
          commit('setBarEmitDay',monthEmi)
          commit('setBarColDay',monthCol)
          commit('setIsYearOrMonth',false)
        }

      } catch (e) {
        console.log(e)
      }
    }
  },

}
