import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from 'src/services/product.service';
import { CategoryService } from 'src/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: '[app-add-product]',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  product: Product = new Product(); // new product data
  products_id_list: any = []; // list of all products id
  errMessage: string = '';
  divClass: string = ''; // show or hide sale price input
  categories = new Array<Category>; // list of all categories

  constructor(private router: Router, private _service: ProductService, private category_service: CategoryService, public _format: FormatService) {
    // router to navigate to product list page after adding a product
    // _format to format display
  }

  reset() {
    this.product = new Product();
    this.errMessage = '';
    this.showDiv();
  }

  ngOnInit(): void {
    // get list of all categories
    this.category_service.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => { this.errMessage = err }
    });

    // get list of all products
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products_id_list = data.map((product: any) => {
          return product.product_id;
        });
        console.log(this.products_id_list);
      },
      error: (err) => { this.errMessage = err }
    });

    // set to show sale price input
    this.showDiv();
  }

  showDiv() {
    if (this.product.on_sale == true) {
      this.divClass = 'appear';
    }
    else this.divClass = 'disappear';
  }

  onchangeProductIDCheck() {
    // check if product id is unique
    if (this.products_id_list.includes(this.product.product_id)) {
      return true;
    } else {
      return false;
    }
  }

  confirmCreate() {
    // check if product id is unique
    if (this.onchangeProductIDCheck()) {
      alert(this._format.vi.validate_add_product_id);
      return;
    }

    // check if all required fields are filled
    if (this.product.product_id == "" || this.product.name == "" || this.product.excerpt == "" || this.product.description == "" || this.product.original_price == 0) {
      alert(this._format.vi.require_fill_all);
      return;
    }

    // check if image is uploaded
    if (this.product.image.length == 0) {
      alert(this._format.vi.require_fill_image);
      return;
    }

    // check if product on sale or not
    if (this.product.on_sale == false) {
      this.product.price = this.product.original_price;
    } else
    // check if sale price is greater than original price
    if (this.product.price >= this.product.original_price) {
      alert(this._format.vi.validate_add_product_price);
      return;
    }

    // check if min_qty and max_qty are filled and suitable
    if (this.product.min_qty >= this.product.max_qty) {
      alert(this._format.vi.validate_add_product_quantity);
      return;
    }

    // final confirmation
    if (confirm(this._format.vi.confirm_add_product)) {
      this.addProduct();
    }
  }

  addProduct() {
    // add product to database
    this._service.postProduct(this.product).subscribe({
      next: (data) => {
        alert(this._format.vi.success_add);
        this.router.navigate(['/product']);
      },
      error: (err) => { this.errMessage = err; alert(this._format.vi.fail_add); }
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        this.product.image.push(base64);
      };
    }
  }

  deleteImage(index: number) {
    this.product.image.splice(index, 1);
  }
}
