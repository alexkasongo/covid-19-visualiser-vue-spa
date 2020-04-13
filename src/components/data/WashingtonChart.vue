<template>
  <div class="washingtonChart">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from 'chart.js';

export default {
  name: 'WashingtonChart',
  props: {
    msg: String
  },
  data() {
    return{
        summary: null,
        componentKey: 0,
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
      .get('https://api.covid19api.com/live/country/united-states/status/confirmed')
      .then(response => {
        let america = [];
        // let coloR = [];

        const test = []
        // const washingtonData = test.filter((state) => {
        //   return state
        // })

        // generate dynamic colors
        // var dynamicColors = function() {
        //     var r = Math.floor(Math.random() * 255);
        //     var g = Math.floor(Math.random() * 255);
        //     var b = Math.floor(Math.random() * 255);
        //     return "rgb(" + r + "," + g + "," + b + ")";
        //  };

        // const confirmed = []
        // const deaths = []
        // const recovered = []
        // const date = []
        // const newCases = []

        // initial data loop
        for (let data of response.data) {
          america.push(data);
        }

        // second data loop, goes deeper and allows selecting of countries, total deaths etc
        for (var i = 0; i < america.length; i++) {

          // confirmed.push(america[i].Confirmed)
          // deaths.push(america[i].Deaths)
          // recovered.push(america[i].Recovered)
          // date.push(this.moment(america[i].Date).format('D/M'))
          // newCases.push(america[i].Active.length)
          // coloR.push(dynamicColors());
          test.push(america[i])
        }

        console.log(`WashingtonChart.vue - 76 - variable`, test);

        // washington data only
        // const washington = state.summaryFeed[0].filter((state) => {
        //   return state.Province === "Washington"
        // })

        var chart = this.$refs.chart;
        var ctx = chart.getContext("2d");
        Chart.defaults.global.defaultFontColor = '#eee';
        // eslint-disable-next-line no-unused-vars
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: 'date',
                // labels: date,
                datasets: [{
                  label: `New Cases by Day`,
                  // label: `New Cases by Day: Last ${confirmed.length } Days`,
                  data: 'confirmed',
                  // data: confirmed,
                  backgroundColor: '#4BC0C0',
                  minBarLength: 2,
                },
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
    }),
    filteredSum() {
        return this.$store.getters.filtered
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.washingtonChart {
  
  height: 290px;
  background-color: #1C1F2B;
  border-radius: 4px;
  margin: 0px 5px 5px 5px;

  &__type {
    margin: 0px;
  }

}
</style>
