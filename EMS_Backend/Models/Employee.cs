using System.ComponentModel.DataAnnotations;

namespace EmployeeMangementSystem.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string ContactNo { get; set; }
        public required string Email { get; set; }
        public required string Dept { get; set; }
        public string? Gender { get; set; }
    }
}
