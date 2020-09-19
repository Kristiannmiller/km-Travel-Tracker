import chai from 'chai';
const expect = chai.expect;

import destinationsData from './datasets/destinations-data.js';
import travelersData from './datasets/travelers-data.js';
import tripsData from './datasets/trips-data.js';
import Trip from '../src/trip.js';

describe('Trip', function() {
  let trip;
  let traveler;
  let destination;

  beforeEach(function() {
    trip = new Trip(tripsData.trips[0])
  });
  describe('functionality and properties', () => {
    it('should be a function', () => {
      expect(Trip).to.be.a('function');
    });
  })
});
