import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin - The Weekdays';

  constructor(public _format: FormatService, private _auth: AuthService, private _router: Router, private _toastr: ToastrService) {
    this._auth.auth().subscribe({
      error: (err) => { }
    });
  }

  // nếu đã đăng nhập thì sau khi auth sẽ confirm có thực sự muốn đăng xuất không
  // nếu chưa đăng nhập thì auth sẽ báo lỗi và chuyển hướng đến trang đăng nhập, không cần confirm.
  logout() {
    this._auth.auth().subscribe({
      next: (res) => {
        if (!confirm(this._format.vi.confirm_logout)) {
          return;
        }
        this._auth.logout().subscribe({
          next: (res) => {
            this._toastr.success(this._format.vi.success_logout, this._format.vi.success_logout_message);
            this._router.navigate(["/login"]);
          }
        });
      },
      error: (err) => {
        this._toastr.error(this._format.vi.fail_logout, this._format.vi.fail_logout_message);
        // this._router.navigate(["/login"]);
      }
    });
  }
}
