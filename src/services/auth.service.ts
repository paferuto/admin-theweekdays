import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { FormatService } from './format.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private errorHandlingService: ErrorHandlingService, private api: FormatService) { }

  // login
  login(account_info: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.post<any>(this.api.api_path + "/v1/account/login/admin", JSON.stringify(account_info), requestOptions).pipe(
      map(res => JSON.parse(res)),
      catchError((error) => {
        // this.errorHandlingService.handleError(error);
        return throwError(error);
      })
    )
  }

  // auth
  auth(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(this.api.api_path + "/v1/account/adminauth", requestOptions).pipe(
      map(res => JSON.parse(res)),
      catchError((error) => {
        this.errorHandlingService.handleError(error);
        return throwError(error);
      })
    )
  }

  // logout
  logout(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.post<any>(this.api.api_path + "/v1/account/signout", requestOptions).pipe(
      catchError((error) => {
        // this.errorHandlingService.handleError(error);
        return throwError(error);
      })
    )
  }
}
