using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MapApp.DAL.Models;

namespace MapApp.DAL.Repositories
{
    public class PlaceRepository : IPlaceRepository
    {
        string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public List<Place> GetPlaces()
        {
            List<Place> places = new List<Place>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                places = db.Query<Place>("SELECT * FROM Places").ToList();
            }

            return places;
        }

        public Place GetPlace(int id)
        {
            Place place = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                place = db.Query<Place>("SELECT * FROM Places WHERE Id = @id", new {id})
                    .FirstOrDefault();
            }

            return place;
        }

        public Place AddPlace(Place place)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery =
                    "INSERT INTO Places (GooglePlaceId, Name, Address, PhoneNumber, ImgUrl) VALUES(@GooglePlaceId, @Name, @Address, @PhoneNumber, @ImgUrl); SELECT CAST(SCOPE_IDENTITY() as int)";
                int placeId = db.Query<int>(sqlQuery, place).FirstOrDefault();
                place.Id = placeId;
            }

            return place;
        }

        public void DeletePlace(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "DELETE FROM Places WHERE Id = @id";
                db.Execute(sqlQuery, new {Id = id});
            }
        }
    }
}
