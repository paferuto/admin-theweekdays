import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { Product } from '../product';
import { variant } from '../product';

@Component({
  selector: '[app-product-detail]',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: any;
  product: Product = new Product();
  errMessage: any;
  divClass: any;
  constructor(private route: ActivatedRoute, private _service: ProductService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this._service.getProductById(this.id).subscribe({
      next: (data) => {
        this.product = data,
        this.showDiv();
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
    if (this.product.on_sale == false){
      this.product.price = this.product.original_price;
    }
    for (let i = 0; i < this.product.variants.length; i++) {
      if (this.product.variants[i].in_stock == false) {
        this.product.variants[i].available_quantity = 0;
      }
    }
    if (confirm("Are you sure you want to update this product?")) {
      this.updateProduct();
    }
  }
  updateProduct() {
    this._service.updateProduct(this.id, this.product).subscribe({
      next: (data) => {
        alert("Product updated successfully");
        this.product = data;
      },
      error: (err) => { this.errMessage = err }
    });
  }
}
