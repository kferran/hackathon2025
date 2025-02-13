This code relies on a few different AWS components:

 broadcast and subscribe rely on an SQS queue. 
 
 ```arn:aws:sqs:us-west-2:799217004793:CredentialCrew.fifo```
 
 broadcast, subscribe, and subscriber mock rely on DyanmoDB, with three different tables:
 
 CarrierBroadcasts
 Subscriptions
 producer_readiness - indirectly read via producer-ui-api
 
 broadcast needs a lambda function triggered off of SQS messages from the queue
 
 ```arn:aws:lambda:us-west-2:799217004793:function:Broadcast```
 
 subscribe needs a lambda function triggered off an API gateway with the route `/subscribe` with POST and OPTIONS
 
 ```arn:aws:lambda:us-west-2:799217004793:function:T4Subscribe```
 
  subscribemock needs a lambda function triggered off an API gateway with the route `/receive-publish/{proxy+}` with POST and OPTIONS
 
 ```arn:aws:lambda:us-west-2:799217004793:function:T4Subscribe```
 
 a single API is needed to house the API triggers for both subscribe and subscribermock
 
 ```arn:aws:apigateway:us-west-2::/restapis/2wa27e5crg```
 
 