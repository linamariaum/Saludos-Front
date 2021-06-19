import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Alert } from '../model/alert';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req;
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500 || error.status === 504) {
            // Error Interno del Servidor
            Alert.mostrarAlertError('Alerta','No se encuentra el servidor.');
          }
          return throwError(error);
        })
    );
  }
}
