using backend.Interfaces;

namespace backend.Services;

public class LocalFileStorageService : IFileStorageService
{
    private readonly IWebHostEnvironment _environment;

    public LocalFileStorageService(
        IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<string?> UploadAsync(
        IFormFile? file,
        string folder)
    {
        if (file is null || file.Length == 0)
        {
            return null;
        }

        var webRootPath = _environment.WebRootPath;

        if (string.IsNullOrEmpty(webRootPath))
        {
            webRootPath = Path.Combine(
                _environment.ContentRootPath,
                "wwwroot"
            );
        }

        var uploadFolder = Path.Combine(
            webRootPath,
            "uploads",
            folder
        );

        Directory.CreateDirectory(uploadFolder);

        var fileExtension = Path.GetExtension(
            file.FileName
        );

        var fileName =
            $"{Guid.NewGuid()}{fileExtension}";

        var filePath = Path.Combine(
            uploadFolder,
            fileName
        );

        await using var stream =
            new FileStream(
                filePath,
                FileMode.Create
            );

        await file.CopyToAsync(stream);

        return $"/uploads/{folder}/{fileName}";
    }

    public Task DeleteAsync(string? fileUrl)
    {
        if (string.IsNullOrWhiteSpace(fileUrl))
        {
            return Task.CompletedTask;
        }

        var webRootPath = _environment.WebRootPath;

        if (string.IsNullOrEmpty(webRootPath))
        {
            webRootPath = Path.Combine(
                _environment.ContentRootPath,
                "wwwroot"
            );
        }

        // Remove the leading "/"
        var relativePath = fileUrl.TrimStart('/');

        var filePath = Path.Combine(
            webRootPath,
            relativePath
        );

        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }

        return Task.CompletedTask;
    }
}