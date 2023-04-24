import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from 'src/services/coupon.service';
import { FormatService } from 'src/services/format.service';
import { Coupon } from '../coupon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-coupon',
  templateUrl: './admin-coupon.component.html',
  styleUrls: ['./admin-coupon.component.css']
})
export class AdminCouponComponent {
  coupon: any = [];
  errMessage: string = '';
  newCoupon = new Coupon();

  constructor(private _service: CouponService, private _router: Router, public _format: FormatService, private _title: Title) {
    this._title.setTitle(this._format.vi.coupon);
    this._service.getCoupons().subscribe({
      next: (data) => { this.coupon = data },
      error: (err) => { this.errMessage = err }
    })
  }

  routeToUpdateCoupon(id: string) {
    this._router.navigate(['edit', id])
  }

  postCoupon() {
    this._service.postCoupon(this.newCoupon).subscribe({
      next: (data) => {
        this.newCoupon = data;
        console.log('response:', this.newCoupon);
      },
      error: (err) => { 
        this.errMessage = err;
        console.log('error:', this.errMessage);
      }
    })
  }
}