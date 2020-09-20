import moment from 'moment'

class Trip {
  constructor(tripData) {
    this.id = tripData.id
    this.travelerID = tripData.userID
    this.destinationID = tripData.destinationID
    this.totalTravelers = tripData.travelers
    this.departDate = moment(new Date(tripData.date)).format('YYYY/MM/DD')
    this.duration = tripData.duration
    this.status = tripData.status
    this.suggestedActivities = tripData.suggestedActivities
  }

  dateRange() {
    let range = new Array(this.duration).fill(0)
    return range.map((day, i) => {
      return day = moment(new Date(this.departDate)).add(i, 'days').format('YYYY/MM/DD')
    })
  }

  determineTripStatus(currentDate) {
    let compareDate = moment(new Date(currentDate)).format('YYYY/MM/DD')
    let range = this.dateRange()
    let endDate = range[range.length - 1]
    if (this.status === 'pending') {
      return 'pending'
    }
    if (range.includes(compareDate)) {
      return 'present'
    }
    if (moment(new Date(compareDate)).isAfter(moment(new Date(endDate)), 'day')) {
      return 'past'
    }
    if (moment(new Date(compareDate)).isBefore(moment(new Date(this.departDate)), 'day')) {
      return 'upcoming'
    }
  }
}
export default Trip;
