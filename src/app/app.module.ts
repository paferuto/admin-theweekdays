import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }