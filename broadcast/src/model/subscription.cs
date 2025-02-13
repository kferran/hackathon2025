using Amazon.DynamoDBv2.DataModel;

namespace model;

[DynamoDBTable("Subscriptions")]
public class Subscription
{
	[DynamoDBHashKey] public Guid subscriptionId { get; set; } = Guid.NewGuid();
	[DynamoDBProperty] public string distributor { get; set; } = string.Empty;
	[DynamoDBProperty] public string distributorId { get; set; } = string.Empty;
	[DynamoDBProperty] public string producerNPN { get; set; } = string.Empty;
	[DynamoDBProperty] public string callbackURI { get; set; } = string.Empty;
}
