
Tài liệu này hướng dẫn cách tạo mới một **khóa học** và thêm **bài học** vào trong hệ thống quản trị. Nội dung bao gồm các bước thiết lập cơ bản của khóa học, cấu hình giá bán, xây dựng chương trình học và các lưu ý quan trọng để bài học hiển thị đúng trên website.

---

## Phần 1: Tạo khóa học mới

Đây là bước đầu tiên để khởi tạo một khóa học trước khi thêm các bài học bên trong.

### Bước 1: Truy cập mục Khóa học
1. Tại menu bên trái, chọn **MasterStudy**.
2. Nhấn vào mục **Khóa học**.
3. Chọn nút **Add New Khóa học** để tạo khóa học mới.

![Tạo khóa học mới](/phucbani/img/dkh1.webp)
*Hình 1: Truy cập danh sách khóa học và tạo khóa học mới.*

---

## Phần 2: Thiết lập thông tin cơ bản cho khóa học

Sau khi tạo mới, bạn cần cấu hình các thông tin chính trong tab **Settings**.

### Bước 2: Nhập thông tin cơ bản trong tab Settings
Trong phần này, bạn chỉ cần tập trung vào 3 tab quan trọng:
* **Curriculum (Lộ trình)**
* **Settings (Thiết lập)**
* **Pricing (Giá)**

Tại tab **Settings** → mục **Main**, nhập các thông tin sau:
1. **Course name:** Nhập tên khóa học.
2. **Category:** Chọn danh mục khóa học phù hợp.
3. **Level:** Chọn cấp độ khóa học.
4. **Image:** Tải ảnh đại diện khóa học.
5. **Description:** Nhập mô tả chi tiết khóa học.
6. **Course preview description:** Nhập mô tả ngắn hiển thị ngoài website.

![Thiết lập thông tin khóa học](/phucbani/img/dkh2.webp)
*Hình 2: Thiết lập thông tin cơ bản của khóa học trong tab Settings.*

![Mô tả chi tiết và mô tả ngắn](/phucbani/img/dkh3.webp)
*Hình 3: Nhập mô tả chi tiết và mô tả ngắn cho khóa học.*

> **Gợi ý:**  
> - **Mô tả chi tiết** dùng để giới thiệu đầy đủ nội dung khóa học, lợi ích, đối tượng phù hợp.  
> - **Mô tả ngắn** nên viết ngắn gọn, súc tích để hiển thị đẹp ngoài giao diện danh sách khóa học.

---

## Phần 3: Thiết lập giá khóa học

Nếu khóa học là khóa miễn phí hoặc có ưu đãi, bạn cần cấu hình tại tab **Pricing**.

### Bước 3: Cài đặt giá bán trong tab Pricing
1. Chuyển sang tab **Pricing**.
2. Bật tùy chọn **One-time purchase**.
3. Nhập:
   * **Price:** Giá gốc của khóa học.
   * **Sale price:** Giá khuyến mãi (nếu có).
4. Nhấn **Save** để lưu lại.

![Thiết lập giá khóa học](/phucbani/img/dkh4.webp)
*Hình 4: Thiết lập giá gốc và giá khuyến mãi cho khóa học.*

> **Lưu ý:**  
> - Nếu khóa học miễn phí, kiểm tra lại chính sách hiển thị của website trước khi để giá `0`.  
> - Nếu có giá khuyến mãi, cần chắc chắn rằng **Sale price** nhỏ hơn **Price**.

---

## Phần 4: Thêm chương và bài học trong Curriculum

Sau khi hoàn tất thông tin khóa học, bạn tiến hành tạo cấu trúc nội dung học trong tab **Curriculum**.

### Bước 4: Tạo chương học
1. Chuyển sang tab **Curriculum**.
2. Ở cột bên trái, nhấn **New section** để tạo một chương mới.
3. Nhập tên chương theo nội dung học.

### Bước 5: Thêm bài học vào chương
1. Trong chương vừa tạo, nhấn **Add a lesson**.
2. Nhập **tiêu đề bài học**.
3. Chọn định dạng bài học phù hợp.

![Thêm chương và bài học](/phucbani/img/dkh5.webp)
*Hình 5: Tạo chương học và thêm bài học vào Curriculum.*

---

## Phần 5: Nhập nội dung bài học

Đây là phần quan trọng nhất khi đăng từng bài học.

### Bước 6: Thiết lập video bài học
Tại màn hình chỉnh sửa bài học:
1. Nhập **tiêu đề bài học** ở phía trên.
2. Trong mục **Source type**, chọn **Embed**.
3. Dán **mã nhúng video Loom** vào ô **Embed iframe content**.
4. Nếu cần, nhập thêm **mô tả ngắn của bài học**.
5. Có thể nhập thêm nội dung chi tiết ở phần **Lesson content** nếu bài học cần bổ sung văn bản, hướng dẫn hoặc tài liệu.

---

## Phần 6: Kiểm tra và xuất bản khóa học

Sau khi đã hoàn tất thông tin khóa học và bài học:
1. Kiểm tra lại các tab **Settings**, **Pricing**, **Curriculum**.
2. Đảm bảo tất cả bài học đã được lưu.
3. Nhấn **Published** hoặc lưu thay đổi để xuất bản khóa học.

---

## Những lưu ý quan trọng khi đăng bài học

Đây là các điểm cần kiểm tra kỹ để tránh lỗi hiển thị hoặc sai nội dung khi học viên truy cập.

### 1. Luôn dùng mã nhúng video đúng định dạng
* Bài học video phải dùng **mã nhúng embed**.
* Không dán link Loom thông thường vào ô video nếu hệ thống yêu cầu `iframe`.

Ví dụ đúng:
```html
<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe src="https://www.loom.com/embed/VIDEO_ID"
  frameborder="0"
  webkitallowfullscreen
  mozallowfullscreen
  allowfullscreen
  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>