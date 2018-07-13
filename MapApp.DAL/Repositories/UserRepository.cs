using System.Data.Entity;
using System.Linq;
using MapApp.DAL.Identity;

namespace MapApp.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private ApplicationContext context;

        public UserRepository()
        {
            this.context = new ApplicationContext();
        }

        public ApplicationUser GetUser(string userName)
        {
            ApplicationUser user = context.Users.FirstOrDefault(u => u.UserName == userName);
            return user;
        }

        public void EditUser(ApplicationUser user)
        {
            context.Entry(user).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}
