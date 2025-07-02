
# TranscriptPanel - Transcription Management Application

TranscriptPanel is a simple yet functional panel for managing audio file transcriptions. Users (Admin and Editor) can listen to audio files, edit transcription texts, and all actions performed in the system are logged. This project was developed as a mini case study for the internship process at Çizgi Teknoloji.

----

## Technologies Used

**Backend:** ASP.NET Core Web API  
**Frontend:** Angular  
**Veritabanı:** Microsoft SQL Server (MSSQL)  
**Authentication:** JWT (JSON Web Token)  
**UI Design:** Bootstrap  
**GDevelopment Environment:** Docker (for MSSQL)

----

## User Roles and Permissions

**Admin**
-Can view all users, add new users, or delete users.
-Can edit all transcriptions.
-Can monitor all operations through the log screen.

**Editor**
-Can edit only their own uploaded transcriptions.
-Can add new transcriptions.
-Can view other users’ transcriptions but cannot edit them.

> Note: The registration screen only allows new users to sign up as Editors. Admin users are predefined in the system by default.

----

## Features

**1. JWT Authentication**  
-Users log into the system with token-based authentication.
-The sub value in the token represents the username, and the role value represents the user’s role.

**2. Audio and Transcription Management**  
-Audio files are stored under the assets folder on the Angular side.
-Users can upload transcriptions by entering the audio file name.
-Audio playback is available, and transcription text can be edited and saved.

**3. Logging System**  
-All Created, Edited, Deleted, and Viewed operations are logged.
-Admin can monitor these logs through the log panel.

**4. Admin Panel**  
-Enables adding and deleting users.
-Displays the list of existing users.
-Shows all user activities (logs).

----

## Setup Instructions

### MSSQL Docker Setup

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=StrongP@ssw0rd123" \
-p 1433:1433 --name transcript-sql \
-d mcr.microsoft.com/mssql/server:2019-latest
```

> Alternatively, you can install MSSQL locally and use the same connection string.

### Backend (TranscriptApi)

```bash
cd TranscriptApi
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend (Angular - transcriptpanel)

```bash
cd transcriptpanel
npm install
ng serve
```

----

## Örnek Test Kullanıcıları

```json
{
  "username": "admin",
  "password": "123456",
  "role": "Admin"
},
{
  "username": "editor1",
  "password": "editor123",
  "role": "Editor"
}
```

----

## Test Files

-The src/assets folder includes 3 preloaded MP3 files:
-Metallica-Whiskey-In-The-Jar.mp3
-Metallica-Sad-But-True.mp3
-Metallica-Fade-To-Black.mp3
-When uploading a transcription, simply enter the audio file name. Example: Metallica-Sad-But-True.mp3
-If the file does not exist in the assets folder, only the transcription record is created, and the audio cannot be played.
-If you enter a matching filename, the audio file will also be playable.

----

## sample-transcript.json

A sample transcription record is included in the sample-transcript.json file shipped with the project. It can be used for testing purposes.
----

## Security Note

The connection string used in AppDbContextFactory.cs is left as dummy data. My real Docker MSSQL credentials are not shared for security reasons; however, I can demonstrate the project on a live environment during the presentation.

