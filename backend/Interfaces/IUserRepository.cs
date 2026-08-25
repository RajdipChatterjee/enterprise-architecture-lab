using backend.Models;

namespace backend.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByUsernameAsync(string username);

    Task<User?> GetByEmailAsync(string email);

    Task<User?> GetByUsernameOrEmailAsync(string usernameOrEmail);

    Task CreateAsync(User user);

    Task UpdateAsync(User user);
}