'use strict';

let content = {};

let TABLE_NAME = process.env.TABLE_NAME;

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
    // take apart GCF event
    let body = JSON.parse(event.body);

    if(Object.keys(body).length <= 0) {
      // respond
      response.statusCode = 200;
      repsonse.body = "healthy";
      return response;
    }

    console.log(JSON.stringify(body));

    // invoke SNS
    console.log('invoking SNS');

    // store in DynamoDB
    console.log('storing log in DynamoDB');

    let params = {
      TableName: TABLE_NAME,
      Item: {
        "id": body.params.article,
        "img": body.data.value.fields.img.stringValue,
        "resource": body.resource,
        "timestamp": body.timestamp,
        "status": "COMPLETE"
      }
    };
    let db_response = await dynamodb.putItem(params);
    console.log(db_response);

    // Create response object
    response.statusCode = 200;
    response.body = JSON.stringify({data: "test"});
  } catch (err) {
    console.log(err);

    // Create response object
    response.statusCode = err.statusCode;
    response.err = JSON.stringify(err);
  } finally {
    return response;
  }
};

module.exports = content;
