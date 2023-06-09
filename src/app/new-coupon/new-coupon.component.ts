import { Component } from '@angular/core';
import { CouponService } from 'src/services/coupon.service';
import { Coupon } from '../coupon';
import { Router } from '@angular/router';
import { FormatService } from 'src/services/format.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new-coupon',
  templateUrl: './new-coupon.component.html'
  // styleUrls: ['./new-coupon.component.css']
})
export class NewCouponComponent {
  newCoupon = new Coupon();
  errMessage: string = '';
  coupon_code_list: string[] = []; // list of all coupon code

  constructor(private _service: CouponService, private _router: Router, public _format: FormatService, private _title: Title, private toastr: ToastrService) {
    this._title.setTitle(this._format.vi.add_coupon);
    this._service.getCoupons().subscribe(
      {
        next: (data) => {
          this.coupon_code_list = data.map((coupon: any) => {
            return coupon.coupon_code;
          });
        },
        error: (err) => {
          this.errMessage = err;
          this.toastr.error(err);
        }
      }
    );
  }

  isPercentage() {
    if (this.newCoupon.is_percentage == false) {
      this.newCoupon.max_discount = this.newCoupon.value;
    }
    return true;
  }

  onchangeCouponIDCheck() {
    this.newCoupon.coupon_code = this.newCoupon.coupon_code.toUpperCase();
    if (this.coupon_code_list && this.coupon_code_list.includes(this.newCoupon.coupon_code)) {
      return true;
    }
    return false;
  }

  confirmCreate() {
    // check if coupon title is empty
    if (this.newCoupon.title == '') {
      this.toastr.error(this._format.vi.validate_title);
      return;
    }

    // check if coupon code is empty
    if (this.newCoupon.coupon_code == '') {
      //alert
      this.toastr.error(this._format.vi.validate_code);
      return;
    } else {
      if (this.onchangeCouponIDCheck()) {
        //alert
        this.toastr.error(this._format.vi.validate_coupon_code_exist);
        return;
      }
    }

    // check if quantity all is empty
    if (this.newCoupon.quantity.all == null || this.newCoupon.quantity.all == 0) {
      //alert
      this.toastr.error(this._format.vi.validate_quantity);
      return;
    }

    // check if value are filled
    if (this.newCoupon.value == null || this.newCoupon.value == 0) {
      //alert
      this.toastr.error(this._format.vi.validate_coupon_value);
      return;
    } else {
      // check if value is percentage
      if (this.newCoupon.is_percentage == true) {
        // check if value is percentage
        if (this.newCoupon.value > 100) {
          //alert
          this.toastr.error(this._format.vi.validate_value_percentage);
          return;
        }
      }
    }

    // check membership is empty
    if (this.newCoupon.membership == null) {
      //alert
      this.toastr.error(this._format.vi.validate_membership);
      return;
    }

    // check if minimum order is empty
    if (this.newCoupon.min_order == null) {
      //alert
      this.toastr.error(this._format.vi.validate_min_order);
      return;
    }

    // check if max discount is empty
    if (this.newCoupon.max_discount == null || this.newCoupon.max_discount == 0) {
      //alert
      this.toastr.error(this._format.vi.validate_max_discount);
      return;
    }

    // check if valid from is empty
    if (this.newCoupon.valid_from == null) {
      //alert
      this.toastr.error(this._format.vi.validate_valid_from);
      return;
    }

    // check if valid to is empty
    if (this.newCoupon.valid_to == null) {
      //alert
      this.toastr.error(this._format.vi.validate_valid_to);
      return;
    }

    // check if valid from is greater than valid to
    if (new Date(this.newCoupon.valid_from) > new Date(this.newCoupon.valid_to)) {
      //alert
      this.toastr.error(this._format.vi.validate_valid_from_greater_than_valid_to);
      return;
    }

    // final confirm
    if (confirm(this._format.vi.confirm_add_coupon)) {
      this.addCoupon();
    }
  }

  addCoupon() {
    this._service.postCoupon(this.newCoupon).subscribe({
      next: (data) => {
        this.toastr.success(this._format.vi.success_add);
        this._router.navigate(['/coupon'])
      },
      error: (err) => { this.errMessage = err }
    })
  }
}
