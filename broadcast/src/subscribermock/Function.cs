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
using Amazon.SQS;
using model;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace subscribermock;

public partial class Function
{
	public const string SUBSCRIBE_VERB = "subscribe";
	public const string UNSUBSCRIBE_VERB = "unsubscribe";

	private static JsonSerializerOptions serializerOptions = new JsonSerializerOptions
	{
		NumberHandling = JsonNumberHandling.AllowReadingFromString,
		PropertyNameCaseInsensitive = true
	};
	
	private HttpClient httpClient = new HttpClient();

	public async Task<APIGatewayHttpApiV2ProxyResponse> FunctionHandler(APIGatewayHttpApiV2ProxyRequest  request, ILambdaContext context)
	{
		var response = new APIGatewayHttpApiV2ProxyResponse();

		response.Headers = new Dictionary<string, string>()
		{
			{ "Access-Control-Allow-Origin", "*" },
			{ "Access-Control-Allow-Method", "POST,OPTIONS" },
			{ "Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token" }
		};
		
		AmazonDynamoDBConfig clientConfig = new AmazonDynamoDBConfig();
		clientConfig.RegionEndpoint = RegionEndpoint.USWest2;
		AmazonDynamoDBClient client = new AmazonDynamoDBClient(clientConfig); 
		DynamoDBContext dbContext = new DynamoDBContext(client);
		AmazonSQSClient sqsClient = new AmazonSQSClient(RegionEndpoint.USWest2);

		var proxySplit = request.PathParameters["proxy"].Split("/");

		request.Headers.TryGetValue("eventHash", out var eventHashValue);

		try
		{
			switch(proxySplit[0])
			{
				case "receive":
					context.Logger.LogInformation("Received payload");
					await Receive(request.Body, eventHashValue, context,dbContext, proxySplit);
					break;
				case "complete":
					var result = await Complete(context, dbContext, sqsClient, proxySplit);
					response.StatusCode = result.code;
					response.Body = result.message;
					return response;
				case "query":
					var query = await Query(context, dbContext, proxySplit);
					response.StatusCode = query.code;
					response.Body = query.message;
					return response;
				default:
					response.StatusCode = 404;
					return response;
			}

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


	

}
