import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';
@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent {
  public Editor:any= ClassicEditor;
  constructor(private _title: Title, public _format: FormatService) {
    this._title.setTitle(this._format.vi.detail_collection);;
  }
}
