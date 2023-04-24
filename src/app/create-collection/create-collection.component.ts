import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';
@Component({
  selector: '[app-create-collection]',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent {
  public Editor:any= ClassicEditor;
  constructor(private _title: Title, public _format: FormatService) {
    this._title.setTitle(this._format.vi.create_collection);;
  }
}
