using EmployeeMangementSystem.Data;
using EmployeeMangementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeMangementSystem.Repository
{
    public class DepartmentRepository
    {
        private readonly AppDbContext _dbcontext;
        public DepartmentRepository(AppDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<Department>> GetDepartments()
        {
            return await _dbcontext.Departments.ToListAsync();
        }
        public async Task AddDepartment(Department department)
        {
            await _dbcontext.Departments.AddAsync(department);
            await _dbcontext.SaveChangesAsync();    
        }
    }
}
