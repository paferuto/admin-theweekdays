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
  coupon: any = [];

  constructor(private _service: CouponService, private _router: Router, public _format: FormatService, private _title: Title, private toastr: ToastrService) {
    this._title.setTitle(this._format.vi.add_coupon);
  }

  confirmCreate() {
  // check if coupon title is empty
    if (this.newCoupon.title == '') {
     this.toastr.error(this._format.vi.validate_title);
      return;
    }

    // check if coupon code is empty
    if(this.newCoupon.coupon_code == ''){
      //alert
      this.toastr.error(this._format.vi.validate_code);
      return;
    }
    // check if quantity all is empty
    if(this.newCoupon.quantity.all == null || this.newCoupon.quantity.all == 0){
      //alert
      this.toastr.error(this._format.vi.validate_quantity);
      return;
    }

    // check if value are filled 
    if(this.newCoupon.value == null || this.newCoupon.value == 0){
      //alert
      this.toastr.error(this._format.vi.validate_value);
      return;
    }
     
  // check membership is empty
    if(this.newCoupon.membership == null){
      //alert
      this.toastr.error(this._format.vi.validate_membership);
      return;
    }

    // check if minimum order is empty
    if(this.newCoupon.min_order == null ){
      //alert
      this.toastr.error(this._format.vi.validate_min_order);
      return;
    }

    // check if max discount is empty
    if(this.newCoupon.max_discount == null || this.newCoupon.max_discount == 0){
      //alert
      this.toastr.error(this._format.vi.validate_max_discount);
      return;
    }
    // check if valid from is empty
    if(this.newCoupon.valid_from == null){
      //alert
      this.toastr.error(this._format.vi.validate_valid_from);
      return;
    }
    // check if valid to is empty
    if(this.newCoupon.valid_to == null){
      //alert
      this.toastr.error(this._format.vi.validate_valid_to);
      return;
    }
    // final confirm
    if( confirm(this._format.vi.confirm_add_coupon))
    {
      console.log(this.newCoupon);
      this.addCoupon();
    }
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
