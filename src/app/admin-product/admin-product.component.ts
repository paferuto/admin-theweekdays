import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from 'src/services/product.service';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent {
  errMessage: string = '';
  product_list: any;
  page = new Array<number>();
  current_page: number = 1;
  searchedName: string = '';
  total_page: any;

  constructor(private _service: ProductService, public _format: FormatService, private _title: Title, private _auth: AuthService) {
    this._auth.auth().subscribe({
      error: (err) => { }
    });
    this._title.setTitle(this._format.vi.product);
    this.getProducts();
  }

  getProducts() {
    this._service.getProducts().subscribe(
      (data: any) => {
        this.product_list = data;
        this.total_page = Math.ceil(this.product_list.length / 10);
        for (let i = 1; i <= this.total_page; i++) {
          this.page.push(i);
        }
        this.changePage(1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // delete a category by category object id
  deleteProduct(id: string) {
    if (!confirm(this._format.vi.confirm_delete)) {
      return;
    }
    this._service.deleteProduct(id).subscribe(
      {
        next: (data) => { this.getProducts(); alert(this._format.vi.success_delete) },
        error: (err) => { this.errMessage = err; alert(this._format.vi.fail_delete) }
      }
    )
  }

  changePage(page: number) {
    this._service.getProductsByPage(page).subscribe(
      (data: any) => {
        this.product_list = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.current_page = page;
  }

  previousPage() {
    if (this.current_page > 1) {
      this.changePage(this.current_page - 1);
    }
  }

  nextPage() {
    if (this.current_page < this.page.length) {
      this.changePage(this.current_page + 1);
    }
  }

  searchProduct(search: string) {
    if (search == '') {
      this.getProducts();
    }
    else {
      this._service.searchProductsByName(search).subscribe(
        (data: any) => {
          this.product_list = data;
          this.total_page = Math.ceil(data.length / 10);
          for (let i = 1; i <= this.total_page; i++) {
            this.page=[];
            this.page.push(i);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
