using System.Collections.Generic;
using System.Data;
using System.Web.Http;
using MapApp.DAL.Models;
using MapApp.DAL.Repositories;

namespace MapApp.Controllers
{
    public class PlaceController : ApiController
    {
        private readonly IPlaceRepository repo;

        public PlaceController()
        {
            repo = new PlaceRepository();
        }

        public IEnumerable<Place> GetPlaces(string userName)
        {
            return repo.GetPlaces(userName);
        }

        public Place GetPlace(int id, string userName)
        {
            return repo.GetPlace(id, userName);
        }

        [HttpPost]
        public Place AddPlace([FromBody] Place place)
        {
            return repo.AddPlace(place);
        }

        [HttpDelete]
        public void DeletePlace(int id, string userName)
        {
            Place place = repo.GetPlace(id, userName);
            if (place != null)
            {
                repo.DeletePlace(id, userName);
            }
        }
    }
}