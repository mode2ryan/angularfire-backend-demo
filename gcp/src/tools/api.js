'use strict';

let request = require('request');

let api = {};

/*
Args:
  options = {
    url: url,
    method: 'POST', | GET | PUT | DELETE
    body: { "name": "ryan", "age": 23 },
    json: true,
    headers: headers
  };
*/
api.makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (err, httpResponse, body) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(httpResponse);
      }
    });
  });
};

module.exports = api;
