<template>
  <div class="news">
      <h1 class="news__grid">Aleko</h1>
    <div class="news__grid" v-for="article in this.newsFeed" :key="article.id">
    <!-- <div class="news__grid" v-for="article in this.newsFeed" :key="article.id"> -->
      {{artice}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from 'chart.js';

export default {
  name: 'News',
  props: {
    msg: String
  },
  data() {
    return{
        summary: null,
        componentKey: 0,
        globalData: this.globalSummary,
        newsKey: process.env.VUE_APP_NEWS_API_KEY,
        newsFeed: this.allArticles
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

    var url = 'http://newsapi.org/v2/everything?' +
          'q=Covid-19&' +
          'from=2020-04-07&' +
          'sortBy=popularity&' +
          `apiKey=${this.newsKey}`;

    this.$http
      .get(url)
      .then(response => {

        const newsArticles = []

        for (let article of response.data.articles) {
          newsArticles.push(article)
        }
        
        this.$store.dispatch("allNews", newsArticles);
      }
    );
  },
  computed: {
    ...mapGetters({
        allArticles: "articlesFeed"
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.news{
  &__grid {
    color: red;
  }
}
</style>
