// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private roleService: RoleService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const currentRole = this.roleService.getRole();

    if (expectedRoles.includes(currentRole)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
