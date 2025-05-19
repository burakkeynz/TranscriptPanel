import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AudioTranscriptService } from '../../services/audio-transcript.service';
import { AudioTranscriptLog } from '../../models/audio-transcript-log.model';

@Component({
  selector: 'app-transcript-log',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h2>Transkript İşlem Logları</h2>
    <table *ngIf="logs.length > 0; else noLogs" class="log-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Kullanıcı</th>
          <th>İşlem</th>
          <th>Transkript ID</th>
          <th>Zaman</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let log of logs">
          <td>{{ log.id }}</td>
          <td>{{ log.username }}</td>
          <td>{{ log.action }}</td>
          <td>{{ log.transcriptId }}</td>
          <td>{{ log.timestamp | date:'short' }}</td>
        </tr>
      </tbody>
    </table>

    <ng-template #noLogs>
      <p>Henüz log kaydı bulunmamaktadır.</p>
    </ng-template>
  `,
  styles: [`
    .log-table {
      width: 100%;
      border-collapse: collapse;
    }
    .log-table th, .log-table td {
      border: 1px solid #ccc;
      padding: 8px;
    }
    .log-table th {
      background-color: #f0f0f0;
    }
  `]
})
export class TranscriptLogComponent implements OnInit {
  logs: AudioTranscriptLog[] = [];

  constructor(private transcriptService: AudioTranscriptService) {}

  ngOnInit(): void {
    this.transcriptService.getTranscriptLogs().subscribe({
      next: data => this.logs = data,
      error: err => console.error('Log verileri alınamadı:', err)
    });
  }
}

