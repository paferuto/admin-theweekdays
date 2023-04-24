import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
  constructor(private _title: Title, public _format: FormatService) {
    this._title.setTitle(this._format.vi.collection);;
  }
}
