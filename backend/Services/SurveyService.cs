using backend.DTOs;
using backend.DTOs.Survey;
using backend.Interfaces;
using backend.Mapper;

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
            Items = result.Items
                .Select(SurveyMapper.ToDto)
                .ToList(),

            TotalCount = result.TotalCount,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<SurveyResponseDto?> GetByIdAsync(string id)
    {
        var survey = await _surveyRepository.GetByIdAsync(id);

        if (survey is null)
        {
            return null;
        }

        return SurveyMapper.ToDto(survey);
    }

    public async Task<SurveyResponseDto> CreateAsync(
        CreateSurveyDto request)
    {
        // Temporary placeholder until authentication and
        // practice context are implemented.
        var practiceId = "TODO";

        var survey = SurveyMapper.ToSurvey(
            request,
            practiceId
        );

        var createdSurvey =
            await _surveyRepository.CreateAsync(survey);

        return SurveyMapper.ToDto(createdSurvey);
    }

    public async Task<SurveyResponseDto?> UpdateAsync(
        string id,
        UpdateSurveyDto request)
    {
        // First get the existing survey
        var survey = await _surveyRepository.GetByIdAsync(id);

        if (survey is null)
        {
            return null;
        }

        // Apply only fields supplied in the DTO
        SurveyMapper.UpdateSurvey(survey, request);

        var updatedSurvey =
            await _surveyRepository.UpdateAsync(id, survey);

        if (updatedSurvey is null)
        {
            return null;
        }

        return SurveyMapper.ToDto(updatedSurvey);
    }

    public async Task<bool> DeleteAsync(string id)
    {
        return await _surveyRepository.SoftDeleteAsync(id);
    }
}