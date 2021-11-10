import { createStore } from 'vuex'

const store = createStore({
  state: {
    locations: []
  },
  mutations: {
    setLocations: (state, arr) => state.locations = arr
  },
  actions: {
    init ({ commit }) {
      fetch('https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Taoyuan?$format=JSON')
        .then(r => r.json())
        .then(res => commit('setLocations', res))
    }
  }
})

export default store