import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { Product } from '../product';
import { CategoryService } from 'src/services/category.service';

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
  category: any;
  categories: any;
  constructor(private route: ActivatedRoute, private router: Router, private _service: ProductService, private category_service: CategoryService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this._service.getProductById(this.id).subscribe({
      next: (data) => {
        this.product = data,
          this.showDiv(),
          this.category_service.getCategoryById(data.category).subscribe({
            next: (data1) => {
              this.category = data1;
            },
            error: (err) => { this.errMessage = err }
          });
      },
      error: (err) => { this.errMessage = err }
    });

    // this.category_service.getCategoryById(this.product.category).subscribe({
    //   next: (data) => {
    //     this.category = data;
    //   },
    //   error: (err) => { this.errMessage = err }
    // });
    this.category_service.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (err) => { this.errMessage = err }
    });
  }

  getCurrentCategory(id:string) {
    this.category_service.getCategoryById(id).subscribe({
      next: (data) => {
        this.category = data;
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
    if (confirm("Are you sure you want to update this product?")) {
      this.updateProduct();
      // navigate to product list
    }
    this.goToProductList();
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

  goToProductList() {
    this.router.navigate(['/product']);
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

  confirmClearChanges() {
    if (confirm("Are you sure you want to clear all changes?")) {
      this.ngOnInit();
    }
  }
}
