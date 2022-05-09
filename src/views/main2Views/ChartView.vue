<template>
  <v-container>
    <v-card style="padding : 40px ">
      <BarChart />
    </v-card>
  </v-container>
</template>
<script>
import BarChart from "@/components/ChartC/BarChart.vue"
import {mapActions} from "vuex"
export default {
  components : {
    BarChart
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
