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
        _users = database.GetCollection<User>(settings.UserCollection);
    }

    public async Task CreateAsync(User user)
    {
        await _users.InsertOneAsync(user);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        var user = await _users.Find<User>(u => u.Email == email).FirstOrDefaultAsync();
        return user;
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        var user = await _users.Find<User>(u => u.Username == username).FirstOrDefaultAsync();
        return user;
    }

    public async Task<User?> GetByUsernameOrEmailAsync(string usernameOrEmail)
    {
        var user = await _users.Find<User>(u => u.Username == usernameOrEmail || u.Email == usernameOrEmail).FirstOrDefaultAsync();
        return user;
    }

    public async Task<bool> AddRefreshTokenAsync(
    string userId,
    RefreshToken refreshToken)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Id, userId);

        var update = Builders<User>.Update.Push(u => u.RefreshTokens, refreshToken);

        var result = await _users.UpdateOneAsync(filter, update);

        return result.MatchedCount > 0;
    }
}