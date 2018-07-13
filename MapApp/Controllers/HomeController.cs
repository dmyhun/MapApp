using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MapApp.DAL.Models;
using MapApp.DAL.Repositories;

namespace MapApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly IPlaceRepository repo;

        public HomeController()
        {
            repo = new PlaceRepository();
        }

        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult RenderPlaces()
        {
            var places = repo.GetPlaces();

            return PartialView(places);
        }
    }
}
