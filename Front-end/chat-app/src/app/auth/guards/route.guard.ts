import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';

export const routeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);


  const expectedRole = route.data?.['expectedRole'];
  const userDetails = localStorage.getItem('userRole');
  const userRole = userDetails;
  console.log("uuuuuuuuuuuuuuuuuu",userRole)
  if (userRole === expectedRole) {
    return true;
  }

  // Redirect if role mismatch or no login
  // router.navigate(['/login']);
  snackBar.open('Forbidden: You don’t have permission.', 'Close', {
    duration: 3000,
    panelClass: ['error-snackbar']
  });
  return false;
};
