import { Component } from '@angular/core';
import { CollectionService } from 'src/services/collection.service';
import { Collection } from '../collection';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
  errMessage: string = '';

  collections = new Array<Collection>();
  page = new Array<number>();
  current_page: number = 1;

  constructor(private _service: CollectionService, private _title: Title, public _format: FormatService, private _auth: AuthService) {
    this._auth.auth().subscribe({
      error: (err) => { }
    });
    this._title.setTitle(this._format.vi.collection);
    this._service.getCollections().subscribe(
      (data: any) => {
        this.collections = data;
        const total_page = Math.ceil(this.collections.length / 10);
        for (let i = 1; i <= total_page; i++) {
          this.page.push(i);
        }
        this.changePage(1);
      },
      (error) => {
        console.log(error);
      }
    );
   }

  confirmDelete(id: any) {
    if (confirm('Are you sure you want to delete this collection?')) {
      this.deleteCollection(id);
    }
    else{
      location.reload();
    }
  }

  deleteCollection(id: any) {
    this._service.deleteCollection(id).subscribe(
      (data: any) => {
        console.log(data);
        this._service.getCollections().subscribe(
          (data: any) => {
            this.collections = data;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changePage(page: number) {
    this._service.getCollectionsByPage(page).subscribe({
      next: (data) => {
        this.collections = data;
        this.current_page = page;
      },
      error: (err) => { this.errMessage = err }
    })
  }

  previousPage() {
    if (this.current_page > 1) {
      this.current_page--;
      this.changePage(this.current_page);
    }
  }

  nextPage() {
    if (this.current_page < this.page.length) {
      this.current_page++;
      this.changePage(this.current_page);
    }
  }
}
