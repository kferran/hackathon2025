using System.Text.Json;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.Core;
using model;

namespace broadcast;

public partial class Function
{
	public async Task HandlePushBroadcast(string body, string? eventHash, DynamoDBContext dbContext, ILambdaContext context)
	{
		var messagePayload = JsonSerializer.Deserialize<BroadcastMessage>(body, serializerOptions);

		var recordRequest = new HttpRequestMessage();
		recordRequest.RequestUri = new Uri($"https://dc1pp0md2g.execute-api.us-west-2.amazonaws.com/v1/producer/details?npn={messagePayload!.ProducerNPN}");
		recordRequest.Method = HttpMethod.Get;

		var cts = new CancellationTokenSource(TimeSpan.FromSeconds(15));
		var recordResponse = await httpClient.SendAsync(recordRequest, cts.Token);

		if(!recordResponse.IsSuccessStatusCode)
		{
			context.Logger.LogError($"Record request for npn {messagePayload!.ProducerNPN} failed");
			return;
		}

		var record = await recordResponse.Content.ReadAsStringAsync();

		// var record = await dbContext.LoadAsync<ProducerRecord>(messagePayload!.ProducerNPN);

		var scanConfig = new List<ScanCondition>
		{
			new ScanCondition("producerNPN", ScanOperator.Equal, messagePayload!.ProducerNPN)
		};

		var scanResponse = dbContext.ScanAsync<Subscription>(scanConfig);

		IEnumerable<Subscription> subscriptions = await scanResponse.GetRemainingAsync();

		foreach(var subscription in subscriptions.Shuffle())
		{
			var request = new HttpRequestMessage();

			using StringContent content = new StringContent(record);

			request.RequestUri = new Uri(subscription.callbackURI);
			request.Method = HttpMethod.Post;
			request.Content = content;

			if(eventHash != null)
				request.Headers.Add("eventHash", eventHash);

			var submitCts = new CancellationTokenSource(TimeSpan.FromSeconds(15));
			var response = await httpClient.SendAsync(request, submitCts.Token);

			if(!response.IsSuccessStatusCode)
			{
				context.Logger.LogError($"Data push for subscription {subscription.subscriptionId} failed");
			}
		}
	}
}
