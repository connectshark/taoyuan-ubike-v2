const fetchData = {
  getStation () {
    return new Promise(resolve => {
      fetch('bike.json').then(r => r.json()).then(res => {
        resolve(res)
      })
    })
  },
  getBikeStatus () {
    return new Promise(resolve => {
      fetch('bikeState.json').then(r => r.json()).then(res => {
        resolve(res)
      })
    })
  },
  // getStation () {
  //   return new Promise(resolve => {
  //     fetch(process.env.VUE_APP_API_URL + `Station/Taoyuan` + `?$format=JSON`).then(r => r.json()).then(res => {
  //       resolve(res)
  //     })
  //   })
  // },
  // getBikeStatus () {
  //   return new Promise(resolve => {
  //     fetch(process.env.VUE_APP_API_URL + `Availability/Taoyuan` + `?$format=JSON`).then(r => r.json()).then(res => {
  //       resolve(res)
  //     })
  //   })
  // }
}

export default fetchData