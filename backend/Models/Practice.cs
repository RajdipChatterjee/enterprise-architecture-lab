using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models;

[BsonIgnoreExtraElements]
public class Practice
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    // User who created/owns this practice
    [BsonElement("ownerUserId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string OwnerUserId { get; set; } = null!;

    // Basic details
    [BsonElement("practiceName")]
    public string PracticeName { get; set; } = string.Empty;

    [BsonElement("proposedUrl")]
    public string ProposedUrl { get; set; } = string.Empty;

    // Branding - Blob Storage references
    [BsonElement("logoUrl")]
    public string? LogoUrl { get; set; }

    [BsonElement("faviconUrl")]
    public string? FaviconUrl { get; set; }

    // Contact information
    [BsonElement("website")]
    public string Website { get; set; } = string.Empty;

    [BsonElement("practicePhoneNumber")]
    public string PracticePhoneNumber { get; set; } = string.Empty;

    [BsonElement("contactPersonName")]
    public string ContactPersonName { get; set; } = string.Empty;

    [BsonElement("contactPersonEmail")]
    public string ContactPersonEmail { get; set; } = string.Empty;

    [BsonElement("contactPersonPhoneNumber")]
    public string ContactPersonPhoneNumber { get; set; } = string.Empty;

    // Invoice configuration
    [BsonElement("invoiceSampleUrl")]
    public string? InvoiceSampleUrl { get; set; }

    [BsonElement("invoiceHeader")]
    public string InvoiceHeader { get; set; } = string.Empty;

    [BsonElement("invoiceFooter")]
    public string InvoiceFooter { get; set; } = string.Empty;

    [BsonElement("publicEmail")]
    public string PublicEmail { get; set; } = string.Empty;

    // Data conversion file references
    [BsonElement("dataConversion")]
    public DataConversionFiles DataConversion { get; set; } = new();

    // Metadata
    [BsonElement("createdAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime? UpdatedAt { get; set; }

    // Soft delete
    [BsonElement("isDeleted")]
    public bool IsDeleted { get; set; }

    [BsonElement("deletedAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime? DeletedAt { get; set; }
}
