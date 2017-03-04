const hbs = require('express-hbs');

/* Format property titles */
module.exports.propertyTitleHelper = function(result) {
  return `${result.num_bedrooms} bedroom ${result.property_type} for sale`;
};

/* Format agency addresses */
module.exports.agentAddressHelper = function(result) {
  return `${result.agent_address}, ${result.agent_postcode}`;
};

/* Format proerty prices */
module.exports.priceHelper = function(price) {
  if(!isNaN(parseFloat(price)) && isFinite(price)) { /* http://stackoverflow.com/q/18082/1010691 */
    let formattedPrice = '£' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); /* http://stackoverflow.com/a/2901298/1010691 */
    return formattedPrice;
  }
};

hbs.registerHelper("propertyTitleHelper", exports.propertyTitleHelper);
hbs.registerHelper("agentAddressHelper", exports.propertyTitleHelper);
hbs.registerHelper("priceHelper", exports.priceHelper);
