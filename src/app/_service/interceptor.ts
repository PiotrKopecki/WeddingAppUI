import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor () {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.skipInterceptor(request)){
            request = request.clone({
                      setHeaders: {
                          'access-control-allow-origin': '*'
                      }
                  });
            return next.handle(request);
        }

        request = request.clone({
            setHeaders: {
                'access-control-allow-origin': '*'
            }
        });

        return next.handle(request).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
              const errorMsg = this.handleError(errorResponse);
              return throwError(() => new Error(errorMsg));
            })
        )
    }
    
    skipInterceptor(request: HttpRequest<any>): boolean{
        if(!request.url.startsWith('http')){
          return true;
        }
        return false;
    }

    handleError(error: HttpErrorResponse) : string{
        let errorMsg = '';
        if(error.error instanceof ErrorEvent){
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        }else{
          console.log('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        alert("Something went wrong..");
        return errorMsg;
    }
}