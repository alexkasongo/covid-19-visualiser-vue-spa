<template>
  <div class="summary">
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
        summaryChart: summaryChart,
    }
  },
  methods: {
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
        Chart.defaults.global.defaultFontColor = '#eee';
        // eslint-disable-next-line no-unused-vars
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: countries,
                datasets: [{
                  label: 'Number of Confirmed Cases',
                  data: totalConfirmed,
                  backgroundColor: coloR,
                  minBarLength: 2,
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
                        padding: 10,
                        autoSkip: false,
                    }
                  }],
                  xAxes: [{
                      gridLines: {
                        offsetGridLines: true
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
.summary {

  height: 1000vh;
  background-color: #2D3143;
  border-radius: 4px;

  &__type {
    margin: 0px;
  }
}
</style>
