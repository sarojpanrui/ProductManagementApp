using Backend.Samples;
using Xunit;

namespace Backend.EntityFrameworkCore.Domains;

[Collection(BackendTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<BackendEntityFrameworkCoreTestModule>
{

}
