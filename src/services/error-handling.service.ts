import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private _router: Router) { }

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Haven't login yet
      this._router.navigate(["/login"])
    } else if (error.status === 403) {
      // Navigate to the error page with extras if needed
      this._router.navigate(["/"])
    } else if (error.status === 404) {
      // Navigate to ther error page with extras if needed
      this._router.navigate(["/"])
    } else {
      // Navigate to the error page with extras if needed
      this._router.navigate(["/"])
    }
  }
}
