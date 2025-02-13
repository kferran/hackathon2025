using System.Text.Json;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.Core;
using model;

namespace subscribermock;

public partial class Function
{
	public async Task<(int code, string message)> Query(ILambdaContext context, IDynamoDBContext dbContext, params string[] proxyParams)
	{
		var now = DateTimeOffset.Now.AddSeconds(-120);
	
		var scanConfig = new List<ScanCondition>
		{
			new ScanCondition("completionTime", ScanOperator.GreaterThan, now.DateTime)
		};
		var scanResponse = dbContext.ScanAsync<BroadcastRecord>(scanConfig);
		IEnumerable<BroadcastRecord> broadcastRecords = await scanResponse.GetRemainingAsync();

		var response = new BroadcastQueryResponse
		{
			broadcastRecords = broadcastRecords.ToList()
		};

		return (200, JsonSerializer.Serialize(response));
	}

	private class BroadcastQueryResponse
	{
		public List<BroadcastRecord> broadcastRecords { get; set; } = new List<BroadcastRecord>();
	}

}
