<template>
  <v-row
    justify="end"
    style="padding-top : 36px; margin-bottom  : 12px;"
  >
    <v-col
      cols="auto"
      style="padding : 0; "
    >
      <v-btn>
        <div>실시간 알림</div>
        <v-icon
          small
          style="margin-left : 4px"
        >
          mdi-volume-high
        </v-icon>
      </v-btn>
    </v-col>
    <v-col
      cols="auto"
      style="padding-left : 8px; padding-top : 0px; padding-bottom : 0px"
    >
      <v-btn style="">
        <div>로그아웃</div>
        <v-icon
          small
          style="margin-left : 4px"
        >
          mdi-logout-variant
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {

}
</script>
<style scoped>
.row .col button {
  width : 120px;
  font-size: 12px;
  border-radius: 10px;
  color : white;
  font-weight: bold;
  height: 32px !important;
  background-color: #5A53F1 !important;
}
.row .col button div {
  text-decoration: underline;
}
</style>
