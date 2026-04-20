using System;
using System.Collections.Generic;
using System.Text;
using Backend.Localization;
using Volo.Abp.Application.Services;

namespace Backend;

/* Inherit your application services from this class.
 */
public abstract class BackendAppService : ApplicationService
{
    protected BackendAppService()
    {
        LocalizationResource = typeof(BackendResource);
    }
}
