var hbs = require('express-hbs');

/* Format property titles */
hbs.registerHelper("propertyTitleHelper", (result) => `${result.num_bedrooms} bedroom ${result.property_type} for sale`);

/* Format agency addresses */
hbs.registerHelper("agentAddressHelper", (result) => `${result.agent_address}, ${result.agent_postcode}`);

/* Format proerty prices */
hbs.registerHelper("priceHelper", (val) => {
  let price = parseInt(val);
  if(!isNaN(parseFloat(price)) && isFinite(price)) { /* http://stackoverflow.com/q/18082/1010691 */
    let formattedPrice = '£' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); /* http://stackoverflow.com/a/2901298/1010691 */
    return formattedPrice;
  }
});
