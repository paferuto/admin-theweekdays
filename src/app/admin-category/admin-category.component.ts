import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent {

  categories: any = [];
  errMessage: string = '';
  type = ['Quần', 'Áo'];

  constructor(private _service: CategoryService, private _router: Router) {
    this.getCategories();
  }

  // get all categories
  getCategories() {
    this._service.getCategories().subscribe(
      {
        next: (data) => { this.categories = data, console.log(this.categories); },
        error: (err) => { this.errMessage = err }
      }
    )
  }
  
  // shorten the object id
  shortenObjectId(id: string) {
    return id.substring(0, 5) + '...' + id.substring(id.length - 5, id.length);
  }
}
