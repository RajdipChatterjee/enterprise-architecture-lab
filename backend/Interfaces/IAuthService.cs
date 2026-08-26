using backend.DTOs.Auth;

namespace backend.Interfaces;

public interface IAuthService
{
    public Task<AuthResultDto> RegisterUserAsync(RegisterUserDto user);
    public Task<AuthResultDto> LoginUserAsync(LoginUserDto user);
}