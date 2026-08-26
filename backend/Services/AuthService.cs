using backend.DTOs.Auth;
using backend.Interfaces;
using backend.Mapper;
using backend.Models;

namespace backend.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    public AuthService(IUserRepository userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }

    public async Task<AuthResultDto> LoginUserAsync(LoginUserDto user)
    {
        var userFromDb = await _userRepository.GetByUsernameOrEmailAsync(user.UsernameOrEmail);

        if (userFromDb == null || !BCrypt.Net.BCrypt.Verify(user.Password, userFromDb.PasswordHash))
            throw new UnauthorizedAccessException("Invalid username/email or password.");

        var accessToken = _tokenService.GenerateAccessToken(userFromDb);
        var refreshToken = _tokenService.GenerateRefreshToken();

        var refreshTokenEntity = new RefreshToken
        {
            TokenHash = BCrypt.Net.BCrypt.HashPassword(refreshToken),
            ExpiresAt = DateTime.UtcNow.AddDays(7)
        };

        await _userRepository.AddRefreshTokenAsync(
            userFromDb.Id,
            refreshTokenEntity
        );

        return new AuthResultDto
        {
            User = UserMapper.MapToResponseDto(userFromDb),
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    public async Task<AuthResultDto> RegisterUserAsync(RegisterUserDto user)
    {
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
        var userToCreate = UserMapper.MapToUser(user, passwordHash);

        var existingUser = await _userRepository.GetByUsernameAsync(userToCreate.Username);

        if (existingUser != null)
            throw new InvalidOperationException("Username already exists.");

        var existingEmail = await _userRepository.GetByEmailAsync(userToCreate.Email);

        if (existingEmail != null)
            throw new InvalidOperationException("Email already exists.");

        await _userRepository.CreateAsync(userToCreate);

        var accessToken =
        _tokenService.GenerateAccessToken(userToCreate);

        var refreshToken =
            _tokenService.GenerateRefreshToken();

        var refreshTokenEntity = new RefreshToken
        {
            TokenHash = BCrypt.Net.BCrypt.HashPassword(refreshToken),
            ExpiresAt = DateTime.UtcNow.AddDays(7)
        };

        await _userRepository.AddRefreshTokenAsync(
            userToCreate.Id,
            refreshTokenEntity
        );

        return new AuthResultDto
        {
            User = UserMapper.MapToResponseDto(userToCreate),
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }
}