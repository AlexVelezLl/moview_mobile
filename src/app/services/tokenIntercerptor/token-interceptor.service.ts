import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.userService.getSessionToken()).pipe(
      switchMap((token) => {
        let tokenizedReq = req;
        if (token) {
          tokenizedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next.handle(tokenizedReq).pipe(
          tap(
            () => {},
            async (err: any) => {
              if (err.status === 401) {
                await this.userService.logout();
              }
            }
          )
        );
      })
    );
  }
}
