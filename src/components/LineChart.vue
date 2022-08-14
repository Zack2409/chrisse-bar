<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
     this.dates = this.$store.state.dates
  },
  
  data() {
    return {
      dates: [],
      chartData: {
        labels: this.$store.state.dates,
        datasets: [
          {
          label: "Day's Total",
          backgroundColor: '#6C63FF',
          data: this.$store.state.totals
          }
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  // computed: {
  //   dates(){
  //     return this.$store.state.dates
  //   },
  //   totals(){
  //     return this.$store.state.totals
  //   }
  // }
}
</script>