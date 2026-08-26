using backend.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;
    [BsonElement("username")]
    public string Username { get; set; } = null!;
    [BsonElement("email")]
    public string Email { get; set; } = null!;
    [BsonElement("passwordHash")]
    public string PasswordHash { get; set; } = null!;
    [BsonElement("role")]
    public UserRole Role { get; set; } = UserRole.User;
    [BsonElement("createdAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [BsonElement("refreshTokens")]
    public List<RefreshToken> RefreshTokens { get; set; } = [];
}