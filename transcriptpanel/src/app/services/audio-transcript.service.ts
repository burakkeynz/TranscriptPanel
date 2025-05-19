import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AudioTranscript } from "../models/audio-transcript.model";
import { AudioTranscriptLog } from "../models/audio-transcript-log.model";
import { environment } from "../../environment/environment";
@Injectable({ providedIn: "root" })
export class AudioTranscriptService {
  private baseUrl = "http://localhost:5221/api/AudioTranscript";

  constructor(private http: HttpClient) {}

  getAll(): Observable<AudioTranscript[]> {
    return this.http.get<AudioTranscript[]>(this.baseUrl);
  }

  getById(id: number): Observable<AudioTranscript> {
    return this.http.get<AudioTranscript>(`${this.baseUrl}/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/AudioTranscript/${id}`);
  }

  updateTranscript(
    id: number,
    data: Partial<AudioTranscript>
  ): Observable<any> {
    console.log("Update reuqst:", id, data);
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  getTranscriptLogs() {
    return this.http.get<AudioTranscriptLog[]>(
      `${environment.apiUrl}/AudioTranscriptLog`
    );
  }
}
