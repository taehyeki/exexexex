<template>
  <v-date-picker
    v-model="picker"
    :events="arrayEvents"
    locale="kr"
  />
</template>
<script>
export default {
      data () {
      return {
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        arrayEvents : []
      }
    },



    mounted(){
        this.arrayEvents = [...Array(6)].map(() => {
        const day = Math.floor(Math.random() * 30)
        const d = new Date()
        d.setDate(day)
        return d.toISOString().substr(0, 10)
      })
    },
}
</script>
<style >
.v-picker__title.primary{
  display : none
}

</style>
