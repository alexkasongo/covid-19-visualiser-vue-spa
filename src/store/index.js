import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    summaryFeed:[],
  },
  getters: {
    summaryFeed: state => {
      return state.summaryFeed
    }
  },
  mutations: {
    UPDATE_SUMMARY: (state, summaryData) => {
      // Vue.set(state, 'summaryFeed', [...summaryData]);
      state.summaryFeed.push(summaryData);
    },
  },
  actions: {
  updateSummary: (context, summaryData) => {
    if (summaryData) {
        context.commit('UPDATE_SUMMARY', summaryData)
      }
    }
  },
  modules: {
  }
})
