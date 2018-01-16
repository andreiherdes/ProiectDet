using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Core.Domain;

namespace Data.Core.Interfaces
{
    public interface IStatesRepository
    {
        Task<List<State>> GetStatesAsync();
    }
}