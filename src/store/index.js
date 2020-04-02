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
  /* SUMMARYS STATE
  ================================== */

  // updateSummary: ({commit, getters}, summaryData) => {
  //   if (getters.checkIfStatusChanged(stateData.status) === 'offline') {
  //     commit('STATUS_OFFLINE', stateData);
  //   } else {
  //     commit('STATUS_ONLINE', stateData);
  //   }
  // },

  updateSummary: (context, summaryData) => {
    context.commit('UPDATE_SUMMARY', summaryData)
    console.log(`index.js - 34 - vuex`, summaryData);
  },

  /* PIPELINE
  ================================== */
  },
  modules: {
  }
})
