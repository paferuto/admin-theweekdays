import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/services/auth.service';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css']
})
export class AdminCustomerComponent {

  constructor(private _title: Title, public _format: FormatService, private _auth: AuthService) {
    this._auth.auth().subscribe({
      error: (err) => { }
    });
    this._title.setTitle(this._format.vi.customer);
  }

}
