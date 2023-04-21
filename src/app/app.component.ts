import { Component } from '@angular/core';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';

  constructor(public _format: FormatService) {}
}
