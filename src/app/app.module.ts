import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // required animations module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminCouponComponent } from './admin-coupon/admin-coupon.component';
import { AdminCustomerComponent } from './admin-customer/admin-customer.component';
import { CollectionComponent } from './collection/collection.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { UpdateCouponComponent } from './update-coupon/update-coupon.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { ToastrModule } from 'ngx-toastr';
import { NewCouponComponent } from './new-coupon/new-coupon.component';
import { CategoryService } from 'src/services/category.service';
import { CollectionService } from 'src/services/collection.service';
import { CouponService } from 'src/services/coupon.service';
import { FormatService } from 'src/services/format.service';
import { OrderService } from 'src/services/order.service';
import { ProductService } from 'src/services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminCategoryComponent,
    AdminOrderComponent,
    AdminCouponComponent,
    AdminCustomerComponent,
    CollectionComponent,
    CreateCollectionComponent,
    AdminDashboardComponent,
    AdminProductComponent,
    AddProductComponent,
    OrderDetailComponent,
    UpdateCouponComponent,
    CollectionDetailComponent,
    CustomerDetailComponent,
    ProductDetailComponent,
    UpdateCategoryComponent,
    NewCategoryComponent,
    NewCouponComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      progressBar: true,
      preventDuplicates: true,
      closeButton: true,
    })
  ],
  providers: [
    CategoryService,
    CollectionService,
    CouponService,
    FormatService,
    OrderService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
