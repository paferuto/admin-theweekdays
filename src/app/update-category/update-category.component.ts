import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})

export class UpdateCategoryComponent {

  ui = {
    title: '',
    buttonTitle: ''
  }

  isFunctionUpdate: boolean = true;
  cate_id: string = '';
  selectedCategory: any = {}; // old data
  category: any = {
    type: 'Quần'
  }; // new data
  errMessage: string = '';
  types = ['Quần', 'Áo'];

  public setCategory(category: any) {
    this.category = category;
  }

  constructor(private _service: CategoryService, private _router: Router, public _format: FormatService, private _activerouter: ActivatedRoute, private _title: Title) {
    // if active router has params id, get category by id, else redirect to admin category page
    if (this._activerouter.snapshot.params['id']) {
      this.ui.title = this._format.vi.update_category;
      this.ui.buttonTitle = this._format.vi.update_category;
      this.cate_id = this._activerouter.snapshot.params['id'];
      this._service.getCategoryById(this.cate_id).subscribe(
        {
          next: (data) => { this.category = data; this.selectedCategory = data; },
          error: (err) => { this.errMessage = err }
        }
      )
    } else {
      this.ui.title = this._format.vi.add_category;
      this.ui.buttonTitle = this._format.vi.add_category;
      this.isFunctionUpdate = false;
      this.selectedCategory = {
        type: 'Quần',
      }
    }
    this._title.setTitle(this.ui.title);
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
    // // OPTION 1: get all images
    // let images: string[] = [];

    // for (let file of event.target.files) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = function () {
    //     images.push(reader.result!.toString());
    //   };
    //   reader.onerror = function (error) {
    //   }
    // }
    // category.image = images;
    // this.setCategory(category);

    // OPTION 2: get only one image
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

  // execute when button clicked
  onButtonClicked() {
    if (this.isFunctionUpdate) {
      this.modifyCategory();
    } else {
      this.postCategory();
    }
  }

  // modify category
  modifyCategory() {
    if (this.category.name == undefined || this.category.image == undefined || this.category.name == '' || this.category.image == '') {
      this.errMessage = this._format.vi.require_fill_all;
      window.alert(this.errMessage);
    } else {
      this._service.modifyCategory(this.cate_id, this.category).subscribe({
        next: (data) => {
          this.errMessage = this._format.vi.success_modify;
          // snackbar for 0.5s and redirect to category page
          setTimeout(() => {
            this._router.navigate(['/category']);
          }, 500);
        },
        error: (err) => { this.errMessage = err },
      })
    }
  }

  // post category
  postCategory() {
    if (this.category.name == undefined || this.category.image == undefined || this.category.name == '' || this.category.image == '') {
      this.errMessage = this._format.vi.require_fill_all;
      window.alert(this.errMessage);
    } else {
      this._service.postCategory(this.category).subscribe({
        next: (data) => {
          // snackbar for 0.5s and redirect to category page
          setTimeout(() => {
            this._router.navigate(['/category']);
          }, 500);
        },
        error: (err) => { this.errMessage = err },
      })
    }
  }
}
