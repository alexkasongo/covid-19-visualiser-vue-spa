<template>
  <div class="america">
    <!-- <div class="washington" v-for="state in filtered.slice(5)" :key="state.id">
      <div class="washington__confirmed">
        <h2>Confirmed</h2>
        {{state.Confirmed}}
      </div>
      <div class="washington__confirmed">
        <h2>Deaths</h2>
        {{state.Deaths}}
      </div>
      <div class="washington__confirmed">
        <h2>Recovered</h2>
        {{state.Recovered}}
      </div>
    </div> -->
    <div class="states" v-for="state in updateSummary" :key="state.componentKey">
      <div class="states__container">
        <p class="america__states">{{state.Province}} ({{state.Confirmed}} Cases)</p>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'America',
  props: {
    msg: String
  },
  data() {
    return{
        summary: null,
        componentKey: 0,
        // washingtonSum: null,
        // statesData: [],
        // tester: []
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
        // let washington = []
        // let coloR = [];
        
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

        // initial data loop
        for (let data of response.data) {
            america.push(data);
        }
        
        // this.washingtonSum = america.filter(function(item) {
        //     return item.Province === "Washington"
        //   }
        // );

        // washington = america.filter(function(item) {
        //     return item.Province === "Washington"
        //   }
        // );

        // second data loop, goes deeper and allows selecting of countries, total deaths etc

        // for (var i = 0; i < washington.length; i++) {
        //   confirmed.push(washington[i].Confirmed)
        //   deaths.push(washington[i].Deaths)
        //   recovered.push(washington[i].Recovered)
        //   date.push(this.moment(washington[i].Date).format('LLLL'))  

        //   coloR.push(dynamicColors());
        // }
        
        // NOTE currently not being used but should be used if app grows
        // dispatch state/data to store for state manangenet
        this.$store.dispatch("updateSummary", america);
        

        // add state to local storage here
        // this.statesData = this.updateSummary
        // this.tester = this.filtered

        // var chart = this.$refs.chart;
        // var ctx = chart.getContext("2d");
        // Chart.defaults.global.defaultFontColor = '#eee';
        // var myChart = new Chart(ctx, {
        //     type: 'horizontalBar',
        //     data: {
        //         labels: date,
        //         datasets: [{
        //           label: 'Confirmed Cases',
        //           data: confirmed,
        //           backgroundColor: '#14EBE0',
        //           minBarLength: 2,
        //         },
        //         { 
        //           label: 'Confirmed Deaths',
        //           data: deaths,
        //           backgroundColor: '#FF6384',
        //           borderWidth: 2
        //         },
        //         { 
        //           label: 'Confirmed Recoveries',
        //           data: recovered,
        //           backgroundColor: '#eee',
        //           borderWidth: 2
        //         }
        //         ]
        //     },
        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero: true,
        //                     padding: 25,
        //                     autoSkip: false,
        //                 }
        //             }]
        //         }
        //     }
        // });

      }
    );
  },
  computed: {
    updateSummary() {
        return this.$store.getters.summaryFeed;
    },
    filteredSum() {
        return this.$store.getters.filtered
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.america {

  background-color: #2D3143;
  border-radius: 4px;
  height: 600px;
  overflow: auto;

  &__summary {
    display: flex;
    flex-direction: column;
  }

  &__type {
    margin: 0px;
  }

  &__states {
    text-align: right;
    margin: 0px;


  }
}

.states {
  margin: 5px;
  border-radius: 4px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  padding: 2px 5px;
  background-color: #1C1F2B;
}
.states:hover {
  background-color: brown;
}
</style>
