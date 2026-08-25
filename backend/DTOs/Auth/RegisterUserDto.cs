using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Auth;

public class RegisterUserDto
{
    [Required]
    [StringLength(100, MinimumLength = 1)]
    public string Username { get; set; } = null!;

    [Required]
    [EmailAddress]
    [StringLength(254)]
    public string Email { get; set; } = null!;

    [Required]
    [StringLength(128, MinimumLength = 6)]
    public string Password { get; set; } = null!;
}