export interface AudioTranscript {
  id: number;
  fileName: string;
  transcriptText: string;
  uploadedAt: string;
  uploadedBy: string;
  isEdited: boolean;
  lastEditedAt: string | null;
}

