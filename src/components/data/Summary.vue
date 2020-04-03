<template>
  <div class="hello">
    <h1>Keeping Up With The Covid</h1>
    <h4>with Aleko</h4>
    <canvas id="planet-chart"></canvas>
    <div v-for="event in updateSummary" :key="event.componentKey">
      <!-- <p>{{ event.Country }}</p> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from 'chart.js';
import planetChartData from '@/chart-data.js';

export default {
  name: 'Summary',
  props: {
    msg: String
  },
  data() {
    return{
        summary: null,
        componentKey: 0,
        planetChartData: planetChartData,
    }
  },
  mounted () {
    this.$http
      .get('https://api.covid19api.com/summary')
      .then(response => {
        let summaryData = [];

        for (let country of response.data.Countries) {
          summaryData.push(country);
          this.$store.dispatch("updateSummary", summaryData);
        }
      }
    );
    this.createChart('planet-chart', this.planetChartData);
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
