import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '@core/http';
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated()) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: 'Token ' + localStorage.getItem('token')
        }
      });
      return next.handle(clonedRequest).pipe(catchError((error) => {
        if (error.status == 401) {
          this.router.navigateByUrl('auth/login')
        }
        throw Error()
      }));
    }
  }
}
