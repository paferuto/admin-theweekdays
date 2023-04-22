import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent {

  categories: any = [];
  errMessage: string = '';
  type = ['Quần', 'Áo'];

  constructor(private _service: CategoryService, private _router: Router, public _format: FormatService, private _title: Title) {
    this._title.setTitle(this._format.vi.category);
    this.getCategories();
  }

  // get all categories
  getCategories() {
    this._service.getCategories().subscribe(
      {
        next: (data) => { this.categories = data },
        error: (err) => { this.errMessage = err }
      }
    )
  }

  // delete a category by category object id
  deleteCategory(id: string) {
    if (!confirm(this._format.vi.confirm_delete)) {
      return;
    }
    this._service.deleteCategory(id).subscribe(
      {
        next: (data) => { this.getCategories(); alert(this._format.vi.success_delete)},
        error: (err) => { this.errMessage = err; alert(this._format.vi.fail_delete) }
      }
    )
  }
}
