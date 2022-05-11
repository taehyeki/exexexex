export default {
  namespaced: true,
  state: {
    nowNum: 0,
    indexList: [
      { iconName: "mdi-view-grid-outline", text: "대시보드" },
      { iconName: "mdi-lock-outline", text: "계정관리" },
      { iconName: "mdi-account-outline", text: "사용자 관리" },
      { iconName: "mdi-headphones", text: "서비스 관리" },
      { iconName: "mdi-pencil", text: "관리자 설정" },
      { iconName: "mdi-pencil", text: "통계" },
      { iconName: "mdi-pencil", text: "매출관리" },
    ],
  },
  getters: {
    getIndexList(state) {
      return state.indexList;
    },
    getNowNum(state) {
      return state.nowNum;
    },
  },
  mutations: {
    setNowNum(state, value) {
      state.nowNum = value;
    },
  },
  actions: {},
};
