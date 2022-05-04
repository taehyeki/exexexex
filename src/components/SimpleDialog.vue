<template>
  <v-dialog
    :value="value"
  >
    <v-sheet
      class="text-center"
      style="height : 400px;"
    >
      안녕하세요
      <v-spacer>
        <v-btn @click="closeD">
          확인
        </v-btn>
      </v-spacer>
    </v-sheet>
  </v-dialog>
</template>
<script>
export default {
  props : {
    value : {
      type : Boolean,
      default : false
    }

  },
  methods : {
    closeD(){
      this.$emit('closeD')
    }
  }
}
</script>
<style >

</style>
