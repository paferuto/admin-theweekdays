import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent {
 order_list: any;
  page = new Array<number>();
  current_page: number = 1;
  status: string = "";
  status_list: any;
  constructor(private _title: Title, public _format: FormatService, private _service: OrderService) {
    this._title.setTitle(this._format.vi.order);
    // get status from url
    const url = window.location.href;
    const url_split = url.split("/");
    this.status = url_split[url_split.length - 1];
    // get order list
    this.changePage("ordered",1);
  }
  changePage(status:string,page: number) {
    this._service.getOrdersByStatusAndPage(status,page).subscribe(
      (data: any) => {
        this.order_list = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.current_page = page;
  }

  previousPage() {
    if (this.current_page > 1) {
      this.changePage(this.status,this.current_page - 1);
    }
  }

  nextPage() {
    if (this.current_page < this.page.length) {
      this.changePage(this.status,this.current_page + 1);
    }
  }
}
