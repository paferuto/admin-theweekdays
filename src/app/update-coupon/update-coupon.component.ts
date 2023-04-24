import { Component } from '@angular/core';
import { CouponService } from 'src/services/coupon.service';
import { Coupon } from '../coupon';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormatService } from 'src/services/format.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: '[app-update-coupon]',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent {
  id: string = '';
  selectedCoupon: any = {};
  coupon: any = {};
  errMessage: string = '';

  public setCoupon(coupon: any) {
    this.coupon = coupon;
  }

  constructor(private _service: CouponService, private _router: Router, private _activerouter: ActivatedRoute, public _format: FormatService, private _title: Title) {
    this._title.setTitle(this._format.vi.update_coupon);
    if (this._activerouter.snapshot.params['id']) {
      this.id = this._activerouter.snapshot.params['id'];
      this._service.getCouponById(this.id).subscribe(
        {
          next: (data) => {
            this.coupon = data;
            this.selectedCoupon = data;
            // new date format dd/MM/yyyy
            this.coupon.valid_from = new Date(this.coupon.valid_from).toLocaleDateString('en-CA');
            this.coupon.valid_to = new Date(this.coupon.valid_to).toLocaleDateString('en-CA');
          },
          error: (err) => { this.errMessage = err }
        }
      )
    } else {
      this._router.navigate(['/coupon']);
    }
  }

  getCouponById(id: string) {
    this._service.getCouponById(id).subscribe(
      {
        next: (data) => { this.coupon = data },
        error: (err) => { this.errMessage = err }
      }
    )
  }

  onFileSelected(event: any, coupon: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      coupon.image = reader.result!.toString();
    };
    reader.onerror = function (error) {
    }
    this.setCoupon(coupon);
  }

  updateCoupon() {
    this.coupon.is_active = this.coupon.is_active == 'true';
    this._service.updateCoupon(this.id, this.coupon).subscribe({
      next: (data) => { this.coupon = data
        setTimeout(() => {
          this._router.navigate(['/coupon']);
        }, 500);
        console.log(this.coupon);
      },
      error: (err) => { this.errMessage = err }
    })
  }
}
