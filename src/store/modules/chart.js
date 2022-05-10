import myAxios from "@/api"

// 시도 시군구 세팅하는 곳
const sidoSetFun = (stats,commit) => {
  let emptyEmiArr =[]
  let emptyColArr =[]
  let tempSet = new Set()
  for( const stat of stats){
    tempSet.add(stat.REGION)
    emptyEmiArr.push(stat.EMI)
    emptyColArr.push(stat.COL)
  }
  commit('setSidoOrSigunguEmit',emptyEmiArr)
  commit('setSidoOrSigunguCol',emptyColArr)
  commit('setSidoOrSigungu',tempSet)
}

export default {
  namespaced : true,
  state: {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ BarChart @@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    calendarBar : {
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
    sidoBar : {
      // 지금 체크된 지역 (시도)
      nowChecked : null,
      // region code 받기 위해 초기값 설정
      geonkuk : null,
      // 배출자
      emitter : [],
      // 수거자
      collector : [],
      // 라벨에 붙일 시도 or 시군구
      sidoOrSigungu : [],
      // db에 요청 보낼 code
      regionCode : null,
    }

  },
  getters: {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ BarChart @@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    getTitle(state,getters){
      if (getters.getNowMonth == null){
        return `${getters.getNowYear}년 수거자 배출자 등록 현황`
      }
      return `${getters.getNowYear}년 ${getters.getNowMonth}월 수거자 배출자 등록 현황`

    },
    getNowYear(state){
      return state.calendarBar.nowYear
    },
    getNowMonth(state){
      return state.calendarBar.nowMonth
    },
    getEmitColDay(state){
      return { emit : state.calendarBar.barEmitDay, col : state.calendarBar.barColDay}
    },
    // 데이터가 있는 월 가져오기
    getBarMonth(state){
      return state.calendarBar.barMonth.map(v => {if (v==null) return '전체'; else return v})
    },
    getEmitColMonth(state){
      return { emit : state.calendarBar.barEmitMonth, col : state.calendarBar.barColMonth}
    },
    getBarTotalDay(state){
      return state.calendarBar.barTotalDay
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
      if (state.calendarBar.isYearOrMonth){
        return {
          labels : getters.getBarTotalMonth,
          datasets: [

            {
              label: '배출자',
              backgroundColor: '#1868c1',
              data: getters.getEmitColMonth.emit
            },
            {
              label: '수거자',
              backgroundColor: '#f87979',
              data: getters.getEmitColMonth.col
            },
          ],
        }
      }
      return {
        labels: getters.getBarTotalDay,
        datasets: [

          {
            label: '배출자',
            backgroundColor: '#1868c1',
            data: getters.getEmitColDay.emit
          },
          {
            label: '수거자',
            backgroundColor: '#f87979',
            data: getters.getEmitColDay.col
          },
        ],
      }
    },
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ SidoBarChart@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    getSidoOrSigungu(state){
      return state.sidoBar.sidoOrSigungu
    },
    getSidoOrSigunguEmit(state){
      return state.sidoBar.emitter
    },
    getSidoOrSigunguCol(state){
      return state.sidoBar.collector
    },
    getSidoOrSigunguDataSet(state,getters){
      return {
        labels : getters.getSidoOrSigungu,
        datasets: [

          {
            label: '배출자',
            backgroundColor: '#1868c1',
            data: getters.getSidoOrSigunguEmit,
            barPercentage: 0.5

          },
          {
            label: '수거자',
            backgroundColor: '#f87979',
            data: getters.getSidoOrSigunguCol,
            barPercentage: 0.5
          },
        ],
      }
    },
    getGeonKuk(state){
      return state.sidoBar.geonkuk
    },
    getSidoTitle(state){
      if(state.sidoBar.nowChecked==null){
        return '전국 수거자 배출자 등록현황'
      } else {
        return `${state.sidoBar.nowChecked} 수거자 배출자 등록현황`
      }

    },
    getNowChecked(state){
      if(state.sidoBar.nowChecked == null){
        return '전국'
      }
      return state.sidoBar.nowChecked
    }
  },
  mutations: {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ BarChart @@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    setNowYear(state,payload){
      state.calendarBar.nowYear = payload
    },
    setNowMonth(state,payload){
      state.calendarBar.nowMonth = payload
    },
    setBarEmitMonth(state,payload){
      state.calendarBar.barEmitMonth = payload
    },
    setBarColMonth(state,payload){
      state.calendarBar.barColMonth = payload
    },
    setBarEmitDay(state,payload){
      state.calendarBar.barEmitDay = payload
    },
    setBarColDay(state,payload){
      state.calendarBar.barColDay = payload
    },
    setMonth(state,payload){
      state.calendarBar.barMonth = [...payload]
      state.calendarBar.barMonth.unshift(null)
    },
    setBarTotalDay(state,payload){
      state.calendarBar.barTotalDay = payload
    },
    setIsYearOrMonth(state,payload){
      state.calendarBar.isYearOrMonth = payload
    },
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ SidoBarChart@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    setSidoOrSigunguEmit(state,payload){
      state.sidoBar.emitter = [...payload]
    },
    setSidoOrSigunguCol(state,payload){
      state.sidoBar.collector =  [...payload]
    },
    setSidoOrSigungu(state,payload){
      state.sidoBar.sidoOrSigungu = [...payload]
    },
    setGeonKuk(state,payload){
      state.sidoBar.geonkuk = [...payload]
      state.sidoBar.geonkuk.unshift(null)

    },
    setNowChecked(state,payload){
      state.sidoBar.nowChecked = payload
    },
    setRegionCode(state,payload){
      const gk = [...state.sidoBar.geonkuk]
      let rc
      gk.map(v => {
        if (v != null && v.SI_DO == payload){
          rc =  v.B_CODE
        }
      })
      if (rc == undefined){
        state.sidoBar.regionCode = null
        return
      }
      state.sidoBar.regionCode = String(rc)
    }
  },
  actions: {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ BarChart @@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    async getBarChartInfo({ rootState,commit,state }) {
      const userId = rootState.auth.userId
      const url = 'api/admin/common/get_stats'
      const method = 'post'
      const data = {
        params: JSON.stringify(
          [
            {
              USER_ID: userId,
              PARAM_YEAR: state.calendarBar.nowYear,
              PARAM_MONTH: state.calendarBar.nowMonth,
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
    },
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ SidoBarChart@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    async getSido({rootState,commit}){
      const userId = rootState.auth.userId
      const method = 'post'
      const url = 'api/admin/common/get_sido'
      let data =
      {
        params :
          JSON.stringify(
          [
            {
              USER_ID : userId,
              REGION_CODE : null
            }
          ]
        )
      }
      const res = await myAxios(url,method,data)
      commit('setGeonKuk',res.data.data)
    },
    async getCertenSidoOrSigungu({rootState,state,commit}){
      const userId = rootState.auth.userId
      const method = 'post'
      const url = 'api/admin/common/get_region_stats'
      let data =
      {
        params :
          JSON.stringify(
          [
            {
              USER_ID : userId,
              REGION_CODE : state.sidoBar.regionCode
            }
          ]
        )
      }
      const res = await myAxios(url,method,data)
      const stats = res.data.data[0].STAT
      // 전국 시/도 기준
      if (state.sidoBar.regionCode == null){
        console.log(stats)
        sidoSetFun(stats,commit)
      // 시군구 시군
      } else {
        //세종일 때 널들어옴
        if (stats != null){
          sidoSetFun(stats,commit)
        }
      }
    }
  },
}
