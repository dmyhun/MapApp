using Microsoft.AspNet.Identity.EntityFramework;

namespace MapApp.DAL.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}