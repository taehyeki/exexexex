<template>
  <v-card class="permit-unit">
    <div class="permit-box">
      <v-row
        justify="space-between"
      >
        <v-col
          cols="auto"
          class="unit-title"
        >
          상호명
        </v-col>
        <v-col cols="auto">
          {{ info.SITE_NAME }}
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col
          cols="auto"
          class="unit-title"
        >
          사업자 등록번호
        </v-col>
        <v-col cols="auto">
          {{ info.COMPANY_INFO[0].BIZ_REG_CODE }}
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col
          cols="auto"
          class="unit-title"
        >
          허가증 등록번호
        </v-col>
        <v-col cols="auto">
          {{ info.PERMIT_REG_CODE }}
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col
          cols="auto"
          class="unit-title"
        >
          등록 요청시간
        </v-col>
        <v-col cols="auto">
          {{ getTime(info.CREATED_AT) }}
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script>
export default {
props : {
  info : {
    type : Object,
    default : ()=> {}
  }
},
created(){
  console.log('유닛 하나 하나 생성')
  console.log(this.info)
},
methods : {
  getTime(time){
    return time.slice(0,19)
  }
}
}
</script>
<style lang="scss">
.permit-unit {
  background-color: #EEEFF3 !important;
  margin-top : 24px;
  width : 280px;
  height : 110px;
  padding-left : 20px;
  padding-right : 20px;
  cursor: pointer;
  .unit-title {
    color : #939393
  }
  p {
    margin-bottom: 5px;
  }
}
.permit-box {
  font-size : 12px;
 .row {
   margin : 0
 }
 .col {
   padding: 0
 }
}

</style>
