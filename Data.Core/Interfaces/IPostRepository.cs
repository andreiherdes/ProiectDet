using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Core.Domain;

namespace Data.Core.Interfaces
{
    public interface IPostRepository
    {
        Task<List<Post>> GetPostsAsync();

        Task<Post> InsertPostAsync(Post post);

    }
}