import moment from 'moment';

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
  displayTripCostTotal(currentTraveler, year) {
    const totalCost = document.querySelector('.total')
    totalCost.innerText = `$${currentTraveler.determineYearlyTripCost(+year)}`
  },
  displayTrips(trips, tripCardsSection, bannerMessage) {
    this.displayTripCardsBanner(trips, tripCardsSection, bannerMessage)
  },
  displayTripCardsBanner(trips, tripCardsSection, bannerMessage) {
    let banner = document.querySelector('.banner')
    if (trips.length === 0) {
      tripCardsSection.innerHTML = ``
      banner.innerHTML =
      `<h2>No Trips to See Here!</h2>
        <h1>Click "Book a Trip" to start planning your next adventure</h1>`
    } else {
      banner.innerHTML =
      `<h1>${bannerMessage}</h1>`
      this.displayTripCards(trips, tripCardsSection)
    }
  },
  displayTripCards(trips, tripCardsSection) {
    tripCardsSection.innerHTML = ``
    trips.forEach(trip => {
      let range = trip.dateRange()
      let startDate = moment(new Date(range[0])).format('MM/DD/YYYY')
      let endDate = moment(new Date(range[range.length - 1])).format('MM/DD/YYYY')
      tripCardsSection.innerHTML +=
      `<section class="trip-card-container">
          <section class="big-trip-card">
            <h3 maxlength="40">${trip.destinationData.destination}</h3>
            <section class="photo-container">
              <img src="${trip.image}" class="photo-preview" id="trip-${trip.id}" alt="${trip.alt}" title="trip">
              <div class="text">Take Me Away</div>
            </section>
            <section class="trip-date-range">
              <h4>${startDate} - ${endDate}</h4>
            </section>
            <section class="trip-status">
              <h4>${trip.status}</h4>
            </section>
          </section>
      </section>`
    })
  },
  displayTripDetails(trip) {
    console.log(trip);
    let tripDetailsPopup = document.querySelector(".trip-details");
    tripDetailsPopup.style.display = "inline";
    tripDetailsPopup.innerHTML = ''
    this.displayTripDetailsHeader(trip, tripDetailsPopup)
    this.displayTripDetailsImage(trip)
    tripDetailsPopup.insertAdjacentHTML("beforebegin", "<section id='overlay'></div>");
  },
  displayTripDetailsHeader(trip, tripDetailsPopup) {
    let range = trip.dateRange()
    let startDate = moment(new Date(range[0])).format('MM/DD/YYYY')
    let endDate = moment(new Date(range[range.length - 1])).format('MM/DD/YYYY')
    tripDetailsPopup.innerHTML = ``
    tripDetailsPopup.innerHTML =
    `<button id="exitTripDetails" class="exitTripDetails">X</button>
      <h3 id="tripDetailsDest">${trip.destinationData.destination}</h3>
      <h4>Dates : ${startDate} - ${endDate} (${trip.duration} days)</h4>
      <h4>Total Travelers : ${trip.totalTravelers}</h4>
      <h4>Estimated Cost : $${trip.determineTripCost()}</h4>
      <h4>Status : ${trip.status}</h4>`
  },
  displayTripDetailsImage(trip) {
    document.getElementById("tripDetailsDest").style.backgroundImage = `url(${trip.image})`
  },
  exitTripDetails() {
    let tripDetailsPopup = document.querySelector(".trip-details");
    tripDetailsPopup.style.display = "none";
    document.getElementById("overlay").remove();
  },
}

export default domUpdates;
