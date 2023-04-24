import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css']
})
export class AdminCustomerComponent {

  constructor(private _title: Title, public _format: FormatService) {
    this._title.setTitle(this._format.vi.customer);;
  }

}
