using backend.DTOs;
using backend.DTOs.Survey;

namespace backend.Interfaces;

public interface ISurveyService
{
    Task<PaginatedResponseDto<SurveyResponseDto>> GetAllAsync(SurveyFilterDto filter);
    Task<SurveyResponseDto?> GetByIdAsync(string id);
    Task<SurveyResponseDto> CreateAsync(CreateSurveyDto request);
    Task<SurveyResponseDto?> UpdateAsync(string id, UpdateSurveyDto request);
    Task<bool> DeleteAsync(string id);
}