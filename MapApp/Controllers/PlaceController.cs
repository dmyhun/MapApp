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

        public IEnumerable<Place> GetPlaces()
        {
            return repo.GetPlaces();
        }

        public Place GetPlace(int id)
        {
            return repo.GetPlace(id);
        }

        [HttpPost]
        public Place AddPlace([FromBody] Place place)
        {
            return repo.AddPlace(place);
        }

        [HttpDelete]
        public void DeletePlace(int id)
        {
            Place place = repo.GetPlace(id);
            if (place != null)
            {
                repo.DeletePlace(id);
            }
        }
    }
}