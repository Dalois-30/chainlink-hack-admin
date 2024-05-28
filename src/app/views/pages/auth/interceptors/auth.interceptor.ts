import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { state } from '@angular/animations';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLoggedIn = this._authService.isAuthenticated();

    if (!isLoggedIn) {
      this._router.navigate(['/auth'])
    }
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.token}`
      },
      withCredentials: false
    });

    return next.handle(req);
  }
}