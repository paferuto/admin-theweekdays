import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormatService } from 'src/services/format.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/services/customer.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: '[app-customer-detail]',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent {
  id: string = '';
  customer: any;
  date: Date = new Date();
  orders: any = [];
  constructor(private CustomerService: CustomerService, private _title: Title, public _format: FormatService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private OrderService: OrderService) {
    this._title.setTitle(this._format.vi.detail_customer);
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // get customer by id
      this.CustomerService.getCustomerById(this.id).subscribe({
        next: (res) => {
          this.customer = res;
          this.date = res.dob.toString().slice(0, 10)
          //get 10 first characters of this.date
        }
      });
      this.getOrdersByCustomerId(this.id);
    }
    );
  }

  //get orders by customer id
  getOrdersByCustomerId(id: string) {
    this.OrderService.getOrdersByCustomerId(id).subscribe({
      next: (res) => {
        this.orders = res;
      }
    });
  }

  // chỉnh sửa customer.dob từ giá trị date
  changeDate() {
    this.customer.dob = this.date + 'T00:00:00.000Z';
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        this.customer.image = base64;
      };
    }
  }

  //update customer
  updateCustomer() {
    if (this.customer.name == undefined || this.customer.image == undefined || this.customer.name == '' || this.customer.image == '') {
      this.toastr.error(this._format.vi.require_fill_all);
    } else {
      this.CustomerService.putCustomerById(this.id, this.customer).subscribe({
        next: (data) => {
          this.toastr.success(this._format.vi.success_modify)
          // snackbar for 0.5s and redirect to category page
          setTimeout(() => {
            this.router.navigate(['/customer']);
          }, 500);
        },
        error: (err) => { this.toastr.error(this._format.vi.fail_modify) },
      })
    }
  }

  // cancel changes
  cancelChange() {
    // confirm
    if (confirm(this._format.vi.confirm_cancel)) {
      this.CustomerService.getCustomerById(this.id).subscribe({
        next: (res) => {
          this.customer = res;
          this.date = res.dob.toString().slice(0, 10)
          //get 10 first characters of this.date
        }
      });
    }
  }



}
