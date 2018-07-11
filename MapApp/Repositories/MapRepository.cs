using Dapper;
using MapApp.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MapApp.Repositories
{
    public class MapRepository
    {
        string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public List<Marker> GetMarkers()
        {
            List<Marker> markers = new List<Marker>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                markers = db.Query<Marker>("SELECT * FROM Markers").ToList();
            }
            return markers;
        }

        public Marker GetMarker(int id)
        {
            Marker user = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                user = db.Query<Marker>("SELECT * FROM Markers WHERE Id = @id", new { id }).FirstOrDefault();
            }
            return user;
        }

        public Marker AddMarker(Marker marker)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO Markers (Name, Address, Lat, Lng, Type) VALUES(@Name, @Address, @Lat, @Lng, @Type); SELECT CAST(SCOPE_IDENTITY() as int)";
                int markerId = db.Query<int>(sqlQuery, marker).FirstOrDefault();
                marker.Id = markerId;
            }
            return marker;
        }
    }
}