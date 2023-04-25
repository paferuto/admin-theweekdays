import { Component } from '@angular/core';
import { CouponService } from 'src/services/coupon.service';
import { Coupon } from '../coupon';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormatService } from 'src/services/format.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: '[app-update-coupon]',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent {
  id: string = ''; // selected coupon id
  selectedCoupon: any = {}; // selected coupon data
  coupon: any = {}; // update coupon data
  errMessage: string = '';
  coupon_code_list: string[] = []; // list of all coupon code

  public setCoupon(coupon: any) {
    this.coupon = coupon;
  }

  constructor(private _service: CouponService, private _router: Router, private _activerouter: ActivatedRoute, public _format: FormatService, private _title: Title, private _toastr: ToastrService) {
    this._title.setTitle(this._format.vi.update_coupon);
    if (this._activerouter.snapshot.params['id']) {
      this.id = this._activerouter.snapshot.params['id'];
      this._service.getCouponById(this.id).subscribe(
        {
          next: (data) => {
            this.coupon = data;
            this.selectedCoupon = JSON.parse(JSON.stringify(data));
            // new date format dd/MM/yyyy
            this.coupon.valid_from = new Date(this.coupon.valid_from).toLocaleDateString('en-CA');
            this.coupon.valid_to = new Date(this.coupon.valid_to).toLocaleDateString('en-CA');
          },
          error: (err) => {
            this.errMessage = err;
            this._toastr.error(err);
          }
        }
      );
    } else {
      this._router.navigate(['/coupon']);
    }
  }

  isPercentage() {
    if (this.coupon.is_percentage == false) {
      this.coupon.max_discount = this.coupon.value;
    }
    return true;
  }

  getCouponById(id: string) {
    this._service.getCouponById(id).subscribe(
      {
        next: (data) => { this.coupon = data },
        error: (err) => { this.errMessage = err }
      }
    )
  }

  updateCoupon() {
    this.coupon.is_active = this.coupon.is_active == 'true' || this.coupon.is_active == true;
    this._service.updateCoupon(this.id, this.coupon).subscribe({
      next: (data) => {
        this._toastr.success(this._format.vi.success_modify, this._format.vi.coupon + ' ' + this.coupon.coupon_code);
        setTimeout(() => {
          this._router.navigate(['/coupon']);
        }, 500);
      },
      error: (err) => { this.errMessage = err }
    })
  }

  confirmUpdate() {
    // check if coupon title is empty
    if (this.coupon.title == '') {
      this._toastr.error(this._format.vi.validate_title);
      return;
    }

    // check if coupon code is empty
    if (this.coupon.coupon_code == '') {
      //alert
      this._toastr.error(this._format.vi.validate_code);
      return;
    }

    // check if quantity all is empty
    if (this.coupon.quantity.all == null || this.coupon.quantity.all == 0) {
      //alert
      this._toastr.error(this._format.vi.validate_quantity);
      return;
    }

    // check if value are filled
    if (this.coupon.value == null || this.coupon.value == 0) {
      //alert
      this._toastr.error(this._format.vi.validate_coupon_value);
      return;
    } else {
      // check if value is percentage
      if (this.coupon.is_percentage == true) {
        // check if value is percentage
        if (this.coupon.value > 100) {
          //alert
          this._toastr.error(this._format.vi.validate_value_percentage);
          return;
        }
      }
    }

    // check membership is empty
    if (this.coupon.membership == null) {
      //alert
      this._toastr.error(this._format.vi.validate_membership);
      return;
    }

    // check if minimum order is empty
    if (this.coupon.min_order == null) {
      //alert
      this._toastr.error(this._format.vi.validate_min_order);
      return;
    }

    // check if max discount is empty
    if (this.coupon.max_discount == null || this.coupon.max_discount == 0) {
      //alert
      this._toastr.error(this._format.vi.validate_max_discount);
      return;
    }

    // check if valid from is empty
    if (this.coupon.valid_from == null) {
      //alert
      this._toastr.error(this._format.vi.validate_valid_from);
      return;
    }

    // check if valid to is empty
    if (this.coupon.valid_to == null) {
      //alert
      this._toastr.error(this._format.vi.validate_valid_to);
      return;
    }

    // check if valid from is greater than valid to
    if (new Date(this.coupon.valid_from) > new Date(this.coupon.valid_to)) {
      //alert
      this._toastr.error(this._format.vi.validate_valid_from_greater_than_valid_to);
      return;
    }

    // final confirm
    if (confirm(this._format.vi.confirm_update_coupon)) {
      this.updateCoupon();
    }
  }
}
