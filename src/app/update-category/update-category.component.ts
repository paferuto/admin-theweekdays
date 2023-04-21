import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})

export class UpdateCategoryComponent {

  cate_id: string = '';
  selectedCategory: any = {}; // old data
  category: any = {}; // new data
  errMessage: string = '';
  types = ['Quần', 'Áo'];

  public setCategory(category: any) {
    this.category = category;
  }

  constructor(private _service: CategoryService, private _router: Router, public _format: FormatService, private _activerouter: ActivatedRoute) {
    // if active router has params id, get category by id, else redirect to admin category page
    if (this._activerouter.snapshot.params['id']) {
      this.cate_id = this._activerouter.snapshot.params['id'];
      this._service.getCategoryById(this.cate_id).subscribe(
        {
          next: (data) => { this.category = data; this.selectedCategory = data; },
          error: (err) => { this.errMessage = err }
        }
      )
    } else {
      this._router.navigate(['/category']);
    }
  }

  // get category by category object id
  getCategoryById(id: string) {
    this._service.getCategoryById(id).subscribe(
      {
        next: (data) => { this.category = data },
        error: (err) => { this.errMessage = err }
      }
    )
  }

  onFileSelected(event: any, category: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      category.image = reader.result!.toString();
    };
    reader.onerror = function (error) {
    }
    this.setCategory(category);
  }

  modifyCategory() {
    if (this.category.name == '' || this.category.type == '') {
      this.errMessage = this._format.vi.require_fill_all;
    } else {
      this._service.modifyCategory(this.cate_id, this.category).subscribe({
        next: (data) => { this.errMessage = this._format.vi.success_modify; },
        error: (err) => { this.errMessage = err },
      })
    }
  }
}
