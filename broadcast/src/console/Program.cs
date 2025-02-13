using System.Text.Json;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using model;

AmazonDynamoDBConfig clientConfig = new AmazonDynamoDBConfig();

// This client will access the US East 1 region.
clientConfig.RegionEndpoint = RegionEndpoint.USWest2;
AmazonDynamoDBClient client = new AmazonDynamoDBClient(clientConfig);
DynamoDBContext dbContext = new DynamoDBContext(client);

var npn = "2149815";

var recordRequest = new HttpRequestMessage();
recordRequest.RequestUri = new Uri($"https://dc1pp0md2g.execute-api.us-west-2.amazonaws.com/v1/producer/details?npn={npn}");
recordRequest.Method = HttpMethod.Get;


var httpClient = new HttpClient();

var cts = new CancellationTokenSource(TimeSpan.FromSeconds(15));
var recordResponse = await httpClient.SendAsync(recordRequest, cts.Token);

if(!recordResponse.IsSuccessStatusCode)
{
	Console.WriteLine($"Record request for npn {npn} failed");
	return;
}
 
var content = await recordResponse.Content.ReadAsStringAsync();

Console.WriteLine(content);

var record = JsonSerializer.Deserialize<ProducerRecord>(content);

Console.ReadKey();



