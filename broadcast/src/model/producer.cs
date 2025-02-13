using Amazon.DynamoDBv2.DataModel;

namespace model;

[DynamoDBTable("producer_readiness")]
public class ProducerRecord
{
	[DynamoDBHashKey] public string pk { get; set; } = string.Empty;
	[DynamoDBRangeKey] public string sk { get; set; } = string.Empty;
	public string producerNPN { get; set; } = string.Empty;
	public string producerCRD { get; set; } = string.Empty;
	public string producerAgentCode { get; set; } = string.Empty;
	public string producerFirstName { get; set; } = string.Empty;
	public string producerLastName { get; set; } = string.Empty;
	public string producerEmailAddress { get; set; } = string.Empty;
	public List<StateLicense> stateLicenses { get; set; } = new List<StateLicense>();
	public List<Registration> registrations { get; set; } = new List<Registration>();
	public List<Carrier> carriers { get; set; } = new List<Carrier>();
}

public class Carrier
{
	public string carrier { get; set; } = string.Empty;
	public Dictionary<string, string> assets = new Dictionary<string, string>();
	public List<Appointment> appointments { get; set; } = new List<Appointment>();
	public List<Product> products { get; set; } = new List<Product>();
}

public class Product
{
	public string name { get; set; } = string.Empty;
	public string type { get; set; } = string.Empty;
	public string CUSIP { get; set; } = string.Empty;
	public List<string> jurisdictions { get; set; } = new List<string>();
	public bool? carrierAuthorization { get; set; } = false;
	public bool? distributorAuthorization { get; set; } = false;
	public List<Course> courses { get; set; } = new List<Course>();
}

public class Course
{
	public string provider { get; set; } = string.Empty;
	public string providerId { get; set; } = string.Empty;
	public string courseURL { get; set; } = string.Empty;
	public string completionStage { get; set; } = string.Empty;
	public string courseId { get; set; } = string.Empty;
	public string courseName { get; set; } = string.Empty;
	public string courseMethod { get; set; } = string.Empty;
	public string courseType { get; set; } = string.Empty;
	public string productTrainingType { get; set; } = string.Empty;
	public string status { get; set; } = string.Empty;
	public CompletionInformation completionInformation { get; set; } = new CompletionInformation();
}

public class CompletionInformation
{
	public string? certificationDate { get; set; } = null;
	public int? credentialHours { get; set; } = null;
	public string? certificationNumber { get; set; } = null;
	public int? continuingEducationHours { get; set; } = null;
	public string? completionDate { get; set; } = null;
	public string? certificationState { get; set; } = null;
	public string? expirationDate { get; set; } = null;
}

public class Appointment
{
	public string status { get; set; } = string.Empty;
	public string lineOfAuthority { get; set; } = string.Empty;
	public string appointmentDate { get; set; } = string.Empty;
	public string appointmentState { get; set; } = string.Empty;
}

public class StateLicense
{
	public string jurisdiction { get; set; } = string.Empty;
	public string status { get; set; } = string.Empty;
	public string number { get; set; } = string.Empty;
	public string licenseDate { get; set; } = string.Empty;
	public string expirationDate { get; set; } = string.Empty;
	public bool resident { get; set; } = false;
	public string lineOfAuthority { get; set; } = string.Empty;
	public string licenseType { get; set; } = string.Empty;
}

public class Registration
{
	public string status { get; set; } = string.Empty;
	public string crdNumber { get; set; } = string.Empty;
	public string type { get; set; } = string.Empty;
	public string firmName { get; set; } = string.Empty;
	public string firmCRDNumber { get; set; } = string.Empty;
}
