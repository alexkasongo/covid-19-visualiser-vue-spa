<template>

  <div>
    <div class="map">
      <!-- <span v-if="loading">Loading...</span> -->
      <!-- <span v-if="loading">Loading...</span> -->
      <!-- <label for="checkbox">GeoJSON Visibility</label>
      <input
        id="checkbox"
        v-model="show"
        type="checkbox"
      >
      <label for="checkboxTooltip">Enable tooltip</label>
      <input
        id="checkboxTooltip"
        v-model="enableTooltip"
        type="checkbox"
      >
      <input
        v-model="fillColor"
        type="color"
      >
      <br> -->
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="width: 100%"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-geo-json
        v-if="show"
        :geojson="geojson"
        :options="options"
        :options-style="styleFunction"
      />
      <l-marker :lat-lng="marker" />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LGeoJson } from "vue2-leaflet";
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 4,
      center: [48, -122.3054],
      geojson: null,
      fillColor: "#A52A2A",
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(47.8279, -122.3054),
      covid: []
    };
  },
  computed: {
    covidData() {
        return this.$store.getters.summaryFeed
    },
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#1C1F2B",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1
        };
      };
    },
    onEachFeatureFunction() {
        const data = this.covidData
        
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
          if (data) {
              const filter = data.filter((state) => {
                  return state.Province === feature.properties.name
              })
          

        layer.bindTooltip(
          "<div>" +
            feature.properties.name +
            "</div><div>Cases: " +
            filter[0].Confirmed +
            "</div><div>Deaths: " +
            filter[0].Deaths +
            "</div>",
          { permanent: false, sticky: true }
        );
        layer.on("mouseover",function(){
            // console.log(`Map.vue - 120 - variable`, filter);
            layer.setStyle({
                weight: 2,
                color: '#1C1F2B',
                fillColor: '#1C1F2B'
            });
        });
        layer.on("mouseout",function(){
            layer.setStyle({
                weight: 2,
                color: '#1C1F2B',
                fillColor: '#A52A2A'
            });
        });
      }

      }
    }
  },
  async created() {
    this.loading = true;
    const response = await fetch("https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson")
    const data = await response.json();
    this.geojson = data;
    this.loading = false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .map {
//   height: 600px;
// }
</style>
