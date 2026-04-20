using Volo.Abp.Modularity;

namespace Backend;

public abstract class BackendApplicationTestBase<TStartupModule> : BackendTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
