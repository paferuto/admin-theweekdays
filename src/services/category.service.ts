import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  // get all categories
  getCategories(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/v1/category", requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // get category by category object id
  getCategoryById(id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(`/v1/category/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // post category
  postCategory(category: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.post<any>("/v1/category", JSON.stringify(category), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // update a category by category object id
  updateCategory(id: string, category: any): Observable<any> {
    const header = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: header,
      responseType: "text"
    }
    return this._http.put<any>(`/v1/category/${id}`, JSON.stringify(category), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // handle error
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
