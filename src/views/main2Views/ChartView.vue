<template>
  <v-container>
    <v-card style="padding : 40px ">
      <BarChart :title="getTitle" />
    </v-card>
  </v-container>
</template>
<script>
import BarChart from "@/components/ChartC/BarChart.vue"
import {mapActions,mapGetters} from "vuex"
export default {
  components : {
    BarChart
  },

  computed : {
    ...mapGetters('chart',['getTitle'])
  },
  created(){
    this.getBarChartInfo()

  },
  methods : {
    ...mapActions('chart',['getBarChartInfo'])
  }

}
</script>
<style lang="">

</style>
