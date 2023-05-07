import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/services/auth.service';
import { FormatService } from 'src/services/format.service';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css']
})
export class AdminCustomerComponent {
  customers: any = [];
  page = new Array<number>();
  current_page: number = 1;
  total_page: any;

  constructor(private _title: Title, public _format: FormatService, private _auth: AuthService, private CustomerService: CustomerService) {
    this._auth.auth().subscribe({
      error: (err) => { }
    });
    this._title.setTitle(this._format.vi.customer);
    this.CustomerService.getCustomers().subscribe({
      next: (res) => {
        this.customers = res;
        this.total_page = Math.ceil(this.customers.length / 10);
        for (let i = 1; i <= this.total_page; i++) {
          this.page.push(i);
        }
        this.changePage(1);
      }
    })
  }

  changePage(page: number) {
    this.CustomerService.getCustomerByPage(page).subscribe(
      (data: any) => {
        this.customers = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.current_page = page;
  }

  previousPage() {
    if (this.current_page > 1) {
      this.changePage(this.current_page - 1);
    }
  }

  nextPage() {
    if (this.current_page < this.page.length) {
      this.changePage(this.current_page + 1);
    }
  }

}
