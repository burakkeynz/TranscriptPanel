namespace TranscriptApi.Models
{
    public class AudioTranscriptLog
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty; // Örn: "Edited", "Viewed", "Deleted"
        public int TranscriptId { get; set; }
        public DateTime Timestamp { get; set; }
    }
}

