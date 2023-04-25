import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from 'src/services/product.service';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent {
  product_list: any;
  constructor(private _service: ProductService, public _format: FormatService, private _title: Title) {
    this._title.setTitle(this._format.vi.product);
    this._service.getProducts().subscribe(
      (data: any) => {
        this.product_list = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  confirmDelete(id: any) {
    if (confirm(this._format.vi.confirm_delete)) {
      this.deleteProduct(id);
    }
  }

  deleteProduct(id: any) {
    this._service.deleteProduct(id).subscribe(
      (data: any) => {
        this._service.getProducts().subscribe(
          (data: any) => {
            this.product_list = data;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
