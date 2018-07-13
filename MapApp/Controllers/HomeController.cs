using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MapApp.DAL.Identity;
using MapApp.DAL.Models;
using MapApp.DAL.Repositories;
using MapApp.Helpers;
using MapApp.Models;


namespace MapApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly IPlaceRepository placeRepo;
        private readonly IUserRepository userRepo;

        public HomeController()
        {
            placeRepo = new PlaceRepository();
            userRepo = new UserRepository();
        }

        [Authorize]
        public ActionResult Index(string userName)
        {
            ApplicationUser user = userRepo.GetUser(userName ?? User.Identity.Name);

            if (user == null)
                return HttpNotFound();

            UserVM userVM = Mapper.MapUser(user);

            return View(userVM);
        }

        [HttpPost]
        public ActionResult RenderPlaces(string userName)
        {
            var places = placeRepo.GetPlaces(userName);

            return PartialView(places);
        }
    }
}
