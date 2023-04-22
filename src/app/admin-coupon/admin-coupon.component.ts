import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from 'src/services/coupon.service';
import { FormatService } from 'src/services/format.service';

@Component({
  selector: 'app-admin-coupon',
  templateUrl: './admin-coupon.component.html',
  styleUrls: ['./admin-coupon.component.css']
})
export class AdminCouponComponent {
  coupons: any = [];
  errMessage: string = '';

  constructor(private _service: CouponService, private _router: Router, public _format: FormatService) {
    this._service.getCoupons().subscribe({
      next: (data) => { this.coupons = data },
      error: (err) => { this.errMessage = err }
    })
  }

  routeToUpdateCoupon(id: string) {
    this._router.navigate(['edit', id])
  }

 

  

}
