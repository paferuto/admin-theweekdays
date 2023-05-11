import { Component, ElementRef, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Collection, Lookbook } from '../collection';
import { CollectionService } from 'src/services/collection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';
import { ProductService } from 'src/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: '[app-create-collection]',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent {
  id: any;
  collection: Collection = new Collection();
  public Editor: any = ClassicEditor;
  lookbook = new Lookbook();
  products: any[] = [];
  listProducts: any;
  target: any = "";
  videoURL: any;
  constructor(private _service: CollectionService, private route: ActivatedRoute, private router: Router, private _title: Title, public _format: FormatService, private productService: ProductService, private toastr: ToastrService, private sanitizer: DomSanitizer) {
    this._title.setTitle(this._format.vi.create_collection);;
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
    if (this.lookbook.image == null || this.lookbook.image == "") {
      this.toastr.error(this._format.vi.require_fill_image);
      return;
    }
    if (this.lookbook.products.length) {
      this.toastr.error(this._format.vi.validate_fill_product);
      return;
    }
    this.lookbook.products = this.products;
    this.products = [];
    if (confirm(this._format.vi.confirm_add)) {
      // nạp dữ liệu lookbook vào mảng lookbooks
      this.collection.lookbook.push(this.lookbook);
    }
    this.lookbook = new Lookbook();
  }

  deleteLookbook(index: number) {
    this.collection.lookbook.splice(index, 1);
  }

  //get products
  getProducts() {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.listProducts = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // search product by name
  searchProductByName(name: string) {
    this.productService.searchProductsByName(name).subscribe(
      (data: any) => {
        this.listProducts = data.slice(0, 5);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // get product id
  getProductId(id: string) {
    // check if product is already in lookbook
    if (this.products.includes(id)) {
      this.toastr.error(this._format.vi.validate_add_product_id);
      return;
    }
    else {
      this.toastr.success(this._format.vi.success_add + " " + id);
      this.products.push(id);
    }
  }

  showVideo(videoId: string) {
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" +videoId+ '?rel=0&playlist='+videoId+'&loop=1&version=3&autoplay=1&controls=0&&showinfo=0&disablekb=1&iv_load_policy=3&loop=1&modestbranding=1&mute=1');
  }
  addCollection() {
    if (this.collection.name == null || this.collection.name == "") {
      this.toastr.error(this._format.vi.validate_name);
      return;
    }
    if (this.collection.image == null || this.collection.image == "") {
      this.toastr.error(this._format.vi.require_fill_image);
      return;
    }
    if (this.collection.description == null || this.collection.description == "") {
      this.toastr.error(this._format.vi.validate_description);
      return;
    }
    if (this.collection.videoId == null || this.collection.videoId == "") {
      this.toastr.error(this._format.vi.validate_videoID);
      return;
    }
    if (this.collection.lookbook.length == 0) {
      this.toastr.error(this._format.vi.validate_lookbook);
      return;
    }
    this._service.postCollection(this.collection).subscribe(
      (data: any) => {
        this.toastr.success(this._format.vi.success_add_collection);
        this.router.navigate(['/collection']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
