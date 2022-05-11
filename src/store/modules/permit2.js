// import myAxios from "@/api";
// 게시판
import permit2Api from '@/api/apiList/permit2Api'


export default {
  namespaced: true,
  state: {
    permitObj: {
      pageOffset: 0,
      pageSize: 15,
      permitList: [],
      // 아래는 검색 옵션
      confirmed: null,
      emitOrCol: null,
      pageNum: 1,
      lastPageNum: 10,
    },
    // 검색 옵션
    confirmedList: [null, true, false],
    emitOrColList: [null, true, false],
    search: null,
  },
  mutations: {
    // db에서 받아온 리스트 들을 vuex에 저장해준다.
    setPermitList(state, payload) {
      if (payload) {
        state.permitObj.permitList = payload;
        state.permitObj.lastPageNum = Number(payload[0].LAST_PAGE);
      } else {
        // 비어있다면 초기화 시켜준다.
        state.permitObj.permitList = [];
        state.permitObj.lastPageNum = 0;
      }
    },
    // query로 1을 받아오면 0으로 설정,
    // 그 외의 숫자는 적절히 offet을 설정
    setPageNum(state, payload) {
      state.permitObj.pageNum = payload;
      if (state.permitObj.pageNum == 1) {
        state.permitObj.pageOffset = 0;
      } else {
        state.permitObj.pageOffset =
          (state.permitObj.pageNum - 1) * state.permitObj.pageSize;
      }
    },
    // filter 조건을 vuex에 저장
    setConfirmed(state, payload) {
      state.permitObj.confirmed = payload;
    },
    // search bar에 적은 keyword를 vuex에 저장
    setSearch(state, payload) {
      state.search = payload;
    },

    setEmitOrCol(state, payload) {
      state.permitObj.emitOrCol = payload;
    },
  },
  actions: {
    // db에 data를 요청하는 action
    async getPermitsList({ state, commit, rootState }) {
      try {
        const res = await permit2Api.getPermitsList({state, rootState})
        commit("setPermitList", JSON.parse(res.data.data[0].SITE_LISTS));
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    // 현재 vuex에 저장되어있는 리스트들을 return
    showPermitList(state) {
      return state.permitObj.permitList;
    },
    // 현재 vuex에 저장되어있는 pageNum을 return
    getPageNum(state) {
      return state.permitObj.pageNum;
    },
    // 현재 vuex에 저장되어있는 LastPageNum return
    getLastPageNum(state) {
      return state.permitObj.lastPageNum;
    },
    // 현재 vuex에 저장되어있는 ConfirmedState return
    getConfirmedState(state) {
      return state.permitObj.confirmed;
    },
    // 현재 vuex에 저장되어있는 ConfirmedList return
    getConfirmedList(state) {
      return state.confirmedList;
    },
    getSearch(state) {
      return state.search;
    },
    getEmitColList(state) {
      return state.emitOrColList;
    },
    getEmitOrCol(state) {
      return state.permitObj.emitOrCol;
    },
  },
};
