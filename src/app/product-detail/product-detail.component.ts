import { Component } from '@angular/core';

@Component({
  selector: '[app-product-detail]',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  divClass='disappear';
  constructor() { }
  showDiv(){
    if (this.divClass=='appear'){
      this.divClass='disappear';
    }
    else this.divClass='appear';
  }
}
