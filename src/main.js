import Vue from 'vue'
import App from './App.vue'
import store from './store'

import VueEvents from 'vue-events'
Vue.use(VueEvents)

/**
 * moment and axios
 */
import axios from 'axios'
import moment from 'moment'
Vue.prototype.moment = moment
Vue.prototype.$http = axios

/**
 * Leaflet map
 */
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

/**
 * Default
 */
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
