import { Component } from '@angular/core';
import { CollectionService } from 'src/services/collection.service';
import { Collection } from '../collection';
import { Location } from '@angular/common';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
  collections = new Array<Collection>();
  constructor(private _service: CollectionService) {
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
