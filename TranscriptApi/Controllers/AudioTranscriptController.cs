using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TranscriptApi.Data;
using TranscriptApi.Models;
using System.Security.Claims;

namespace TranscriptApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AudioTranscriptController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AudioTranscriptController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<AudioTranscript>>> GetAll()
        {
            return await _context.AudioTranscripts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AudioTranscript>> GetById(int id)
        {
            var transcript = await _context.AudioTranscripts.FindAsync(id);
            if (transcript == null)
                return NotFound();

            var username = User.Identity?.Name ?? "unknown";


            _context.AudioTranscriptLogs.Add(new AudioTranscriptLog
            {
                Username = username,
                Action = "Viewed",
                TranscriptId = id,
                Timestamp = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return transcript;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AudioTranscript updated)
        {
            var existing = await _context.AudioTranscripts.FindAsync(id);
            if (existing == null)
                return NotFound();

          var username = User.Identity?.Name ?? "unknown";
            existing.Transcript = updated.Transcript;
            existing.IsEdited = true;
            existing.LastEditedAt = DateTime.UtcNow;

            _context.AudioTranscriptLogs.Add(new AudioTranscriptLog
            {
                Username = username,
                Action = "Edited",
                TranscriptId = id,
                Timestamp = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Create(AudioTranscript newTranscript)
        {
           var username = User.Identity?.Name ?? "unknown";


            newTranscript.UploadedBy = username;
            _context.AudioTranscripts.Add(newTranscript);
            await _context.SaveChangesAsync();

            _context.AudioTranscriptLogs.Add(new AudioTranscriptLog
            {
                Username = username,
                Action = "Created",
                TranscriptId = newTranscript.Id,
                Timestamp = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = newTranscript.Id }, newTranscript);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var transcript = await _context.AudioTranscripts.FindAsync(id);
            if (transcript == null)
                return NotFound();

            var username = User.Identity?.Name ?? "unknown";
            _context.AudioTranscripts.Remove(transcript);

            _context.AudioTranscriptLogs.Add(new AudioTranscriptLog
            {
                Username = username,
                Action = "Deleted",
                TranscriptId = transcript.Id,
                Timestamp = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
