using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.DTOs.Survey;
using backend.Interfaces;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SurveysController : ControllerBase
{
    private readonly ISurveyService _surveyService;

    public SurveysController(ISurveyService surveyService)
    {
        _surveyService = surveyService;
    }

    // GET: api/surveys?page=1&pageSize=15&status=Active
    [HttpGet]
    public async Task<ActionResult<ApiResponseDto<PaginatedResponseDto<SurveyResponseDto>>>> GetAll([FromQuery] SurveyFilterDto filter)
    {
        var result = await _surveyService.GetAllAsync(filter);

        return Ok(new ApiResponseDto<PaginatedResponseDto<SurveyResponseDto>>(true, "Surveys retrieved successfully", result));
    }

    // GET: api/surveys/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponseDto<SurveyResponseDto>>> GetById(string id)
    {
        var survey = await _surveyService.GetByIdAsync(id);

        if (survey == null) return NotFound(new ApiResponseDto<object>(false, "Survey not found"));

        return Ok(new ApiResponseDto<SurveyResponseDto>(true, "Survey retrieved successfully", survey));
    }

    // POST: api/surveys
    [HttpPost]
    public async Task<ActionResult<ApiResponseDto<SurveyResponseDto>>> Create(
    [FromBody] CreateSurveyDto request)
    {
        //var practiceId = Request.Headers["Practice-Id"].ToString();
        const string practiceId = "000000000000000000000001"; // Replace with actual logic to retrieve practiceId from headers or other sources
        var survey = await _surveyService.CreateAsync(request, practiceId);

        return CreatedAtAction(
            nameof(GetById),
            new { id = survey.Id },
            new ApiResponseDto<SurveyResponseDto>(
                true,
                "Survey created successfully",
                survey
            )
        );
    }

    // PUT: api/surveys/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponseDto<SurveyResponseDto>>> Update(
    string id,
    [FromBody] UpdateSurveyDto request)
    {
        var survey = await _surveyService.UpdateAsync(id, request);

        if (survey == null)
        {
            return NotFound(
                new ApiResponseDto<object>(
                    false,
                    "Survey not found"
                )
            );
        }

        return Ok(
            new ApiResponseDto<SurveyResponseDto>(
                true,
                "Survey updated successfully",
                survey
            )
        );
    }

    // DELETE: api/surveys/{id}
    // Soft delete
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponseDto<object>>> Delete(string id)
    {

        var deleted = await _surveyService.DeleteAsync(id);

        if (!deleted) return NotFound(new ApiResponseDto<object>(false, "Survey not found"));

        return Ok(new ApiResponseDto<object>(true, "Survey deleted successfully"));
    }
}