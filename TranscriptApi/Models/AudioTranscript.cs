using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TranscriptApi.Models
{
    public class AudioTranscript
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FileName { get; set; } = string.Empty;

        [JsonPropertyName("transcriptText")]
        public string Transcript { get; set; } = string.Empty;

        [Required]
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        public string UploadedBy { get; set; } = string.Empty;

        public bool IsEdited { get; set; } = false;

        public DateTime? LastEditedAt { get; set; }
    }
}
