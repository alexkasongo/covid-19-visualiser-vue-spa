<template>
  <div class="washington">
    <div class="washington__stats">
      <!-- <div class="washington__confirmed" v-for="event in filteredSum" :key="event.id"> -->
      <div class="washington__confirmed" v-for="event in filteredSum" :key="event.id">
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
    <div class="washington__chart">
      <!-- <WashingtonChart /> -->
      <News />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from 'chart.js';
// import WashingtonChart from '@/components/data/WashingtonChart'
import News from '@/components/data/News'

export default {
  name: 'Washington',
  props: {
    msg: String
  },
  components: {
    // WashingtonChart
    News
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
    },
    filteredData() {
        const data = this.$store.getters.filtered
        const sliced = data.splic(1)
        return sliced
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.washington {

  background-color: #2D3143;
  border-radius: 4px;
  height: 600px;
  // overflow: auto;
  cursor: default;
    ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}

  &__stats {
    // height: 295px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__chart {
    height: 295px;
    overflow: hidden;
  }

  &__summary {
    display: flex;
    flex-direction: column;
  }

  &__type {
    margin: 0px;
  }

  &__confirmed {
    width: 100%;
  }

  &__washington-sum {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 145px;
  }
  
  &__washington-total {
    background-color: #1C1F2B;
    margin: 5px;
    border-radius: 4px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      margin: 0px;
      font-size: 30px;
      padding: 10px 0px 0px 0px;
    }

    p {
      margin: 0px;
      font-size: 50px;
    }
  }

  &__washington-recovered {
    background-color: #1C1F2B;
    margin: 0px 2.5px 5px 5px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      margin: 0px;
      font-size: 30px;
    }

    p {
      margin: 0px;
      font-size: 50px;
    }
  }

  &__washington-active {
    background-color: #1C1F2B;
    margin: 0px 5px 5px 2.5px ;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      margin: 0px;
      font-size: 30px;
    }

    p {
      margin: 0px;
      font-size: 50px;
    }
  }

}
</style>
