import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";

const urlMapping = '/talk';
const urlBase = environment.apiEndpoint;

@Injectable({
  providedIn: 'root',
})
export class TalkService {
  private urlApi = urlBase + urlMapping;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text' as 'json',
  };

  constructor(private http: HttpClient) {}

  async getMessageGreeting(idiom: string): Promise<any> {
      return this.http
        .get<any>(this.urlApi + '/greet/' + idiom, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError))
        .toPromise();
  }

  async getMessageName(idiom: string): Promise<any> {
    return this.http
      .get<any>(this.urlApi + '/name/' + idiom, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  async getMessageGoodBye(idiom: string): Promise<any> {
    return this.http
      .get<any>(this.urlApi + '/goodbye/' + idiom, this.httpOptions)
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
