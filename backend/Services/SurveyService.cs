using backend.DTOs;
using backend.DTOs.Survey;
using backend.Interfaces;
using backend.Models;

namespace backend.Services;

public class SurveyService : ISurveyService
{
    private readonly ISurveyRepository _surveyRepository;

    public SurveyService(ISurveyRepository surveyRepository)
    {
        _surveyRepository = surveyRepository;
    }

    public async Task<PaginatedResponseDto<SurveyResponseDto>> GetAllAsync(
        SurveyFilterDto filter)
    {
        var result = await _surveyRepository.GetAllAsync(filter);

        return new PaginatedResponseDto<SurveyResponseDto>
        {
            Items = result.Items.Select(MapToResponseDto).ToList(),
            TotalCount = result.TotalCount,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<SurveyResponseDto?> GetByIdAsync(string id)
    {
        var survey = await _surveyRepository.GetByIdAsync(id);

        if (survey == null)
            return null;

        return MapToResponseDto(survey);
    }

    public async Task<SurveyResponseDto> CreateAsync(
        CreateSurveyDto request)
    {
        var survey = new Survey
        {
            Rating = request.Rating,
            Feedback = request.Feedback,
            UserName = request.UserName,
            AccountantName = request.AccountantName,
            BusinessName = request.BusinessName,
            Status = request.Status,
            CreatedAt = DateTime.UtcNow,
            IsDeleted = false
        };

        var createdSurvey =
            await _surveyRepository.CreateAsync(survey);

        return MapToResponseDto(createdSurvey);
    }

    public async Task<SurveyResponseDto?> UpdateAsync(
        string id,
        UpdateSurveyDto request)
    {
        var survey = new Survey
        {
            Rating = request.Rating,
            Feedback = request.Feedback,
            UserName = request.UserName,
            AccountantName = request.AccountantName,
            BusinessName = request.BusinessName,
            Status = request.Status
        };

        var updatedSurvey =
            await _surveyRepository.UpdateAsync(id, survey);

        if (updatedSurvey == null)
            return null;

        return MapToResponseDto(updatedSurvey);
    }

    public async Task<bool> DeleteAsync(string id)
    {
        return await _surveyRepository.SoftDeleteAsync(id);
    }

    private static SurveyResponseDto MapToResponseDto(Survey survey)
    {
        return new SurveyResponseDto
        {
            Id = survey.Id,
            Rating = survey.Rating,
            Feedback = survey.Feedback,
            UserName = survey.UserName,
            AccountantName = survey.AccountantName,
            BusinessName = survey.BusinessName,
            Status = survey.Status,
            CreatedAt = survey.CreatedAt
        };
    }
}