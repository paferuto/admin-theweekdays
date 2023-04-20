import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private _http: HttpClient) { }

  // get all coupons
  getCoupons(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/v1/coupon", requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // get coupon by coupon object id
  getCouponById(id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(`/v1/coupon/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // get coupin by coupon code
  getCouponByCode(code: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(`/v1/coupon/code/${code}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // post coupon
  postCoupon(coupon: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.post<any>("/v1/coupon", JSON.stringify(coupon), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // update a coupon by coupon object id
  updateCoupon(id: string, coupon: any): Observable<any> {
    const header = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: header,
      responseType: "text"
    }
    return this._http.put<any>(`/v1/coupon/${id}`, JSON.stringify(coupon), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // delete a coupon by coupon object id
  deleteCoupon(id: string): Observable<any> {
    const header = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: header,
      responseType: "text"
    }
    return this._http.delete<any>(`/v1/coupon/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // handle error
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
