import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    summaryFeed:[],
    globalFeed:[],
    newsFeed:[]
  },
  getters: {
    summaryFeed: state => {
      return state.summaryFeed[0]
    },
    filtered: state => {
      return state.summaryFeed[0].filter(function(item) {
        return item.Province === "Washington"
      }
    );
  },
    globalFeed: state => {
      return state.globalFeed
    },
    newsFeed: state => {
      return state.newsFeed
      // return state.newsFeed.sort((a, b) => (a.events < b.events) ? 1 : -1)
    }
  },
  mutations: {
    UPDATE_SUMMARY: (state, summaryData) => {
      state.summaryFeed.push(summaryData);
      // Vue.set(state, 'summaryFeed', [...summaryData]);
    },
    GLOBAL_SUMMARY: (state, globalData) => {
      // Vue.set(state, 'globalFeed', [...globalData]);
      state.globalFeed.push(globalData);
    },
    NEWS_ARTICLES: (state, newsData) => {
      Vue.set(state, 'newsFeed', [...newsData]);
      // state.newsFeed = newsData
    },
  },
  actions: {
    updateSummary: (context, summaryData) => {
      if (summaryData) {
          context.commit('UPDATE_SUMMARY', summaryData)
        }
      },
      globalSummary: (context, globalData) => {
      if (globalData) {
          context.commit('GLOBAL_SUMMARY', globalData)
        }
      },
      newsArticles: (context, newsData) => {
        if (newsData) {
          context.commit('NEWS_ARTICLES', newsData)
        }
      },
  },
  modules: {
  }
})
