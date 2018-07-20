using System;
using System.Collections.Generic;
using System.IO;
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

      //  [Authorize]
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

        [HttpPost]
        public ActionResult EditUser(UserVM model)
        {
            if (!ModelState.IsValid)
            {
                return View("Index", model);
            }

            ApplicationUser user = this.userRepo.GetUser(User.Identity.Name);

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Description = model.Description;

            if (model.UploadImageFile != null && model.UploadImageFile.ContentLength > 0)
            {
                string path = "/Images/Avatars/" + user.Id.ToString() +
                              Path.GetExtension(model.UploadImageFile.FileName);
                model.ImageUrl = path;
                string filePath = Path.Combine(Server.MapPath(path));
                model.UploadImageFile.SaveAs(filePath);
                user.ImageUrl = path;
            }
            else
            {
                model.ImageUrl = user.ImageUrl;
            }

            userRepo.EditUser(user);

            return PartialView("UserInfo", model);
        }
    }
}