<template>
<div class="bike">
  <div class="switch">
    <div class="bar">
      <p class="item" :class="{ active: toggle }" @click="toggle = true">
        <i class='bx bx-map-pin bx-tada-hover'></i>
      </p>
      <p class="item" :class="{ active: !toggle }" @click="toggle = false">
        <i class='bx bx-list-ul bx-tada-hover' ></i>
      </p>
    </div>
  </div>
  <div id="map" v-show="toggle">
    <div class="btn-group" @click.stop>
      <div class="btn" @click="getNow">
        <i class='bx bxs-map bx-tada-hover' v-if="userHere.length > 1"></i>
        <i class='bx bx-map bx-tada-hover' v-else></i>
      </div>
    </div>
  </div>
  <teleport to="body">
    <Modal v-model:modal="modal">
      <Detail
        :name="locate.name"
        :serviceType="locate.serviceType"
        :available="locate.available"
        :availableReturn="locate.availableReturn"
      />
      <template v-if="locate.location">
      <a class="link" v-if="userHere.length > 1" :href="`https://www.google.com/maps/dir/${userHere[0]},${userHere[1]}/${locate.location[0]},${locate.location[1]}`" target="_blank" rel="noopener noreferrer"><i class='bx bxs-direction-right' ></i>導航</a>
      <a class="link" v-else :href="`https://www.google.com.tw/maps/place/${locate.location[0]},${locate.location[1]}`" target="_blank" rel="noopener noreferrer"><i class='bx bx-map-alt'></i>在google map查看</a>
      </template>
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
    const userHere = ref([])
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
        map.flyTo(location, 15)
        userHere.value = location
      }, () => {
        if (here) {
          map.removeLayer(here)
          here = undefined
        }
        userHere.value = []
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

    const toggle = ref(true)
    return {
      list,
      locate,
      modal,
      getNow,
      userHere,
      toggle
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/transition.scss';
@import '../assets/scss/mixin.scss';
.bike{
  max-width: 600px;
  margin: auto;
  .switch{
    padding: 10px 0;
    .bar{
      width: 80px;
      margin: auto;
      border-radius: 40px;
      overflow: hidden;
      box-shadow: 0 0 0 2px $main;
      .item{
        font-size: 20px;
        color: $main;
        background-color: #fff;
        display: inline-block;
        width: 50%;
        transition: color .3s ease, background .3s ease;
      }
      .active{
        color: #fff;
        background-color: $main;
      }
    }
  }
  #map{
    height: 500px;
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