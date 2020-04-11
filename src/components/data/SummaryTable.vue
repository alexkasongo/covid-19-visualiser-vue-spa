<template>
  <div class="table">
    <!-- <FilterBar /> -->
    <div class="table__chart">
      <vuetable ref="vuetable"
      api-url="https://api.covid19api.com/summary"
      :fields="fields"
      :append-params="moreParams"
      data-path="Countries"
      pagination-path=""
    ></vuetable>
      <!-- <vuetable
      api-url="https://vuetable.ratiw.net/api/users"
      :fields="fields"
      data-path="data"
      pagination-path=""
    ></vuetable> -->
    </div>
    </div>
</template>

<script>
import Vuetable from 'vuetable-2'
//  import FilterBar from './FilterBar'
import Vue from 'vue'

export default {
  name: 'Summary',
  components: {
    Vuetable,
    // FilterBar
  },
  data() {
    return{
      fields: [
        {
          name: "Country",
          title: 'Country',
          width: "20%"
        },
        {
          name: "TotalConfirmed",
          title: 'Confirmed',
          // title: '<i class="grey mail outline icon"></i>Confirmed',
          width: "20%"
        },
        {
          name: "NewConfirmed",
          title: 'New',
          // title: '<i class="grey sitemap icon"></i>New',
          width: "15%"
        },
        {
          name: "TotalDeaths",
          title: 'Deaths',
          // title: '<i class="grey birthday icon"></i>Deaths',
          width: "15%",
          // formatter: (value) => { 
          //   return (value === null)
          //     ? ''
          //     : this.moment(value, 'YYYY-MM-DD').format('MMM Do, YYYY')
          // }
        },
        {
          name: "TotalRecovered",
          title: 'Recovered',
          // title: '<i class="grey heterosexual icon"></i>Recovered',
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "15%",
          // formatter: (value) => {
          //   return value.toUpperCase() === 'M' 
          //     ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>' 
          //     : '<span class="ui pink label"><i class="large woman icon"></i>Female</span>'
          // }
        }
      ],
      moreParams: {}
    }
  },
  methods: {
    onFilterSet (filterText) {
      console.log(`SummaryTable.vue - 86 - variable`, filterText);
      this.moreParams = {
            'filter': filterText
        }
        Vue.nextTick( () => this.$refs.vuetable.refresh())
    },
    onFilterReset () {
      this.moreParams = {}
        Vue.nextTick( () => this.$refs.vuetable.refresh())
      console.log(`SummaryTable.vue - 89 - filter-reset`);
    }
  },
  mounted () {
    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    // eslint-disable-next-line no-unused-vars
    this.$events.$on('filter-reset', e => this.onFilterReset())

    this.$http
      .get('https://api.covid19api.com/summary')
      .then(response => {
        let summaryData = [];
        let summaryDataFeed = []
        let coloR = [];

        // generate dynamic colors
        var dynamicColors = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
         };

        const countries = []
        const totalConfirmed = []
        const totalDeaths = []

        // initial data loop
        for (let country of response.data.Countries) {
            summaryData.push(country);
        }
        
        // second data loop, goes deeper and allows selecting of countries, total deaths etc
        for (var i = 0; i < summaryData.length; i++) {
          countries.push(summaryData[i].Country)
          totalConfirmed.push(summaryData[i].TotalConfirmed)
          totalDeaths.push(summaryData[i].TotalDeaths)
          coloR.push(dynamicColors());
        }

        // NOTE currently not being used but should be used if app grows
        // dispatch state/data to store for state manangenet
        this.$store.dispatch("updateSummary", summaryDataFeed);
      }
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.summary {

  // height: 1000vh;
  background-color: #2D3143;
  border-radius: 4px;

  &__type {
    margin: 0px;
  }
}
</style>
