<template>
  <v-btn
    :id="id"
    elevation="0"
    class="btn-default"
  >
    <v-icon left>
      {{ iconName }}
    </v-icon>
    {{ text }}
  </v-btn>
</template>
<script>
export default {
  props : {
    id : {
      type : Number,
      default : 0
    },
    text : {
      type : String,
      default : '기본 버튼',
    },
    iconName : {
      type : String,
      default : ' '
    }
  }
}
</script>
<style  scoped>
</style>
