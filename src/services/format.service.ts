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
    login: 'Đăng nhập',
    detail_product: 'Chi tiết sản phẩm',
    detail_order: 'Chi tiết đơn hàng',
    detail_customer: 'Chi tiết khách hàng',
    create_collection: 'Thêm sưu tập',
    detail_collection: 'Chi tiết sưu tập',
    create_product: 'Thêm sản phẩm',
    new_collection: 'Bộ sưu tập mới',

    // attribute
    id: 'ID',
    name: 'Tên',
    type: 'Loại',
    size: 'Kích thước',
    quantity: 'Số lượng',
    image: 'Hình ảnh',
    preview: 'Xem trước',
    description: 'Mô tả',
    excerpt: 'Mô tả ngắn',
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
    membership: ' Điểm thành viên',
    min_order: 'Đơn hàng tối thiểu',
    max_discount: 'Giảm tối đa',
    percentage: 'Phần trăm',
    list_coupon: 'Danh sách mã giảm giá',
    order_date: 'Ngày đặt hàng',
    order_id: 'Mã đơn hàng',
    customer_id: 'Mã khách hàng',
    total: 'Tổng tiền',
    detail: 'Chi tiết',
    payment_method: 'Phương thức thanh toán',
    status: 'Trạng thái',
    product_id: 'Mã sản phẩm',
    sub_total: 'Tạm tính',
    order_value: 'Giá trị đơn hàng',
    delivery_fee: 'Phí vận chuyển',
    ordered: 'Đã đặt',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
    processing: 'Đang xử lý',
    completed: 'Đã hoàn thành',
    created_date: 'Ngày tạo',
    gender: 'Giới tính',
    male: 'Nam',
    female: 'Nữ',
    undefined: 'Không xác định',
    dob: 'Ngày sinh',
    order_history: 'Lịch sử đơn hàng',


    // button
    add_category: 'Thêm danh mục',
    update_category: 'Cập nhật danh mục',
    modify: 'Sửa',
    delete: 'Xóa',
    add: "Thêm",
    close: 'Đóng',
    cancel: 'Hủy',
    add_product: 'Thêm sản phẩm',
    update_product: 'Cập nhật sản phẩm',
    add_coupon: 'Thêm mã giảm giá',
    update_coupon: 'Cập nhật mã giảm giá',
    update_status:'Cập nhật trạng thái',
    change: 'Thay đổi',

    // confirmation
    confirm_add_product: 'Bạn có chắc chắn muốn thêm sản phẩm này không?',
    confirm_add_coupon: 'Bạn có chắc chắn muốn thêm mã giảm giá này không?',
    confirm_update_coupon: 'Bạn có chắc chắn muốn cập nhật mã giảm giá này không?',
    confirm_delete: 'Bạn có chắc chắn muốn xóa không?',
    confirm_add: 'Bạn có chắc chắn muốn thêm không?',
    confirm_update: 'Bạn có chắc chắn muốn cập nhật không?',
    error_update_status: 'Bạn không thể cập nhật trạng thái đơn hàng này',
    confirm_logout: 'Bạn có chắc chắn muốn đăng xuất không?',

    // message
    require_fill_all: 'Vui lòng nhập đầy đủ thông tin',
    require_fill_image: 'Vui lòng tải ảnh lên',
    validate_add_product_price: 'Giá bán phải thấp hơn giá gốc trong trường hợp sản phẩm đang giảm giá',
    validate_add_product_quantity: 'Số lượng tối thiểu phải nhỏ hơn số lượng tối đa',
    validate_add_product_id: 'Mã sản phẩm đã tồn tại',
    validate_value_percentage: 'Giá trị giảm giá phải nằm trong khoảng 0 - 100',
    validate_title: 'Vui lòng nhập tên Mã sản phẩm',
    validate_code: 'Vui lòng nhập Mã sản phẩm',
    validate_coupon_value: 'Vui lòng nhập giá trị Giảm giá của mã',
    validate_description: 'Vui lòng nhập mô tả',
    validate_lookbook: 'Vui lòng nhập lookbook',
    validate_quantity: 'Vui lòng nhập số lượng Mã giảm giá',
    validate_membership: 'Vui lòng chọn điểm thành viên',
    validate_min_order: 'Vui lòng nhập đơn hàng tối thiểu',
    validate_max_discount: 'Vui lòng nhập giá trị giảm giá tối đa',
    validate_name: 'Vui lòng nhập tên',
    validate_valid_from: 'Vui lòng chọn ngày bắt đầu',
    validate_valid_to: 'Vui lòng chọn ngày kết thúc',
    validate_videoID: 'Vui lòng nhập ID video',
    validate_coupon_code_exist: 'Mã giảm giá đã tồn tại',
    validate_valid_from_greater_than_valid_to: 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc',
    success_modify: 'Sửa thành công',
    fail_modify: 'Sửa thất bại',
    success_delete: 'Xóa thành công',
    fail_delete: 'Xóa thất bại',
    success_add: 'Thêm thành công',
    fail_add: 'Thêm thất bại',
    success_update_status: 'Cập nhật trạng thái thành công',
    status_repeat: 'Trạng thái đã tồn tại',
    selected: 'Đã chọn',
    validate_fill_product: 'Vui lòng chọn sản phẩm',
    fail_login: 'Đăng nhập thất bại',
    fail_login_message: "Tên đăng nhập hoặc mật khẩu chưa đúng!",
    success_logout: 'Đăng xuất thành công',
    success_logout_message: 'Hẹn gặp lại bạn!',
    fail_logout: 'Đăng xuất thất bại',
    fail_logout_message: 'Bạn chưa đăng nhập!',
    confirm_cancel: 'Bạn có chắc chắn muốn hủy không?',
    success_add_collection: 'Thêm bộ sưu tập thành công',

    // placeholder
    enter_name: 'Nhập tên',
    enter_id: 'Nhập ID sản phẩm.',
    product_id_syntax: 'Cú pháp: "ID1, ID2, ID3, ..."',
    enter_product_name: "Nhập tên sản phẩm",

    // others
    default: 'Mặc định',
  };

  public en = {
    home: 'Home',
    category: 'Category',
    product: 'Product',
  };

  // ========================  FOR ALL OBJECTS  =========================
  // style button for active status
  styleButtonActiveStatus(status: boolean) {
    return status ? 'btn btn-success disabled rounded-5' : 'btn btn-danger disabled rounded-5';
  }

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
