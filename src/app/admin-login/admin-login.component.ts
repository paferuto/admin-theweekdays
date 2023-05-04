import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  account = {
    username: "",
    password: ""
  }

  constructor (private _title: Title, private _format: FormatService, private _auth: AuthService, private _toastr: ToastrService, private _router: Router) {
    this._title.setTitle(_format.vi.login);
  }

  // login
  login(account_info: any) {
    this._auth.login(account_info).subscribe({
      next: (res) => {
        this._router.navigate(["/"]);
      },
      error: (err) => {
        this._toastr.error(this._format.vi.fail_login, this._format.vi.fail_login_message);
      }
    });
  }
}
