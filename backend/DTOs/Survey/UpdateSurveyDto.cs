using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Survey;

public class UpdateSurveyDto
{
    [StringLength(100)]
    public string? UserName { get; set; }

    [StringLength(200)]
    public string? BusinessName { get; set; }

    [StringLength(200)]
    public string? AccountantName { get; set; }

    [Range(1, 4)]
    public SurveyStatus? Status { get; set; }

    [Range(1, 4)]
    public int? Rating { get; set; }

    [StringLength(2000)]
    public string? Feedback { get; set; }
}