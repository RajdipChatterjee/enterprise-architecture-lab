using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Practice;

public class PracticeResponseDto
{
    public string Id { get; set; } = null!;

    // Basic details
    public string PracticeName { get; set; } = string.Empty;
    public string ProposedUrl { get; set; } = string.Empty;

    // Branding
    public string? LogoUrl { get; set; }
    public string? FaviconUrl { get; set; }

    // Contact information
    public string Website { get; set; } = string.Empty;
    public string PracticePhoneNumber { get; set; } = string.Empty;
    public string ContactPersonName { get; set; } = string.Empty;
    public string ContactPersonEmail { get; set; } = string.Empty;
    public string ContactPersonPhoneNumber { get; set; } = string.Empty;

    // Invoice configuration
    public string? InvoiceSampleUrl { get; set; }
    public string InvoiceHeader { get; set; } = string.Empty;
    public string InvoiceFooter { get; set; } = string.Empty;
    public string PublicEmail { get; set; } = string.Empty;

    // Data conversion files
    public DataConversionFilesResponseDto DataConversion { get; set; } = new();

    // Metadata
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class DataConversionFilesResponseDto
{
    public string? ContactsUrl { get; set; }
    public string? UsersUrl { get; set; }
    public string? ReceiptsUrl { get; set; }
    public string? BusinessesUrl { get; set; }
    public string? CreditNotesUrl { get; set; }
    public string? TasksUrl { get; set; }
    public string? SubscriptionAndDdUrl { get; set; }
    public string? InvoicesUrl { get; set; }
}