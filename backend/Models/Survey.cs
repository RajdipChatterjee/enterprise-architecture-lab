using backend.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

[BsonIgnoreExtraElements]
public class Survey
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    [BsonElement("rating")]
    public int Rating { get; set; }

    [BsonElement("feedback")]
    public string Feedback { get; set; } = string.Empty;

    [BsonElement("username")]
    public string UserName { get; set; } = string.Empty;

    [BsonElement("accountantName")]
    public string AccountantName { get; set; } = string.Empty;

    [BsonElement("businessName")]
    public string BusinessName { get; set; } = string.Empty;

    //[BsonRepresentation(BsonType.String)]
    [BsonElement("status")]
    public SurveyStatus Status { get; set; }

    [BsonElement("createdAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Soft Delete
    [BsonElement("isDeleted")]
    public bool IsDeleted { get; set; }

    [BsonElement("deletedAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime? DeletedAt { get; set; }
}