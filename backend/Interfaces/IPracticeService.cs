using backend.DTOs;
using backend.DTOs.Practice;

namespace backend.Interfaces;

public interface IPracticeService
{
    Task<PaginatedResponseDto<PracticeResponseDto>> GetAllAsync(
        int page,
        int pageSize);

    Task<PracticeResponseDto?> GetByIdAsync(string id);

    Task<List<PracticeResponseDto>> GetByOwnerUserIdAsync(
        string ownerUserId);

    Task<PracticeResponseDto> CreateAsync(
        CreatePracticeDto request,
        string ownerUserId);

    Task<PracticeResponseDto?> UpdateAsync(
        string id,
        UpdatePracticeDto request);

    Task<bool> DeleteAsync(string id);
}