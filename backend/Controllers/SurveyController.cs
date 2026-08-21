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
    public async Task<IActionResult> GetAll([FromQuery] SurveyFilterDto filter)
    {
        var result = await _surveyService.GetAllAsync(filter);

        return Ok(new ApiResponseDto<PaginatedResponseDto<SurveyResponseDto>>(true, "Surveys retrieved successfully", result));
    }

    // GET: api/surveys/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var survey = await _surveyService.GetByIdAsync(id);

        if (survey == null) return NotFound(new ApiResponseDto<object>(false, "Survey not found"));

        return Ok(new ApiResponseDto<SurveyResponseDto>(true, "Survey retrieved successfully", survey));
    }

    // POST: api/surveys
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSurveyDto request)
    {
        var survey = await _surveyService.CreateAsync(request);

        return CreatedAtAction(nameof(GetById), new { id = survey.Id },
            new ApiResponseDto<SurveyResponseDto>(
                true,
                "Survey created successfully",
                survey
            )
        );
    }

    // PUT: api/surveys/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateSurveyDto request)
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
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _surveyService.DeleteAsync(id);

        if (!deleted) return NotFound(new ApiResponseDto<object>(false, "Survey not found"));

        return Ok(new ApiResponseDto<object>(true, "Survey deleted successfully"));
    }
}