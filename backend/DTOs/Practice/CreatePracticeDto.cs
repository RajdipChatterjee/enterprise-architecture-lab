using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace backend.DTOs.Practice;

public class CreatePracticeDto
{
    // Step 1 — Practice Details

    [Required]
    [StringLength(200)]
    public string PracticeName { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string ProposedUrl { get; set; } = string.Empty;


    // Step 2 — Branding

    public IFormFile? Logo { get; set; }

    public IFormFile? Favicon { get; set; }


    // Step 3 — Contact Information

    [Required]
    [Url]
    [StringLength(500)]
    public string Website { get; set; } = string.Empty;

    [Required]
    [StringLength(30)]
    public string PracticePhoneNumber { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string ContactPersonName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(320)]
    public string ContactPersonEmail { get; set; } = string.Empty;

    [Required]
    [StringLength(30)]
    public string ContactPersonPhoneNumber { get; set; } = string.Empty;


    // Step 4 — Invoice & Email

    public IFormFile? InvoiceSample { get; set; }

    [Required]
    [StringLength(1000)]
    public string InvoiceHeader { get; set; } = string.Empty;

    [Required]
    [StringLength(2000)]
    public string InvoiceFooter { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(320)]
    public string PublicEmail { get; set; } = string.Empty;


    // Step 5 — Data Conversion

    public IFormFile? Contacts { get; set; }

    public IFormFile? Users { get; set; }

    public IFormFile? Receipts { get; set; }

    public IFormFile? Businesses { get; set; }

    public IFormFile? CreditNotes { get; set; }

    public IFormFile? Tasks { get; set; }

    public IFormFile? SubscriptionAndDd { get; set; }

    public IFormFile? Invoices { get; set; }
}