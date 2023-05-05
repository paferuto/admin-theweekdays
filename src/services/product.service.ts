import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  // get all products
  getProducts(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/v1/products", requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // get product by product object id
  getProductById(id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(`/v1/products/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  //filter products by min and max price
  filterProductsByPrice(min: number, max: number, productList: any): Observable<any> {
    let filteredProducts = productList.filter((product: any) => product.price >= min && product.price <= max)
    return new Observable<any>((observer) => {
      observer.next(filteredProducts)
      observer.complete()
    })
  }

  // search products by name
  searchProductsByName(name: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(`/v1/products/?search=${name}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // pagination
  getProductsByPage(page: number): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(`/v1/products/?page=${page}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // post product
  postProduct(product: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.post<any>("/v1/products", JSON.stringify(product), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // update a product by product object id
  updateProduct(id: string, product: any): Observable<any> {
    const header = new HttpHeaders().set("Content-Type", "application/json")
    const requestOptions: Object = {
      headers: header,
      responseType: "text"
    }
    return this._http.put<any>(`/v1/products/${id}`, JSON.stringify(product), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }

  // delete a product by product object id
  deleteProduct(id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.delete<any>(`/v1/products/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
  }
  
  // handle error
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
