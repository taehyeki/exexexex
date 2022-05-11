import VueCookies from "vue-cookies";
import router from "@/router";
import cloneDeep from "lodash/cloneDeep";
import authApi from "@/api/apiList/authApi"



const INITIAL_STATE = {
  userId: null,
  class: null,
};

export default {
  namespaced: true,
  state: cloneDeep(INITIAL_STATE),
  mutations: {
    setUser(state, { userId, classNum }) {
      state.userId = userId;
      state.class = classNum;
    },
    logout(state) {
      VueCookies.remove("token");
      location.reload()
      Object.assign(state, cloneDeep(INITIAL_STATE));
    },
  },
  actions: {
    async login({ commit }, { adminId, adminPw }) {
      let res
      try{
        res = await authApi.login({adminId,adminPw});
      }catch(e){
        console.log(e)
      }
      const state = res.data.state;
      if (state == 100001) {
        alert("아이디가 존재하지 않습니다.");
        return;
      }
      if (res.data.data == null) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      const getData = JSON.parse(res.data.data);
      const userId = getData.ID;
      const classNum = getData.CLASS;
      const token = res.data.token.token;
      VueCookies.set("token", token, "6h");
      commit("setUser", { userId, classNum });
      router.push({ path: "/admin/main2/permit2" });

    },
  },
  getters: {
    getUserClass(state) {
      if (state.class == null) {
        return "로그인을 해주세요.";
      } else if (state.class == 101) {
        return "총괄 관리자";
      }
      return "일반 관리자";
    },
    isLogged(state) {
      if (state.userId) {
        return true;
      }
      return false;
    },
    canYouComeHere1(state) {
      if (state.class == 101) {
        return true;
      }
      return false;
    },
  },
};
