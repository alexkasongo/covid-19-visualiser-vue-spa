<template>
  <div class="chart">
    <h1>Keeping Up With The Covid</h1>
    <h4 class="chart__type">Global Summary Chart</h4>
    <canvas id="summary-chart"></canvas>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from 'chart.js';
import summaryChart from '@/chart-data.js';

export default {
  name: 'Summary',
  props: {
    msg: String
  },
  data() {
    return{
        summary: null,
        componentKey: 0,
        summaryChart: summaryChart,
    }
  },
  mounted () {
    this.$http
      .get('https://api.covid19api.com/summary')
      .then(response => {
        let summaryData = [];

        for (let country of response.data.Countries) {
          if (country) {
            summaryData.push(country);
            this.$store.dispatch("updateSummary", summaryData);
          }
        }
      }
    );
    //create chart
    this.createChart('summary-chart', this.summaryChart);
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      // eslint-disable-next-line no-unused-vars
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    }
  },
  computed: {
    ...mapGetters({
        updateSummary: "summaryFeed"
    })
  },
  // created() {
  //     this.$store.dispatch('fetchVisits')
  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 1000vh;

  &__type {
    margin: 0px;
  }
}
</style>
