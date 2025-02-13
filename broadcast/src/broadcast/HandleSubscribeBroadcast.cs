using System.Text.Json;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.Core;
using model;

namespace broadcast;

public partial class Function
{
	public async Task HandleSubscribeBroadcast(string body, DynamoDBContext dbContext, ILambdaContext context)
	{
	//figure out how to determine message type with team
			var messagePayload = JsonSerializer.Deserialize<BroadcastMessage>(body, serializerOptions);

			var record = await dbContext.LoadAsync<ProducerRecord>(messagePayload!.ProducerNPN);

			var scanConfig = new List<ScanCondition>
			{
				new ScanCondition("producerNPN", ScanOperator.Equal, record.producerNPN)
			};
			
			var scanResponse = dbContext.ScanAsync<Subscription>(scanConfig);

			IEnumerable<Subscription> subscriptions = await scanResponse.GetRemainingAsync();

			//foreach sub broadcast to callback for subscription API
			foreach(var subscription in subscriptions)
			{
				var request = new HttpRequestMessage();

				using StringContent content = new StringContent(JsonSerializer.Serialize(messagePayload));
				
				request.RequestUri = new Uri(subscription.callbackURI);
				request.Method = HttpMethod.Post;
				request.Content = content;
				
				var response = await httpClient.SendAsync(request);

				if(!response.IsSuccessStatusCode)
				{
					context.Logger.LogError($"Subscription notification for subscription {subscription.subscriptionId} failed");
				}
				
			}
	}
}
