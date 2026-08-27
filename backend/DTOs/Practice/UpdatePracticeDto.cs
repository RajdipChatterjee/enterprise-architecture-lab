using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace backend.DTOs.Practice;

public class UpdatePracticeDto
{
    // Basic details

    [StringLength(200)]
    public string? PracticeName { get; set; }

    [StringLength(200)]
    public string? ProposedUrl { get; set; }


    // Branding

    public IFormFile? Logo { get; set; }

    public IFormFile? Favicon { get; set; }


    // Contact information

    [Url]
    [StringLength(500)]
    public string? Website { get; set; }

    [StringLength(30)]
    public string? PracticePhoneNumber { get; set; }

    [StringLength(200)]
    public string? ContactPersonName { get; set; }

    [EmailAddress]
    [StringLength(320)]
    public string? ContactPersonEmail { get; set; }

    [StringLength(30)]
    public string? ContactPersonPhoneNumber { get; set; }


    // Invoice configuration

    public IFormFile? InvoiceSample { get; set; }

    [StringLength(1000)]
    public string? InvoiceHeader { get; set; }

    [StringLength(2000)]
    public string? InvoiceFooter { get; set; }

    [EmailAddress]
    [StringLength(320)]
    public string? PublicEmail { get; set; }


    // Data conversion files

    public IFormFile? Contacts { get; set; }

    public IFormFile? Users { get; set; }

    public IFormFile? Receipts { get; set; }

    public IFormFile? Businesses { get; set; }

    public IFormFile? CreditNotes { get; set; }

    public IFormFile? Tasks { get; set; }

    public IFormFile? SubscriptionAndDd { get; set; }

    public IFormFile? Invoices { get; set; }
}