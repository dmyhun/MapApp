using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MapApp.DAL.Models
{
    public class Place
    {
        public int Id { get; set; }
        public string GooglePlaceId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string ImgUrl { get; set; }
    }
}
