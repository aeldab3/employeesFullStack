using System.ComponentModel.DataAnnotations;

namespace Employee.API.Models
{
    public class Employee
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(80)]
        public string Name { get; set; }

        [MaxLength (80)]
        public string Email { get; set; }

        [MaxLength (30)]
        public string Phone { get; set; }

        public long Salary { get; set; }

        [MaxLength (50)]
        public string Department { get; set; }
    }
}