using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Core.Domain;
using Data.Core.Interfaces;
using Data.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Business
{
    public class UsersRepository: IUserRepository
    {
        private readonly DatabaseService _context;
        private readonly ILogger _logger;

        public UsersRepository(DatabaseService context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("UserRepository");
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _context.Users.OrderBy(c => c.UserName).ToListAsync();
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> InsertUserAsync(User user)
        {
            _context.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception exp)
            {
                _logger.LogError($"Error in {nameof(InsertUserAsync)}: " + exp.Message);
                return null;
            }

            return user;
        }
    }
}