using backend.DTOs;
using backend.DTOs.Practice;
using backend.Interfaces;
using backend.Mapper;

namespace backend.Services;

public class PracticeService : IPracticeService
{
    private readonly IPracticeRepository _practiceRepository;
    private readonly IFileStorageService _fileStorageService;

    public PracticeService(
        IPracticeRepository practiceRepository,
        IFileStorageService fileStorageService
    )
    {
        _practiceRepository = practiceRepository;
        _fileStorageService = fileStorageService;
    }

    public async Task<PaginatedResponseDto<PracticeResponseDto>> GetAllAsync(
        int page,
        int pageSize)
    {
        var result = await _practiceRepository.GetAllAsync(
            page,
            pageSize);

        return new PaginatedResponseDto<PracticeResponseDto>
        {
            Items = result.Items
                .Select(PracticeMapper.ToDto)
                .ToList(),

            TotalCount = result.TotalCount,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<PracticeResponseDto?> GetByIdAsync(
        string id)
    {
        var practice =
            await _practiceRepository.GetByIdAsync(id);

        if (practice is null)
        {
            return null;
        }

        return PracticeMapper.ToDto(practice);
    }

    public async Task<List<PracticeResponseDto>> GetByOwnerUserIdAsync(
        string ownerUserId)
    {
        var practices =
            await _practiceRepository
                .GetByOwnerUserIdAsync(ownerUserId);

        return practices
            .Select(PracticeMapper.ToDto)
            .ToList();
    }

    public async Task<PracticeResponseDto> CreateAsync(
    CreatePracticeDto request,
    string ownerUserId)
    {
        var practice = PracticeMapper.ToPractice(
            request,
            ownerUserId);

        // Branding
        practice.LogoUrl =
            await _fileStorageService.UploadAsync(
                request.Logo,
                "practices/logos");

        practice.FaviconUrl =
            await _fileStorageService.UploadAsync(
                request.Favicon,
                "practices/favicons");

        // Invoice
        practice.InvoiceSampleUrl =
            await _fileStorageService.UploadAsync(
                request.InvoiceSample,
                "practices/invoices");

        // Data conversion files
        practice.DataConversion.ContactsUrl =
            await _fileStorageService.UploadAsync(
                request.Contacts,
                "practices/data-conversion/contacts");

        practice.DataConversion.UsersUrl =
            await _fileStorageService.UploadAsync(
                request.Users,
                "practices/data-conversion/users");

        practice.DataConversion.ReceiptsUrl =
            await _fileStorageService.UploadAsync(
                request.Receipts,
                "practices/data-conversion/receipts");

        practice.DataConversion.BusinessesUrl =
            await _fileStorageService.UploadAsync(
                request.Businesses,
                "practices/data-conversion/businesses");

        practice.DataConversion.CreditNotesUrl =
            await _fileStorageService.UploadAsync(
                request.CreditNotes,
                "practices/data-conversion/credit-notes");

        practice.DataConversion.TasksUrl =
            await _fileStorageService.UploadAsync(
                request.Tasks,
                "practices/data-conversion/tasks");

        practice.DataConversion.SubscriptionAndDdUrl =
            await _fileStorageService.UploadAsync(
                request.SubscriptionAndDd,
                "practices/data-conversion/subscription-and-dd");

        practice.DataConversion.InvoicesUrl =
            await _fileStorageService.UploadAsync(
                request.Invoices,
                "practices/data-conversion/invoices");

        var createdPractice =
            await _practiceRepository.CreateAsync(practice);

        return PracticeMapper.ToDto(createdPractice);
    }

    public async Task<PracticeResponseDto?> UpdateAsync(
    string id,
    UpdatePracticeDto request)
    {
        // Get the existing practice
        var practice =
            await _practiceRepository.GetByIdAsync(id);

        if (practice is null)
        {
            return null;
        }

        // Update text fields only when supplied
        PracticeMapper.UpdatePractice(
            practice,
            request);

        // Branding
        if (request.Logo is not null)
        {
            practice.LogoUrl =
                await _fileStorageService.UploadAsync(
                    request.Logo,
                    "practices/logos");
        }

        if (request.Favicon is not null)
        {
            practice.FaviconUrl =
                await _fileStorageService.UploadAsync(
                    request.Favicon,
                    "practices/favicons");
        }

        // Invoice
        if (request.InvoiceSample is not null)
        {
            practice.InvoiceSampleUrl =
                await _fileStorageService.UploadAsync(
                    request.InvoiceSample,
                    "practices/invoices");
        }

        // Data conversion files
        if (request.Contacts is not null)
        {
            practice.DataConversion.ContactsUrl =
                await _fileStorageService.UploadAsync(
                    request.Contacts,
                    "practices/data-conversion/contacts");
        }

        if (request.Users is not null)
        {
            practice.DataConversion.UsersUrl =
                await _fileStorageService.UploadAsync(
                    request.Users,
                    "practices/data-conversion/users");
        }

        if (request.Receipts is not null)
        {
            practice.DataConversion.ReceiptsUrl =
                await _fileStorageService.UploadAsync(
                    request.Receipts,
                    "practices/data-conversion/receipts");
        }

        if (request.Businesses is not null)
        {
            practice.DataConversion.BusinessesUrl =
                await _fileStorageService.UploadAsync(
                    request.Businesses,
                    "practices/data-conversion/businesses");
        }

        if (request.CreditNotes is not null)
        {
            practice.DataConversion.CreditNotesUrl =
                await _fileStorageService.UploadAsync(
                    request.CreditNotes,
                    "practices/data-conversion/credit-notes");
        }

        if (request.Tasks is not null)
        {
            practice.DataConversion.TasksUrl =
                await _fileStorageService.UploadAsync(
                    request.Tasks,
                    "practices/data-conversion/tasks");
        }

        if (request.SubscriptionAndDd is not null)
        {
            practice.DataConversion.SubscriptionAndDdUrl =
                await _fileStorageService.UploadAsync(
                    request.SubscriptionAndDd,
                    "practices/data-conversion/subscription-and-dd");
        }

        if (request.Invoices is not null)
        {
            practice.DataConversion.InvoicesUrl =
                await _fileStorageService.UploadAsync(
                    request.Invoices,
                    "practices/data-conversion/invoices");
        }

        // Update metadata
        practice.UpdatedAt = DateTime.UtcNow;

        // Save the updated practice
        var updatedPractice =
            await _practiceRepository.UpdateAsync(
                id,
                practice);

        if (updatedPractice is null)
        {
            return null;
        }

        return PracticeMapper.ToDto(updatedPractice);
    }

    public async Task<bool> DeleteAsync(string id)
    {
        return await _practiceRepository
            .SoftDeleteAsync(id);
    }
}