<template>
  <div class="america">
    <!-- <h1>Keeping Up With The Covid</h1> -->
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from 'chart.js';
// import America from '@/components/data/America';

export default {
  name: 'America',
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
        let washington = []
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
        
        washington = america.filter(function(item) {
            return item.Province === "Washington"
          }
        );

        // second data loop, goes deeper and allows selecting of countries, total deaths etc

        for (var i = 0; i < washington.length; i++) {
          confirmed.push(washington[i].Confirmed)
          deaths.push(washington[i].Deaths)
          recovered.push(washington[i].Recovered)
          date.push(this.moment(washington[i].Date).format('LLLL'))  

          coloR.push(dynamicColors());
        }
        
        // NOTE currently not being used but should be used if app grows
        // dispatch state/data to store for state manangenet
        // this.$store.dispatch("updateSummary", americaFeed);

        var chart = this.$refs.chart;
        var ctx = chart.getContext("2d");
        Chart.defaults.global.defaultFontColor = '#eee';
        // eslint-disable-next-line no-unused-vars
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: date,
                datasets: [{
                    label: 'Confirmed Cases',
                    // data: totalConfirmed,
                    data: confirmed,
                    backgroundColor: '#14EBE0',
                    // borderColor: [
                    //     '#222'
                    // ],
                    borderWidth: 2
                },
                // another line graph
                { 
                  label: 'Confirmed Deaths',
                  data: deaths,
                  backgroundColor: '#FF6384',
                  // borderColor: [
                  //   '#000',
                  // ],
                  borderWidth: 2
                },
                { 
                  label: 'Confirmed Recoveries',
                  data: recovered,
                  backgroundColor: '#eee',
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
.america {

  background-color: #2D3143;
  border-radius: 4px;

  &__type {
    margin: 0px;
  }

}
</style>
