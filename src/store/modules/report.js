import reportApi from "@/api/apiList/reportApi";

export default {
  namespaced: true,
  state: {
    // 트랜잭션 검색 조건
    searchObj : {
      pageOffset: 0,
      pageSize: 15,
      pageNum: 1,
      lastPageNum: 10,
      search: null,
    },
    // 선택된 트랜잭션 정보
    selectedReport : {},
    // 트랜잭션 리스트
    reportList: [],
  },
  mutations: {
    // 트랜잭션 리스트 설정
    setReportList(state,payload){
      if (payload) {
        state.reportList = payload.TRANSACTIOIN_LIST;
        state.searchObj.lastPageNum = Number(payload.LAST_PAGE);
      } else {
        // 비어있다면 초기화 시켜준다.
        state.reportList = [];
        state.searchObj.lastPageNum = 0;
      }
    },
    // 현재 페이지 번호
    setPageNum(state, payload) {
      state.searchObj.pageNum = payload;
      if (state.searchObj.pageNum == 1) {
        state.searchObj.pageOffset = 0;
      } else {
        state.searchObj.pageOffset =
          (state.searchObj.pageNum - 1) * state.searchObj.pageSize;
      }
    },
    // 검색어 저장
    setSearch(state, payload) {
      state.searchObj.search = payload;
    },
    setTransactionDetail(state,payload){
      const uselessKeys = [
        'COLLECTING_TRUCK_ID',
        'CONFIRMED',
        'CONFIRMED_AT',
        'CONFIRMER_ID',
        'CONTRACT_ID',
        'TRUCK_DRIVER_ID',
        'TRUCK_START_AT',
      ]
      uselessKeys.forEach( (v) => {
        delete payload[v]
      })
      // key값을 오름차순으로 정렬
      state.selectedTransaction = Object.keys(payload).sort().reduce(
                                (newObj,key) => {
                                  newObj[key] = payload[key];
                                  return newObj;
                                },{}
                              );

    }

  },
  actions: {
    // 트랜잭션 리스트
    async reportList({state,rootState,commit}){
      try {
        console.log('1')
        const res = await reportApi.reportList({state, rootState})
        console.log(res,'리포트')
        commit("setReportList", res.data.data[0]);
      } catch (e) {
        console.log(e)
      }
    },
    // 트랜잭션 디테일
    async reportDetail({rootState, commit},{transactionId}){
      try {
        const res = await reportApi.reportDetail({rootState,transactionId})
        commit("setReportDetail", res.data.data[0].TRANSACTION_INFO);
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    // 트랜잭션 리스트
    getReportList(state){
      return state.reportList;
    },
    // 트랜잭션 디테일
    getReportDetail(state){
      return state.selectedReport
    },
    // 현재 페이지 번호
    getPageNum(state){
      return state.searchObj.pageNum
    },
    // 마지막 페이지 번호
    getLastPageNum(state){
      return state.searchObj.lastPageNum
    },
    // 현재 검색어
    getSearch(state){
      return state.searchObj.search
    },
  },
};
