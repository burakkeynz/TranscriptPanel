using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TranscriptApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SecureController : ControllerBase
    {
        [Authorize]
        [HttpGet("protected")]
        public IActionResult GetProtectedData()
        {
            return Ok(new
            {
                message = "✅ Bu endpoint'e sadece JWT token ile erişilebiliyor!",
                user = User.Identity?.Name
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public IActionResult GetAdminOnlyData()
        {
            return Ok(new
            {
                message = "🔐 Bu endpoint'e sadece Admin rolüne sahip kullanıcılar erişebilir!",
                user = User.Identity?.Name
            });
        }
    }
}

