using backend.DTOs.Survey;
using backend.Enums;
using backend.Models;

namespace backend.Mapper;

public static class SurveyMapper
{
    public static Survey ToSurvey(
        CreateSurveyDto dto,
        string practiceId)
    {
        return new Survey
        {
            PracticeId = practiceId,
            UserName = dto.UserName,
            AccountantName = dto.AccountantName,
            BusinessName = dto.BusinessName,
            Rating = dto.Rating,
            Feedback = dto.Feedback,
            Status = SurveyStatus.Active,
        };
    }

    public static SurveyResponseDto ToDto(Survey survey)
    {
        return new SurveyResponseDto
        {
            Id = survey.Id,
            PracticeId = survey.PracticeId,
            Rating = survey.Rating,
            Feedback = survey.Feedback,
            UserName = survey.UserName,
            AccountantName = survey.AccountantName,
            BusinessName = survey.BusinessName,
            Status = survey.Status,
            CreatedAt = survey.CreatedAt,
        };
    }

    public static void UpdateSurvey(
        Survey survey,
        UpdateSurveyDto dto)
    {
        if (dto.UserName is not null)
        {
            survey.UserName = dto.UserName;
        }

        if (dto.AccountantName is not null)
        {
            survey.AccountantName = dto.AccountantName;
        }

        if (dto.BusinessName is not null)
        {
            survey.BusinessName = dto.BusinessName;
        }

        if (dto.Rating.HasValue)
        {
            survey.Rating = dto.Rating.Value;
        }

        if (dto.Feedback is not null)
        {
            survey.Feedback = dto.Feedback;
        }

        if (dto.Status.HasValue)
        {
            survey.Status = dto.Status.Value;
        }
    }
}