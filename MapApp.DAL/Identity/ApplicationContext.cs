using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MapApp.DAL.Identity
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext() : base("MapIdentity") { }

        public static ApplicationContext Create()
        {
            return new ApplicationContext();
        }
    }
}
