class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id
    this.name = travelerData.name
    this.travelerType = travelerData.travelerType
    this.pastTrips = []
    this.futureTrips = []
    this.pendingTrips = []
    this.currentLocation = {destination: "Denver, Colorado"}
  }
}
export default Traveler;
