using backend.DTOs;
using backend.Models;

namespace backend.Interfaces;

public interface IPracticeRepository
{
    Task<PaginatedResponseDto<Practice>> GetAllAsync(
        int page,
        int pageSize);

    Task<Practice?> GetByIdAsync(string id);

    Task<List<Practice>> GetByOwnerUserIdAsync(
        string ownerUserId);

    Task<Practice> CreateAsync(Practice practice);

    Task<Practice?> UpdateAsync(
        string id,
        Practice practice);

    Task<bool> SoftDeleteAsync(string id);
}