using Backend.Samples;
using Xunit;

namespace Backend.EntityFrameworkCore.Applications;

[Collection(BackendTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<BackendEntityFrameworkCoreTestModule>
{

}
