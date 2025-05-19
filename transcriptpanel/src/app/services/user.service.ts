import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:5221/api/User';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(this.baseUrl);
  }

  addUser(user: { username: string; password: string; role: string }) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(id: number, user: { username: string; password: string; role: string }) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

