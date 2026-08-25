using backend.Configuration;
using backend.Interfaces;
using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<User> _users;

    public UserRepository(IMongoClient mongoClient, IOptions<MongoDbSettings> mongoSettings)
    {
        var settings = mongoSettings.Value;

        var database = mongoClient.GetDatabase(settings.Database);

        _users = database.GetCollection<User>(
            settings.UserCollection
        );
    }

    public Task CreateAsync(User user)
    {
        throw new NotImplementedException();
    }

    public Task<User?> GetByEmailAsync(string email)
    {
        throw new NotImplementedException();
    }

    public Task<User?> GetByUsernameAsync(string username)
    {
        throw new NotImplementedException();
    }

    public Task<User?> GetByUsernameOrEmailAsync(string usernameOrEmail)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(User user)
    {
        throw new NotImplementedException();
    }
}