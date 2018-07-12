using System.Collections.Generic;
using MapApp.DAL.Models;

namespace MapApp.DAL.Repositories
{
    public interface IPlaceRepository
    {
        List<Place> GetPlaces();
        Place GetPlace(int id);
        Place AddPlace(Place place);
        void DeletePlace(int placeId);
    }
}
