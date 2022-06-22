
import emissionsApi from '@/api/apiList/emissionsApi'
export default {
  namespaced: true,
  state: {
    // 배출 등록 검색, 페이지 네이션등을 위한 정보들
    emissionsObj: {
      pageOffset: 0,
      pageSize: 15,
      // 받아온 배출 등록 리스트를 넣어둘 배열
      emissionsList: [],
      // 아래는 검색 옵션
      // confirmed: null,
      // emitOrCol: null,
      pageNum: 1,
      // null로 줘버리면 처음 로딩창에서 이상하게 나와버림
      lastPageNum: 10
    },

    // 배출 검색어
    search: null,
    // 배출 오더를 클릭 했을 때 보여줄 오브젝트
    orderInfo : {},
    // 배출 오더를 클릭 했을 때 보여줄 맵 리스트의 반경 설정
    circleRange : 50,
    // 배출 오더를 클릭 했을 때 아래에 보이는 비딩
    biddingInfo : [],
    // 데이터 수정할 때 사용할 배열
    modifyDatas : [],
    // 관심지역 수거자들 보여줄 리스트
    collectorListAreaOfInterest : [],
    // 반경 N KM 안에 있는 수거자들
    collectorListWithin : [],
    // 검색할 옵션들 지금은 거리 밖에 없음
    optSelect: ["거리"],
     // 배출 오더를 클릭 했을 때 아래에 보이는 트랜잭션
    transactionList : []
  },

  mutations: {
    // 배출 등록 현황 리스트 설정
    setEmissionsList(state,payload){
      if (payload) {
        state.emissionsObj.emissionsList = payload.ORDER_LIST;
        state.emissionsObj.lastPageNum = Number(payload.LAST_PAGE);
      } else {
        // 비어있다면 초기화 시켜준다.
        state.emissionsObj.emissionsList = [];
        state.emissionsObj.lastPageNum = 0;
      }
    },
    // query로 1을 받아오면 0으로 설정,
    // 그 외의 숫자는 적절히 offet을 설정
    setPageNum(state, payload) {
      state.emissionsObj.pageNum = payload;
      if (state.emissionsObj.pageNum == 1) {
        state.emissionsObj.pageOffset = 0;
      } else {
        state.emissionsObj.pageOffset =
          (state.emissionsObj.pageNum - 1) * state.emissionsObj.pageSize;
      }
    },
    // 검색어 저장
    setSearch(state, payload) {
      state.search = payload;
    },
    // 밑에 보여줄 정보
    setOrderInfo(state,payload) {
      state.orderInfo = payload
    },
    // 밑에 보여줄 비딩 정보
    setBiddingInfo(state,payload){
      state.biddingInfo = payload
    },
    changeOrderInfo(state,{key,value}){
     state.orderInfo[key] = value
    },
    // 배출지를 관심 지역으로 설정한 수거자들
    setCollectorListAreaOfInterest(state,payload){
      state.collectorListAreaOfInterest = payload
    },
    // 반경 N KM 설정
    setCircleRange(state,payload){
      state.circleRange = payload
    },
    // 배출지 반경 N KM이내에 존재하는 수거자들
    setCollectorListWithin(state,payload){
      state.collectorListWithin = payload
    },
    setTransactionList(state,payload){
      state.transactionList = payload
    }

  },
  actions: {
    // 배출 등록 리스트 조회
    async emissionsList({ state,  commit , rootState }){
      try {
        const res = await emissionsApi.emissionsList({state, rootState})
        commit("setEmissionsList", res.data.data[0]);
      } catch (e) {
        console.log(e)
      }
    },
    // 선택한 배출 조회
    async emissionSelected({commit, rootState},payload){
      try {
        const orderId = Number(payload)
        const res = await emissionsApi.emissionSelected({rootState ,orderId })
        console.log(res,'선택배출')
        commit('setOrderInfo',res.data.data[0].ORDER_INFO[0])
        commit('setBiddingInfo',res.data.data[0].ORDER_INFO[0].BIDDING_LIST)
        commit('setTransactionList',res.data.data[0].ORDER_INFO[0].TRANSACTION_INFO)
      } catch (e) {
        console.log(e)
      }
    },


    async emissionModify({state,rootState}){
      try {
        await emissionsApi.emissionModify({state,rootState})
        location.reload()
      } catch (e) {
        console.log(e)
      }

    },


    // 배출지를 관심지역으로 설정한 수거자들 조회
    async collectorListAreaOfInterest({state, rootState, commit}){
      try {
        const bCode = state.orderInfo.KIKCD_B_CODE
        const res = await emissionsApi.collectorListAreaOfInterest({rootState ,bCode })
        commit('setCollectorListAreaOfInterest',res.data.data.SITES)
      } catch (e) {
        console.log(e)
      }
    },
    // 배출지 반경 N KM이내에 존재하는 수거자들 조회
    async collectorListWithin({state, rootState, commit}){
      try {
        const lat = state.orderInfo.LAT
        const lng = state.orderInfo.LNG
        const distance = state.circleRange
        const res = await emissionsApi.collectorListWithin({rootState ,distance, lat, lng})
        commit('setCollectorListWithin',res.data.data)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    // 배출 리스트 가져오기
    getEmissionsList(state){
      return state.emissionsObj.emissionsList;
    },
    // 현재 페이지 번호 가져오기
    getPageNum(state){
      return state.emissionsObj.pageNum
    },
    // 마지막 페이지 번호 가져오기
    getLastPageNum(state){
      return state.emissionsObj.lastPageNum
    },
    // 현재 검색어 가져오기
    getSearch(state){
      return state.search
    },
    // 배출 ORDERINFO 가져오기
    getOrderInfo(state){
      return state.orderInfo
    },
    // 밑에 보이는 BIDDING INFOR 가져오기
    getBiddingInfo(state){
      return state.biddingInfo
    },
    // 배출지를 관심지로 설정한 수거자들 가져오기
    getCollectorListAreaOfInterest(state){
      return state.collectorListAreaOfInterest
    },
    // 반경 N KM의 N값 가져오기
    getCircleRange(state){
      return state.circleRange
    },
    // 배출지의 반경 N KM에 존재하는 수거자들 가져오기
    getCollectorListWithin(state){
      return state.collectorListWithin
    },
    // 검색 옵션 리스트 가져오기 (현재는 반경 거리 밖에 없음)
    getOptList(state){
      return state.optSelect
    },
    getTransactionList(state){
      return state.transactionList
    }
  },
};
