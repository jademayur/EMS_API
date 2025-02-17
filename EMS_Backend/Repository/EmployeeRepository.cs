using EmployeeMangementSystem.Data;
using EmployeeMangementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeMangementSystem.Repository
{
    public class EmployeeRepository 
    {
        private readonly  AppDbContext _appDbContext;
        public EmployeeRepository(AppDbContext appDbContext ) 
        {
           this._appDbContext = appDbContext;
        }

        public async Task<List<Employee>> GetEmployees()
        {
            return await _appDbContext.Employees.ToListAsync();
        }

        public async Task AddEmployee(Employee employee)
        { 
            await _appDbContext.Employees.AddAsync( employee );
            await _appDbContext.SaveChangesAsync();

        }

        public async Task UpdateEmployee(int id, Employee   employee)
        {
            var existingEmp = await _appDbContext.Employees.FindAsync(id);
            if (existingEmp == null)
            {
                throw new Exception("Employee not found");
            }
            existingEmp.Name = employee.Name;
            existingEmp.ContactNo = employee.ContactNo;
            existingEmp.Email = employee.Email;
            existingEmp.Dept = employee.Dept;
            existingEmp.Gender = employee.Gender;

            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteEmployee(int id)
        {
            var existingEmp = await _appDbContext.Employees.FindAsync(id);
            if (existingEmp == null)
            {
                throw new Exception("Employee not found");
            }
            _appDbContext.Employees.Remove(existingEmp);
            await _appDbContext.SaveChangesAsync();
        }


    }
}
