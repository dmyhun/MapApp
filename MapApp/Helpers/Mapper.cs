using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MapApp.DAL.Identity;
using MapApp.Models;

namespace MapApp.Helpers
{
    public static class Mapper
    {
        public static UserVM MapUser(ApplicationUser user)
        {
            UserVM userVM = new UserVM
            {
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Description = user.Description,
                ImageUrl = user.ImageUrl
            };
            return userVM;
        }
    }
}