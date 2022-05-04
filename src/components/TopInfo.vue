<template>
  <div>
    <v-card
      class="topInfo"
      style="position : relative"
    >
      <v-row>
        <v-col
          id="0"
          cols="auto"
          style="
        padding-top : 0px;
        padding-bottom : 0px;
        padding-left : 0px;
        margin-left : 461px
        "
        >
          <v-card-title
            id="title"
            style="
          padding-top : 0px ;
          padding-bottom : 0px;
          padding-left : 0px;
          margin-top : 20px"
          >
            실시간 현황
            <span
              v-if="returnDuration != 1"
              id="after-title"
            >
              *{{ returnDuration }}일 기준으로 초기화
            </span>
            <span
              v-else
              id="after-title"
            >
              *{{ returnDuration * 24 }}시간 기준으로 초기화
            </span>
          </v-card-title>
        </v-col>
      </v-row>

      <v-row
        justify="space-around"
        style="
      margin-top : 24px;
      "
      >
        <v-col
          v-for="value,key,idx in returnTopInfo"
          :id="idx"
          :key="idx"
          cols="auto"
          style="
        padding-top : 0px ;
        padding-bottom : 0px;
        cursor:pointer
        "
          @click="nowTargetClick"
        >
          {{ key }}
          <span
            class="info-div"
          >
            {{ value }}
          </span>
        </v-col>
      </v-row>
      <div style="height: 60px" />
      <v-row justify="center">
        <v-col
          cols="auto"
          style="
        padding-bottom : 0px;
        font-size : 20px;
        font-weight : bold;
        "
        >
          {{ returnTopInfoTitle }} 상세내역
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TopInfoMore />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          id="bottom-btn"
          cols="auto"
          style="padding-top : 0px; padding-bottom : 0px ; z-index : 10"
        >
          <v-icon @click="btnClick">
            mdi-pencil
          </v-icon>
        </v-col>
      </v-row>
    </v-card>
    <QuestionAnswer :value="dailogValue" />
  </div>
</template>
<script>

import TopInfoMore from '@/components/TopInfoMore.vue'
import QuestionAnswer from '@/components/QuestionAnswer.vue'
import { mapGetters, mapMutations,mapActions} from "vuex"
export default {
  components : {
    TopInfoMore,QuestionAnswer
  },

  data(){
    return {
      dailogValue : false
    }
  },
    computed : {
    ...mapGetters('main',['returnTopInfo','returnDuration','returnTopInfoTitle'])
  },
  methods : {
    ...mapMutations('main',['setNowTarget']),
    ...mapActions('main',['getMoreTargetInfo','checkIfExistLicense','getSubTable']),
    btnClick(){
      const topInfo = document.querySelector('.topInfo')
      topInfo.classList.toggle('active')
    },
    nowTargetClick(e){

      let id = e.target.id

      if (id == "") {
        id = e.target.parentNode.id
      }
      console.log(id)
      if (id == 3) {
        this.dailogValue = true
        return
      }
      console.log(id,'next')
      this.setNowTarget(Number(id))
      this.getMoreTargetInfo()
      this.checkIfExistLicense()
      this.getSubTable()
    }

  },



}

</script>
<style scoped>
.topInfo {
  position : relative;
  border-radius: 24px !important;
  margin-top : 40px;
  width : 1000px;
  height: 124px ;
  overflow: hidden;
  box-shadow: 4px 4px 10px 4px #EEEFF3 !important;
}
.active {
  height: 630px  ;
}
#bottom-btn {

     position:absolute;
    bottom: 4px;
    width : 24px;
    height : 24px;


}
.info-div {

  border: 2px solid #5A53F1;
  color: #5A53F1;
  display: inline-block;
  border-radius: 15px;
  text-align: center;
  margin-left: 4px ;
  width: 72px;
  height: 28px;

}
#title {

  font-size: 20px;
  font-weight: bold;
}
#after-title{
  color: #FF6C03;
  font-size: 10px ;
  font-weight: normal;
  margin-left : 8px;

}
</style>
