import chai from 'chai';
const expect = chai.expect;

import destinationsData from './datasets/destinations-data.js';
import tripsData from './datasets/trips-data.js';
import Trip from '../src/trip.js';


describe('Trip', function() {
  let pastTrip;
  let presentTrip;
  let futureTrip;
  let pendingTrip;

  beforeEach(function() {
    pastTrip = new Trip(tripsData.trips[0], destinationsData.destinations[0])
    futureTrip = new Trip(tripsData.trips[1], destinationsData.destinations[1])
    presentTrip = new Trip(tripsData.trips[2], destinationsData.destinations[2])
    pendingTrip = new Trip(tripsData.trips[3], destinationsData.destinations[0])
  });
  describe('functionality and properties', () => {
    it('should be a function', () => {
      expect(Trip).to.be.a('function');
    });
    it('should contain all properties within the initial trip data', () => {
      expect(pastTrip.id).to.equal(1)
      expect(pastTrip.travelerID).to.equal(1)
      expect(pastTrip.destinationID).to.equal(1)
      expect(pastTrip.totalTravelers).to.equal(1)
      expect(pastTrip.departDate).to.equal("2019/09/16")
      expect(pastTrip.duration).to.equal(8)
      expect(pastTrip.status).to.equal("approved")
      expect(pastTrip.suggestedActivities).to.deep.equal([])
    });
  })
  describe('dateRange', () => {
    it('should return an array of dates for duration of trip', () => {
      expect(pastTrip.dateRange()).to.deep.equal(
        ["2019/09/16", "2019/09/17", "2019/09/18",
      "2019/09/19", "2019/09/20", "2019/09/21",
    "2019/09/22", "2019/09/23"])
    })
  })
  describe('determineTripStatus', () => {
    it('should determine if a trip is past', () => {
      expect(pastTrip.determineTripStatus("2020/09/19")).to.equal('past')
    })
    it('should determine if a trip is present', () => {
      expect(presentTrip.determineTripStatus("2020/09/19")).to.equal('present')
    })
    it('should determine if a trip is upcoming', () => {
      expect(futureTrip.determineTripStatus("2020/09/19")).to.equal('upcoming')
    })
    it('should determine a trip is pending above all other options if status is pending', () => {
      expect(pendingTrip.determineTripStatus("2020/09/19")).to.equal('pending')
    })
  })
  describe('determineTripCost', () => {
    it('should give an estimated cost for a trip including 10% agent fee', () => {
      expect(presentTrip.determineTripCost()).to.equal(6611.00)
    })
  })
});
