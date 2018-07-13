using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MapApp.Models
{
    public class UserVM
    {
        public string Email { get; set; }
   
        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }
    }
}