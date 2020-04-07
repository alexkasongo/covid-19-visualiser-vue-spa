<template>
  <div class="global">
    <div class="global__totalConfirmed global--card">
      <h2>Total Confirmed Cases</h2>
      <h2>{{this.globalSummary[0 ].TotalConfirmed}}</h2>
    </div>
    <div class="global__totalDeaths global--card">
      <h2>Total Confirmed Deaths</h2>
      <h2>{{this.globalSummary[0 ].TotalDeaths}}</h2>
    </div>
    <div class="global__totalRecovered global--card">
      <h2>Total Confirmed Recoveries</h2>
      <h2>{{this.globalSummary[0 ].TotalRecovered}}</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from 'chart.js';

export default {
  name: 'Global',
  props: {
    msg: String
  },
  data() {
    return{
        summary: null,
        componentKey: 0
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
        console.log(`Global.vue - 43 - variable`, response.data.Global);

        const globalSum = response.data.Global

        this.$store.dispatch("globalSummary", globalSum);
      }
    );
  },
  computed: {
    ...mapGetters({
        globalSummary: "globalFeed"
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.global {

  // display: flex;
  // justify-content: space-around;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;

  &__totalConfirmed {
    background-color: yellowgreen;
  }
  &__totalDeaths {
    background-color: lightblue;
  }
  &__totalRecovered {
    background-color: salmon;
  }

  &--card {
    padding: 20px;
    border-radius: 8px;
  }

  &__type {
    margin: 0px;
  }

}
</style>
