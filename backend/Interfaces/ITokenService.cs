using backend.DTOs.Auth;
using backend.Models;

namespace backend.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
}