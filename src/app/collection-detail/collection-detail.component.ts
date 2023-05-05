import { Component } from '@angular/core';
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
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent {

  id: any;
  collection: Collection = new Collection();
  public Editor: any = ClassicEditor;
  lookbook = new Lookbook();
  products: any[] = [];
  listProducts: any;
  target: any = "";
  videoURL:any;
  constructor(private _service: CollectionService, private route: ActivatedRoute, private router: Router, private _title: Title, public _format: FormatService, private productService: ProductService, private toastr: ToastrService, private sanitizer: DomSanitizer) {
    this._title.setTitle(this._format.vi.detail_collection);
    this.id = this.route.snapshot.paramMap.get('id');
    this._service.getCollectionById(this.id).subscribe(
      (data: any) => {
        this.collection = data;
        this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + data.videoId + '?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&disablekb=1&iv_load_policy=3');
      },
      (error) => {
        console.log(error);
      }
    );
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.listProducts = data.slice(0, 5);
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
    if (this.lookbook.image == null || this.lookbook.image == "") {
      this.toastr.error(this._format.vi.require_fill_image);
      return;
    }
    if (this.lookbook.products.length) {
      this.toastr.error(this._format.vi.validate_fill_product);
      return;
    }
    this.lookbook.products = this.products;
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
}
