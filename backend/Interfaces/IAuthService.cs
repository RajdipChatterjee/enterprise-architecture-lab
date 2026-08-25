using backend.DTOs.Auth;

namespace backend.Interfaces;

public interface IAuthService
{
    public Task<AuthResponseDto> RegisterUserAsync(RegisterUserDto user);
    public Task<AuthResponseDto> LoginUserAsync(LoginUserDto user);
}