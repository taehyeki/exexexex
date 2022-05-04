<template>
  <div>
    <DefaultBar />
    <topInfo />

    <v-row>
      <v-col cols="12">
        허가증 등록
      </v-col>
      <v-col cols="8">
        <SimpleData
          :height="300"
          :table-content="subTable"
          :btn-click="btnClick"
        />
      </v-col>
      <v-col
        cols="4"
      >
        <CalenDars />
      </v-col>
    </v-row>
  </div>
</template>
<script>

import DefaultBar from "@/components/DefaultBar"
import CalenDars from "@/components/CalenDars"
import topInfo from "@/components/TopInfo"
import SimpleData from "@/components/SimpleData"

import {mapActions, mapGetters, mapState} from "vuex"
export default {

  components : {
    DefaultBar,topInfo,SimpleData,CalenDars
  },
  computed : {
    ...mapGetters('main',['returnNowTargetInfo']),
    ...mapState('main',['subTable'])

  },
  created() {
    this.getMainInfo()
    this.getMoreTargetInfo()
    this.checkIfExistLicense()
    this.getSubTable()
  },
    methods : {
    ...mapActions('main',['getMainInfo','getMoreTargetInfo','checkIfExistLicense','getSubTable']),
    btnClick(e){
      console.log(e)
    }
  },
}
</script>
