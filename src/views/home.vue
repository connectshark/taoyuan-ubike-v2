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
  <div class="btn" @click="getNow">
    找位置
  </div>
  <div class="btn" @click="modal = !modal">跳起來</div>
  <teleport to="body">
    <Modal v-model:modal="modal">
      <h3>hi</h3>
      <p>這就是跳窗內容</p>
    </Modal>
  </teleport>
  <datalist id="station">
    <option v-for="item in list" :key="item" :value="item">{{item}}</option>
  </datalist>
</div>
</template>

<script>
import fetchData from '../lib/fetchData'
import Detail from '../components/detail.vue'
import Modal from '../components/modal.vue'
import { onMounted, ref } from 'vue'
import formatter from '../utils/formatter'
import L from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
export default {
  components: {
    Detail,
    Modal
  },
  setup () {
    const isPopUp = ref(true)
    const list = ref([])
    let locate = ref({})
    let map

    let here = undefined

    const getNow = () => {
      navigator.geolocation.getCurrentPosition(position => {
        const p = position.coords
        const location = [p.latitude, p.longitude]
        if (here) {
          here.setLatLng(location)
        } else {
          here = L.marker(location).bindPopup('你在這兒')
          here.addTo(map)
        }
        map.panTo(location)
      })
    }

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
        }, { weight: 5, color: '#cc2918' }).bindPopup(item.RouteName).bindTooltip(item.RouteName)
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
        minZoom: 10,
        zoom: 13,
        maxZoom: 16,
        layers: layer
      })

      Promise.all([fetchData.getStation(), fetchData.getBikeStatus(), fetchData.getRoute()])
        .then(mapMarker)
    })

    const modal = ref(false)

    return {
      isPopUp,
      list,
      locate,
      modal,
      getNow
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
    height: 50vh;
    position: relative;
  }
}

</style>