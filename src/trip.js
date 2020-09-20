import moment from 'moment'

class Trip {
  constructor(tripData) {
    this.id = tripData.id
    this.travelerID = tripData.userID
    this.destinationID = tripData.destinationID
    this.totalTravelers = tripData.travelers
    this.departDate = tripData.date
    this.duration = tripData.duration
    this.status = tripData.status
    this.suggestedActivities = tripData.suggestedActivities
  }
  
  dateRange() {
    let startDate = moment(new Date(this.departDate)).format('YYYY/MM/DD')
    let range = new Array(this.duration).fill(0)
    return range.map((day, i) => {
      return day = moment(new Date(startDate)).add(i, 'days').format('YYYY/MM/DD')
    })
  }

  determineTripStatus(date) {
    if (this.status === 'pending') {
      return 'pending'
    }
  }
}
export default Trip;
