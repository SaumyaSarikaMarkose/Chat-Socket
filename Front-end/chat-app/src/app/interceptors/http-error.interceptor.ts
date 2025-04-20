import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar); // Inject the MatSnackBar service

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);

      if (error.status === 401) {
        snackBar.open('Unauthorized: Please log in again.', 'Close', {
          duration: 3000, // Snackbar will disappear after 3 seconds
          panelClass: ['error-snackbar']
        });
        router.navigate(['/login']);
      } else if (error.status === 403) {
        snackBar.open('Forbidden: You don’t have permission.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } else if (error.status === 500) {
        snackBar.open('Server error. Please try again later.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } else {
        snackBar.open(error?.error?.message || 'Something went wrong.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }

      return throwError(() => error);
    })
  );
};