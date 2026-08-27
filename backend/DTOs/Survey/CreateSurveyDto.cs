using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Survey;

public class CreateSurveyDto
{
    [Required]
    [StringLength(100)]
    public string UserName { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string AccountantName { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string BusinessName { get; set; } = string.Empty;

    [Range(1, 4)]
    public int Rating { get; set; }

    [Required]
    [StringLength(2000)]
    public string Feedback { get; set; } = string.Empty;
}