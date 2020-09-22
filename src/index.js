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
import fetchRequests from './fetchRequests';

// ************ QUERY SELECTORS *************** //
const loginButton = document.querySelector('.login-button');
const tripCardsSection = document.querySelector('.tripCards');
const navAll = document.querySelector('.allNav');
const navUpcoming = document.querySelector('.upcomingNav');
const navPast = document.querySelector('.pastNav');
const navPending = document.querySelector('.pendingNav');
const navBook = document.querySelector('.bookNav');
const exitTripDetails = document.querySelector('.trip-details');
const submitTripButton = document.querySelector('.submitTripButton');
const bookTripButton = document.querySelector('#bookTripButton');

// ************ EVENT LISTENERS *************** //
loginButton.addEventListener('click', determineValidID);
navAll.addEventListener('click', displayMainDashboard);
navUpcoming.addEventListener('click', displayUpcomingTripView);
navPast.addEventListener('click', displayPastTripView);
navPending.addEventListener('click', displayPendingTripView);
tripCardsSection.addEventListener('click', determineTrip);
exitTripDetails.addEventListener('click', exitTripDetailCard);
navBook.addEventListener('click', displayBookingView);
tripCardsSection.addEventListener('click', determineTrip);
submitTripButton.addEventListener('click', displayNewTrip);
bookTripButton.addEventListener('click', saveTripData);

// ************ GLOBAL VARIABLES *************** //
let currentTraveler
let destinationsData
let currentTrips
let newTrip = {}
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

function loadTravelerInfo(userID) {
  fetchRequests.checkData(userID).then(data => {
    currentTraveler = new Traveler(data[0])
    destinationsData = data[1]
    currentTrips = data[2].filter(trip => trip.userID === currentTraveler.id)
    currentTraveler.determineTrips(currentTrips, now, destinationsData)
    displayMainDashboard()
  })
}

function displayMainDashboard() {
  domUpdates.changePageDisplay('dashboard')
  domUpdates.greetTraveler(currentTraveler)
  domUpdates.displayCurrentLocation(currentTraveler)
  domUpdates.displayTripCostTotal(currentTraveler, now.split('/')[0])
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

function exitTripDetailCard(event) {
  if (event.target === document.querySelector('#bookTripButton')) {
    saveTripData()
    domUpdates.exitTripDetails()
  } else {
    domUpdates.exitTripDetails()
  }
}
function determineTrip(event) {
  let trip = currentTraveler.allTrips.find(trip => {
    return +event.target.id.split('-')[1] === trip.id
  })
  if (trip) {
    domUpdates.displayTripDetails(trip, false)
  }
}
function getDestinationsList() {
  let destinationList = destinationsData.reduce((list, destination) => {
    if (!list.includes(destination.destination)) {
      list.push(destination.destination)
    }
    return list
  }, [])
  return destinationList.sort()
}
function displayBookingView() {
  let destinationList = getDestinationsList()
  domUpdates.changePageDisplay('planTripView')
  domUpdates.displayDestinationDropdown(destinationList)
}
function displayNewTrip(event) {
  event.preventDefault()
  const travelerCount = +document.querySelector('#travelersAmount').value
  const startDate = document.querySelector('#daySelector').value
  const duration = +document.querySelector('#tripDuration').value
  const destination = document.querySelector('#destinationInput').value
  let destinationData = findDestination(destination)
  buildNewTrip(travelerCount, startDate, duration, destination)
  let trip = new Trip(newTrip, destinationData)
  domUpdates.displayTripDetails(trip, true)
}
function buildNewTrip(travelerCount, startDate, duration, destination) {
  newTrip.id = Date.now()
  newTrip.userID = currentTraveler.id
  newTrip.destinationID = findDestination(destination).id
  newTrip.travelers = travelerCount
  newTrip.date = moment(new Date(startDate)).format("YYYY/MM/DD")
  newTrip.duration = duration
  newTrip.status = 'pending'
  newTrip.suggestedActivities = []
}
function findDestination(destination) {
  if (typeof destination === 'string') {
    return destinationsData.find(location => {
      return location.destination === destination
    })
  } else {
    return destinationsData.find(location => {
      return location.id === destination
    })
  }
}
function saveTripData() {
  let tripToAdd = new Trip(newTrip, findDestination(newTrip.destinationID))
  currentTraveler.allTrips.push(tripToAdd)
  currentTraveler.pendingTrips.push(tripToAdd)
  displayMainDashboard()
  fetchRequests.postNewTrip(newTrip)
}
