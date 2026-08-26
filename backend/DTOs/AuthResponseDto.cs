using backend.Enums;

namespace backend.DTOs.Auth;

public class AuthResponseDto
{
    public string Id { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public UserRole Role { get; set; }
}