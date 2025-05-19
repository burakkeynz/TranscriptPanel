
# TranscriptPanel - Transkripsiyon Yönetim Uygulaması

TranscriptPanel, ses dosyalarının transkriptlerinin yönetilebildiği basit ve işlevsel bir paneldir. Kullanıcılar (Admin ve Editor) sesleri dinleyebilir, metinleri düzenleyebilir ve sistem üzerinden yapılan tüm işlemler loglanır.

----

## Kullanılan Teknolojiler

**Backend:** ASP.NET Core Web API  
**Frontend:** Angular  
**Veritabanı:** Microsoft SQL Server (MSSQL)  
**Authentication:** JWT (JSON Web Token)  
**Tasarım:** Bootstrap  
**Geliştirme Ortamı:** Docker (MSSQL için)

----

## Kullanıcı Rolleri ve Yetkileri

**Admin**
- Tüm kullanıcıları görebilir, yeni kullanıcı ekleyebilir veya silebilir.
- Tüm transkriptler üzerinde düzenleme yapabilir.
- Yapılan işlemleri log ekranından izleyebilir.

**Editor**
- Sadece kendi yüklediği transkriptler üzerinde düzenleme yapabilir.
- Yeni transkript ekleyebilir.
- Başka kullanıcıların transkriptlerini görebilir ancak düzenleyemez.

> Not: Register (kayıt ol) ekranı sadece Editor rolüyle kayıt alınmasına izin verir. Admin kullanıcılar varsayılan olarak sistemde tanımlıdır.

----

## Özellikler

**1. JWT Authentication**  
- Kullanıcılar sisteme token tabanlı giriş yapar.  
- Token içindeki `sub` değeri kullanıcı adını, `role` değeri kullanıcı rolünü belirtir.

**2. Ses ve Transkript Yönetimi**  
- Ses dosyaları Angular tarafında `assets` klasöründe tutulur.  
- Kullanıcılar dosya adını girerek transkript yükleyebilir.  
- Ses dosyası oynatılabilir, transkript metni düzenlenip kaydedilebilir.

**3. Loglama Sistemi**  
- Her `Created`, `Edited`, `Deleted`, `Viewed` işlemi loglanır.  
- Admin, bu işlemleri log panelinden takip edebilir.

**4. Admin Paneli**  
- Kullanıcı ekleme, silme işlemleri yapılabilir.  
- Mevcut kullanıcı listesi görüntülenir.  
- Tüm kullanıcı aktiviteleri (loglar) görüntülenebilir.

----

## Kurulum Adımları

### MSSQL Docker Kurulumu

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=StrongP@ssw0rd123" \
-p 1433:1433 --name transcript-sql \
-d mcr.microsoft.com/mssql/server:2019-latest
```

> Alternatif olarak MSSQL’i lokalinize kurabilir, aynı connection string’i kullanabilirsiniz.

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

## Test Dosyaları

- `src/assets` klasöründe 3 adet MP3 dosyası önceden yüklenmiş olarak gelir:
  - Metallica-Whiskey-In-The-Jar.mp3
  - Metallica-Sad-But-True.mp3
  - Metallica-Fade-To-Black.mp3

- Sisteme transkript yüklerken yalnızca dosya adını girmeniz yeterlidir. Örnek: `Metallica-Sad-But-True.mp3`
- Eğer dosya `assets` klasöründe yoksa sadece transkript bilgisi oluşur, ses oynatılamaz.
- Uyumlu bir isim girilirse ses dosyası da çalınabilir.

----

## sample-transcript.json

Projeyle birlikte gelen `sample-transcript.json` dosyasında örnek bir transkript kaydı yer almaktadır. Test amaçlı kullanılabilir.

----

## Güvenlik Notu

`AppDbContextFactory.cs` içerisinde kullanılan connection string dummy veri ile bırakılmıştır. Gerçek Docker MSSQL bilgilerim güvenlik nedeniyle paylaşılmamıştır ancak proje sunumu sırasında size canlı ortam üzerinden gösterebilirim.

