// src/app/core/services/role.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private role: string = '';

  setRole(role: string) {
    this.role = role;
  }

  getRole(): string {
    return this.role;
  }
}
