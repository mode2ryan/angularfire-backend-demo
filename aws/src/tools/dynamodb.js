'use strict';

let AWS = require('aws-sdk');
let dynamodb = {};

/**
getItem:
  Will get an Item in DynamoDB given a params object

  params = {
    Key: {
      "example_id": "12345"
    },
    TableName: "example_table"
  };
*/
dynamodb.getItem = (params) => {
  return new Promise((resolve, reject) => {
    let db = new AWS.DynamoDB.DocumentClient();
      db.get(params, (err, data) => {
        console.log('inside db.get');
        console.log(`Params = ${JSON.stringify(params)}`);
        if(err) {
          console.log('Error: ' + err);
          reject(err);
        } else {
          console.log('db:Data: ' + JSON.stringify(data));
          resolve(data);
        }
      });
  });
};

dynamodb.preformScan = (params, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var items = []
  var scanExecute = function(callback) {
      docClient.scan(params,function(err,result) {
          if(err) {
              callback(err);
          } else {
              items = items.concat(result.Items);
              if(result.LastEvaluatedKey) {
                  console.log('LastEvaluatedKey exists');
                  params.ExclusiveStartKey = result.LastEvaluatedKey;
                  scanExecute(callback);
              } else {
                  console.log('LastEvaluatedKey does not exist');
                  callback(err, items);
              }
          }
      });
  }
  scanExecute(callback);
};

/**
scan:
  Will get an Item in DynamoDB given a params object

  params = {
    TableName: "example_table"
  };
*/
dynamodb.scan = (params) => {
  return new Promise((resolve, reject) => {
    let db = new AWS.DynamoDB.DocumentClient();
      db.scan(params, (err, data) => {
        console.log('inside db.scan');
        console.log(`Params = ${JSON.stringify(params)}`);
        if(err) {
          console.log('Error: ' + err);
          reject(err);
        } else {
          console.log('db:Data: ' + JSON.stringify(data));
          resolve(data);
        }
      });
  });
};

/**
updateItem:
  Will update an Item in DynamoDB given a params object

  params = {
    TableName: 'example_table',
    Key: {
      "example_id": "123456"
    },
    UpdateExpression: 'set name = :name, age = :age',
    ExpressionAttributeValues: {
      ':name' : 'Ryan',
      ':age' : 22,
    }
  };
*/
dynamodb.updateItem = (params) => {
  return new Promise((resolve, reject) => {
    let db = new AWS.DynamoDB.DocumentClient();
      db.update(params, (err, data) => {
        console.log('inside db.update');
        if(err) {
          console.log('Error: ' + err);
          reject(err);
        } else {
          console.log('Data: ' + JSON.stringify(data));
          resolve(null, data);
        }
      });
  });
};

/**
deleteItem:
  Will delete an Item in DynamoDB given a params object

  params = {
    Key: {
      "example_id": "12345"
    },
    TableName: "example_table"
  };
*/
dynamodb.deleteItem = (params) => {
  return new Promise((resolve, reject) => {
    let db = new AWS.DynamoDB.DocumentClient();
      db.delete(params, (err, data) => {
        console.log('inside db.delete');
        if(err) {
          console.log('Error: ' + err);
          reject(err);
        } else {
          console.log('Data: ' + JSON.stringify(data));
          resolve(null, data);
        }
      });
  });
};

/**
putItem:
  Will create a new Item in DynamoDB given a params object

  params = {
    Item: {
      "example_id": "12345",
      "name": "Ryan",
      "age": 22
    },
    TableName: "example_table"
  };
*/
dynamodb.putItem = (params) => {
  return new Promise((resolve, reject) => {
    let db = new AWS.DynamoDB.DocumentClient();
      db.put(params, (err, data) => {
        console.log('inside db.put');
        if(err) {
          console.log('Error: ' + err);
          reject(err);
        } else {
          console.log('Data: ' + JSON.stringify(data));
          resolve(data);
        }
      });
  });
};

/**
createStartingParams:
  Will give you the basic parmas which can then be built upon
  for a specific type of request (e.g. get, post, delete)

  obj = {
    type: "get"
    keyName: "id",
    keyValue: "123456",
    tableName: "example_table"
  };

*/
dynamodb.createDefaultParams = (obj) => {
  if(obj.type === 'put') {
    return {
      Item: {
        [obj.hashKey]: obj.hashValue
      },
      TableName: obj.tableName
    };
  } else {
    return {
      Key: {
        [obj.hashKey]: obj.hashValue
      },
      TableName: obj.tableName
    };
  }
};

dynamodb.uploadFileToS3 = (param) => {
  return new Promise((resolve, reject) => {
    let s3 = new AWS.S3();
    s3.putObject(param, (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(data);
        }
    });
  });
};

dynamodb.query = (params) => {
  console.log('--IN query');
  return new Promise((resolve, reject) => {
    let db = new AWS.DynamoDB.DocumentClient();
      db.query(params, (err, data) => {
        console.log('inside db.query');
        console.log(`params = ${JSON.stringify(params)}`);
        if(err) {
          console.log('Error: ' + err);
          reject('err came from dynamodb.query: ' + err);
        } else {
          console.log('Data: ' + JSON.stringify(data));
          resolve(data);
        }
      });
  });
};

/**
createUpdateParams:
  Will take an object with key/value's and default params. Then create
  the dynamodb syntax required to update the table

  Arguments:
    params = {
      Key: {
        "example_id": "123456"
      },
      TableName: "example_table"
    };

    obj = {
      "name": "Ryan",
      "age": 22
    };

  Returns:
    params = {
      TableName: 'example_table',
      Key: {
        "example_id": "123456"
      },
      UpdateExpression: 'set name = :name, age = :age',
      ExpressionAttributeValues: {
        ':name' : 'Ryan',
        ':age' : 22,
      }
    };
*/
dynamodb.createUpdateParams = (params, obj) => {
  let keys = Object.keys(obj);

  let mapped = keys.map((key) => {
    return key + ' = :' + key;
  });
  console.log(JSON.stringify(mapped));

  let updateExpression = `set ${mapped.join()}`;
  console.log('UpdateExpression = ' + updateExpression);

  let expressionAttributeValues = {};
 	keys.forEach((key) => {
  	let newKey = `:${key}`;
  	expressionAttributeValues[newKey] = obj[key];
  });
  console.log(expressionAttributeValues);

  params.UpdateExpression = updateExpression;
  params.ExpressionAttributeValues = expressionAttributeValues;
  params.ReturnValues = "UPDATED_NEW";
  return params;
}

module.exports = dynamodb;
