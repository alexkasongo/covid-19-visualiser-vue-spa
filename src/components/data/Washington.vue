<template>
  <div class="washington">
    <div class="washington__left">
      <!-- <div class="washington__washington">
        <div class="washington__confirmed" v-for="event in this.filterd" :key="event.id">
          <div class="washington__washington-total">
            <h2>Total Cases</h2>
            <p>{{ event.Confirmed }}</p>
          </div>
          <div class="washington__washington-sum">
            <div class="washington__washington-sum-recovered">
              <p>{{ event.Recovered }}</p> 
            </div>
            <div class="please"></div>
            <div class="washington__washington-sum-active">
              <p>{{ event.Deaths }}</p> 
            </div>
          </div>
        </div>
      </div> -->
      <div class="washington__chart">
        <h2>Stats</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from 'chart.js';

export default {
  name: 'Washington',
  props: {
    msg: String
  },
  data() {
    return{
        filteredSummary: [],
        statesData: null
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
    
  },
  computed: {
    ...mapGetters({
        updateSummary: "summaryFeed",
        filtered: "filtered"
    }),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.washington {

  background-color: #2D3143;
  border-radius: 4px;
  height: 500px;
  overflow: auto;

  &__summary {
    display: flex;
    flex-direction: column;
  }

  &__type {
    margin: 0px;
  }

}
</style>
