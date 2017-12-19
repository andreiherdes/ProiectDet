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
            return await _context.Posts.OrderBy(p => p.FirstName).ToListAsync();
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
    }
}
