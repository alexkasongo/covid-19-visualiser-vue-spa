<template>
  <div class="america">
    <div class="america__washington">
      <div class="america__confirmed" v-for="event in this.washingtonSum" :key="event.id">
        <div class="america__washington-total">
          <h2>Total Cases</h2>
          <p>{{ event.Confirmed }}</p>
        </div>
        <div class="america__washington-sum">
          <div class="america__washington-sum-recovered">
            <p>{{ event.Recovered }}</p> 
          </div>
          <div class="america__washington-sum-active">
            <p>{{ event.Deaths }}</p> 
          </div>
        </div>
      </div>
    </div>
    <div class="america__chart">
      <h2>Chart</h2>
    </div>
    <div v-for="state in this.test" :key="state.id">
      <div class="america__states">
        <p>{{state.Province}} ({{state.Confirmed}} Cases)</p>
      </div>
    </div>
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
        washingtonSum: null,
        test: null
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
        
        this.washingtonSum = america.filter(function(item) {
            return item.Province === "Washington"
          }
        );
        console.log(`America.vue - 87 - variable`, this.washingtonSum);

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
        this.$store.dispatch("updateSummary", america);

        // add state to local storage here
        this.test = this.updateSummary

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
    ...mapGetters({
        updateSummary: "summaryFeed",
    }),
    // filteredValue() {
    //   return this.graphData.filter(data => this.selectedYears.includes(data.YEAR)
    // } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.america {

  background-color: #2D3143;
  border-radius: 4px;
  height: 500px;
  overflow: auto;

  &__grid {
    // display: grid;
    // grid-template-columns: 400px 400px 400px;
    // grid-template-columns: 1fr 1fr 1fr;
    // display: flex;
    // justify-content: space-between;
    // height: 500px;
    // overflow: hidden;
  }

  &__summary {
    display: flex;
    flex-direction: column;
  }

  &__type {
    margin: 0px;
  }

}
</style>
