import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';
import { Collection, Lookbook } from '../collection';
import { ToastrService } from 'ngx-toastr';
import { CollectionService } from 'src/services/collection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
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
  products: any;
  looks = new Array<Lookbook>();

  constructor(private toastr: ToastrService, private _service: CollectionService, private route: ActivatedRoute, private router: Router, private _title: Title, public _format: FormatService, private product_service: ProductService) {
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
    this.getProductID();
    this.collection.lookbook = [];
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
    // check if image is uploaded
    if (this.lookbook.image.length == 0) {
      // alert(this._format.vi.require_fill_image);
      this.toastr.error(this._format.vi.require_fill_image);
      return;
    }

    // check if products is filled
    if (this.products == "" || this.products == null) {
      // alert(this._format.vi.require_fill_product);
      this.toastr.error(this._format.vi.validate_product_id);
      return;
    }

    // kiểm tra xem product_id có tồn tại trong database không
    for (let element of this.products.split(',')) {
      if (!this.product_id.includes(element)) {
        // alert(this._format.vi.validate_product_id);
        this.toastr.error(this._format.vi.ID_invalid);
        return;
      }
    }

    //kiểm tra xem product_id có trùng nhau không
    let product_id = this.products.split(',');
    for (let i = 0; i < product_id.length; i++) {
      for (let j = i + 1; j < product_id.length; j++) {
        if (product_id[i] == product_id[j]) {
          // alert(this._format.vi.validate_product_id);
          this.toastr.error(this._format.vi.ID_invalid);
          return;
        }
      }
    }

    this.lookbook.products = this.products.split(',');
    if (confirm(this._format.vi.confirm_add)) {
      // nạp dữ liệu lookbook vào mảng lookbooks
      this.looks.push(this.lookbook);
      // nạp dữ liệu lookbook vào mảng lookbook của collection
      this.collection.lookbook = this.looks;
      // khởi tạo lại lookbook
      this.lookbook = new Lookbook();
    }
  }

  deleteLookbook(index: number) {
    this.collection.lookbook.splice(index, 1);
  }

  productList: any;
  // get all product
  getAllProduct() {
    this.product_service.getProducts().subscribe(
      (data: any) => {
        this.productList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // tạo mảng chứa product_id của các sản phẩm
  product_id: any = [];
  // lấy product_id của các sản phẩm
  getProductID() {
    this.product_service.getProducts().subscribe(
      (data: any) => {
        for (let element of data) {
          this.product_id.push(element.product_id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // post collection
  postCollection() {
    //check if title is filled
    if (this.collection.name == "" || this.collection.name == null) {
      // alert(this._format.vi.require_fill_title);
      this.toastr.error(this._format.vi.validate_collection_name);
      return;
    }

    //check if videoid is filled
    if (this.collection.videoId == "" || this.collection.videoId == null) {
      // alert(this._format.vi.require_fill_videoid);
      this.toastr.error(this._format.vi.ID_invalid);
      return;
    }

    // check if image is uploaded
    if (this.collection.image == "" || this.collection.image == null) {
      // alert(this._format.vi.require_fill_image);
      this.toastr.error(this._format.vi.require_fill_image);
      return;
    }

    // check if description is filled
    if (this.collection.description == "" || this.collection.description == null) {
      // alert(this._format.vi.require_fill_description);
      this.toastr.error(this._format.vi.validate_description);
      return;
    }

    // check if lookbook is filled
    if (this.collection.lookbook == null) {
      // alert(this._format.vi.require_fill_lookbook);
      this.toastr.error(this._format.vi.validate_lookbook);
      return;
    }

    if (confirm(this._format.vi.confirm_add)) {
      this._service.postCollection(this.collection).subscribe(
        (data) => {
          // alert(this._format.vi.add_success);
          this.toastr.success(this._format.vi.success_add);
          this.router.navigate(['/collection']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onContentChange(event: any) {
    this.collection.description = event.editor.getData();
  }
}
