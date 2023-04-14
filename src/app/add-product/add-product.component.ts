import { Component } from '@angular/core';

@Component({
  selector: '[app-add-product]',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  divClass='disappear';
  constructor() { }
  showDiv(){
    if (this.divClass=='appear'){
      this.divClass='disappear';
    }
    else this.divClass='appear';
  }

}
