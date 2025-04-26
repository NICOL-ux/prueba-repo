import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private currentRole: string | null = null;

  setRole(role: string) {
    this.currentRole = role;
    localStorage.setItem('role', role); // Persistencia en localStorage
  }

  getRole(): string | null {
    return this.currentRole || localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getRole();
  }

  clearRole(): void {
    this.currentRole = null;
    localStorage.removeItem('role');
  }
}