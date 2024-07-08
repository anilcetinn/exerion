using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExerionAPI.Models
{
    public class UserLoginModel
    {
        
        public string Email { get; set; }

       
        public string Password { get; set; }
    }
}
