import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'usuario', password: 'usuario123', role: 'usuario' },
  ];

  authenticate(username: string, password: string): string | null {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    return user ? user.role : null;
  }
}