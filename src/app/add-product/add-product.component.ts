import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from 'src/services/product.service';
import { CategoryService } from 'src/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';

@Component({
  selector: '[app-add-product]',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent  implements OnInit {
  product: Product = new Product();
  errMessage: any;
  divClass: any;
  categories = new Array<Category>;
  constructor(private route: ActivatedRoute, private _service: ProductService, private category_service: CategoryService) { }

  ngOnInit(): void {
    this.category_service.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => { this.errMessage = err }
    });
  }


  showDiv() {
    if (this.product.on_sale == true) {
      this.divClass = 'appear';
    }
    else this.divClass = 'disappear';
  }

  confirmUpdate() {
    if (this.product.name == "" || this.product.excerpt == "" || this.product.description == "") {
      alert("Please fill in all the required fields");
      return;
    }
    if (this.product.price > this.product.original_price) {
      alert("Sale price cannot be higher than original price");
      return;
    }
    if (this.product.min_qty > this.product.max_qty) {
      alert("Minimum quantity cannot be higher than maximum quantity");
      return;
    }
    if (this.product.on_sale == false) {
      this.product.price = this.product.original_price;
    }
    for (let i = 0; i < this.product.variants.length; i++) {
      if (this.product.variants[i].in_stock == false) {
        this.product.variants[i].available_quantity = 0;
      }
    }
    if (confirm("Are you sure you want to add this product?")) {
      this.addProduct();
    }
  }

  addProduct() {
    if (this.product.name == "" ||
    this.product.product_id == "" ||
    this.product.original_price == 0 ||
    this.product.price == 0 ||
    this.product.min_qty > this.product.max_qty ||
    this.product.excerpt == "" ||
    this.product.description == "") {
      alert("Data is missing or invalid. Please check again.");
      return;
    }
    this._service.postProduct(this.product).subscribe({
      next: (data) => {
        alert("Product added successfully");
        this.product = new Product();
      },
      error: (err) => { this.errMessage = err }
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
