import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RoleService } from '../../core/services/role.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const roleService = inject(RoleService);
  const router = inject(Router);

  const currentRole = roleService.getRole();
  const requiredRoles = route.data['roles'] as string[]; // Obtener roles requeridos de la ruta

  if (currentRole && requiredRoles && requiredRoles.includes(currentRole)) {
    return true; // El usuario tiene el rol necesario
  }

  // Si no está logueado o no tiene el rol, redirigir
  router.navigate(['/login']);
  return false;
};