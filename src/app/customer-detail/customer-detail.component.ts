import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: '[app-customer-detail]',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent {
  constructor(private _title: Title, public _format: FormatService) {
    this._title.setTitle(this._format.vi.detail_customer);;
  }

}
