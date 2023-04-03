import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent {
  public Editor:any= ClassicEditor;

}
