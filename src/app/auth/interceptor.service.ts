import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {UserAuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
// Must implement the HttpInterceptor Interface!
export class InterceptorService implements HttpInterceptor {
  constructor(private userAuthService: UserAuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(req.headers.get("No-Auth") === "True") {
      return next.handle(req.clone());
    }
    const token = this.userAuthService.getToken();

    // HttpHandler to clone our Request Object and append a token to the header
    return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })).pipe(
      catchError(
        (err:HttpErrorResponse) => {
          console.log(err.status);
          if(err.status === 401) {
            this.router.navigate(["/login"]);
          } else if(err.status === 403) {
            this.router.navigate(["/forbidden"]);
          }
         return throwError("Something is wrong");
        }
      )
    );
  }
}
