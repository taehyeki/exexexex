<template>
  <v-radio-group
    v-model="value"
    row
    hide-details=""
    @change="selected"
  >
    <v-radio
      label="확인만"
      value="confirmed"
    />
    <v-radio
      label="미확인만"
      value="not"
    />
    <v-radio
      label="모두"
      value="all"
    />
  </v-radio-group>
</template>
<script>
import {mapActions} from "vuex"
export default {
  data(){
    return{
      value : 'all'
    }
  },
  methods : {
    ...mapActions('permit',['getPermits']),
    selected(e){
      switch (e){
        case 'confirmed':
          this.getPermits(true)
          break
        case 'not':
          this.getPermits(false)
          break
        case 'all':
          this.getPermits(null)
      }
    }
  }
}
</script>
<style lang="">

</style>
