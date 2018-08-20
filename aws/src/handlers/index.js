'use strict';

let content = {};

let dynamodb = require('../tools/dynamodb');

content.handler = async (event) => {
  console.log('event: ');
  console.log(JSON.stringify(event));

  let response = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
  try {
    // invoke SNS
    console.log('invoking SNS');
    // store in DynamoDB
    console.log('storing log in DynamoDB');
    response.statusCode = 200;
    response.body = JSON.stringify({data: "test"});
  } catch (err) {
    console.log(err);
    response.statusCode = err.statusCode;
    response.err = JSON.stringify(err);
  } finally {
    return response;
  }
};

module.exports = content;
