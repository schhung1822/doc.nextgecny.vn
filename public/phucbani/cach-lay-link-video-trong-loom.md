Tài liệu này hướng dẫn quản trị viên hoặc người dùng cách lấy **link nhúng (embed code)** của video trên Loom để chèn vào website, landing page hoặc các hệ thống quản trị nội dung khác. Vui lòng thực hiện theo đúng các bước dưới đây để đảm bảo video hiển thị chính xác.

---

### Bước 1: Mở video cần lấy link nhúng
Đầu tiên, bạn cần truy cập vào video đã được tải lên trên hệ thống Loom.

1. Đăng nhập vào tài khoản Loom.
2. Mở video mà bạn muốn nhúng vào website.
3. Tại giao diện xem video, quan sát góc trên bên phải màn hình.
4. Nhấn vào nút **Share** để mở các tùy chọn chia sẻ video.

![Mở chia sẻ video Loom](/phucbani/img/loom1.webp)
*Hình 1: Nhấn vào nút Share để bắt đầu lấy mã nhúng video.*

> **Gợi ý:** Hãy kiểm tra quyền chia sẻ của video trước để đảm bảo video có thể được hiển thị khi nhúng lên website.

---

### Bước 2: Chuyển sang tab Embed
Sau khi nhấn vào nút **Share**, cửa sổ chia sẻ sẽ hiển thị với nhiều tùy chọn khác nhau.

1. Trong cửa sổ chia sẻ, chọn tab **Embed**.
2. Tại đây, Loom sẽ cung cấp các tùy chọn để nhúng video.
3. Bạn có thể chọn kiểu hiển thị như:
   * **Responsive size**: Kích thước tự co giãn theo giao diện.
   * **Fixed size**: Kích thước cố định theo cấu hình bạn chọn.

![Chọn tab Embed trong Loom](/phucbani/img/loom2.webp)
*Hình 2: Chọn tab Embed và chuẩn bị sao chép mã nhúng.*

---

### Bước 3: Sao chép mã nhúng video
Sau khi đã chọn tab **Embed**, bạn chỉ cần sao chép đoạn mã nhúng để sử dụng.

1. Nhấn vào nút **Copy embed code**.
2. Loom sẽ tự động sao chép đoạn mã nhúng vào bộ nhớ tạm.
3. Dán đoạn mã này vào khu vực hỗ trợ HTML hoặc nhúng iframe trên website của bạn.

> **Lưu ý:** Mã nhúng thường có định dạng `iframe`. Bạn cần dán đúng vào khu vực cho phép chèn mã HTML để video hiển thị chính xác.

Ví dụ đoạn mã nhúng có thể có dạng:

```html
<iframe
  src="https://www.loom.com/embed/your-video-id"
  frameborder="0"
  webkitallowfullscreen
  mozallowfullscreen
  allowfullscreen>
</iframe>