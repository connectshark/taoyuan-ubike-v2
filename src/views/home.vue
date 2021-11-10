<template>
<div class="search-bar">
  <SearchBar/>
</div>
<div id="map"></div>
</template>

<script>
import SearchBar from '../components/searchBar.vue'
import { onMounted } from 'vue'
import L from 'leaflet'
export default {
  components: {
    SearchBar
  },
  setup () {
    let map
    onMounted(() => {
      map = L.map('map').setView([24.968128, 121.194666], 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)
      fetch('bike.json').then(r => r.json()).then(res => {
        res.forEach(item => {
          console.log(item.StationName.Zh_tw)
          const m = L.marker([item.StationPosition.PositionLat, item.StationPosition.PositionLon])
            .bindTooltip(item.StationName.Zh_tw)
          m.addTo(map)
        })
      })
      fetch('bikeState.json').then(r => r.json()).then(res => {
        console.log(res)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.search-bar{
  height: 20vh;
}
#map{
  height: 80vh;
}
</style>