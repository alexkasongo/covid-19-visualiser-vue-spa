<template>
  <div class="chart">
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
        let summaryDataFeed = []
        let coloR = [];

        // generate dynamic colors
        var dynamicColors = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
         };

        const countries = []
        const totalConfirmed = []
        const totalDeaths = []

        // initial data loop
        for (let country of response.data.Countries) {
            summaryData.push(country);
        }
        
        // second data loop, goes deeper and allows selecting of countries, total deaths etc
        for (var i = 0; i < summaryData.length; i++) {
          countries.push(summaryData[i].Country)
          totalConfirmed.push(summaryData[i].TotalConfirmed)
          totalDeaths.push(summaryData[i].TotalDeaths)
          coloR.push(dynamicColors());
        }

        // NOTE currently not being used but should be used if app grows
        // dispatch state/data to store for state manangenet
        this.$store.dispatch("updateSummary", summaryDataFeed);

        var chart = this.$refs.chart;
        var ctx = chart.getContext("2d");
        // eslint-disable-next-line no-unused-vars
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: countries,
                datasets: [{
                    label: 'Number of Confirmed Cases',
                    data: totalConfirmed,
                    // data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: coloR,
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                },
                // another line graph
                { 
                  label: 'Number of Confirmed Deaths',
                  data: totalDeaths,
                  backgroundColor: '#222',
                  borderColor: [
                    '#000',
                  ],
                  borderWidth: 2
                }
                ]
            },
            options: {
              maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            padding: 25,
                            autoSkip: false,
                        }
                    }]
                }
            }
        });

      }
    );
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
