using Microsoft.AspNetCore.Http;

namespace backend.Interfaces;

public interface IFileStorageService
{
    Task<string?> UploadAsync(
        IFormFile? file,
        string folder);
}