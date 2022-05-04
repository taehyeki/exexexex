<template>
  <div>
    <input
      v-model="search.keyword"
      type="text"
      placeholder="검색어를 입력해주세요 🔍"
      style="height : 50px; width : 200px; border : 1px solid; border-radius : 10px; text-align : center"
      @keyup.enter="gogo"
    >
  </div>
</template>
<script>
import {mapActions,mapState} from "vuex"
export default {
  // data(){
  //   return {
  //     inputData : ''
  //   }
  // },
  computed : {
    ...mapState('permit',['now','search'])
  },
  methods : {
    ...mapActions('permit',['getPermits']),
    gogo(){
      this.getPermits({confirmed : this.now})
    }
  }

}
</script>
<style >

</style>
