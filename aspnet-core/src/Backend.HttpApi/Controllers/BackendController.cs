using Backend.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Backend.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class BackendController : AbpControllerBase
{
    protected BackendController()
    {
        LocalizationResource = typeof(BackendResource);
    }
}
