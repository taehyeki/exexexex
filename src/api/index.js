import axios from 'axios'
import store from '@/store'
const instance = axios.create({
  // .env 파일에 작성한 환경변수로 baseURL 설정
  baseURL: process.env.VUE_APP_API
});

instance.interceptors.request.use(
  async function(config) {
    store.dispatch('common/getLoding')
    return config;
  },
  function(error) {
  //   store.dispatch('common/endLoding')
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  function(response) {
    store.dispatch('common/endLoading')
    return response;
  },
  function(error) {
    // store.dispatch('common/endLoading')
    return Promise.reject(error);
  },
)

function myAxios(url,method,data){
  if (method == 'post'){
    return instance.post(url,data)
  }
  else {
    return instance.get(url,data)
  }
}

export default myAxios
