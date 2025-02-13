using System.Text.Json;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Lambda.Core;
using Amazon.Runtime.Internal;
using Amazon.SQS;
using Amazon.SQS.Model;
using model;

namespace subscribermock;

public partial class Function
{
	public async Task<(int code, string message)> Complete(ILambdaContext context, IDynamoDBContext dbContext, AmazonSQSClient sqsClient, params string[] proxyParams)
	{
		var npn = proxyParams[1];
		var carrier = proxyParams[2];
		var cusip = proxyParams[3];
		var courseId = proxyParams[4];
	
		//fetch course data if exists
		var producerResult = await Fetch(npn, context);

		if(producerResult != null)
		{
			//post with changes if exists
			var course = producerResult.carriers.FirstOrDefault(x => x.carrier == carrier)?.products?.FirstOrDefault(x => x.CUSIP == cusip)?.courses?.FirstOrDefault(x => x.courseId == courseId);

			if(course == null)
			{
				return (400, "Could not find course for the producer and product combination");
			}
			
			var now = DateTimeOffset.Now;

			if(course.status == "Complete")
			{
				course.status = "Action Required";
				course.completionInformation = new CompletionInformation();
			}
			else
			{
				course.status = "Complete";
				var possibleJurisdictions = producerResult.carriers.FirstOrDefault(x => x.carrier == carrier)?.products?.FirstOrDefault(x => x.CUSIP == cusip)?.jurisdictions;

				var pickedJurisdiction = possibleJurisdictions != null ? possibleJurisdictions[Random.Shared.Next(0, possibleJurisdictions.Count())] : (string?) null;


				course.completionInformation = new CompletionInformation
				{
					certificationDate = now.ToString("yyyy-MM-dd"),
					credentialHours = Random.Shared.Next(1, 11),
					certificationNumber = Random.Shared.NextInt64(1, 999999).ToString("000000"),
					continuingEducationHours = Random.Shared.Next(1, 11),
					certificationState = pickedJurisdiction,
					expirationDate = now.AddDays(180).ToString("yyyy-MM-dd")
				};
			}

			var courseRequest = new CourseRequest(course)
			{
				npn = npn,
				carrier = carrier,
				CUSIP = cusip,
			};
			
			var eventHash = $"{npn}#{carrier}#{cusip}#{courseId}#{course.status}#{now.ToString()}";

			await dbContext.SaveAsync(new BroadcastRecord()
			{
				eventHash = eventHash,
				completionTime = now.DateTime,
			});

			var postOutcome = await Post(courseRequest, context);

			if(postOutcome)
			{
				var groupId = Guid.NewGuid().ToString();
				var request = new SendMessageRequest
				{
					MessageAttributes = new Dictionary<string, MessageAttributeValue> { {"MessageType", new MessageAttributeValue { DataType = "String", StringValue = "pushupdate" } },
					{ "eventHash", new MessageAttributeValue { DataType = "String", StringValue = eventHash } } },
					QueueUrl = "https://sqs.us-west-2.amazonaws.com/799217004793/CredentialCrew.fifo",
					MessageBody = JsonSerializer.Serialize(new BroadcastMessage { ProducerNPN = npn }),
					MessageGroupId = groupId,
					MessageDeduplicationId = groupId
				};
			
				var sendResponse = await sqsClient.SendMessageAsync(request);
				
				return (200, JsonSerializer.Serialize(new CompleteResponse { eventHash = eventHash }));
			}
			else
			{
				return (500, "Something went wrong saving update");
			}
		}
		else
		{
			return (400, $"Could not find a producer with npn {npn}");
		}
		
	}

	private async Task<ProducerRecord?> Fetch(string npn, ILambdaContext context)
	{
		var recordRequest = new HttpRequestMessage();
		recordRequest.RequestUri = new Uri($"https://dc1pp0md2g.execute-api.us-west-2.amazonaws.com/v1/producer/details?npn={npn}");
		recordRequest.Method = HttpMethod.Get;

		var cts = new CancellationTokenSource(TimeSpan.FromSeconds(15));
		var recordResponse = await httpClient.SendAsync(recordRequest, cts.Token);

		if(!recordResponse.IsSuccessStatusCode)
		{
			context.Logger.LogError($"Record request for npn {npn} failed");
			return null;
		}

		var recordString = await recordResponse.Content.ReadAsStringAsync();

		var record = JsonSerializer.Deserialize<ProducerRecord>(recordString);
		
		return record;
	}

	private async Task<bool> Post(CourseRequest course,  ILambdaContext context)
	{
		var courseUpdateRequest = new HttpRequestMessage();
		courseUpdateRequest.RequestUri = new Uri($"https://dc1pp0md2g.execute-api.us-west-2.amazonaws.com/v1/producer/courses");
		courseUpdateRequest.Method = HttpMethod.Post;

		var content = new StringContent(JsonSerializer.Serialize(course));

		courseUpdateRequest.Content = content;

		var cts = new CancellationTokenSource(TimeSpan.FromSeconds(15));
		var courseUpdateResponse = await httpClient.SendAsync(courseUpdateRequest, cts.Token);

		if(!courseUpdateResponse.IsSuccessStatusCode)
		{
			context.Logger.LogError($"Could not update course {course.courseId}");
			return false;
		}

		return true;
	}

	private class CourseRequest : Course
	{
		public string npn { get; set; } = string.Empty;
		public string carrier { get; set; } = string.Empty;
		public string CUSIP { get; set; } = string.Empty;

		public CourseRequest(Course course)
		{
			provider = course.provider;
			providerId = course.providerId;
			courseURL = course.courseURL;
			completionStage = course.completionStage;
			courseId = course.courseId;
			courseName = course.courseName;
			courseMethod = course.courseMethod;
			courseType = course.courseType;
			productTrainingType = course.productTrainingType;
			status = course.status;
			completionInformation = course.completionInformation;
		}
	}

	private class CompleteResponse
	{
		public string eventHash { get; set; } = string.Empty;
	}
}
