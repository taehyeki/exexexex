<template>
  <v-container>
    <TitleText class="title-text" />
    <v-card class="top-card">
      <SiteInfo />
    </v-card>

    <v-card class="top-card">
      <v-row>
        <v-col cols="6">
          <SiteMap2 />
        </v-col>
        <v-col
          cols="6"
        >
          <OptList />
          <mapListTable />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import SiteInfo from "@/components/Permit2ViewC/SiteInfo.vue"
import TitleText from "@/components/Permit2ViewC/TitleText.vue"
import SiteMap2 from "@/components/Permit2ViewC/SiteMap2.vue"
import OptList from "@/components/ContentC/OptList.vue"
import mapListTable from "@/components/ContentC/mapListTable.vue"


import {mapActions} from "vuex"
export default {
  components : {
    SiteInfo,TitleText,SiteMap2,OptList,mapListTable
  },
  watch : {
    $route(to) {
      // 네비게이션에서 버튼을 눌렀을 경우에 그 파라미터 값을 받아와서
      // 페이지번호 를 받아온 값으로 바꾸고 데이터들을 불러옴
      // 페이지 번호를 Number로 바꿔준다. 만약 아무 값이 없다면 NaN이 나오니까 아래에서 1로 바꿔주는 작업을 진행
      // this.controlQuerySetAndGetPermitList(to)

      const siteId = to.params.id
       this.getSelectedUserInfo({siteId, circleRange : null})

    }
  },
  created(){
    this.getSelectedUserInfo({siteId : this.$route.params.id, circleRange : null})
  },
  methods : {
    ...mapActions('selectedUser',['getSelectedUserInfo']),

  }
}
</script>
<style lang="scss">
.top-card {
  padding : 40px;
  margin-bottom: 40px;
}
.title-text {
  margin-top: 10px;
  margin-bottom: 10px;
}
@media (max-width: 600px) {
  .top-card {
      padding-left : 5px;
      padding-right : 5px;
      margin-bottom: 40px;
  }
}
</style>
