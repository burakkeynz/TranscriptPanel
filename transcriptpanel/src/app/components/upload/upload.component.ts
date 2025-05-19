import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  imports: [CommonModule, FormsModule],
})
export class UploadComponent {
  fileName = '';
  transcriptText = '';
  uploadSuccess = false;
  uploadError = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  submit() {
    const safeFileName = this.fileName.trim().replace(/assets\//g, '');

    const payload = {
      fileName: safeFileName,
      transcriptText: this.transcriptText, //fixed swagger part
      uploadedAt: new Date().toISOString(),
      uploadedBy: this.authService.getUsernameFromToken(),
      isEdited: false,
      lastEditedAt: new Date().toISOString(),
    };

    this.http
      .post('http://localhost:5221/api/AudioTranscript', payload)
      .subscribe({
        next: () => {
          this.uploadSuccess = true;
          this.uploadError = '';
          this.fileName = '';
          this.transcriptText = '';
        },
        error: (err) => {
          this.uploadError = 'Yükleme başarısız: ' + err.message;
          this.uploadSuccess = false;
        },
      });
  }
}
