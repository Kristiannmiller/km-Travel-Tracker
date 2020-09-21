const fetchRequests = {
  checkData(userID) {
    return Promise.all([this.getTravelerData(userID), this.getDestinationsData(), this.getTripsData()])
      .then(data => data)
      .catch(error => console.log(error))
  },
  getTravelerData(userID) {
    return fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${userID}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
  },
  getDestinationsData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
      .then(response => response.json())
      .then(data => data.destinations)
      .catch(error => console.log(error))
  },
  getTripsData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
      .then(response => response.json())
      .then(data => data.trips)
      .catch(error => console.log(error))
  }
}
export default fetchRequests;
