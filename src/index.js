// ************ IMPORTED FILES *************** //
import './css/base.scss';
import './css/styles.scss';
import './images/placeholderVacayPhoto.jpg';
import './images/Parchment-3.jpg';
import './images/compassLogo.png';
import Traveler from './traveler.js';
import Trip from './trip.js';
import domUpdates from './domUpdates.js';
import moment from 'moment';
import fetchRequests from './fetchRequests'


// ************ QUERY SELECTORS *************** //
const loginButton = document.querySelector('.login-button');
const loginPage = document.querySelector('.loginPage')
const dashboard = document.querySelector('.dashboard')
const planTripView = document.querySelector('.planTripView')
const tripCardsSection = document.querySelector('.tripCards')
const navAll = document.querySelector('.allNav')
const navUpcoming = document.querySelector('.upcomingNav')
const navPast = document.querySelector('.pastNav')
const navPending = document.querySelector('.pendingNav')
const navBook = document.querySelector('.bookNav')



// ************ EVENT LISTENERS *************** //
loginButton.addEventListener('click', determineValidID);
navAll.addEventListener('click', displayMainDashboard);
navUpcoming.addEventListener('click', displayUpcomingTripView);
navPast.addEventListener('click', displayPastTripView);
navPending.addEventListener('click', displayPendingTripView);
navBook.addEventListener('click', displayUpcomingTripView); //displayBookingView
// ************ GLOBAL VARIABLES *************** //
let currentTraveler
let destinationsData
let currentTrips
let now = moment().format('YYYY/MM/DD')

// *************************** //

function determineValidID(event) {
  event.preventDefault()
  let usernameInput = document.querySelector('#username-input').value
  let userType = !usernameInput ? undefined : usernameInput.split(/([0-9])/)[0]
  let userID = !usernameInput ? undefined : +usernameInput.substring(8, 11)
  let passwordInput = document.querySelector('#password-input').value
  if (!userType || userType !== 'traveler' || !userID || typeof userID !== 'number') {
    alert('please enter a valid traveler username')
  } else if (!passwordInput || passwordInput !== 'travel2020') {
    alert('please enter a valid password')
  } else {
    loadTravelerInfo(userID)
  }
}

function displayMainDashboard(userID) {
  domUpdates.changePageDisplay('dashboard')
  domUpdates.greetTraveler(currentTraveler)
  domUpdates.displayCurrentLocation(currentTraveler)
  domUpdates.displayTrips(currentTraveler.allTrips, tripCardsSection, "My Trips")
}
function displayUpcomingTripView() {
  domUpdates.changePageDisplay('dashboard')
  domUpdates.displayTrips(currentTraveler.futureTrips, tripCardsSection, "My Upcoming Trips")
}
function displayPastTripView() {
  domUpdates.changePageDisplay('dashboard')
  domUpdates.displayTrips(currentTraveler.pastTrips, tripCardsSection, "My Past Trips")
}
function displayPendingTripView() {
  domUpdates.changePageDisplay('dashboard')
  domUpdates.displayTrips(currentTraveler.pendingTrips, tripCardsSection, "My Pending Trips")

}


function loadTravelerInfo(userID) {
  fetchRequests.checkData(userID).then(data => {
    currentTraveler = new Traveler(data[0])
    destinationsData = data[1]
    currentTrips = data[2].filter(trip => trip.userID === currentTraveler.id)
    currentTraveler.determineTrips(currentTrips, now, destinationsData)
    displayMainDashboard(userID)
  })
}
