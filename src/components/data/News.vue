<template>
  <div class="news">
    <div class="news__grid" v-for="article in this.allArticles" :key="article.id">
      <div class="news__card">
        <div class="news__card--container">
          <a class="news__subTitle-link" :href="article.url">
            <h2 class="news__subTitle">{{article.title}}</h2>
          </a>
          <div class="image-box">
            <a :href="article.url">
              <img :src="article.urlToImage" :alt="article.urlToImage" />
            </a>
          </div>
          <p class="news__description">{{article.description}}<a class="news__link" :href="article.url">more</a></p>
          <p class="news__date">{{ moment(article.publishedAt).startOf('day').fromNow() }}</p>
        </div>
      </div>
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
        news: this.allArticles,
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
        
        this.$store.dispatch("newsArticles", newsArticles);
      }
    );
  },
  computed: {
    ...mapGetters({
        allArticles: "newsFeed"
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.news{
  height: 600px;
  overflow: auto;
  background-color: #2D3143;
  border-radius: 4px;

  &__grid {
    color: #fff;
  }

  &__card {
    max-width: 600px;
    text-align: center;
    margin: 0px auto 5px auto;

    &--container {
      background-color: #1C1F2B;
      margin: 0px 5px;
      border-radius: 4px;
    }
  }

  &__image {
    max-width: 580px;
  }

  &__subTitle {
    margin: 0px 0px 5px 0px;
    padding: 10px 5px;
  }

  &__description {
    text-align: justify;
    padding: 0px 5px;
  }

  &__link {
    color: #ADD8E6;
     a {
       color: #ADD8E6;
     }
  }

  &__subTitle-link {
    color: #fff;
    text-decoration: none;
    a {
      color: #fff;
    }
  }
  
  &__date {
    text-align: right;
    padding: 20px;
    margin: 0px;
  }
}

.image-box {
    position: relative;
    margin: auto;
    overflow: hidden;
}
.image-box img {
    max-width: 100%;
    transition: all 0.3s;
    display: block;
    width: 100%;
    height: auto;
    transform: scale(1);
}

.image-box:hover img {
    transform: scale(1.1);
}

</style>
