using backend.Configuration;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Repositories;

public class PracticeRepository : IPracticeRepository
{
    private readonly IMongoCollection<Practice> _practices;

    public PracticeRepository(
        IMongoClient mongoClient,
        IOptions<MongoDbSettings> mongoSettings)
    {
        var settings = mongoSettings.Value;

        var database = mongoClient.GetDatabase(
            settings.Database);

        _practices = database.GetCollection<Practice>(
            settings.PracticeCollection);
    }

    public async Task<PaginatedResponseDto<Practice>> GetAllAsync(
        int page,
        int pageSize)
    {
        var filter = Builders<Practice>.Filter
            .Eq(x => x.IsDeleted, false);

        page = page < 1 ? 1 : page;

        pageSize = pageSize < 1
            ? 15
            : Math.Min(pageSize, 100);

        var totalCount = await _practices
            .CountDocumentsAsync(filter);

        var practices = await _practices
            .Find(filter)
            .SortByDescending(x => x.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();

        return new PaginatedResponseDto<Practice>
        {
            Items = practices,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<Practice?> GetByIdAsync(string id)
    {
        if (!ObjectId.TryParse(id, out _))
        {
            return null;
        }

        return await _practices
            .Find(x =>
                x.Id == id &&
                !x.IsDeleted)
            .FirstOrDefaultAsync();
    }

    public async Task<List<Practice>> GetByOwnerUserIdAsync(
        string ownerUserId)
    {
        return await _practices
            .Find(x =>
                x.OwnerUserId == ownerUserId &&
                !x.IsDeleted)
            .SortByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task<Practice> CreateAsync(
        Practice practice)
    {
        await _practices.InsertOneAsync(practice);

        return practice;
    }

    public async Task<Practice?> UpdateAsync(
    string id,
    Practice practice)
    {
        if (!ObjectId.TryParse(id, out _))
        {
            return null;
        }

        var filter = Builders<Practice>.Filter.And(
            Builders<Practice>.Filter.Eq(x => x.Id, id),
            Builders<Practice>.Filter.Eq(x => x.IsDeleted, false)
        );

        return await _practices.FindOneAndReplaceAsync(
            filter,
            practice,
            new FindOneAndReplaceOptions<Practice>
            {
                ReturnDocument = ReturnDocument.After
            });
    }

    public async Task<bool> SoftDeleteAsync(string id)
    {
        if (!ObjectId.TryParse(id, out _))
        {
            return false;
        }

        var filter = Builders<Practice>.Filter.And(
            Builders<Practice>.Filter.Eq(x => x.Id, id),
            Builders<Practice>.Filter.Eq(x => x.IsDeleted, false)
        );

        var update = Builders<Practice>.Update
            .Set(x => x.IsDeleted, true)
            .Set(x => x.DeletedAt, DateTime.UtcNow);

        var result = await _practices.UpdateOneAsync(
            filter,
            update);

        return result.ModifiedCount > 0;
    }
}