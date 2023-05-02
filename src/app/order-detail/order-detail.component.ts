import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  id: string = "";
  order: any;
  payment_status: string = "";
  constructor(private _title: Title, public _format: FormatService, private _service: OrderService) {
    this._title.setTitle(this._format.vi.detail_order);
    // get id from url
    const url = window.location.href;
    const url_split = url.split("/");
    this.id = url_split[url_split.length - 1];
    // get order detail
    this._service.getOrderById(this.id).subscribe(
      (data: any) => {
        this.order = data;
        this.getPaymentStatus();
      }
    );
  }

  // switch case payment status
  getPaymentStatus() {
    switch (this.order.payment.status) {
      case "Done":
        this.payment_status = "text-bg-success";
        break;
      case "Waiting":
        this.payment_status = "text-bg-danger";
        break;
    }
  }

  // update payment status
  updatePaymentStatus() {
    this._service.putOrder(this.order).subscribe(
      (data: any) => {
        alert(this._format.vi.success_update_status);
        this.getPaymentStatus();
      }
    );
  }
}
