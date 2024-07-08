using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExerionAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        [Column(TypeName = "varchar(100)")]
        public string Email { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Password { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string FirstName { get; set; }
        
        [Column(TypeName = "nvarchar(100)")]
        public string LastName { get; set; }


        [Column(TypeName = "nvarchar(100)")]
        public int Age { get; set; }


        [Column(TypeName = "nvarchar(100)")]
        public int Weight { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public int Height { get; set; }


        [Column(TypeName = "date")]
        public DateTime BirthDate { get; set; }
        public string? VerificationCode { get; set; }
        public bool IsVerified { get; set; }

    }
}
