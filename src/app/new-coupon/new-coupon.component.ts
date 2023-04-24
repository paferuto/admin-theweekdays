import { Component } from '@angular/core';
import { CouponService } from 'src/services/coupon.service';
import { Coupon } from '../coupon';
import { Router } from '@angular/router';
import { FormatService } from 'src/services/format.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-new-coupon',
  templateUrl: './new-coupon.component.html',
  styleUrls: ['./new-coupon.component.css']
})
export class NewCouponComponent {
  newCoupon = new Coupon();
  errMessage: string = '';
  coupon: any = [];

  constructor(private _service: CouponService, private _router: Router, public _format: FormatService, private _title: Title) {
    this._title.setTitle(this._format.vi.add_coupon);
  }

  addCoupon() {
    this._service.postCoupon(this.newCoupon).subscribe({
      next: (data) => {
        this.newCoupon = new Coupon();
        alert(this._format.vi.success_add)
        this._router.navigate(['/coupon'])
      },
      error: (err) => { this.errMessage = err }
    })
  }
}
