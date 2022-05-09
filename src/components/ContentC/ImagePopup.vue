<template>
  <v-dialog
    :value="dialog"
    width="900"
    @click:outside="closeImgDialog"
  >
    <v-card>
      <v-img :src="imgUrl" />
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props : {
    dialog : {
      type : Boolean,
      default : false
    },
    imgUrl : {
      type : String,
      default : ''
    }
  },
  methods : {
    closeImgDialog(){
      this.$emit('close')
    }
  }
}
</script>
<style lang="">

</style>
