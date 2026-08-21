using backend.DTOs;
using backend.DTOs.Survey;
using backend.Models;

namespace backend.Interfaces;

public interface ISurveyRepository
{
    Task<PaginatedResponseDto<Survey>> GetAllAsync(SurveyFilterDto filter);
    Task<Survey?> GetByIdAsync(string id);
    Task<Survey> CreateAsync(Survey survey);
    Task<Survey?> UpdateAsync(string id, Survey survey);
    Task<bool> SoftDeleteAsync(string id);
}