using System.Threading.Tasks;

namespace Backend.Data;

public interface IBackendDbSchemaMigrator
{
    Task MigrateAsync();
}
