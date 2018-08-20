# GCP/AWS Hybrid Deployment Demo

##### By: Ryan Jones
##### Date: 08/18/2018

## Install Dependencies

We need to install a few dependencies globally, clone the project, and install the project dependencies.

```bash
git clone https://github.com/mode2ryan/angularfire-backend-demo
cd angularfire-backend-demo/gcp

npm install
```

## Install gcloud cli

You can find download instructions for MacOS, Windows, and Linux, [here](https://cloud.google.com/sdk/docs/quickstarts) Below is a shorter verison from the [MacOS](https://cloud.google.com/sdk/docs/quickstart-macos) installation guide.

### Check Python Version

```bash
python -v  # 2.7+ required
```

### Download and open TAR file locally

This step may not immediately work for you, but google has a `install.sh` bash script which you run.

```bash
./google-cloud-sdk/install.sh  # cd google-cloud-sdk -> sh install.sh
```

### Restart terminal

For changes to take place you need to restart your terminal.

### Initialize gcloud

```bash
gcloud init
```

### Accept the option to login with Google

```bash
To continue, you must log in. Would you like to log in (Y/n)? Y
```

### Grant permissions to Google Cloud Platform resources

A page will automatically open asking you if you accept the permissions GCP is asking for.

### Select your project

If this is a fresh account you may not see this prompt, however if you have a couple projects you will see them below.

```bash
Pick cloud project to use:
 [1] [my-project-1]
 [2] [my-project-2]
 ...
 Please enter your numeric choice:
```

### Test Installation

```bash
gcloud help
```

## Generate IAM Credentials for gcloud

We need to generate a credentials file which will be stored locally on our computer allowing us to make Serverless Framework deployments to GCP. The file will be stored in the following location, `~/.gcloud/keyfile.json`.

- Create a billing account
- Create a new Google Cloud Project
- Enable API's
- Get Credentials

To do this let's follow the Serverless Framework documentation, [here](https://serverless.com/framework/docs/providers/google/guide/credentials/).

### Save/Mode JSON Credentials file to ~/.gcloud/

I saved the Service Account JSON credentials file as `keyfile.json` in my `downloads` folder initially. Then moved it into the `~/.gcloud/` directory.

```bash
cd ~
mkdir .gcloud
mv downloads/keyfile.json .gcloud/keyfile.json
```

### Create Config file

We use a config file to make sure that our different stages have the proper values. For instance, our `dev` stage uses our `dev` GCP projectId where our `prod` stage uses our `prod` GCP projectId.

As your apps grow in complexity the amount of information inside your `config.<stage>.yml` files will also grow. There is a reference to the structure needed inside the `config/config.example.yml` file. Create a file called, `config.dev.yml` and copy your **Project ID** in.

```yaml
# config.dev.yml
projectId: my-awesome-project
```

## GCF triggers (Firestore Focused)

We can use the serverless framework to automatically attach our GCP functions to our Firestore database. There are two main concepts, `eventType` and `resource`.

### EventType

This is what defines what will cause the GCF to be triggered (e.g. create, update, delete, write). Below, is a couple examples.

```yaml
Create - providers/cloud.firestore/eventTypes/document.create
Update - providers/cloud.firestore/eventTypes/document.update
Delete - providers/cloud.firestore/eventTypes/document.delete
Write - providers/cloud.firestore/eventTypes/document.write
```

[Google Documentation - Firestore Triggers](https://cloud.google.com/functions/docs/calling/cloud-firestore)
[Serverless Framework - GCP Event](https://serverless.com/framework/docs/providers/google/events/event/)

### Resource Paths

With triggers in general on GCP, they use the term `Resource`, however for Firebase they refer to this as `document path`.

**Example 1:**

```yaml
projects/angularfire-demo-101010/databases/(default)/documents/articles/{article}
```

This will set our `Resource path` on our `articles` collection when any document or `{article}` is created, updated, or deleted. The `{ docuement_wildcard }` syntax means it's not for a specific value, but for all new creates.

**Example 2:**

```yaml
projects/angularfire-demo-101010/databases/(default)/documents/articles/wildfires-in-california
```

In this example we set our `Resource path` to only listen to changes on the `wildfires-in-california` document. Versus using the `{wildcard}` syntax to listen to `ALL` changes.

### Additional Notes

You can setup GCF to trigger off of everything from `pub/sub`, `Google Cloud Storage`, `Firestore`, `HTTP`, or `Direct Triggers`. It's really powerful and the **Serverless Framework** supports all GCF triggers. You can find more information on GCF triggers, [here](https://cloud.google.com/functions/docs/calling/).

## We're ready to deploy

We can easily deploy our Serverless project by running the following command.

```bash
serverless deploy -v
```

Above, we made a deploy to the Google Cloud in `verbose` mode giving us extra print outs. With any luck we should see a `Service Information` log informing us of the successful deployment.