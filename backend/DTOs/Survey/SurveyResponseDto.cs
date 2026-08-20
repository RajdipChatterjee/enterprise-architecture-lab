using backend.Enums;

namespace backend.DTOs.Survey;

public class SurveyResponseDto
{
    public string Id { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Feedback { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string AccountName { get; set; } = string.Empty;
    public string BusinessName { get; set; } = string.Empty;
    public SurveyStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
}
