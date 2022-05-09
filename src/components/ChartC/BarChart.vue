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
          @change="changeYear"
        />
      </v-col>
      <v-col cols="auto">
        <v-select
          :items="month"
          label="월별"
          hide-details=""
          style="width : 150px"
          solo
        />
      </v-col>
      <v-col cols="auto">
        <v-btn @click="sendYearMonth">
          선택 🚀
        </v-btn>
      </v-col>
    </v-row>
    <h2 class="text-center mb-4">
      {{ title }}
    </h2>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { mapGetters } from "vuex"
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
      nowYear : '',
      month : [],
      years : [2022],
      loaded : false,
      chartData: {
        labels: [
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '11월',
          '12월'
        ],
        title : {
          display : true,
          text : '안녕'
        },
        datasets: [
          {
            label: '수거자',
            backgroundColor: '#f87979',
            data: [123]
          },
          {
            label: '배출자',
            backgroundColor: '#1868c1',
            data: [51]
          },

        ],

      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,

        tooltips: {
         callbacks: {
            title: function(t, d) {
              console.log(t,d)
               return d.labels[t[0].index];
            }
         }
        },
        scales: {
         xAxes: [{
            ticks: {
               callback: function(t) {
                 console.log(t)
                  var maxLabelLength = 3;
                  if (t.length > maxLabelLength) return t.substr(0, maxLabelLength) + '...';
                  else return t;
               }
            }
         }],
         yAxes: [{
            ticks: {
               beginAtZero: true,
               stepSize: 1
            }
         }]
      },
      legend: {
         display: false
      },
      }
    }
  },
  computed : {
    ...mapGetters('chart',['getNowYear'])
  },
  created(){
    this.nowYear = this.getNowYear
  },

  methods : {
    changeYear(e){
      console.log(e)
    },
    sendYearMonth(){
      console.log(this.nowYear)
    }
  },
}
</script>
