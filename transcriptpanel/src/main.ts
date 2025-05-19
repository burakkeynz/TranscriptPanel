import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";
import { provideHttpClient } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./app/interceptors/auth.interceptor";

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
