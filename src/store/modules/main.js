import myAxios from "@/api"

export default {
  namespaced : true,
  // 메인 페이지에
  state : {
    id: 238,
    pageSize : 25,
    mainTable : {
      emitters : 0,
      collectors : 0,
      processors : 0,
      waitingAnswers : 0,
      adminMainDuration : 0,
      nowTarget : 0,
      nowTargetInfo : [],
      offsetSize : 0,
    },
    calInfo : {
      selectedDay : new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      notExistDays : []
    },
    subTable : {
      subOffsetSize : 0,
      subTableInfo : [],
    },
    questionAnswer : {
      questionOffsetSize : 0,
      questionTableInfo : [],
    }
  },
  mutations : {
    // TopInfo component에 들어갈 정보들을 입력
    setMainInfo(state, payload){
      state.mainTable.emitters = payload.EMITTERS
      state.mainTable.collectors = payload.COLLECTORS
      state.mainTable.processors = payload.PROCESSORS
      state.mainTable.waitingAnswers = payload.WAITING_ANSWERS
      state.mainTable.adminMainDuration = payload.ADMIN_MAIN_DURATION
      state.id = payload.ID
    },
    // 배출자, 수거업자 ... 클릭 했을 때 해당 아이디를 입력하고 초기화
    setNowTarget(state,payload){
      state.mainTable.nowTarget = payload
      state.mainTable.offsetSize = 0,
      state.mainTable.nowTargetInfo = []
    },
    // 현재 클릭한(배출자, 사업자) 정보를 더 가져옴
    setNowTargetMore(state,payload){
      state.mainTable.nowTargetInfo.push(...payload)
    },
    // 달력에서 선택한 날을 입력
    setClickedNum(state,payload){
      state.calInfo.selectedDay = payload
    },
    // 25 단위로 offset이 늘어남
    addOffsetSize(state){
      state.mainTable.offsetSize += state.pageSize
    },
    // 달력에 미확인 날짜를 표시해주기 위함
    setNotExistDays(state,payload){
      state.calInfo.notExistDays = payload
    },
    // 날짜에 날을 클릭하면 해당 날의 등록증 정보가 표시
    setSubTableInfo(state,payload){
      state.subTable.subTableInfo = payload
    }
  },
  actions : {
    // TopInfo에 값을 넣기 위해 서버에 요청
    async getMainInfo({commit}){
      const method = 'post'
      const url = 'api/admin/1_01_main'
      const data =
        {
          params :
            JSON.stringify([{ USER_ID : 238,}])
        }
      const res = await myAxios(url,method,data)
      commit('setMainInfo',res.data.data[0].TOP[0])

    },
    // 스크롤 내렸을 때 더 많은 정보를 가져오기 위함
    async getMoreTargetInfo({commit,state}){
      const method = 'post'
      const url = 'api/admin/1_01_main/top_list_load_more'
      const data = {
        params :
        JSON.stringify([
          {
            USER_ID : state.id,
            MENU_ID : state.mainTable.nowTarget,
            OFFSET_SIZE : state.mainTable.offsetSize,
            PAGE_SIZE : state.pageSize
          }
        ])
      }
      const res = await myAxios(url,method,data)
      //
      if (res.data.data[0].PUSH_HISTORY == null) {
        alert('더이상 x')
        return
      }
      commit('setNowTargetMore',res.data.data[0].PUSH_HISTORY)
    },
    // 미확인이 존재하는 날짜들을 받아옴
    async checkIfExistLicense({commit,state}){
      const method = 'post'
      const url = 'api/admin/1_01_main/check_if_exist_license'
      const data = {
        params :
        JSON.stringify([
          {
            USER_ID : state.id,
            MENU_ID : state.mainTable.nowTarget,
            TARGET_DATE : state.calInfo.selectedDay
          }
        ])
      }
      const res = await myAxios(url,method,data)

      // 받기전에 초기화
      let setNotExistDays = []
      commit('setNotExistDays',setNotExistDays)
      if (res.data.data[0].LISTS != null){
        res.data.data[0].LISTS.map(v => setNotExistDays.push(v.TARGET_DATE))
        commit('setNotExistDays',setNotExistDays)
      }

    },
    // 해당 날에 해당하는 데이터들을 가져ㅛ
    async getSubTable({commit,state},payload=state.calInfo.selectedDay){
      commit('setClickedNum', payload)
      const method = 'post'
      const url = 'api/admin/1_01_main/get_info_of_site_list'
      const data = {
        params :
        JSON.stringify([
          {
            USER_ID : state.id,
            MENU_ID : state.mainTable.nowTarget,
            TARGET_DATE : state.calInfo.selectedDay
          }
        ])
      }
      const res = await myAxios(url,method,data)
      // 받아온 list의 length값을 구해서 적어주어야함
      commit('setSubTableInfo',res.data.data[0].LISTS)

    },
  },
  getters : {
    returnTopInfo(state){
      return {
        '배출자' : state.mainTable.emitters,
        '수거업체' : state.mainTable.collectors,
        '처리업체' : state.mainTable.processors,
        '1:1 답변대기 문의' : state.mainTable.waitingAnswers,
      }
    },
    returnTopInfoTitle(state,getters){
      return Object.keys(getters.returnTopInfo)[state.mainTable.nowTarget]
    },
    returnDuration(state){
      return state.mainTable.adminMainDuration
    },
    returnNowTargetInfo(state){
      return state.mainTable.nowTargetInfo
    }
  }
}
