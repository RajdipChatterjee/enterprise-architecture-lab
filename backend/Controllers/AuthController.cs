using backend.DTOs.Auth;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<AuthResponseDto>> GetMeAsync()
    {
        var userId = HttpContext.User
            .FindFirst(ClaimTypes.NameIdentifier)?
            .Value;

        return Ok(userId);
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> RegisterAsync(
        [FromBody] RegisterUserDto dto)
    {
        var result = await _authService.RegisterUserAsync(dto);

        SetAuthCookies(result);

        return Ok(result.User);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> LoginAsync(
        [FromBody] LoginUserDto dto)
    {
        var result = await _authService.LoginUserAsync(dto);

        SetAuthCookies(result);

        return Ok(result.User);
    }

    private void SetAuthCookies(AuthResultDto result)
    {
        Response.Cookies.Append(
            "accessToken",
            result.AccessToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            }
        );

        Response.Cookies.Append(
            "refreshToken",
            result.RefreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            }
        );
    }
}