using System.Collections.Generic;
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
        public void DeletePlace(int placeId)
        {
            Place place = repo.GetPlace(placeId);
            if (place != null)
            {
                repo.DeletePlace(placeId);
            }
        }
    }
}