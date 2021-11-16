<template>
<div class="home">
  <header class="header">
  </header>
  <div id="map"></div>
  <transition name="slide-fade">
    <Detail v-show="locate.name"
      :name="locate.name"
      :serviceType="locate.serviceType"
      :available="locate.available"
      :availableReturn="locate.availableReturn"
    />
  </transition>
  <datalist id="station">
    <option v-for="item in list" :key="item" :value="item">{{item}}</option>
  </datalist>
</div>
</template>

<script>
import fetchData from '../lib/fetchData'
import Detail from '../components/detail.vue'
import { onMounted, ref } from 'vue'
import formatter from '../utils/formatter'
import L from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
export default {
  components: {
    Detail
  },
  setup () {
    const isPopUp = ref(true)
    const list = ref([])
    let locate = ref({})
    let map

    const mapMarker = arr => {
      const source = formatter.stationMerger(arr[0], arr[1])
      const sourceFormate = formatter.stationFormatter(source)
      const markers = L.markerClusterGroup({
        disableClusteringAtZoom: 16,
        spiderfyOnMaxZoom: false
      })
      sourceFormate.forEach(item => {
        list.value.push(item.name)
        const m = L.marker(item.location, {
          icon: L.divIcon({
            html: `<div class="icon"><span class="material-icons-outlined">directions_bike</span></div>`,
            iconSize: [40, 50],
            iconAnchor: [20, 49],
            className: 'custom'
          })
        }).bindTooltip(item.name).on('click',() => {
            locate.value = { ...item }
            map.panTo(item.location)
          })
        markers.addLayer(m)
      })
      map.addLayer(markers)

      const layerGroup = L.layerGroup()
      arr[2].forEach(item => {
        const r = formatter.multiLinesFormatter(item.Geometry)
        const line = L.geoJSON({
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: r
          }
        }).bindPopup(item.RouteName).bindTooltip(item.RouteName)
        layerGroup.addLayer(line)
      })
      map.addLayer(layerGroup)

      L.control.layers({}, {
        自行車: markers,
        車道: layerGroup
      }).addTo(map)
    }

    onMounted(() => {
      const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
      map = L.map('map', {
        center: [24.968128, 121.194666],
        minZoom: 8,
        zoom: 13,
        layers: layer
      })

      Promise.all([fetchData.getStation(), fetchData.getBikeStatus(), fetchData.getRoute()])
        .then(mapMarker)
    })

    return {
      isPopUp,
      list,
      locate
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/transition.scss';
.home{
  position: relative;
  .header{
    height: 80px;
  }
  #map{
    height: 80vh;
    position: relative;
  }
}


</style>