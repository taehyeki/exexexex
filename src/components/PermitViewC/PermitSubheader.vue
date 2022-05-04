<template lang="">
  <v-subheader v-if="title == 'addr'">
    주소(사무소)
  </v-subheader>
  <v-subheader v-else-if="title == 'siteName'">
    사이트 이름
  </v-subheader>
  <v-subheader v-else-if="title == 'permitRegCode'">
    허가증 번호
  </v-subheader>
  <v-subheader v-else-if="title == 'bizRegCode'">
    사업자 등록번호
  </v-subheader>
  <v-subheader v-else-if="title == 'repName'">
    성명(대표자)
  </v-subheader>
  <v-subheader v-else-if="title == 'compName'">
    컴퍼니 이름
  </v-subheader>
</template>
<script>
export default {
  props : {
    title : {
      type : String,
      default : ''
    }
  }
}
</script>
<style lang="">

</style>
