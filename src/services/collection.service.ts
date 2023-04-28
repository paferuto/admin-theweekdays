import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private _http: HttpClient) { }

  // get lookbook by id
  // getLookbookById(id: string): Observable<any> {
  //   const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
  //   const requestOptions: Object = {
  //     headers: headers,
  //     responseType: "text"
  //   }
  //   return this._http.get<any>(`/v1/lookbook/${id}`, requestOptions).pipe(
  //     map(res => JSON.parse(res)),
  //     retry(3),
  //     catchError(this.handleError))
  // }

  // get all lookbook
  // getLookbooks(): Observable<any> {
  //   const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
  //   const requestOptions: Object = {
  //     headers: headers,
  //     responseType: "text"
  //   }
  //   return this._http.get<any>("/v1/lookbook", requestOptions).pipe(
  //     map(res => JSON.parse(res)),
  //     retry(3),
  //     catchError(this.handleError))
  // }

  // get all collection
  getCollections(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/v1/collection", requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // get collection by page
  getCollectionsByPage(page: number): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(`/v1/collection/?page=${page}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }
  //get collection by id
  getCollectionById(id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(`/v1/collection/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  //post lookbook
  // postLookbook(lookbook: any): Observable<any> {
  //   const headers = new HttpHeaders().set("Content-Type", "application/json")
  //   const requestOptions: Object = {
  //     headers: headers,
  //     responseType: "text"
  //   }
  //   return this._http.post<any>("/v1/lookbook", JSON.stringify(lookbook), requestOptions).pipe(
  //     map(res => JSON.parse(res)),
  //     retry(3),
  //     catchError(this.handleError))
  // }

  // post collection
  postCollection(collection: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.post<any>("/v1/collection", JSON.stringify(collection), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // modify a lookbook by lookbook object id
  // putLookbook(lookbook: any): Observable<any> {
  //   const header = new HttpHeaders().set("Content-Type", "application/json")
  //   const requestOptions: Object = {
  //     headers: header,
  //     responseType: "text"
  //   }
  //   return this._http.put<any>(`/v1/lookbook/`, JSON.stringify(lookbook), requestOptions).pipe(
  //     map(res => JSON.parse(res)),
  //     retry(3),
  //     catchError(this.handleError))
  // }

  // modify a collection by collection object id
  putCollection(collection: any): Observable<any> {
    const header = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: header,
      responseType: "text"
    }
    return this._http.put<any>(`/v1/collection/`, JSON.stringify(collection), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // delete a lookbook by lookbook object id
  // deleteLookbook(id: string): Observable<any> {
  //   const header = new HttpHeaders().set("Content-Type", "application/json")
  //   const requestOptions: Object = {
  //     headers: header,
  //     responseType: "text"
  //   }
  //   return this._http.delete<any>(`/v1/lookbook/${id}`, requestOptions).pipe(
  //     map(res => JSON.parse(res)),
  //     retry(3),
  //     catchError(this.handleError))
  // }

  // delete a collection by collection object id
  deleteCollection(id: string): Observable<any> {
    const header = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: header,
      responseType: "text"
    }
    return this._http.delete<any>(`/v1/collection/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // handle error
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
