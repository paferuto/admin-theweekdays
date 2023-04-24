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
    detail_product: 'Chi tiết sản phẩm',
    detail_order: 'Chi tiết đơn hàng',
    detail_customer: 'Chi tiết khách hàng',
    create_collection: 'Thêm sưu tập',
    detail_collection: 'Chi tiết sưu tập',
    create_product: 'Thêm sản phẩm',

    // attribute
    id: 'ID',
    name: 'Tên',
    type: 'Loại',
    size: 'Kích thước',
    quantity: 'Số lượng',
    image: 'Hình ảnh',
    preview: 'Xem trước',
    excerpt: 'Mô tả ngắn',
    description: 'Mô tả',
    price: 'Giá bán',
    original_price: 'Giá gốc',
    on_sale: 'Đang giảm giá',
    min_qty: 'Số lượng tối thiểu',
    max_qty: 'Số lượng tối đa',
    variants: 'Biến thể',
    variant: 'Biến thể',
    variant_name: 'Tên biến thể',
    variant_value: 'Giá trị biến thể',
    is_active: 'Tình trạng',
    used: 'Đã dùng',
    all: 'Tổng',
    discount: 'Giảm giá',
    valid_from: 'Từ ngày',
    valid_to: 'Đến ngày',
    product_is_on_sale: 'Sản phẩm đang giảm giá',
    product_is_in_stock: 'Sản phẩm được mở bán',

    // button
    add: 'Thêm',
    modify: 'Sửa',
    delete: 'Xóa',
    cancel: 'Hủy',
    add_category: 'Thêm danh mục',
    update_category: 'Cập nhật danh mục',
    add_product: 'Thêm sản phẩm',
    update_product: 'Cập nhật sản phẩm',
    add_coupon: 'Thêm mã giảm giá',
    update_coupon: 'Cập nhật mã giảm giá',
  

    // confirmation
    confirm_add_product: 'Bạn có chắc chắn muốn thêm sản phẩm này không?',
    confirm_delete: 'Bạn có chắc chắn muốn xóa không?',

    // message
    require_fill_all: 'Vui lòng nhập đầy đủ thông tin',
    require_fill_image: 'Vui lòng tải ảnh lên',
    validate_add_product_price: 'Giá bán phải thấp hơn giá gốc trong trường hợp sản phẩm đang giảm giá',
    validate_add_product_quantity: 'Số lượng tối thiểu phải nhỏ hơn số lượng tối đa',
    validate_add_product_id: 'Mã sản phẩm đã tồn tại',
    success_modify: 'Sửa thành công',
    fail_modify: 'Sửa thất bại',
    success_delete: 'Xóa thành công',
    fail_delete: 'Xóa thất bại',

    success_add: 'Thêm thành công',
    fail_add: 'Thêm thất bại',

    membership: 'Thành viên',
    min_order: 'Đơn hàng tối thiểu',
    max_discount: 'Giảm tối đa',


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
    return status ? 'Hiệu lực' : 'Không hiệu lực';
  }

  // coupon type format
  couponTypeFormat(is_percentage: boolean, value: number) {
    if (is_percentage) {
      return `${value}%`;
    } else {
      return this.formatCurrency(value);
    }
  }

  // format currency
  formatCurrency(value: number) {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  //date format dd/mm/yyyy from ISOstring
  formatDate(date: string) {

    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
