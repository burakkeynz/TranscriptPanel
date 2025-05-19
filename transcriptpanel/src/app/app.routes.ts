import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard'; // KÖŞELİ PARANTEZ HATASI VARDI!
import { TranscriptEditorComponent } from './components/transcript-editor/transcript-editor.component';
import { TranscriptLogComponent } from './components/transcript-log/transcript-log.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/transcript-editor/transcript-editor.component').then(
        (m) => m.TranscriptEditorComponent
      ),
  },
  { path: 'logs', component: TranscriptLogComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  {
    path: 'admin-panel',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' },
    loadComponent: () =>
      import('./components/admin-panel/admin-panel.component').then(
        (m) => m.AdminPanelComponent
      ),
  },
  {
    path: 'admin/logs',
    loadComponent: () =>
      import('./components/transcript-log/transcript-log.component').then(
        (m) => m.TranscriptLogComponent
      ),
  },

  {
    path: 'upload',
    canActivate: [AuthGuard], // sadece giriş yapmış olanlar yükleyebilir
    loadComponent: () =>
      import('./components/upload/upload.component').then(
        (m) => m.UploadComponent
      ),
  },
];
