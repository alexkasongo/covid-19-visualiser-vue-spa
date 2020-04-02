<template>
  <div class="hello">
    <h1>Aleko</h1>
    <!-- <div v-for="event in updateSummary" :key="event.componentKey">
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { mapState, mapMutations, mapActions, mapGetters } from "@/store/index";

export default {
  name: 'Summary',
  props: {
    msg: String
  },
  data() {
    return{
        summary: null,
        componentKey: 0
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
    )
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
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
