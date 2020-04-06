<template>
  <div class="chart">
    <h2 class="chart__type">South Africa</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from 'chart.js';

export default {
  name: 'SouthAfrica',
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
      .get('https://api.covid19api.com/live/country/south-africa/status/confirmed')
      .then(response => {
        console.log(`America.vue - 42 - variable`, response);
        let america = [];
        // let americaFeed = []
        let coloR = [];

        // generate dynamic colors
        var dynamicColors = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
         };

        const confirmed = []
        const deaths = []
        const recovered = []
        const date = []

        // initial data loop
        for (let data of response.data) {
            america.push(data);
        }

        // console.log(`America.vue - 63 - variable`, america);
        
        // second data loop, goes deeper and allows selecting of countries, total deaths etc

        for (var i = 0; i < america.length; i++) {
          confirmed.push(america[i].Confirmed)
          deaths.push(america[i].Deaths)
          recovered.push(america[i].Recovered)
          date.push(america[i].Date)

          coloR.push(dynamicColors());
        }
        
        console.log(`America.vue - 76 - variable`, confirmed);
        // NOTE currently not being used but should be used if app grows
        // dispatch state/data to store for state manangenet
        // this.$store.dispatch("updateSummary", americaFeed);

        var chart = this.$refs.chart;
        var ctx = chart.getContext("2d");
        // eslint-disable-next-line no-unused-vars
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: date,
                datasets: [{
                    label: 'Number of Confirmed Cases',
                    // data: totalConfirmed,
                    data: confirmed,
                    backgroundColor: coloR,
                    // borderColor: [
                    //     '#222'
                    // ],
                    borderWidth: 2
                },
                // another line graph
                { 
                  label: 'Number of Confirmed Deaths',
                  data: deaths,
                  backgroundColor: '#222',
                  // borderColor: [
                  //   '#000',
                  // ],
                  borderWidth: 2
                },
                { 
                  label: 'Number of Confirmed Recoveries',
                  data: recovered,
                  backgroundColor: '#00ab66',
                  // borderColor: [
                  //   '#000',
                  // ],
                  borderWidth: 2
                }
                ]
            },
            options: {
              // maintainAspectRatio: false,
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

  &__type {
    margin: 0px;
  }

}
</style>
