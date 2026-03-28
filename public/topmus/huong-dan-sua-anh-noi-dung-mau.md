Tài liệu này hướng dẫn cách chỉnh sửa **hình ảnh và nội dung trong các mẫu Section** của website.  
Các Section này được dùng lại cho nhiều trang khác nhau, vì vậy khi chỉnh sửa tại đây, nội dung sẽ cập nhật trên tất cả các trang sử dụng Section đó.

---

## Mẫu Section nằm ở đâu
Các mẫu Section được lưu trong Elementor Templates.

### Cách truy cập:
1. Vào **Elementor → Editor**
2. Chọn **Mẫu đã lưu**
3. Chọn tab **Section**
4. Chọn Section cần chỉnh sửa

> Các section như: Giá trị cốt lõi, Quyền lợi, Lộ trình, Nhà sáng tạo Live… đều nằm ở đây.

---

## Bước 1: Mở Section cần chỉnh sửa
1. Vào **Elementor → Mẫu đã lưu**
2. Tìm Section cần sửa
3. Nhấn **Chỉnh sửa với Elementor**

![Template Elementor](/topmus/img/mau-1.webp)
*Hình 1: Mở Section cần chỉnh sửa.*

---

## Có 2 loại Section trên website
Website sử dụng 2 loại Section:

| Loại Section | Cách chỉnh |
|--------------|------------|
| Section dùng Widget Elementor | Sửa text/ảnh trực tiếp |
| Section viết bằng HTML/CSS | Sửa trong mã HTML |

---

## Loại 1: Section dùng Widget Elementor
Với các Section dạng này, bạn có thể sửa như bình thường:

### Sửa nội dung:
1. Nhấn vào Text
2. Sửa nội dung bên trái
3. Update

### Sửa hình:
1. Nhấn vào Image
2. Chọn ảnh mới
3. Update

---

## Loại 2: Section viết bằng HTML/CSS
Một số Section được code bằng HTML/CSS để có layout đặc biệt.

Khi bấm vào Section sẽ thấy **HTML Widget** và mã HTML.

![Template Elementor](/topmus/img/mau2.webp)
*Hình 2: Sửa section viết bằng HTML/CSS.*

### Cấu trúc HTML thường gặp:
```html
<div class="card-item03">
    <img src="/wp-content/uploads/2026/03/anh1.webp" />
    <div class="card-content03">
        <h3 class="card-title03">Tiêu đề</h3>
        <p class="card-description03">Nội dung mô tả</p>
    </div>
</div>