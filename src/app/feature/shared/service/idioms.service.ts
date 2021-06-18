import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";

const urlMapping = '/idioms';
const urlBase = environment.apiEndpoint;

@Injectable({
  providedIn: 'root',
})
export class IdiomsService {
  private urlApi = urlBase + urlMapping;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text' as 'json',
  };

  constructor(private http: HttpClient) {}

  async getIdioms(): Promise<any> {
    return await this.http
      .get<any>(this.urlApi, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // Error handling
  handleError(error) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
    } else {
    // Get server-side error
    errorMessage = error;
    }
    return throwError(errorMessage);
  }

}
