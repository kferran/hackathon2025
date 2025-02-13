using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.Lambda.SQSEvents;
using model;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace subscribe;

public class Function
{
	public const string SUBSCRIBE_VERB = "subscribe";
	public const string UNSUBSCRIBE_VERB = "unsubscribe";

	private static JsonSerializerOptions serializerOptions = new JsonSerializerOptions
	{
		NumberHandling = JsonNumberHandling.AllowReadingFromString,
		PropertyNameCaseInsensitive = true
	};

	private AmazonDynamoDBConfig clientConfig = new AmazonDynamoDBConfig { RegionEndpoint = RegionEndpoint.USWest2 };


	public async Task<APIGatewayHttpApiV2ProxyResponse> FunctionHandler(APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context)
	{
		AmazonDynamoDBClient client = new AmazonDynamoDBClient(clientConfig);
		DynamoDBContext dbContext = new DynamoDBContext(client);

		var response = new APIGatewayHttpApiV2ProxyResponse();

		try
		{
			response.Headers = new Dictionary<string, string>()
			{
				{ "Access-Control-Allow-Origin", "*" },
				{ "Access-Control-Allow-Method", "POST,OPTIONS" },
				{ "Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token" }
			};

			var subscriptionResponse = new SubscriptionResponse();

			context.Logger.LogWarning(request.Body);

			var subscriptionRequest = JsonSerializer.Deserialize<SubscriptionRequest>(request.Body);

			context.Logger.LogWarning($"Found {subscriptionRequest!.subscriptions.Count()} subscriptions for {subscriptionRequest.distributorId}");

			foreach(var subscriptionItem in subscriptionRequest!.subscriptions)
			{

				var scanConfig = new List<ScanCondition>
				{
					new ScanCondition("distributorId", ScanOperator.Equal, subscriptionRequest.distributorId),
					new ScanCondition("producerNPN", ScanOperator.Equal, subscriptionItem.producerNPN)
				};

				var scanResponse = dbContext.ScanAsync<Subscription>(scanConfig);
				IEnumerable<Subscription> subscriptions = await scanResponse.GetRemainingAsync();

				var verb = subscriptionItem.verb.ToLower();

				if(verb == SUBSCRIBE_VERB)
				{
					//only subscribe to callbackURIs that don't exist
					if(!subscriptions.Any(x => x.callbackURI == subscriptionItem.callbackUrl))
					{

						await dbContext.SaveAsync(new Subscription
						{
							producerNPN = subscriptionItem.producerNPN,
							callbackURI = subscriptionItem.callbackUrl,
							distributor = subscriptionRequest.distributor,
							distributorId = subscriptionRequest.distributorId
						});

						subscriptionResponse.subscriptions.Add(new SubscriptionResponseItem()
						{
							producerNPN = subscriptionItem.producerNPN,
							code = "SUBSCRIBED",
							message = string.Empty
						});
					}
					else
					{
						context.Logger.LogWarning($"Found {subscriptionItem.producerNPN} {subscriptionItem.callbackUrl}");
						subscriptionResponse.subscriptions.Add(new SubscriptionResponseItem()
						{
							producerNPN = subscriptionItem.producerNPN,
							code = "EXISTS",
							message = "Subscription already exists"
						});
					}

				}
				else if(verb == UNSUBSCRIBE_VERB)
				{
					var existingSubscription = subscriptions.FirstOrDefault(x => x.callbackURI == subscriptionItem.callbackUrl);

					if(existingSubscription != null)
					{
						await dbContext.DeleteAsync(existingSubscription);
						subscriptionResponse.subscriptions.Add(new SubscriptionResponseItem()
						{
							producerNPN = subscriptionItem.producerNPN,
							code = "UNSUBSCRIBED",
							message = string.Empty
						});
					}
					else
					{
						subscriptionResponse.subscriptions.Add(new SubscriptionResponseItem()
						{
							producerNPN = subscriptionItem.producerNPN,
							code = "NOTFOUND",
							message = "Subscription not found"
						});
					}
				}
				else
				{
					subscriptionResponse.subscriptions.Add(new SubscriptionResponseItem()
					{
						producerNPN = subscriptionItem.producerNPN,
						code = "NOTSUPPORTED",
						message = "The provided verb is not supported"
					});
				}
			}

			response.Body = JsonSerializer.Serialize(subscriptionResponse, serializerOptions);
			response.StatusCode = 200;
			return response;
		}
		catch(Exception e)
		{
			response.StatusCode = 500;
			response.Body = e.Message;
			return response;
		}
	}

	public class SubscriptionRequest
	{
		public string distributor { get; set; } = string.Empty;
		public string distributorId { get; set; } = string.Empty;
		public List<NpnSubscription> subscriptions { get; set; } = new List<NpnSubscription>();
	}

	public class NpnSubscription
	{
		public string producerNPN { get; set; } = string.Empty;
		public string verb { get; set; } = string.Empty;
		public string callbackUrl { get; set; } = string.Empty;
	}

	public class SubscriptionResponse
	{
		public List<SubscriptionResponseItem> subscriptions { get; set; } = new List<SubscriptionResponseItem>();
	}

	public class SubscriptionResponseItem
	{
		public string producerNPN { get; set; } = string.Empty;
		public string code { get; set; } = string.Empty;
		public string message { get; set; } = string.Empty;
	}



}

