const domUpdates = {
  changePageDisplay(displayPage) {
    const loginPage = document.querySelector('.loginPage')
    const dashboard = document.querySelector('.dashboard')
    const planTripView = document.querySelector('.planTripView')
    const tripCards = document.querySelector('.tripCardsView')
    this.hidePages([loginPage, dashboard, planTripView, tripCards])
    if (displayPage === 'login') {
      loginPage.classList.remove('hidden')
    } else if (displayPage === 'dashboard') {
      dashboard.classList.remove('hidden')
      tripCards.classList.remove('hidden')
    } else if (displayPage === 'planTripView') {
      dashboard.classList.remove('hidden')
      planTripView.classList.remove('hidden')
    }
  },
  hidePages(pages) {
    pages.forEach(page => page.classList.add('hidden'))
  },
  greetTraveler(currentTraveler) {
    const greetingText = document.querySelector('.greeting')
    greetingText.innerText = `AHOY, ${currentTraveler.sayFirstName()}!`
  },
  displayCurrentLocation(currentTraveler) {
    const locationText = document.querySelector('.currentLocation')
    locationText.innerText = `${currentTraveler.currentLocation}`
  },
  displayPastTripsInSideBar(currentTraveler) {
    const pastTripsSideBar = document.querySelector('.past-trips')
    if (currentTraveler.pastTrips === []) {
      pastTripsSideBar.classList.add('hidden')
    } else {
      pastTripsSideBar.innerHTML = `<h2>Past Trips</h2>`
      currentTraveler.pastTrips.forEach(trip => {
        let range = trip.dateRange()
        let endDate = range[range.length - 1]
        pastTripsSideBar.innerHTML +=
        `<section class="trip-card-container">
          <section class="small-trip-card" id="card">
            <h3 maxlength="40">${trip.destinationData.destination}</h3>
            <section class="photo-container">
              <img src="${trip.destinationdata.image}" class="photo-preview" alt="${trip.destinationData.alt}" title="trip">
            </section>
            <section class="trip-date-range">
              <h4>${trip.departDate} - ${endDate}</h4>
            </section>
            <section class="trip-status">
              <h4>Trip Status: Past</h4>
            </section>
          </section>
        </section>`
      })
    }
  }
}

export default domUpdates;
