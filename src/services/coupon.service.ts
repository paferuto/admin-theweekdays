import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Coupon } from 'src/app/coupon';
import { ErrorHandlingService } from './error-handling.service';
import { FormatService } from './format.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private _http: HttpClient, private errorHandlingService: ErrorHandlingService, private api: FormatService) { }

  // get all coupons
  getCoupons(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(this.api.api_path + "/v1/coupon", requestOptions).pipe(
      map(res => JSON.parse(res) as Coupon[]),
      catchError((error) => {
        this.errorHandlingService.handleError(error);
        return throwError(error);
      }))
  }

  // get coupons by page
  getCouponsByPage(page: number): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(this.api.api_path + `/v1/coupon/?page=${page}`, requestOptions).pipe(
      map(res => JSON.parse(res) as Coupon[]),
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
    return this._http.get<any>(this.api.api_path + `/v1/coupon/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res) as Coupon),
      retry(3),
      catchError(this.handleError))
  }

  // get coupon by coupon code
  getCouponByCode(code: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(this.api.api_path + `/v1/coupon/code/${code}`, requestOptions).pipe(
      map(res => JSON.parse(res) as Coupon),
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
    return this._http.post<any>(this.api.api_path + "/v1/coupon", JSON.stringify(coupon), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError)
    )
  }

  // update a coupon by coupon object id
  updateCoupon(id: string, coupon: any): Observable<any> {
    const header = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: header,
      responseType: "text"
    }
    return this._http.put<any>(this.api.api_path + `/v1/coupon/${id}`, JSON.stringify(coupon), requestOptions).pipe(
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
    return this._http.delete<any>(this.api.api_path + `/v1/coupon/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // handle error
  handleError(error: HttpErrorResponse) {
    return throwError(error)
  }
}
