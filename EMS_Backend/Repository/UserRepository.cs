using EmployeeMangementSystem.Data;
using EmployeeMangementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeMangementSystem.Repository
{
    public class UserRepository
    {
        private readonly AppDbContext _dbcontext;
        public UserRepository(AppDbContext appDbContext)
        {
            this._dbcontext = appDbContext;
        }

        public async Task<List<User>> GetUsers()
        {
            return await _dbcontext.Users.ToListAsync();
        }


        public async Task AddUser(User user)
        {
            await _dbcontext.Users.AddAsync(user);
            await _dbcontext.SaveChangesAsync();

        }

        public async Task UpdateUser(int id, User user)
        {
            var existingUser = await _dbcontext.Users.FindAsync(id);
            if (existingUser == null)
            {
                throw new Exception("User not found");
            }
            existingUser.Name = user.Name;
            existingUser.Mobile = user.Mobile;
            existingUser.Email = user.Email;
            existingUser.Password = user.Password;
            existingUser.Role = user.Role;

            await _dbcontext.SaveChangesAsync();
        }

        public async Task DeleteUser(int id)
        {
            var existingUser = await _dbcontext.Users.FindAsync(id);
            if (existingUser == null)
            {
                throw new Exception("User not found");
            }
            _dbcontext.Users.Remove(existingUser);
            await _dbcontext.SaveChangesAsync();
        }
        
        public  User  login(LoginRequest loginRequest)
        {
            var user =  _dbcontext.Users.FirstOrDefault(x => x.Email == loginRequest.UserName && x.Password == loginRequest.Password);
            if (user == null)
            {
                //return null;
                throw new Exception("User not found");
            }
            return user;
        }

       
    }
}
