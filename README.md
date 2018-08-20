# GCP/AWS Hybrid Deployment Demo

##### By: Ryan Jones
##### Date: 08/18/2018

## Global Dependencies

```bash
brew install node
npm install -g serverless
```

## AWS Directory

The AWS directory is a separate Serverless Framework stack which will deploy all of our AWS resources. Inside of the AWS directory their are instructions for how to make the resource deployments.

## GCP Directory

The GCP directory is a separate Serverless Framework stack which will deploy all of our GCP resources. Inside of the GCP directory their are instructions for how to make the resource deployments.

## Unit Testing

We are doing some basic unit tests using `Mocha` and `Chai`.

[Source](https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71)

## CI/CD

We are going to be creating a CI/CD pipeline from [CircleCI](https://circleci.com/).