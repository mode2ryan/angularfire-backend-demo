# GCP/AWS Hybrid Deployment Demo

##### By: Ryan Jones
##### Date: 08/18/2018

## Install Dependencies

We need to install a few dependencies globally, clone the project, and install the project dependencies.

```bash
git clone https://github.com/mode2ryan/angularfire-backend-demo
cd angularfire-backend-demo/aws

npm install
```

## Account Creation + Local Setup + How to deploy using Serverless Framework

You need to have your local machine set up before you can make deployments to AWS using the Serverless Framework. You can find an article for that here, [Setup Serverless Framework](https://medium.com/@serverlessguru/guide-first-serverless-project-630b91366505). The article will walk you through the account setup process.

### Setup config file

The config folder will hold our different stage environment variables that will make our stacks dynamic across deployments. By using the `--stage <stage>` flag we can pass `prod`, `test`, or `dev`. Which will result in our stack referencing the associated config file. So `--stage prod` will pull details from the `config/config.prod.yml` file.

#### Create config.dev.yml

Create `config.dev.yml` inside the `aws/config` directory. We can use `config.example.yml` as a reference then pass in your AWS Account ID and dynamodb table name. Which you can find in the AWS Console under [My Account](https://console.aws.amazon.com/billing/home?#/account).

```yaml
account:
  id: <ACCOUNT_ID>

db:
  table:
    name: <TABLE_NAME>
```

### Deploy to dev stage

```bash
sls deploy --stage dev -v
```

### Deploy to prod stage

```bash
sls deploy --stage prod -v
```