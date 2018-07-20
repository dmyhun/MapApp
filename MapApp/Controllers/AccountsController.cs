using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using MapApp.DAL.Identity;
using MapApp.DAL.Identity.Model;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MapApp.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : ApiController
    {
        [Route("register")]
        [HttpPost]
        [AllowAnonymous]
        public IdentityResult Register(RegisterModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Description = "Hello World!",
                ImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ebls-UUShLJTBsclAHFxv2QYxDJIQdre45gDkFn5FEkC7JvI"
            };

            if (model.Password != model.PasswordConfirm)
                return new IdentityResult("Password don't match");

            IdentityResult result = manager.Create(user, model.Password);
            return result;
        }

        [Route("getUserClaims")]
        [HttpGet]
        public AccountModel GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            AccountModel model = new AccountModel()
            {
                UserName = identityClaims.FindFirst("UserName").Value,
                Email = identityClaims.FindFirst("Email").Value,
                FirstName = identityClaims.FindFirst("FirstName").Value,
                LastName = identityClaims.FindFirst("LastName").Value,
                Description = identityClaims.FindFirst("Description").Value,
                ImageUrl = identityClaims.FindFirst("ImageUrl").Value
            };
            return model;
        }
    }
}
