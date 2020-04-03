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
      Vue.set(state, 'summaryFeed', [...summaryData]);
    },
  },
  actions: {
  updateSummary: (context, summaryData) => {
    if (summaryData) {
        console.log(`index.js - 23 - aleko`);
        context.commit('UPDATE_SUMMARY', summaryData)
      }
    }
  },
  modules: {
  }
})
