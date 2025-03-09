using EmployeeMangementSystem.Models;
using EmployeeMangementSystem.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeMangementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentRepository _departmentRepository;

        public DepartmentController(DepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> DepartmentList()
        {
            var department = await _departmentRepository.GetDepartments();
            return Ok(department);
        }
        [HttpPost("AddDepartment")]
        public async Task<IActionResult> AddDepartment(Department department)
        {
            await _departmentRepository.AddDepartment(department);
            return Ok(department);
        }
    }
}
