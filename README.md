# smseveryone-node

Unoffical SMSEveryone API Wrapper for NodeJS

## Documentation

<https://www.smseveryone.com.au/restapi>

Made for using of a server.

### Authentication

```js

const sendSMS = new SMSEveryone('username','password')

```

### Send and SMS Campaign

```js

await sendSMS.sms({originator:"AplhaTag",destinations:["phonenumbers"],message:"Hello, from SMS Everyone module test",action:"create"}).then(r => console.log(r)).catch(e => console.error(e))

```

### Endpoints Supported

[Campaign Request](https://www.smseveryone.com.au/restapi#comp-kd6my2uy) - Send or Schedule an SMS
[Delivery Receipts Request](https://www.smseveryone.com.au/restapi#comp-kd85w97c) - Check Deliverys
[Replies Request](https://www.smseveryone.com.au/restapi#comp-kd6tcvxv) - Get Replies
[Optouts Request](https://www.smseveryone.com.au/restapi#comp-kd8342y8) - Manage Optopts
[List Request](https://www.smseveryone.com.au/restapi#comp-kdgug91j) - Manage Lists for bulk SMSs
[Add Credit Rejest](https://www.smseveryone.com.au/restapi#comp-kz4t16xe) - Add Credits, if approved
