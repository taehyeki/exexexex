<template>
  <div>
    <v-row
      justify="end"
      style="margin-bottom : 20px"
    >
      <v-col cols="auto">
        <v-select
          v-model="nowYear"
          :items="years"
          label="연도별"
          solo
          hide-details=""
          style="width : 150px"
        />
      </v-col>
      <v-col cols="auto">
        <v-select
          v-model="nowMonth"
          :items="getBarMonth"
          label="월별"
          hide-details=""
          style="width : 150px"
          solo
          @change="sendYearMonth"
        />
      </v-col>
    </v-row>
    <h2 class="text-center mb-4">
      {{ title }}
    </h2>
    <Bar
      v-if="loaded"

      :chart-options="chartOptions"
      :chart-data="getDataSet"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { mapGetters, mapActions, mapMutations } from "vuex"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    height: {
        type: Number,
        default: 400
    },
    title : {
        type: String,
      default: ''
    }
  },

  data() {
    return {
      nowYear : 2022,
      nowMonth : '전체',
      month : [],
      years : [2022],
      loaded : true,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      }
    }
  },
  computed : {
    ...mapGetters('chart',['getNowYear','getBarMonth','getEmitColMonth','getBarTotalDay','getBarTotalMonth','getEmitColDay','getDataSet'])
  },


  methods : {
    ...mapActions('chart',['getBarChartInfo']),
    ...mapMutations('chart',['setNowYear','setNowMonth']),

    async sendYearMonth(){
      this.loaded = false
      this.setNowYear(this.nowYear)
      this.setNowMonth(this.nowMonth)
      if (this.nowMonth == '전체'){
        this.setNowMonth(null)
      }
      await this.getBarChartInfo()
      this.loaded = true
    }
  },
}
</script>
