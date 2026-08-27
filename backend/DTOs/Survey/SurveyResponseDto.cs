using backend.Enums;

namespace backend.DTOs.Survey;

public class SurveyResponseDto
{
    // Identity
    public string Id { get; set; } = null!;

    // Ownership
    public string PracticeId { get; set; } = null!;

    // Survey Content
    public int Rating { get; set; }

    public string Feedback { get; set; } = string.Empty;

    // Survey Context
    public string UserName { get; set; } = string.Empty;

    public string AccountantName { get; set; } = string.Empty;

    public string BusinessName { get; set; } = string.Empty;

    // Status
    public SurveyStatus Status { get; set; }

    // Audit
    public DateTime CreatedAt { get; set; }
}