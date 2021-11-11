import dayjs from 'dayjs'

const formatter = {
  stationFormatter (source) {
    return source.map(station => {
      console.log(station)
      return {
        uid: station.StationUID,
        name: station.StationName.Zh_tw,
        location: [station.StationPosition.PositionLat, station.StationPosition.PositionLon],
        updateTime: dayjs(station.UpdateTime).format('MM/DD HH:mm'),
        serviceType: station.ServiceType,
        capacity: station.BikesCapacity
      }
    })
  }
}

export default formatter