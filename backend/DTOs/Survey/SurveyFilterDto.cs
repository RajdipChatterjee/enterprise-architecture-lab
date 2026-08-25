using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Survey;

public class SurveyFilterDto
{
    // Search
    [StringLength(200)]
    public string? Search { get; set; }

    // Filters
    [Range(1, 4)]
    public SurveyStatus? Status { get; set; }

    [Range(1, 4)]
    public int? Rating { get; set; }

    [StringLength(100)]
    public string? UserName { get; set; }

    [StringLength(200)]
    public string? AccountantName { get; set; }

    [StringLength(200)]
    public string? BusinessName { get; set; }

    // Date filtering
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }

    // Pagination
    [Range(1, int.MaxValue)]
    public int Page { get; set; } = 1;

    [Range(1, 100)]
    public int PageSize { get; set; } = 15;

    // Sorting
    [StringLength(50)]
    public string SortBy { get; set; } = "CreatedAt";

    public bool SortDescending { get; set; } = true;
}