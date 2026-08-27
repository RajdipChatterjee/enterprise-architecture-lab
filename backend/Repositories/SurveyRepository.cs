using System.Text.RegularExpressions;
using backend.Configuration;
using backend.DTOs;
using backend.DTOs.Survey;
using backend.Interfaces;
using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Repositories;

public class SurveyRepository : ISurveyRepository
{
    private readonly IMongoCollection<Survey> _surveys;

    public SurveyRepository(IMongoClient mongoClient, IOptions<MongoDbSettings> mongoSettings)
    {
        var settings = mongoSettings.Value;

        var database = mongoClient.GetDatabase(settings.Database);

        _surveys = database.GetCollection<Survey>(
            settings.SurveyCollection
        );
    }

    public async Task<PaginatedResponseDto<Survey>> GetAllAsync(
        SurveyFilterDto filter)
    {
        var filterBuilder = Builders<Survey>.Filter;

        // Always exclude soft-deleted surveys
        var mongoFilter = filterBuilder.Eq(x => x.IsDeleted, false);

        // Status filter
        if (filter.Status.HasValue)
        {
            mongoFilter &= filterBuilder.Eq(x => x.Status, filter.Status.Value);
        }

        // Rating filter
        if (filter.Rating.HasValue)
        {
            mongoFilter &= filterBuilder.Eq(x => x.Rating, filter.Rating.Value);
        }

        // Username filter
        if (!string.IsNullOrWhiteSpace(filter.UserName))
        {
            mongoFilter &= filterBuilder.Regex(
                x => x.UserName,
                new BsonRegularExpression(
                    Regex.Escape(filter.UserName),
                    "i"));
        }

        // Accountant name filter
        if (!string.IsNullOrWhiteSpace(filter.AccountantName))
        {
            mongoFilter &= filterBuilder.Regex(
                x => x.AccountantName,
                new BsonRegularExpression(
                    Regex.Escape(filter.AccountantName),
                    "i"));
        }

        // Business name filter
        if (!string.IsNullOrWhiteSpace(filter.BusinessName))
        {
            mongoFilter &= filterBuilder.Regex(
                x => x.BusinessName,
                new BsonRegularExpression(
                    Regex.Escape(filter.BusinessName),
                    "i"));
        }

        // Global search
        if (!string.IsNullOrWhiteSpace(filter.Search))
        {
            var searchRegex = new BsonRegularExpression(
                Regex.Escape(filter.Search),
                "i");

            var searchFilter = filterBuilder.Or(
                filterBuilder.Regex(
                    x => x.UserName,
                    searchRegex),

                filterBuilder.Regex(
                    x => x.AccountantName,
                    searchRegex),

                filterBuilder.Regex(
                    x => x.BusinessName,
                    searchRegex),

                filterBuilder.Regex(
                    x => x.Feedback,
                    searchRegex)
            );

            mongoFilter &= searchFilter;
        }

        // Date range
        if (filter.FromDate.HasValue)
        {
            mongoFilter &= filterBuilder.Gte(
                x => x.CreatedAt,
                filter.FromDate.Value);
        }

        if (filter.ToDate.HasValue)
        {
            mongoFilter &= filterBuilder.Lte(
                x => x.CreatedAt,
                filter.ToDate.Value);
        }

        // Prevent invalid pagination
        var page = filter.Page < 1 ? 1 : filter.Page;

        var pageSize = filter.PageSize < 1
            ? 15
            : filter.PageSize;

        // Optional safety limit
        pageSize = Math.Min(pageSize, 100);

        // Sorting
        var sortBuilder = Builders<Survey>.Sort;

        var sort = filter.SortBy switch
        {
            "rating" => filter.SortDescending
                ? sortBuilder.Descending(x => x.Rating)
                : sortBuilder.Ascending(x => x.Rating),

            "username" => filter.SortDescending
                ? sortBuilder.Descending(x => x.UserName)
                : sortBuilder.Ascending(x => x.UserName),

            "accountantName" => filter.SortDescending
                ? sortBuilder.Descending(x => x.AccountantName)
                : sortBuilder.Ascending(x => x.AccountantName),

            "businessName" => filter.SortDescending
                ? sortBuilder.Descending(x => x.BusinessName)
                : sortBuilder.Ascending(x => x.BusinessName),

            _ => filter.SortDescending
                ? sortBuilder.Descending(x => x.CreatedAt)
                : sortBuilder.Ascending(x => x.CreatedAt)
        };

        // Count
        var totalCount = await _surveys.CountDocumentsAsync(
            mongoFilter);

        // Data
        var surveys = await _surveys
            .Find(mongoFilter)
            .Sort(sort)
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();

        return new PaginatedResponseDto<Survey>
        {
            Items = surveys,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<Survey?> GetByIdAsync(string id)
    {
        if (!ObjectId.TryParse(id, out _))
        {
            return null;
        }

        return await _surveys
            .Find(x =>
                x.Id == id &&
                !x.IsDeleted)
            .FirstOrDefaultAsync();
    }

    public async Task<Survey> CreateAsync(Survey survey)
    {
        await _surveys.InsertOneAsync(survey);

        return survey;
    }

    public async Task<Survey?> UpdateAsync(
        string id,
        Survey survey)
    {
        if (!ObjectId.TryParse(id, out _))
        {
            return null;
        }

        var filter = Builders<Survey>.Filter.And(
            Builders<Survey>.Filter.Eq(x => x.Id, id),
            Builders<Survey>.Filter.Eq(x => x.IsDeleted, false)
        );

        var update = Builders<Survey>.Update
            .Set(x => x.Rating, survey.Rating)
            .Set(x => x.Feedback, survey.Feedback)
            .Set(x => x.UserName, survey.UserName)
            .Set(x => x.AccountantName, survey.AccountantName)
            .Set(x => x.BusinessName, survey.BusinessName)
            .Set(x => x.Status, survey.Status);

        return await _surveys.FindOneAndUpdateAsync(
            filter,
            update,
            new FindOneAndUpdateOptions<Survey>
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

        var filter = Builders<Survey>.Filter.And(
            Builders<Survey>.Filter.Eq(x => x.Id, id),
            Builders<Survey>.Filter.Eq(x => x.IsDeleted, false)
        );

        var update = Builders<Survey>.Update
            .Set(x => x.IsDeleted, true)
            .Set(x => x.DeletedAt, DateTime.UtcNow);

        var result = await _surveys.UpdateOneAsync(
            filter,
            update);

        return result.ModifiedCount > 0;
    }
}