<template>
<div class="home">
  <div id="map">
    <div class="btn-group" @click.stop>
      <div class="btn" @click="getNow">
        <i class='bx bxs-map bx-tada-hover' v-if="userLocation"></i>
        <i class='bx bx-map bx-tada-hover' v-else></i>
      </div>
    </div>
  </div>
  <div class="btn" @click="modal = !modal">跳起來</div>
  <teleport to="body">
    <Modal v-model:modal="modal">
      <Detail
        :name="locate.name"
        :serviceType="locate.serviceType"
        :available="locate.available"
        :availableReturn="locate.availableReturn"
      />
    </Modal>
  </teleport>
  <datalist id="station">
    <option v-for="item in list" :key="item" :value="item">{{item}}</option>
  </datalist>
</div>
</template>

<script>
import fetchData from '../lib/fetchData'
import Modal from '../components/modal.vue'
import { onMounted, ref } from 'vue'
import formatter from '../utils/formatter'
import L from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import Detail from '../components/detail.vue'
export default {
  components: {
    Modal,
    Detail
  },
  setup () {
    const list = ref([])
    let locate = ref({})
    let map

    let here = undefined

    /**
     * 判斷使用者地點
     */
    const userLocation = ref(false)
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
        map.flyTo(location, 15)
        userLocation.value = true
      }, () => {
        if (here) {
          map.removeLayer(here)
          here = undefined
        }
        userLocation.value = false
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
        })
        .bindTooltip(item.name)
        .on('click', () => {
          locate.value = { ...item }
          map.panTo(item.location)
          modal.value = true
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
      list,
      locate,
      modal,
      getNow,
      userLocation
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/transition.scss';
.home{
  max-width: 600px;
  margin: auto;
  #map{
    height: 50vh;
    .btn-group{
      position: absolute;
      z-index: 401;
      right: 20px;
      bottom: 20px;
      .btn{
        background-color: #fff;
        border-radius: 50%;
        font-size: 30px;
        line-height: 30px;
        color: #6e6e6e;
        cursor: pointer;
        &:hover{
          color: #333;
        }
      }
    }
  }
}

</style>