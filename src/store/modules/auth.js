import VueCookies from "vue-cookies";
import router from "@/router";
import cloneDeep from "lodash/cloneDeep";
import authApi from "@/api/apiList/authApi"

const INITIAL_STATE = {
  userId: null,
  class: null,
  chatRooms : [],
  sockets : 0,
  chats : [],
};
const showCreated = (time) =>{
  return time.slice(11,16)
}
const isRead = (tf) => {
  if(!tf){
    return '안읽음'
  }
  return ''
}

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
    setChatRooms(state,payload){
      state.chatRooms = payload
    },
    setChats(state,payload){
      for (var i=0; i<payload.length; i++){
        if (
          i > 0 &&
          // 내가 적은 글
          // 글의 작성자가 나여야 하고,
          payload[i].USER_ID == state.userId &&
          // 채팅 ( 디비에서 가져온 채팅이 아닌 채팅창에서 적은) 이 존재해야하며
          payload[i - 1] &&
          // 전 채팅 작성시각이 같아야하고
          payload[i - 1].CREATED_AT == showCreated(payload[i].CREATED_AT) &&
          // 전 채팅 작성자가 나와 같아야 한다.
          payload[i - 1].USER_ID == state.userId
        ){
          // 전 글의 시각을 숨김
          payload[i - 1].CREATED_AT = ''
        }
      // 상대가 적은 글
        else if (
          i > 0 &&
          payload[i].USER_ID != state.userId &&
          payload[i - 1] &&
          payload[i - 1].CREATED_AT == showCreated(payload[i].CREATED_AT) &&
          payload[i - 1].USER_ID != state.userId
          ){
            payload[i - 1].CREATED_AT = ''
          }
          payload[i].CREATED_AT = showCreated(payload[i].CREATED_AT)
          payload[i].IS_READ = isRead(payload[i].IS_READ)
      }
      state.chats = payload
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

    async chatRooms({state,commit }) {
      try{
        const res = await authApi.chatRooms({userId : state.userId });
        let chatRooms = res.data.data[0].LAST_MESSAGES
        chatRooms = chatRooms.map( (v)=>{ return {ROOM_ID : v.ROOM_ID, MESSAGE : v.MESSAGE, UNREAD : v.UNREAD}})
        commit('setChatRooms',chatRooms)
      }catch(e){
        console.log(e)
      }
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
    getUserId(state){
      return state.userId
    },
    getChatRooms(state){
      return state.chatRooms
    },
    getChats(state){
      return state.chats
    },

    getSocket(state){
      return state.sockets
    }
  },
};

