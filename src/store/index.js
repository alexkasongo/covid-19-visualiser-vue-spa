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
    summaryFeed: state => () => {
      return state.summaryFeed
    },
    globalFeed: state => () => {
      return state.globalFeed
    },
    newsState: state => () => {
      return state.newsFeed
    }
  },
  mutations: {
    UPDATE_SUMMARY: (state, summaryData) => {
      state.summaryFeed.push(summaryData);
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
      allNews: (context, newsData) => {
        // console.log(`index.js - 48 - variable`, newsData);
        if (newsData) {
          context.commit('NEWS_ARTICLES', newsData)
        }
      },
  },
  modules: {
  }
})
