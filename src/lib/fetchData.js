import jsSHA from 'jssha'

const fetchData = {
  getAuthorizationHeader () {
    let GMTString = new Date().toGMTString()
    let ShaObj = new jsSHA('SHA-1', 'TEXT')
    ShaObj.setHMACKey(process.env.VUE_APP_KEY, 'TEXT')
    ShaObj.update('x-date: ' + GMTString)
    let HMAC = ShaObj.getHMAC('B64')
    return {
      Authorization: `hmac username="${process.env.VUE_APP_APPID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`,
      'X-Date': GMTString
    }
  },
  getRoute () {
    return new Promise(resolve => {
      fetch(process.env.VUE_APP_API_URL + `/Cycling/Shape/Taoyuan` + `?$format=JSON`, {
        headers: this.getAuthorizationHeader()
      }).then(r => r.json()).then(res => {
        resolve(res)
      })
    })
  },
  getStation () {
    return new Promise(resolve => {
      fetch(process.env.VUE_APP_API_URL + `/Bike/Station/Taoyuan` + `?$format=JSON`, {
        headers: this.getAuthorizationHeader()
      }).then(r => r.json()).then(res => {
        resolve(res)
      })
    })
  },
  getBikeStatus () {
    return new Promise(resolve => {
      fetch(process.env.VUE_APP_API_URL + `/Bike/Availability/Taoyuan` + `?$format=JSON`, {
        headers: this.getAuthorizationHeader()
      }).then(r => r.json()).then(res => {
        resolve(res)
      })
    })
  }
}

export default fetchData