import Trip from '../src/trip.js';

class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id
    this.name = travelerData.name
    this.travelerType = travelerData.travelerType
    this.allTrips = []
    this.pastTrips = []
    this.futureTrips = []
    this.pendingTrips = []
    this.currentLocation = "Denver, Colorado"
  }
  determineTrips(trips, currentDate, allDestinations) {
    trips.forEach(trip => {
      let tripDestination
      allDestinations.forEach(destination => {
        if(trip.destinationID === destination.id)
        tripDestination = destination
      })
      if (trip.userID === this.id) {
        this.allTrips.push(new Trip(trip, tripDestination))
      }
    })
    this.sortTrips(currentDate)
  }
  sortTrips(currentDate) {
    this.allTrips.forEach(trip => {
      if (trip.determineTripStatus(currentDate) === 'pending') {
        this.pendingTrips.push(trip)
      } else if (trip.determineTripStatus(currentDate) === 'past') {
        this.pastTrips.push(trip)
      } else if (trip.determineTripStatus(currentDate) === 'upcoming') {
        this.futureTrips.push(trip)
      } else if (trip.determineTripStatus(currentDate) === 'present') {
        this.currentLocation = trip.destinationData.destination
      }
    })
  }
}
export default Traveler;
