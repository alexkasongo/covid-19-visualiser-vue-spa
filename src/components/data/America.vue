<template>
  <div class="america">
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

        // initial data loop
        for (let data of response.data) {
            america.push(data);
        }
        
        // NOTE currently not being used but should be used if app grows
        // dispatch state/data to store for state manangenet
        this.$store.dispatch("updateSummary", america);

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
    margin: 0px;
    font-size: 18px;
    padding: 5px 0px;
    @media (min-width: 768px) {
       font-size: 14px;
    }
  }
}

.states {
    margin: 5px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    padding: 2px 5px;
    background-color: #1C1F2B;
  @media (min-width: 768px) {
    justify-content: flex-end;
  }

  // margin: 5px;
  // border-radius: 4px;
  // display: flex;
  // justify-content: flex-end;
  // align-items: center;
  // cursor: default;
  // padding: 2px 5px;
  // background-color: #1C1F2B;

}
.states:hover {
  background-color: brown;
}
</style>
