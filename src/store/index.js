import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    summaryFeed:[],
    globalFeed:[]
  },
  getters: {
    summaryFeed: state => {
      return state.summaryFeed
    },
    globalFeed: state => {
      return state.globalFeed
    },
  },
  mutations: {
    UPDATE_SUMMARY: (state, summaryData) => {
      state.summaryFeed.push(summaryData);
      // Vue.set(state, 'globalFeed', [...globalData]);
    },
    GLOBAL_SUMMARY: (state, globalData) => {
      // Vue.set(state, 'globalFeed', [...globalData]);
      state.globalFeed.push(globalData);
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
  },
  modules: {
  }
})
