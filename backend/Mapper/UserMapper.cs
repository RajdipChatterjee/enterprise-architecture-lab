using backend.DTOs.Auth;
using backend.Enums;
using backend.Models;

namespace backend.Mapper;

public static class UserMapper
{
    public static User MapToUser(RegisterUserDto user, string passwordHash) => new User
    {
        Username = user.Username,
        Email = user.Email,
        Role = UserRole.User,
        PasswordHash = passwordHash,
    };

    public static AuthResponseDto MapToResponseDto(User user) => new AuthResponseDto
    {
        Id = user.Id,
        Username = user.Username,
        Email = user.Email,
        Role = user.Role
    };
}