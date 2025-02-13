using Amazon.DynamoDBv2.DataModel;

namespace model;

public class BroadcastMessage
{
	public string ProducerNPN { get; set; } = string.Empty;
}

[DynamoDBTable("CarrierBroadcasts")]
public class BroadcastRecord
{
	[DynamoDBHashKey] public Guid broadcastId { get; set; } = Guid.NewGuid();
	[DynamoDBProperty] public string eventHash { get; set; } = string.Empty;
	[DynamoDBProperty] public DateTime completionTime { get; set; } = DateTime.UtcNow;
	[DynamoDBProperty] public List<UpdateRecord> updates { get; set; } = new List<UpdateRecord>();
	[DynamoDBVersion] public int? version { get; set; } = null;
}

public class UpdateRecord
{
	[DynamoDBProperty] public string? distributor { get; set; } = string.Empty;
	[DynamoDBProperty] public string? distributorId { get; set; } = string.Empty;
	[DynamoDBProperty] public DateTime? recievedTime { get; set; } = DateTime.UtcNow;
}
