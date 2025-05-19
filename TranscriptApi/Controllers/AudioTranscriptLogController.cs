using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TranscriptApi.Data;
using TranscriptApi.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace TranscriptApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AudioTranscriptLogController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AudioTranscriptLogController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/AudioTranscriptLog
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AudioTranscriptLog>>> GetLogs()
        {
            return await _context.AudioTranscriptLogs
                .OrderByDescending(log => log.Timestamp)
                .ToListAsync();
        }

        // GET: api/AudioTranscriptLog/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AudioTranscriptLog>> GetLog(int id)
        {
            var log = await _context.AudioTranscriptLogs.FindAsync(id);

            if (log == null)
            {
                return NotFound();
            }

            return log;
        }
    }
}

