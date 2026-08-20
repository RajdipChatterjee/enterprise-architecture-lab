using backend.Enums;

namespace backend.DTOs.Survey;

public class SurveyFilterDto
{
    // Search
    public string? Search { get; set; }

    // Filters
    public SurveyStatus? Status { get; set; }
    public int? Rating { get; set; }
    public string? UserName { get; set; }
    public string? AccountName { get; set; }
    public string? BusinessName { get; set; }

    // Date filtering
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }

    // Pagination
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 15;

    // Sorting
    public string SortBy { get; set; } = "CreatedAt";
    public bool SortDescending { get; set; } = true;
}
