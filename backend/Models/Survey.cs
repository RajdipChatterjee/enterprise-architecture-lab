using backend.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models;

[BsonIgnoreExtraElements]
public class Survey
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("rating")]
    public int Rating { get; set; }

    [BsonElement("feedback")]
    public string Feedback { get; set; } = string.Empty;

    [BsonElement("username"),BsonIgnoreIfNull]
    public string UserName { get; set; } = string.Empty;

    [BsonElement("accountantName")]
    public string AccountantName { get; set; } = string.Empty;

    [BsonElement("businessName")]
    public string BusinessName { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.String)]
    [BsonElement("status")]
    public SurveyStatus Status { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Soft Delete
    [BsonElement("isDeleted"),BsonIgnoreIfDefault]
    public bool IsDeleted { get; set; } = false;

    [BsonElement("deletedAt")]
    public DateTime? DeletedAt { get; set; }
}