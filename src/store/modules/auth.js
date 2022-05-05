import myAxios from "@/api"
import VueCookies from "vue-cookies";
import router from "@/router"
export default {
  namespaced : true,
  state : {
    userId : null,
    class : null,
  },
  mutations : {
    setUser(state, {userId, classNum}){
      state.userId = userId
      state.class = classNum
    }
  },
  actions : {
    async login({commit},{adminId,adminPw}){
      const method = 'post'
      const url = 'api/admin/common/admin_login'
      let data =
      {
        params :
          JSON.stringify(
          [
            {
              ID : adminId,
              PW : adminPw,
            }
          ]
        )
      }
      try {
        const res = await myAxios(url,method,data)
        const state = res.data.state
        console.log(res)
        if ( state == 100001 ) {
          alert('아이디가 존재하지 않습니다.')
          return
        }

        if (res.data.data == null ){
          alert('비밀번호가 일치하지 않습니다.')
          return
        }
        const getData = JSON.parse(res.data.data)
        const userId = getData.ID
        const classNum = getData.CLASS
        const token = res.data.token.token
        VueCookies.set('token',token,'60 * 30' )
        commit('setUser',{userId,classNum })
        router.push({path : '/admin/main2/permit2'})
      }catch (e) {
        console.log(e)
      }
    }
  },
  getters : {

  }
}
