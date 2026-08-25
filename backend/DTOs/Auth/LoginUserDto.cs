using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Auth;

public class LoginUserDto
{
    [Required]
    public string UsernameOrEmail { get; set; } = null!;

    [Required]
    [StringLength(128, MinimumLength = 6)]
    public string Password { get; set; } = null!;
}