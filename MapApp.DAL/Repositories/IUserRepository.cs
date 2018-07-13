using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MapApp.DAL.Identity;

namespace MapApp.DAL.Repositories
{
    public interface IUserRepository
    {
        ApplicationUser GetUser(string userName);

        void EditUser(ApplicationUser user);
    }
}
