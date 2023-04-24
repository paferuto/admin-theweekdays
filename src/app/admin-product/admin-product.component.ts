import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from 'src/services/product.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent {
  product_list: any;
  constructor(private _service: ProductService) {
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
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct(id);
    }
  }

  deleteProduct(id: any) {
    this._service.deleteProduct(id).subscribe(
      (data: any) => {
        console.log(data);
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
