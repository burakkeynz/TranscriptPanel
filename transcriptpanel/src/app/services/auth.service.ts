import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { BehaviorSubject, tap } from "rxjs";

export interface LoginResponse {
  message: string;
  token: string;
  role: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/Auth`;
  public userChanged = new BehaviorSubject<void>(undefined); // 🔁 Login/logout sonrası tetikleyici

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          this.saveToken(res.token);
          this.userChanged.next(); // 🎯 Token güncellendiğini bildir
        })
      );
  }

  register(data: { username: string; password: string; role: string }) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return (
        payload?.sub ||
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
        null
      );
    } catch {
      return null;
    }
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return (
        payload?.role ||
        payload[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] ||
        null
      );
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.userChanged.next(); // 🎯 Logout sonrası da bildir
  }
}
