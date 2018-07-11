using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MapApp.Models;
using MapApp.Repositories;

namespace MapApp.Controllers
{
    public class MapController : ApiController
    {
        MapRepository repo;

        public MapController()
        {
            repo = new MapRepository();
        }

        public IEnumerable<Marker> GetMarkers()
        { 
            return repo.GetMarkers();
        }

        public Marker GetMarker(int id)
        {
            return repo.GetMarker(id);
        }

        
        public Marker Post([FromBody]Marker marker)
        {
            return repo.AddMarker(marker);
        }
    }
}
