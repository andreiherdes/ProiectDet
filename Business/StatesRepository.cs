using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Core.Domain;
using Data.Core.Interfaces;
using Data.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Business
{
    public class StatesRepository : IStatesRepository
    {
        private readonly DatabaseService _context;

        public StatesRepository(DatabaseService context)
        {
            _context = context;
        }

        public async Task<List<State>> GetStatesAsync()
        {
            return await _context.States.OrderBy(s => s.Abbreviation).ToListAsync();
        }
    }
}
