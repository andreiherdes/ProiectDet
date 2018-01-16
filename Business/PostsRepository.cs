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
    public class PostsRepository : IPostRepository
    {
        private readonly DatabaseService _context;
        private readonly ILogger _logger;

        public PostsRepository(DatabaseService context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("PostRepository");
        }

        public async Task<List<Post>> GetPostsAsync()
        {
            return await _context.Posts.OrderByDescending(p => p.Id).ToListAsync();
        }

        public async Task<List<Post>> GetPostsAsync(string location)
        { 
            return await _context.Posts.Where(p => p.City.ToLower().Equals(location.ToLower())).OrderByDescending(p => p.Id).ToListAsync();
        }

        public async Task<Post> GetPostAsync(int id)
        {
            return await _context.Posts
                .SingleOrDefaultAsync(c => c.UserId == id);
        }

        public async Task<Post> InsertPostAsync(Post post)
        {
            _context.Add(post);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception exp)
            {
                _logger.LogError($"Error in {nameof(InsertPostAsync)}: " + exp.Message);
                return null;
            }

            return post;
        }

        public async Task<bool> DeletePostAsync(int id)
        {
            var post = await _context.Posts
                .SingleOrDefaultAsync(p => p.Id == id);
            _context.Remove(post);
            try
            {
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception exp)
            {
                _logger.LogError($"Error in {nameof(DeletePostAsync)}: " + exp.Message);
            }
            return false;
        }

    }
}
