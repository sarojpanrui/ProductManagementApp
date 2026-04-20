using Xunit;

namespace Backend.EntityFrameworkCore;

[CollectionDefinition(BackendTestConsts.CollectionDefinitionName)]
public class BackendEntityFrameworkCoreCollection : ICollectionFixture<BackendEntityFrameworkCoreFixture>
{

}
