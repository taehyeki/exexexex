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
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import SiteInfo from "@/components/Permit2ViewC/SiteInfo.vue"
import TitleText from "@/components/Permit2ViewC/TitleText.vue"
import SiteMap2 from "@/components/Permit2ViewC/SiteMap2.vue"


import {mapActions} from "vuex"
export default {
  components : {
    SiteInfo,TitleText,SiteMap2
  },
  created(){
    this.getSelectedUserInfo(this.$route.params.id)
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
</style>
