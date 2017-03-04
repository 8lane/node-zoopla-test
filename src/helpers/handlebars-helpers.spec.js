const chai = require('chai');
const expect = chai.expect;
const helpers = require('./handlebars-helpers');

describe('Handlebars Helpers', function() {
  describe('Property title', function() {
    it('should be formatted with number of bedrooms and type', function() {
      // Arrange
      let expected = '25 bedroom house for sale';
      let input = { num_bedrooms: 25, property_type: 'house' }

      let titleHelper = helpers.propertyTitleHelper(input); // Act

      expect(titleHelper).to.be.equal(expected); // Assert
    });
  })

  describe('Agency address', function() {
    it('should be formatted with the address and post code', function() {
      // Arrange
      let expected = '123 my aweeesome house, NW1 XYZ';
      let input = { agent_address: '123 my aweeesome house', agent_postcode: 'NW1 XYZ' }

      let addressHelper = helpers.agentAddressHelper(input); // Act

      expect(addressHelper).to.be.equal(expected); // Assert
    });
  })

  describe('Price formatter', function() {
    it('should only format a number', function() {
      let num = 123;
      expect(helpers.priceHelper(num)).to.not.be.an('undefined');
    });

    it('should not format anything other than a number', function() {
      let string = 'hey123';
      expect(helpers.priceHelper(string)).to.be.an('undefined');
    });

    it('should include currency and correct formatting', function() {
      let input = 18000000;
      let expected = '£18,000,000';
      let priceHelper = helpers.priceHelper(input);
      expect(priceHelper).to.be.equal(expected);
    });
  })
})
