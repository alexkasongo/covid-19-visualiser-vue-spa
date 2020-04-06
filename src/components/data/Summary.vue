<template>
  <div class="chart">
    <h1>Keeping Up With The Covid</h1>
    <h4 class="chart__type">Global Summary Chart</h4>
    <!-- <canvas id="summary-chart"></canvas> -->
    <canvas ref="chart"></canvas>
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
  mounted () {
    this.$http
      .get('https://api.covid19api.com/summary')
      .then(response => {
        let summaryData = [];

        const countries = []
        const totalConfirmed = []
        const totalDeaths = []

        for (let country of response.data.Countries) {
            summaryData.push(country);
        }
            
        for (var i = 0; i < summaryData.length; i++) {
          // console.log(`Summary.vue - 68 - variable`, summaryData[i]);
          countries.push(summaryData[i].Country)
          totalConfirmed.push(summaryData[i].TotalConfirmed)
          totalDeaths.push(summaryData[i].TotalDeaths)
        }

        console.log(`Summary.vue - 70 - variable`, countries);
      }
    );

    // console.log(`Summary.vue - 73 - variable`, countries);

    var chart = this.$refs.chart;
      var ctx = chart.getContext("2d");
      // eslint-disable-next-line no-unused-vars
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
              // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
              datasets: [{
                  label: '# of Votes',
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
        
  },
  computed: {
    ...mapGetters({
        updateSummary: "summaryFeed"
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 2000vh;

  &__type {
    margin: 0px;
  }
}
</style>
