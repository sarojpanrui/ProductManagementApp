using Volo.Abp.Modularity;

namespace Backend;

[DependsOn(
    typeof(BackendDomainModule),
    typeof(BackendTestBaseModule)
)]
public class BackendDomainTestModule : AbpModule
{

}
