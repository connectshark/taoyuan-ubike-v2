import dayjs from 'dayjs'

const formatter = {
  stationFormatter (source) {
    return source.map(station => {
      return {
        uid: station.StationUID,
        name: station.StationName.Zh_tw,
        location: [station.StationPosition.PositionLat, station.StationPosition.PositionLon],
        updateTime: dayjs(station.UpdateTime).format('MM/DD HH:mm'),
        serviceType: station.ServiceType,
        capacity: station.BikesCapacity,
        available: station.AvailableRentBikes,
        availableReturn: station.AvailableReturnBikes
      }
    })
  },
  /**
   * 站點資訊合併
   * @param {Array} station 站點資訊
   * @param {Array} status 站點狀態
   */
  stationMerger (station, status) {
    return station.reduce((sum, item) => {
      const obj = { ...item }
      const stage = status.find(stage => stage.StationUID === item.StationUID)
      obj.AvailableRentBikes = stage.AvailableRentBikes
      obj.AvailableReturnBikes = stage.AvailableReturnBikes
      sum.push(obj)
      return sum
    }, [])
  }
}

export default formatter