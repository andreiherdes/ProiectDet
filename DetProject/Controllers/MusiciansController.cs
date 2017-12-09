using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data.Core.Domain;
using Data.Persistence;

namespace DetProject.Controllers
{
    [Produces("application/json")]
    [Route("api/Musicians")]
    public class MusiciansController : Controller
    {
        private readonly DatabaseService _context;

        public MusiciansController(DatabaseService context)
        {
            _context = context;
        }

        // GET: api/Musicians
        [HttpGet]
        public IEnumerable<Musician> GetMusicians()
        {
            return _context.Musicians;
        }

        // GET: api/Musicians/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMusician([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var musician = await _context.Musicians.SingleOrDefaultAsync(m => m.Id == id);

            if (musician == null)
            {
                return NotFound();
            }

            return Ok(musician);
        }

        // PUT: api/Musicians/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMusician([FromRoute] Guid id, [FromBody] Musician musician)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != musician.Id)
            {
                return BadRequest();
            }

            _context.Entry(musician).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MusicianExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Musicians
        [HttpPost]
        public async Task<IActionResult> PostMusician([FromBody] Musician musician)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Musicians.Add(musician);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMusician", new { id = musician.Id }, musician);
        }

        // DELETE: api/Musicians/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMusician([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var musician = await _context.Musicians.SingleOrDefaultAsync(m => m.Id == id);
            if (musician == null)
            {
                return NotFound();
            }

            _context.Musicians.Remove(musician);
            await _context.SaveChangesAsync();

            return Ok(musician);
        }

        private bool MusicianExists(Guid id)
        {
            return _context.Musicians.Any(e => e.Id == id);
        }
    }
}