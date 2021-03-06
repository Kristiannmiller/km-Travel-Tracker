import chai from 'chai';
const expect = chai.expect;

import destinationsData from './datasets/destinations-data.js';
import travelersData from './datasets/travelers-data.js';
import tripsData from './datasets/trips-data.js';
import Traveler from '../src/traveler.js';

describe('Traveler', function() {
  let traveler1;
  let traveler3;

  beforeEach(function() {
    traveler1 = new Traveler(travelersData.travelers[0])
    traveler3 = new Traveler(travelersData.travelers[2])
  })
  describe('functionality and properties', () => {
    it('should be a function', () => {
      expect(Traveler).to.be.a('function');
    })
    it('should contain all properties within the initial trip data', () => {
      expect(traveler1.id).to.equal(1)
      expect(traveler1.name).to.equal('Ham Leadbeater')
      expect(traveler1.travelerType).to.equal('relaxer')
    })
    it('should have empty arrays for trips by status', () => {
      expect(traveler1.pastTrips).to.deep.equal([])
      expect(traveler1.futureTrips).to.deep.equal([])
      expect(traveler1.pendingTrips).to.deep.equal([])
    })
    it('should be in Denver, Colorado by default', () => {
      expect(traveler1.currentLocation).to.equal("Denver, Colorado")
    })
  })
  describe('sayFirstName', () => {
    it('should say the first name of the traveler', () => {
      expect(traveler1.sayFirstName()).to.equal("Ham")
    })
  })
  describe('determineTrips', () => {
    it('should sort traveler trips into appropriate status arrays', () => {
      traveler1.determineTrips(tripsData.trips, '2020/09/19', destinationsData.destinations)
      expect(traveler1.pastTrips.length).to.equal(3)
      expect(traveler1.futureTrips.length).to.equal(1)
      expect(traveler1.pendingTrips.length).to.equal(2)
      expect(traveler1.allTrips.length).to.equal(7)
    })
    it('should update currentLocation if the traveler is traveling', () => {
      traveler1.determineTrips(tripsData.trips, '2020/09/19', destinationsData.destinations)
      expect(traveler1.currentLocation).to.equal("Sydney, Austrailia")
    })
  })
  describe('determineYearlyTripCost', () => {
    it('should determine the total amount spent on trips for a given year', () => {
      traveler3.determineTrips(tripsData.trips, '2020/09/19', destinationsData.destinations)
      expect(traveler3.determineYearlyTripCost(2020)).to.equal(3245.00)
    })
  })
})
