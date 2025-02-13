using System.Text.Json;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.Core;
using model;

namespace subscribermock;

public partial class Function
{
	public async Task Receive(string body, string? eventHash, ILambdaContext context, IDynamoDBContext dbContext, params string[] proxyParams)
	{
		var distributorId = proxyParams[1];
		var distributor = proxyParams[2];

		var payload = JsonSerializer.Deserialize<ProducerRecord>(body);

		if(payload != null)
		{
			//Push SQS message for console consumption
			//for now log it instead
			context.Logger.LogWarning($"Received log for {payload.producerNPN} {payload.producerFirstName} {payload.producerLastName}");

			if(eventHash != null)
			{
				await Task.Delay(Random.Shared.Next(0, 5) * 1000);

				var retries = 15;
				while(retries > 0)
				{
					try
					{
						var scanConfig = new List<ScanCondition>
						{
							new ScanCondition("eventHash", ScanOperator.Equal, eventHash)
						};
						var scanResponse = dbContext.ScanAsync<BroadcastRecord>(scanConfig);
						IEnumerable<BroadcastRecord> broadcastRecords = await scanResponse.GetRemainingAsync();

						if(broadcastRecords.All(y => y.updates.Any(x => x.distributorId == distributorId && x.distributor == distributor)))
							break;

						foreach(var broadcastRecord in broadcastRecords)
						{
							if(broadcastRecord.updates.Any(x => x.distributorId == distributorId && x.distributor == distributor))
								continue;
						
							var activeRecords = broadcastRecord;

							broadcastRecord.updates.Add(new UpdateRecord
							{
								distributorId = distributorId,
								distributor = distributor,
								recievedTime = DateTimeOffset.UtcNow.DateTime,
							});

							await dbContext.SaveAsync(broadcastRecord);
						}

						retries = 0;
					}
					catch(Exception e)
					{
						retries--;
						await Task.Delay(1000);	
					}
				}
				
			}
		}
		else
		{
			context.Logger.LogError($"Could not process payload {body}");
		}
	}
}


