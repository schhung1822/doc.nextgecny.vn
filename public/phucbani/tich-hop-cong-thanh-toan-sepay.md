Tài liệu này hướng dẫn cách kết nối cổng thanh toán **SePay** vào website thông qua WooCommerce.  
Phương pháp sử dụng là **kết nối tự động (OAuth)** giúp bạn không cần cấu hình thủ công API phức tạp.

---

## ⚠️ Điều kiện trước khi thực hiện

Trước khi bắt đầu, bạn cần đảm bảo:

* Đã có tài khoản **SePay**
* Đã đăng nhập sẵn vào hệ thống SePay trên trình duyệt
* Website đã cài đặt WooCommerce

> 💡 **Lưu ý:**  
> Việc đăng nhập SePay trước sẽ giúp quá trình kết nối diễn ra nhanh chóng và tự động.

---

## Bước 1: Truy cập cài đặt thanh toán

1. Tại menu bên trái, chọn **WooCommerce**  
2. Nhấn vào mục **Thanh toán**  
3. Tìm đến phương thức **SePay**  
4. Nhấn nút **Cài đặt**

![Truy cập cài đặt SePay](/phucbani/img/tt1.webp)
*Hình 1: Truy cập danh sách phương thức thanh toán và chọn SePay.*

---

## Bước 2: Kết nối tài khoản SePay tự động

Sau khi vào trang cài đặt SePay:

1. Nhấn nút **Kết nối SePay**
2. Hệ thống sẽ tự động chuyển hướng sang SePay
3. Xác nhận kết nối tài khoản

![Kết nối SePay](/phucbani/img/tt2.webp)
*Hình 2: Nhấn kết nối SePay để thực hiện liên kết tự động.*

Sau khi xác nhận:
* Website sẽ tự động nhận:
  - Thông tin tài khoản ngân hàng  
  - Webhook  
  - API cần thiết  

👉 Bạn **không cần nhập thủ công bất kỳ thông tin kỹ thuật nào**

---

## Bước 3: Kích hoạt cổng thanh toán

Sau khi kết nối thành công:

1. Tick chọn **Bật/Tắt SePay Gateway**
2. Nhập:
   * **Tên hiển thị:** Ví dụ: *Chuyển khoản ngân hàng (Quét mã QR)*
   * **Mô tả:** Nội dung hiển thị cho khách khi thanh toán
3. Nhấn **Lưu thay đổi**

---

## Bước 4: Kiểm tra hoạt động thanh toán

Sau khi hoàn tất:

1. Truy cập trang thanh toán trên website
2. Chọn phương thức **SePay**
3. Kiểm tra:
   * Có hiển thị QR Code hoặc thông tin chuyển khoản
   * Thanh toán có được xác nhận tự động hay không

---

## Ưu điểm của kết nối tự động SePay

| Tính năng | Lợi ích |
| :--- | :--- |
| **Kết nối OAuth** | Không cần nhập API thủ công |
| **Tự động đồng bộ ngân hàng** | Giảm sai sót cấu hình |
| **Xác nhận thanh toán tự động** | Không cần kiểm tra thủ công |
| **Tích hợp nhanh** | Chỉ cần 1 click kết nối |

---

## ⚠️ Các lưu ý quan trọng

### 1. Phải đăng nhập SePay trước khi kết nối
Nếu chưa đăng nhập:
* Hệ thống có thể lỗi hoặc không kết nối được
* Phải đăng nhập lại và thực hiện lại bước kết nối

---

### 2. Không chỉnh sửa API thủ công sau khi kết nối
* Vì hệ thống đã tự động cấu hình
* Việc sửa thủ công có thể gây lỗi thanh toán

---

### 3. Kiểm tra trạng thái kích hoạt
* Đảm bảo SePay đang ở trạng thái **Enabled**
* Nếu chưa bật, khách hàng sẽ không thấy phương thức thanh toán

---

### 4. Kiểm tra webhook hoạt động
* Nếu thanh toán không tự xác nhận:
  - Có thể webhook chưa hoạt động
  - Thử kết nối lại SePay

---

### 5. Test thanh toán trước khi sử dụng chính thức
* Luôn thực hiện ít nhất 1 giao dịch test
* Đảm bảo:
  - Nhận tiền thành công  
  - Đơn hàng cập nhật trạng thái đúng  

---

## Bảng tóm tắt nhanh

| Bước | Hành động |
| :--- | :--- |
| 1 | Vào WooCommerce → Thanh toán |
| 2 | Chọn SePay → Cài đặt |
| 3 | Nhấn **Kết nối SePay** |
| 4 | Xác nhận kết nối |
| 5 | Bật cổng thanh toán |
| 6 | Test thanh toán |

---

## Gợi ý quy trình chuẩn

1. Đăng nhập SePay  
2. Kết nối SePay với website  
3. Kích hoạt thanh toán  
4. Test đơn hàng  
5. Đưa vào sử dụng chính thức  

---

*Tài liệu này được biên soạn bởi đội ngũ kỹ thuật Nextgency.*