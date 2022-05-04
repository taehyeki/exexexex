<template>
  <div>
    <v-row>
      <v-col>
        <v-select
          :items="getOptList.optSelect"
          label="종류"
          solo
          @change="changeSelect"
        />
      </v-col>
      <v-col>
        <div
          id="search-input"
          style="display : none"
        >
          <v-text-field
            v-model="keyword"
            placeholder="검색어 🚀"
            solo
          />
        </div>
      </v-col>
      <v-col>
        <v-btn @click="searchBtn">
          검색하기
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations} from "vuex"
export default {
  data(){
    return {
      keyword : ''
    }

  },
  computed : {
    ...mapGetters('selectedUser',['getOptList','getSeletedUser'])
  },
  methods : {
    ...mapActions('selectedUser',['getSelectedUserInfo']),
    ...mapMutations('selectedUser',['setCircleRange','setTypeIndex']),
    changeSelect(v){
      const el = document.getElementById('search-input')
      if(v == '거리'){
        el.style.display = ''
        this.setTypeIndex(0)
      } else {
        this.keyword = ''
        el.style.display = 'none'
      }
    },
    searchBtn(){

      if (this.keyword == ''){
        alert('거리를 입력해주세요. ex) 50km >>> 50 ')
      } else {
        console.log(this.getSeletedUser.siteId)
        this.setCircleRange(this.keyword)
        console.log('여기 지난 뒤에 지도가 업데이트 될 듯?')
        this.getSelectedUserInfo({siteId : this.getSeletedUser.siteId})
      }
    }
  }
}
</script>
<style lang="">

</style>
