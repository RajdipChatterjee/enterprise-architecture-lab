using backend.DTOs;
using backend.DTOs.Practice;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PracticesController : ControllerBase
{
    private readonly IPracticeService _practiceService;

    public PracticesController(
        IPracticeService practiceService)
    {
        _practiceService = practiceService;
    }

    // GET: api/practices?page=1&pageSize=15
    [HttpGet]
    public async Task<
        ActionResult<
            ApiResponseDto<PaginatedResponseDto<PracticeResponseDto>>
        >
    > GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 15)
    {
        var result = await _practiceService.GetAllAsync(
            page,
            pageSize);

        return Ok(
            new ApiResponseDto<
                PaginatedResponseDto<PracticeResponseDto>
            >(
                true,
                "Practices retrieved successfully",
                result
            )
        );
    }

    // GET: api/practices/{id}
    [HttpGet("{id}")]
    public async Task<
        ActionResult<ApiResponseDto<PracticeResponseDto>>
    > GetById(string id)
    {
        var practice =
            await _practiceService.GetByIdAsync(id);

        if (practice is null)
        {
            return NotFound(
                new ApiResponseDto<object>(
                    false,
                    "Practice not found"
                )
            );
        }

        return Ok(
            new ApiResponseDto<PracticeResponseDto>(
                true,
                "Practice retrieved successfully",
                practice
            )
        );
    }

    // GET: api/practices/owner/{ownerUserId}
    [HttpGet("owner/{ownerUserId}")]
    public async Task<
        ActionResult<ApiResponseDto<List<PracticeResponseDto>>>
    > GetByOwner(string ownerUserId)
    {
        var practices =
            await _practiceService
                .GetByOwnerUserIdAsync(ownerUserId);

        return Ok(
            new ApiResponseDto<List<PracticeResponseDto>>(
                true,
                "Practices retrieved successfully",
                practices
            )
        );
    }

    // POST: api/practices
    [HttpPost]
    public async Task<
        ActionResult<ApiResponseDto<PracticeResponseDto>>
    > Create(
        [FromForm] CreatePracticeDto request)
    {
        // TEMPORARY until authentication is connected.
        // Later this must come from the authenticated user's claims.
        var ownerUserId = "000000000000000000000001";

        var practice =
            await _practiceService.CreateAsync(
                request,
                ownerUserId);

        return CreatedAtAction(
            nameof(GetById),
            new { id = practice.Id },
            new ApiResponseDto<PracticeResponseDto>(
                true,
                "Practice created successfully",
                practice
            )
        );
    }

    // PUT: api/practices/{id}
    [HttpPut("{id}")]
    public async Task<
        ActionResult<ApiResponseDto<PracticeResponseDto>>
    > Update(
        string id,
        [FromForm] UpdatePracticeDto request)
    {
        var practice =
            await _practiceService.UpdateAsync(
                id,
                request);

        if (practice is null)
        {
            return NotFound(
                new ApiResponseDto<object>(
                    false,
                    "Practice not found"
                )
            );
        }

        return Ok(
            new ApiResponseDto<PracticeResponseDto>(
                true,
                "Practice updated successfully",
                practice
            )
        );
    }

    // DELETE: api/practices/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponseDto<object>>> Delete(
        string id)
    {
        var deleted =
            await _practiceService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound(
                new ApiResponseDto<object>(
                    false,
                    "Practice not found"
                )
            );
        }

        return Ok(
            new ApiResponseDto<object>(
                true,
                "Practice deleted successfully"
            )
        );
    }
}