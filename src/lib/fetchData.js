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
  }
}

export default fetchData