<template>
  <div class="washington">
    <div class="washington__left">
      <div class="washington__washington">
        <div class="washington__confirmed" v-for="event in filteredSum.slice(5)" :key="event.id">
          <div class="washington__washington-total">
            <h2>Total Cases</h2>
            <p>{{ event.Confirmed }}</p>
          </div>
          <div class="washington__washington-sum">
            <div class="washington__washington-recovered">
              <h2>Recovered</h2>
              <p>{{ event.Recovered }}</p> 
            </div>
            <div class="washington__washington-active">
              <h2>Deaths</h2>
              <p>{{ event.Deaths }}</p> 
            </div>
          </div>
        </div>
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
    filteredSum() {
        return this.$store.getters.filtered
    }
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

  &__washington-sum {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  &__washington-total {
    background-color: #1C1F2B;
    margin: 5px;
    border-radius: 4px;
    h2 {
      margin: 0px;
      font-size: 36px;
      padding: 10px 0px 0px 0px;
    }

    p {
      margin: 0px;
      font-size: 60px;
    }
  }

  &__washington-recovered {
    background-color: #1C1F2B;
    margin: 0px 2.5px 5px 5px;
    border-radius: 4px;
    h2 {
      margin: 0px;
      font-size: 36px;
    }

    p {
      margin: 0px;
      font-size: 60px;
    }
  }

  &__washington-active {
    background-color: #1C1F2B;
    margin: 0px 5px 5px 2.5px ;
    border-radius: 4px;
    h2 {
      margin: 0px;
      font-size: 36px;
    }

    p {
      margin: 0px;
      font-size: 60px;
    }
  }

}
</style>
