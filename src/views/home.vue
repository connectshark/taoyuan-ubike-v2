<template>
<div class="home">
  <div class="search-bar">
    <SearchBar/>
    <transition name="slide-fade">
      <Detail v-show="isPopUp" v-model:popUp="isPopUp"/>
    </transition>
  </div>
  <div id="map"></div>
  <datalist id="station">
    <option v-for="item in list" :key="item" :value="item">{{item}}</option>
  </datalist>
</div>
</template>

<script>
import fetchData from '../lib/fetchData'
import SearchBar from '../components/searchBar.vue'
import Detail from '../components/detail.vue'
import { onMounted, ref } from 'vue'
import formatter from '../utils/formatter'
import L from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
export default {
  components: {
    SearchBar,
    Detail
  },
  setup () {
    const isPopUp = ref(false)
    const list = ref([])
    let map

    const mapMarker = arr => {
      const source = formatter.stationMerger(arr[0], arr[1])
      const sourceFormate = formatter.stationFormatter(source)
      const markers = L.markerClusterGroup()
      sourceFormate.forEach(item => {
        list.value.push(item.name)
        const m = L.marker(item.location)
          .bindTooltip(item.name).on('click',() => {
            isPopUp.value = !isPopUp.value
            map.panTo([item.location[0] + 0.02, item.location[1]])
          })
        markers.addLayer(m)
      })
      map.addLayer(markers)
    }

    onMounted(() => {
      map = L.map('map', {
        center: [24.968128, 121.194666],
        zoom: 13
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)
      map.on('movestart', function (event) {
        console.log('move!!', event)
      })


      Promise.all([fetchData.getStation(), fetchData.getBikeStatus()])
        .then(mapMarker)
    })

    return {
      isPopUp,
      list
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/transition.scss';
.search-bar{
  height: 20vh;
  position: relative;
}
#map{
  height: 80vh;
}
</style>