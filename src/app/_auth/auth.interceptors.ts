import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

 @Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private userService: UserAuthService,
        private router: Router) {}
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable <HttpEvent<any>> {
            if(req.headers.get('NO-Auth') === 'True'){
                return next.handle(req.clone());
            }
            const token=this.userService.getToken();
            req=this.addToken(req, token);

            return next.handle(req).pipe(
                catchError(
                    (err: HttpErrorResponse) =>{
                        console.log(err.status);
                        if(err.status ===401){
                            this.router.navigate(['/login']);

                        }else if(err.status === 403){
                            this.router.navigate(['/forbidden']);

                        }
                        return throwError("Some thing is wrong");
                    }
                )
            )
    }
    private addToken(request:HttpRequest<any>,token: string){
      return request.clone(
          {
              setHeaders: {
                  Authorization : `Bearer &{token}`
              }
          }
      ) 
    }
    
}