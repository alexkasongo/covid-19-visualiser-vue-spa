<template>
  <div class="global">
    <div class="global__grid" v-for="data in this.globalSummary" :key="data.id">
      <div class="global__totalConfirmed global--card">
        <h2 class="global__title">Total Confirmed Cases</h2>
        <h2 class="global__number">{{data.TotalConfirmed}}</h2>
      </div>
      <div class="global__totalDeaths global--card">
        <h2 class="global__title">Total Confirmed Deaths</h2>
        <h2 class="global__number">{{data.TotalDeaths}}</h2>
      </div>
      <div class="global__totalRecovered global--card">
        <h2 class="global__title">Total Confirmed Recoveries</h2>
        <h2 class="global__number">{{data.TotalRecovered}}</h2>
      </div>
      <div class="global__newConfirmed global--card">
        <h2 class="global__title">New Confirmed Cases</h2>
        <h2 class="global__number">{{data.NewConfirmed}}</h2>
      </div>
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
        componentKey: 0,
        globalData: this.globalSummary
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

  width: 1200px;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;

    @media (min-width: 768px) {
       grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  &__totalConfirmed {
    background-color: yellowgreen;
  }
  &__totalDeaths {
    background-color: lightblue;
  }
  &__totalRecovered {
    background-color: salmon;
  }
  &__newConfirmed {
    background-color: yellow;
  }

  &--card {
    padding: 10px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
       padding: 20px;
    }
  }

  &__type {
    margin: 0px;
  }

  &__title {
    max-width: 206px;
    margin: 0px 0px 0px 0px;
    color: #2c3e50;
  }

  &__number {
    font-size: 30px;
    margin: 0px 0px 0px 0px;
    color: #2c3e50;
    @media (min-width: 768px) {
       font-size: 60px;
    }
  }

}
</style>
