using EmployeeMangementSystem.Models;
using EmployeeMangementSystem.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeMangementSystem.Data;

namespace EmployeeMangementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        public UserController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> UserList()
        {
           var user = await _userRepository.GetUsers();
            return Ok(user);
        }
        [HttpPost]
        public User Login([FromBody] LoginRequest loginModel)
        {
            var result = _userRepository.login(loginModel);
            return result;
        }

        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser(User user)
        {
            await _userRepository.AddUser(user);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            await _userRepository.UpdateUser(id, user);
            return Ok(user);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userRepository.DeleteUser(id);
            return Ok(id);
        }

        
    }
}
