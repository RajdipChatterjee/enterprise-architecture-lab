namespace backend.DTOs.Auth;

public class AuthResultDto
{
    public AuthResponseDto User { get; set; } = null!;
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
}