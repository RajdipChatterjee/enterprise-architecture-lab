namespace backend.Configuration;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } = null!;
    public string Database { get; set; } = null!;
    public string SurveyCollection { get; set; } = null!;
    public string UserCollection { get; set; } = null!;
}