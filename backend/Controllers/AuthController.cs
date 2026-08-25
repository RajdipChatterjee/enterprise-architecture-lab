using backend.DTOs;
using backend.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService AuthService)
    {
        _authService = AuthService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ApiResponseDto<string>>> RegisterAsync([FromBody] RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponseDto<string>>> LoginAsync([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        return Ok(result);
    }
}
