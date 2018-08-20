'use strict';

let api_helper = require('../tools/api');

let content = {};

content.http = (request, response) => {
  response.status(200).send(data);
};

content.event = (event, callback) => {
  console.log(event);

  let options = {
    url: `https://juldxpapc3.execute-api.us-west-2.amazonaws.com/dev/api/sns`,
    body: event,
    json: true,
    method: "POST",
    headers: {}
  };

  api_helper.makeRequest(options)
    .then((data) => {
      console.log(data);
      callback(null, data);
    }).catch((err) => {
      console.log(err);
      callback(err);
    });
};

module.exports = content;