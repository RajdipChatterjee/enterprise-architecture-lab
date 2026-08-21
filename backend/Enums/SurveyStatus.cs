using System.ComponentModel.DataAnnotations;

namespace backend.Enums;

public enum SurveyStatus
{
    Unknown = 0,
    Active,
    Inactive,
    Pending,
    Completed
}