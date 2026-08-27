using backend.DTOs.Practice;
using backend.Models;

namespace backend.Mapper;

public static class PracticeMapper
{
    public static Practice ToPractice(
        CreatePracticeDto dto,
        string ownerUserId)
    {
        return new Practice
        {
            OwnerUserId = ownerUserId,

            PracticeName = dto.PracticeName,
            ProposedUrl = dto.ProposedUrl,

            Website = dto.Website,
            PracticePhoneNumber = dto.PracticePhoneNumber,
            ContactPersonName = dto.ContactPersonName,
            ContactPersonEmail = dto.ContactPersonEmail,
            ContactPersonPhoneNumber = dto.ContactPersonPhoneNumber,

            InvoiceHeader = dto.InvoiceHeader,
            InvoiceFooter = dto.InvoiceFooter,
            PublicEmail = dto.PublicEmail,

            IsDeleted = false
        };
    }

    public static PracticeResponseDto ToDto(Practice practice)
    {
        return new PracticeResponseDto
        {
            Id = practice.Id,

            PracticeName = practice.PracticeName,
            ProposedUrl = practice.ProposedUrl,

            LogoUrl = practice.LogoUrl,
            FaviconUrl = practice.FaviconUrl,

            Website = practice.Website,
            PracticePhoneNumber = practice.PracticePhoneNumber,
            ContactPersonName = practice.ContactPersonName,
            ContactPersonEmail = practice.ContactPersonEmail,
            ContactPersonPhoneNumber = practice.ContactPersonPhoneNumber,

            InvoiceSampleUrl = practice.InvoiceSampleUrl,

            InvoiceHeader = practice.InvoiceHeader,
            InvoiceFooter = practice.InvoiceFooter,
            PublicEmail = practice.PublicEmail,

            DataConversion = new DataConversionFilesResponseDto
            {
                ContactsUrl = practice.DataConversion.ContactsUrl,
                UsersUrl = practice.DataConversion.UsersUrl,
                ReceiptsUrl = practice.DataConversion.ReceiptsUrl,
                BusinessesUrl = practice.DataConversion.BusinessesUrl,
                CreditNotesUrl = practice.DataConversion.CreditNotesUrl,
                TasksUrl = practice.DataConversion.TasksUrl,
                SubscriptionAndDdUrl =
                    practice.DataConversion.SubscriptionAndDdUrl,
                InvoicesUrl = practice.DataConversion.InvoicesUrl
            },

            CreatedAt = practice.CreatedAt,
            UpdatedAt = practice.UpdatedAt
        };
    }

    public static void UpdatePractice(
        Practice practice,
        UpdatePracticeDto dto)
    {
        if (dto.PracticeName is not null)
            practice.PracticeName = dto.PracticeName;

        if (dto.ProposedUrl is not null)
            practice.ProposedUrl = dto.ProposedUrl;

        if (dto.Website is not null)
            practice.Website = dto.Website;

        if (dto.PracticePhoneNumber is not null)
            practice.PracticePhoneNumber = dto.PracticePhoneNumber;

        if (dto.ContactPersonName is not null)
            practice.ContactPersonName = dto.ContactPersonName;

        if (dto.ContactPersonEmail is not null)
            practice.ContactPersonEmail = dto.ContactPersonEmail;

        if (dto.ContactPersonPhoneNumber is not null)
            practice.ContactPersonPhoneNumber = dto.ContactPersonPhoneNumber;

        if (dto.InvoiceHeader is not null)
            practice.InvoiceHeader = dto.InvoiceHeader;

        if (dto.InvoiceFooter is not null)
            practice.InvoiceFooter = dto.InvoiceFooter;

        if (dto.PublicEmail is not null)
            practice.PublicEmail = dto.PublicEmail;

        practice.UpdatedAt = DateTime.UtcNow;
    }
}