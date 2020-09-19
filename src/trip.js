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
}
export default Trip;
