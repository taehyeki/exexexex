<template>
  <div style="margin-bottom : 15px">
    <v-row>
      <v-col>
        <v-select
          :items="getOptList"
          label="종류"
          hide-details=""
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
            hide-details=""
            placeholder="검색어 🚀"
            solo
          />
        </div>
      </v-col>
      <v-col align-self="center">
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
    ...mapGetters('emissions',['getOptList'])
  },
  methods : {
    ...mapActions('emissions',['collectorListWithin']),
    ...mapMutations('emissions',['setCircleRange']),
    changeSelect(v){
      const el = document.getElementById('search-input')
      if(v == '거리'){
        el.style.display = ''
      } else {
        this.keyword = ''
        el.style.display = 'none'
      }
    },
    searchBtn(){
      if (this.keyword == ''){
        alert('거리를 입력해주세요. ex) 50km >>> 50 ')
      } else {
        this.setCircleRange(this.keyword)
        this.collectorListWithin()
      }
    }
  }
}
</script>
<style lang="">

</style>
