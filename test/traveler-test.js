import chai from 'chai';
const expect = chai.expect;

import destinationsData from './datasets/destinations-data.js';
import travelersData from './datasets/travelers-data.js';
import tripsData from './datasets/trips-data.js';
import Trip from '../src/trip.js';
import Traveler from '../src/traveler.js';

describe('Traveler', function() {
  let traveler1;
  let traveler2;
  let traveler3;

  beforeEach(function() {
    traveler1 = new Traveler(travelersData.travelers[0])
    traveler2 = new Traveler(travelersData.travelers[1])
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
  })
})
