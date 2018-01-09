using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Core.Domain;

namespace Data.Core.Interfaces
{
    public interface IPostRepository
    {
        Task<List<Post>> GetPostsAsync();
        Task<Post> GetPostAsync(int id);
        Task<Post> InsertPostAsync(Post post);
        Task<bool> UpdatePostAsync(Post post);
        Task<bool> DeletePostAsync(int id);
    }
}