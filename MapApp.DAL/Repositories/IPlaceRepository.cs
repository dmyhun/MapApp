using System.Collections.Generic;
using MapApp.DAL.Models;

namespace MapApp.DAL.Repositories
{
    public interface IPlaceRepository
    {
        List<Place> GetPlaces(string userName);
        Place GetPlace(int id, string userName);
        Place AddPlace(Place place);
        void DeletePlace(int id, string userName);
    }
}
