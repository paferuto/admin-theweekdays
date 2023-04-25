import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';
@Component({
  selector: '[app-admin-dashboard]',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(private _title: Title, public _format: FormatService) {
    this._title.setTitle(this._format.vi.home);;
  }
}
