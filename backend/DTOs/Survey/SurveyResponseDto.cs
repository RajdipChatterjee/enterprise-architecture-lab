using backend.Enums;

namespace backend.DTOs.Survey;

public class SurveyResponseDto
{
    public string Id { get; set; } = null!;
    public int Rating { get; set; }
    public string Feedback { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string AccountantName { get; set; } = string.Empty;
    public string BusinessName { get; set; } = string.Empty;
    public SurveyStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
}
