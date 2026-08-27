using backend.DTOs;
using backend.DTOs.Practice;
using backend.Interfaces;
using backend.Mapper;

namespace backend.Services;

public class PracticeService : IPracticeService
{
    private readonly IPracticeRepository _practiceRepository;

    public PracticeService(
        IPracticeRepository practiceRepository)
    {
        _practiceRepository = practiceRepository;
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

        // File upload handling will be added later.
        //
        // Example:
        // practice.LogoUrl =
        //     await _fileStorageService.UploadAsync(request.Logo);

        var createdPractice =
            await _practiceRepository.CreateAsync(practice);

        return PracticeMapper.ToDto(createdPractice);
    }

    public async Task<PracticeResponseDto?> UpdateAsync(
        string id,
        UpdatePracticeDto request)
    {
        var practice =
            await _practiceRepository.GetByIdAsync(id);

        if (practice is null)
        {
            return null;
        }

        PracticeMapper.UpdatePractice(
            practice,
            request);

        // File replacement/upload handling
        // will be added with IFileStorageService.

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