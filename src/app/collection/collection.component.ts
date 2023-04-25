import { Component } from '@angular/core';
import { CollectionService } from 'src/services/collection.service';
import { Collection } from '../collection';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {

  collections = new Array<Collection>();

  constructor(private router: Router, private _service: CollectionService, private _title: Title, public _format: FormatService) {
    this._title.setTitle(this._format.vi.collection);
    this._service.getCollections().subscribe(
      (data: any) => {
        this.collections = data;
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
            this.router.navigate(['/collection']);
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
}
