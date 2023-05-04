import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminCouponComponent } from './admin-coupon/admin-coupon.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { CollectionComponent } from './collection/collection.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminCustomerComponent } from './admin-customer/admin-customer.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { UpdateCouponComponent } from './update-coupon/update-coupon.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { NewCouponComponent } from './new-coupon/new-coupon.component';
const routes: Routes = [
  { path: "", component: AdminDashboardComponent },
  { path: "category", component: AdminCategoryComponent },
  { path: "category/update/:id", component: UpdateCategoryComponent },
  { path: "category/new", component: UpdateCategoryComponent },
  { path: "coupon", component: AdminCouponComponent },
  { path: "order/:status", component: AdminOrderComponent },
  { path: "collection", component: CollectionComponent },
  { path: "product", component: AdminProductComponent },
  { path: "login", component: AdminLoginComponent },
  { path: "product/add", component: AddProductComponent },
  { path: "customer", component: AdminCustomerComponent },
  { path: "order/detail/:id", component: OrderDetailComponent },
  { path: "coupon/update/:id", component: UpdateCouponComponent },
  // { path: "coupon/update/:id", component: NewCouponComponent },
  { path: "collection/new-collection", component: CreateCollectionComponent },
  { path: "collection/:id", component: CollectionDetailComponent },
  { path: "customer/id", component: CustomerDetailComponent },
  { path: "product/:id", component: ProductDetailComponent },
  { path: "coupon/new", component: NewCouponComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
