import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioTranscriptService } from '../../services/audio-transcript.service';
import { AudioTranscript } from '../../models/audio-transcript.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transcript-editor',
  standalone: true,
  templateUrl: './transcript-editor.component.html',
  styleUrls: ['./transcript-editor.component.css'],
  imports: [CommonModule, FormsModule],
})
export class TranscriptEditorComponent implements OnInit {
  transcripts: AudioTranscript[] = [];
  selectedTranscript?: AudioTranscript;
  editedText: string = '';
  audioSrc: string = '';
  role: string | null = null;

  constructor(
    private transcriptService: AudioTranscriptService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.transcriptService.getAll().subscribe(data => {
      this.transcripts = data;
      console.log("Transcript verileri:", this.transcripts);
    });
    this.role = this.authService.getRoleFromToken();
  }

  canDelete(transcript: AudioTranscript): boolean {
    const role = this.authService.getRoleFromToken();
    const username = this.authService.getUsernameFromToken();
    return role === 'Admin' || transcript.uploadedBy === username;
  }

  selectTranscript(t: AudioTranscript): void {
    this.selectedTranscript = t;
    this.editedText = t.transcriptText;
    this.audioSrc = 'assets/' + t.fileName;
  }

  saveTranscript(): void {
    if (!this.selectedTranscript) return;
     const username = this.authService.getUsernameFromToken();
    this.transcriptService.updateTranscript(this.selectedTranscript.id, {
      id: this.selectedTranscript.id,
      fileName: this.selectedTranscript.fileName,
      transcriptText: this.editedText,
      uploadedAt: this.selectedTranscript.uploadedAt,
      uploadedBy: username ?? '',
      isEdited: true,
      lastEditedAt: new Date().toISOString()
    }).subscribe({
      next: () => {
        alert('Transkript güncellendi!');
        this.selectedTranscript!.transcriptText = this.editedText;
      },
      error: (err) => {
        alert('Güncelleme sırasında hata oluştu: ' + err.message);
      }
    });
  }

  deleteTranscript(id: number): void {
    if (!confirm('Bu transkripti silmek istediğinize emin misiniz?')) return;
       
    this.transcriptService.delete(id).subscribe({   
      next: () => {
        this.transcripts = this.transcripts.filter(t => t.id !== id);
        this.selectedTranscript = undefined;
        alert('Transkript silindi!');
      },
      error: () => {
        alert('Silme işlemi başarısız!');
      }
    });
  }
}

