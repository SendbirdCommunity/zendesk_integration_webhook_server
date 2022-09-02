# Sendbird Zendesk Webhook Server

### Background

This server takes completes two tasks by listening for Zendesk webhooks 

* Creates a Sendbird channel and adds a customer to the channel when a new Zendesk ticket is cretead. 
* Moves Agents in an out of a Zendesk ticket associate Sendbird group channel when the Zendesk ticket's assignee changes. 


## Installation: Server

This server requires [Node.js](https://nodejs.org/) v10+ to run.

create a .env file and add it to the projects root directory. 
Add two environment variables. 
```sh
SENDBIRD_APP_ID=YOUR_SENDBIRD_APP_ID_FROM_THE_SENDBIRD_DASHBOARD
API_TOKEN=YOUR_SENDBIRD_API_TOKEN_FROM_THE_SENDBIRD_DASHBOARD
ZENDES_WEBHOOK_AUTH_TOKEN=UUID_TOKEN_OF_YOUR_CHOICE_FROM_ZENDESK_WEBHOOK_SET_UP_IN_ZENDESK
```

Install the dependencies and devDependencies and start the server.

```sh
cd YOUR_ROOT_FOLDER_FOR_THIS_PROJECT
npm intall
npm run start:dev
```

## Installation: ngrok

The Zendesk webhook will need an endpoint to call to. Consider useing ngrok to https tunnerl into your local running server ( [link]("https://ngrok.com/")). An ngrok https url is used in the next step. It looks something like this. 

```
https://4ec6-22-22-23-19.ngrok.io
```


## Installation: Zendesk Webhook Registration

A webhook should be registered in Zendesk that points to your locally running server. Use the testing tools in the webhook registeration to test that the above server is running. There are some indepth instuctions [here]("https://support.zendesk.com/hc/en-us/articles/4408839108378-Creating-webhooks-in-Admin-Center") regarding the Zendesk webhooks. 

All you need is an ngrok url and any random UUID for a Brearer token, then register them in the Zendesk webhooks creation process. 

Don't forget to register a new ngrok url in the Zendesk webhook set up when the current ngrok url is no longer valid. 

## Installation: Zendesk Trigger Registration

Two triggers are required for this project. One trigger for when a new Zendesk ticket is created and one trigger for when a Zendesk assignee changes. 

##### Trigger: Zendesk Ticket Assignee Changes



