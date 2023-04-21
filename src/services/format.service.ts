import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }
  // ========================  UI LANGUAGE  =========================
  public vi = {
    // page title
    home: 'Trang chủ',
    category: 'Danh mục',
    product: 'Sản phẩm',
    customer: 'Khách hàng',
    order: 'Đơn hàng',
    collection: 'Bộ sưu tập',
    coupon: 'Mã giảm giá',
    logout: 'Đăng xuất',

    // attribute
    id: 'ID',
    name: 'Tên',
    type: 'Loại',
    image: 'Hình ảnh',
    preview: 'Xem trước',

    // button
    add_category: 'Thêm danh mục',
    update_category: 'Cập nhật danh mục',
    modify: 'Sửa',
    delete: 'Xóa',

    // message
    require_fill_all: 'Vui lòng nhập đầy đủ thông tin',
    success_modify: 'Sửa thành công',
    confirm_delete: 'Bạn có chắc chắn muốn xóa không?',
    success_delete: 'Xóa thành công',
    fail_delete: 'Xóa thất bại',

    // others
    default: 'Mặc định',
  };

  public en = {
    home: 'Home',
    category: 'Category',
    product: 'Product',
  };

  // ========================  FOR ALL OBJECTS  =========================
  // shorten the object id
  shortenObjectId(id: string) {
    return id.substring(0, 5) + '...' + id.substring(id.length - 5, id.length);
  }

  // ========================  FOR COUPON  =========================
  // coupon active status
  couponActiveStatus(status: boolean) {
    return status ? 'Còn hiệu lực' : 'Hết hiệu lực';
  }

  // coupon type format
  couponTypeFormat(is_percentage: boolean, value: number) {
    return is_percentage ? value + '%' : value + 'đ';
  }

}
