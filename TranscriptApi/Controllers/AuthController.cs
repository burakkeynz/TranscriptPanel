using Microsoft.AspNetCore.Mvc;
using TranscriptApi.Models;
using TranscriptApi.Data;
using TranscriptApi.Services;
using TranscriptApi.DTOs;
namespace TranscriptApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            var userExists = _context.Users.Any(u => u.Username == request.Username);
            if (userExists)
            {
                return BadRequest(new { message = "Bu kullanıcı adı zaten kullanılıyor." });
            }

            var user = new User
            {
                Username = request.Username,
                Password = request.Password, // İleride hashlenmeli
                Role = request.Role
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "Kayıt başarılı" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] DTOs.LoginRequest request)
        {
            var user = _context.Users.FirstOrDefault(u =>
                u.Username == request.Username && u.Password == request.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Kullanıcı adı veya şifre hatalı" });
            }

            var token = _tokenService.CreateToken(user);
            return Ok(new { message = "Giriş başarılı", token = token, role = user.Role });
        }
    }
}

