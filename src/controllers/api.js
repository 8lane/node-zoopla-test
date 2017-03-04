const request = require('request');

module.exports.fetchResults = function(searchTerm) {
  return new Promise(function(resolve, reject) {
    request({
      url: 'http://localhost:8080/api/search', /* make dynamic! */
      method: 'GET'
    }, function(err, response, body) {
      let data = JSON.parse(body);
      if(data.area === searchTerm) {
        resolve(data)
      } else {
        reject(null);
      }
    });
  });
};
