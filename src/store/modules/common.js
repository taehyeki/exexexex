export default {
  namespaced : true,
  state : {
    loading : false
  },
  mutations : {
    getLoding(){
      this.loading = true
      console.log(this.loading)
    },
    endLoding(){
      this.loading = false
      console.log(this.loading)
    }
  },
  actions : {

  },
  getters : {

  }
}
