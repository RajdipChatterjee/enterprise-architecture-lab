using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models;

public class DataConversionFiles
{
    [BsonElement("contactsUrl")]
    public string? ContactsUrl { get; set; }

    [BsonElement("usersUrl")]
    public string? UsersUrl { get; set; }

    [BsonElement("receiptsUrl")]
    public string? ReceiptsUrl { get; set; }

    [BsonElement("businessesUrl")]
    public string? BusinessesUrl { get; set; }

    [BsonElement("creditNotesUrl")]
    public string? CreditNotesUrl { get; set; }

    [BsonElement("tasksUrl")]
    public string? TasksUrl { get; set; }

    [BsonElement("subscriptionAndDdUrl")]
    public string? SubscriptionAndDdUrl { get; set; }

    [BsonElement("invoicesUrl")]
    public string? InvoicesUrl { get; set; }
}