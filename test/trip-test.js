import chai from 'chai';
const expect = chai.expect;

import destinationsData from './datasets/destinations-data.js';
import travelersData from './datasets/travelers-data.js';
import tripsData from './datasets/trips-data.js';
import Trip from '../src/trip.js';

describe('Trip', function() {
  let pastTrip;
  let presentTrip;
  let futureTrip;
  let traveler;
  let destination;

  beforeEach(function() {
    pastTrip = new Trip(tripsData.trips[0])
    futureTrip = new Trip(tripsData.trips[1])
    presentTrip = new Trip(tripsData.trips[2])
  });
  describe('functionality and properties', () => {
    it('should be a function', () => {
      expect(Trip).to.be.a('function');
    });
    it('should contain all properties within the initial trip data', () => {
      expect(trip.id).to.equal(1)
      expect(trip.travelerID).to.equal(1)
      expect(trip.destinationID).to.equal(1)
      expect(trip.totalTravelers).to.equal(1)
      expect(trip.departDate).to.equal("2019/09/16")
      expect(trip.duration).to.equal(8)
      expect(trip.status).to.equal("approved")
      expect(trip.suggestedActivities).to.deep.equal([])
    });
  })
  describe('determineTripStatus', () => {
    it('should determine if a trip is past', () => {
      expect(pastTrip.determineTripStatus()).to.equal('past')
    })
    it('should determine if a trip is present', () => {
      expect(presentTrip.determineTripStatus()).to.equal('present')
    })
    it('should determine if a trip is upcoming', () => {
      expect(futureTrip.determineTripStatus()).to.equal('upcoming')
    })
  })
});
