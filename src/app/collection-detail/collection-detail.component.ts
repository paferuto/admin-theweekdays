import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Collection, Lookbook } from '../collection';
import { CollectionService } from 'src/services/collection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent {

  id: any;
  collection: Collection = new Collection();
  public Editor: any = ClassicEditor;
  lookbook = new Lookbook();
  products: any;

  constructor(private _service: CollectionService, private route: ActivatedRoute, private router: Router, private _title: Title, public _format: FormatService) {
    this._title.setTitle(this._format.vi.detail_collection);
    this.id = this.route.snapshot.paramMap.get('id');
    this._service.getCollectionById(this.id).subscribe(
      (data: any) => {
        this.collection = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCollectionById(id: string) {
    this._service.getCollectionById(this.id).subscribe(
      (data: any) => {
        this.collection = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFileSelected(event: any) {
    try {
      if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result as string;
          this.lookbook.image = base64;
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  onThumbnailSelected(event: any) {
    try {
      if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result as string;
          this.collection.image = base64;
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  addLookbook() {
    this.lookbook.products = this.products.split(',');
    if (confirm(this._format.vi.confirm_add)) {
      // nạp dữ liệu lookbook vào mảng lookbooks
      this.collection.lookbook.push(this.lookbook);
    }
  }

  deleteLookbook(index: number) {
    this.collection.lookbook.splice(index, 1);
  }

  // update collection
  updateCollection() {
    //confirm
    if (confirm(this._format.vi.confirm_update)) {
      // modified date là ngày hiện tại
      this._service.putCollection(this.collection).subscribe(
        (data: any) => {
          alert(this._format.vi.success_modify);
          this.router.navigate(['/collection']);
          this.getCollectionById(this.id);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
