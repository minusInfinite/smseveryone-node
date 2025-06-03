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

## Supports

Current Supports the [SMS Campaign API](https://www.smseveryone.com.au/restapi#comp-kd6my2uy)

## To-do

Support for the other API endpoints
