import axios from 'axios'
import store from "@/store/index"

const instance = axios.create({
  // .env 파일에 작성한 환경변수로 baseURL 설정
  baseURL: process.env.VUE_APP_API

});

instance.interceptors.request.use(
  function(config) {
    store.commit('common/getLoading')
    return config;
  },
  function(error) {
    store.commit('common/endLoading')
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  function(response) {
    store.commit('common/endLoading')
    return response;
  },
  function(error) {
    store.commit('common/endLoading')
    return Promise.reject(error);

  },
)

function myAxios(url,method,data,config=null){
  if(config != null) {
    if (method == 'post'){
      return instance.post(url,data,config)
    }
    else {
      return instance.get(url,data,config)
    }
  }
  if (method == 'post'){
    return instance.post(url,data)
  }
  else {
    return instance.get(url,data)
  }
}

export default myAxios
