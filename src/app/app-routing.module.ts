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
import { NewCategoryComponent } from './new-category/new-category.component';

const routes: Routes = [
  { path: "", component: AdminDashboardComponent },
  { path: "category", component: AdminCategoryComponent },
  { path: "category/update/id", component: UpdateCategoryComponent }, //Khi đã có API thì viết lại đoạn này thành category/update/:id
  { path: "category/new", component: NewCategoryComponent },
  { path: "coupon", component: AdminCouponComponent },
  { path: "order", component: AdminOrderComponent },
  { path: "collection", component: CollectionComponent },
  { path: "product", component: AdminProductComponent },
  { path: "logout", component: AdminLoginComponent },
  { path: "product/add", component: AddProductComponent },
  { path: "customer", component: AdminCustomerComponent },
  { path: "order/detail", component: OrderDetailComponent }, //Khi đã có API thì viết lại đoạn này thành order/:id
  { path: "coupon/update", component: UpdateCouponComponent }, //Khi đã có API thì viết lại đoạn này thành coupon/:id
  { path:"collection/new-collection", component:CreateCollectionComponent},
  { path: "collection/detail", component: CollectionDetailComponent }, //Khi đã có API thì viết lại đoạn này thành collection/:id
  { path:"customer/id", component:CustomerDetailComponent}, //Khi đã có API thì viết lại đoạn này thành customer/:id
  { path:"product/:id", component:ProductDetailComponent} //Khi đã có API thì viết lại thành product/:id
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
