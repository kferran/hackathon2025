using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.Core;
using Amazon.Lambda.SQSEvents;
using model;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace broadcast;

public partial class Function
{
	public const string PUSHUPDATE = "pushupdate";
	public const string PUSHSUBSCRIBE = "pushsubscribe";

	private static JsonSerializerOptions serializerOptions = new JsonSerializerOptions
    {
        NumberHandling = JsonNumberHandling.AllowReadingFromString,
        PropertyNameCaseInsensitive = true
    };

	//gross
	private static HttpClient httpClient = new HttpClient();

    public async Task FunctionHandler(SQSEvent _event, ILambdaContext context)
    {
		AmazonDynamoDBConfig clientConfig = new AmazonDynamoDBConfig();
		// This client will access the US East 1 region.
		clientConfig.RegionEndpoint = RegionEndpoint.USWest2;
		AmazonDynamoDBClient client = new AmazonDynamoDBClient(clientConfig); 
		DynamoDBContext dbContext = new DynamoDBContext(client);
	
		foreach(SQSEvent.SQSMessage message in _event.Records)
		{
			try
			{
				string? messageType = null;
			
				if(!message.MessageAttributes.TryGetValue("MessageType", out SQSEvent.MessageAttribute? messageTypeAttr))
				{
				
					context.Logger.LogError($"Message type could not be parsed for {message.MessageId}");
					continue;
				}
				
				messageType = messageTypeAttr!.StringValue;
				
				
				string? eventHash = null;
				if(message.MessageAttributes.TryGetValue("eventHash", out SQSEvent.MessageAttribute? eventHashAttr))
				{
					eventHash = eventHashAttr!.StringValue;
				}

				switch(messageType)
				{
					case PUSHUPDATE:
						await HandlePushBroadcast(message.Body, eventHash, dbContext, context);
						LogIt();
						continue;
					case PUSHSUBSCRIBE:
						await HandleSubscribeBroadcast(message.Body, dbContext, context);
						LogIt();
						continue;
					default:
						context.Logger.LogWarning($"Could not process message of type {messageType ?? "NULL"}");
						continue;
				}
				
				void LogIt()
				{
					context.Logger.LogInformation($"Message succesfully processed for{messageType} ");
				}
			}
			catch(Exception e)
			{
				context.Logger.LogError(e.Message + " " + e.StackTrace);
			}
		}
    }

/*
{
	"producerNPN" : "12389128934"
}
*/

}


public static class EnumerableExtensions
{
	public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source)
	{
		return source.Shuffle(new Random());
	}

	public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source, Random rng)
	{
		if(source == null)
			throw new ArgumentNullException(nameof(source));
		if(rng == null)
			throw new ArgumentNullException(nameof(rng));

		return source.ShuffleIterator(rng);
	}

	private static IEnumerable<T> ShuffleIterator<T>(
		this IEnumerable<T> source, Random rng)
	{
		var buffer = source.ToList();
		for(int i = 0; i < buffer.Count; i++)
		{
			int j = rng.Next(i, buffer.Count);
			yield return buffer[j];

			buffer[j] = buffer[i];
		}
	}
}
