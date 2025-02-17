using EmployeeMangementSystem.Models;
using EmployeeMangementSystem.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeMangementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository _employeesRepository;

        public EmployeeController(EmployeeRepository employeeRepository)
        {
            _employeesRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> EmployeeList()
        {
            var emp = await _employeesRepository.GetEmployees();
            return Ok(emp);
        }
        [HttpPost]
        public async Task<IActionResult> AddEmployee(Employee employee)
        {
            await _employeesRepository.AddEmployee(employee);
            return Ok(employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            await _employeesRepository.UpdateEmployee(id, employee);
            return Ok(employee);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            await _employeesRepository.DeleteEmployee(id);
            return Ok(id);
        }

    }
}
