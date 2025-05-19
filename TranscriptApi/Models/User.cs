namespace TranscriptApi.Models
{
    public class User
    {
        public int Id { get; set; }  // Primary key
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = "Editor"; // Default: Editor
    }
}

