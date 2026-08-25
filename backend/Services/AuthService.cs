using backend.DTOs.Auth;
using backend.DTOs.Survey;
using backend.Interfaces;
using backend.Models;

namespace backend.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<AuthResponseDto> LoginUserAsync(LoginUserDto user)
    {
        try
        {
            var result = await _userRepository.GetByUsernameOrEmailAsync(user.UsernameOrEmail);
            return MapToResponseDto(result);
        }
        catch(Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<AuthResponseDto> RegisterUserAsync(RegisterUserDto user)
    {
        try
        {
            var result = await _userRepository.CreateAsync(user);
            return MapToResponseDto(result);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    private static AuthResponseDto MapToResponseDto(User user)
    {
        return new AuthResponseDto
        {
           
        };
    }

    private static User MapToUser(RegisterUserDto user)
    {
        return new User
        {
            Username = user.Username,
            Email = user.Email,
            //Password = user.Password
        };
    }
}