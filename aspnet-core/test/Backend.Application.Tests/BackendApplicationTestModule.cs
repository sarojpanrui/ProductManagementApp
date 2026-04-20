using Volo.Abp.Modularity;

namespace Backend;

[DependsOn(
    typeof(BackendApplicationModule),
    typeof(BackendDomainTestModule)
)]
public class BackendApplicationTestModule : AbpModule
{

}
