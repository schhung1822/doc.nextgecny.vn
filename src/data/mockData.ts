export type DocType = 'installation' | 'guide' | 'faq' | 'api';

export interface Document {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: DocType;
  isPartnerOnly: boolean;
  content: string; // Markdown or HTML content
  productId: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const initialCategories: Category[] = [
  { id: 'c1', name: 'Website Development', description: 'Các hệ thống quản trị nội dung và thương mại điện tử.' },
  { id: 'c2', name: 'Hệ thống automation', description: 'Ứng dụng di động cho quản lý bán hàng và dịch vụ.' },
  { id: 'c3', name: 'Công Cụ & Tiện Ích', description: 'Các công cụ hỗ trợ marketing và quản lý dự án.' },
];

export const initialProducts: Product[] = [
  { id: 'p1', slug: 'website-qc-house', name: 'Website QC House', description: 'Web giới thiệu doanh nghiệp, blog & tuyển dụng', categoryId: 'c1', icon: 'LayoutTemplate' },
  { id: 'p2', slug: 'website-phuc-bani', name: 'Website Hawk Media (Phúc BANI)', description: 'Website E-learning kết hợp blog', categoryId: 'c1', icon: 'GraduationCap' },
  { id: 'p8', slug: 'website-fpt-telecom-bac-ninh', name: 'Website FPT Telecom', description: 'Web giới thiệu doanh nghiệp, blog & tuyển dụng', categoryId: 'c1', icon: 'LayoutTemplate' },
  { id: 'p3', slug: 'ung-dung-quan-ly-ban-hang-sales-app', name: 'Ứng dụng Quản lý Bán hàng (Sales App)', description: 'Ứng dụng di động hỗ trợ đội ngũ sales.', categoryId: 'c2', icon: 'Smartphone' },
  { id: 'p4', slug: 'ung-dung-dat-lich-dich-vu-booking-app', name: 'Ứng dụng Đặt lịch & Dịch vụ (Booking App)', description: 'Giải pháp đặt lịch hẹn thông minh.', categoryId: 'c2', icon: 'CalendarDays' },
  { id: 'p5', slug: 'cong-cu-tu-dong-hoa-marketing-marketing-tool', name: 'Công cụ Tự động hóa Marketing (Marketing Tool)', description: 'Tối ưu hóa các chiến dịch tiếp thị.', categoryId: 'c3', icon: 'Megaphone' },
  { id: 'p6', slug: 'cong-cu-quan-ly-du-an-project-tool', name: 'Công cụ Quản lý Dự án (Project Tool)', description: 'Theo dõi tiến độ và cộng tác nhóm.', categoryId: 'c3', icon: 'Kanban' },
  { id: 'p7', slug: 'website-topmus', name: 'Website TOPMUS', description: 'Web giới thiệu doanh nghiệp, blog & tuyển dụng', categoryId: 'c1', icon: 'LayoutTemplate' },
  { id: 'p9', slug: 'website-hoang-minh-logistic', name: 'Website Hoàng Minh', description: 'Web giới thiệu doanh nghiệp, blog & tuyển dụng', categoryId: 'c1', icon: 'LayoutTemplate' },
];

export const initialDocuments: Document[] = [
  // Sales App
  { id: 'd8', slug: 'huong-dan-cai-dat-dang-nhap-ung-dung', title: 'Hướng dẫn Cài đặt & Đăng nhập Ứng dụng', description: 'Cài đặt app trên iOS và Android.', type: 'installation', isPartnerOnly: false, productId: 'p3', content: '/docs/d8.md' },
  { id: 'd9', slug: 'quan-ly-khach-hang-lich-hen', title: 'Quản lý Khách hàng & Lịch hẹn', description: 'Theo dõi thông tin khách hàng tiềm năng.', type: 'guide', isPartnerOnly: false, productId: 'p3', content: '/docs/d9.md' },
  { id: 'd10', slug: 'xem-bao-cao-doanh-thu-tren-dien-thoai', title: 'Xem Báo cáo Doanh thu trên Điện thoại', description: 'Theo dõi biểu đồ doanh thu theo thời gian thực.', type: 'guide', isPartnerOnly: false, productId: 'p3', content: '/docs/d10.md' },
  { id: 'd11', slug: 'huong-dan-ket-noi-app-voi-he-thong-crm', title: 'Hướng dẫn Kết nối App với Hệ thống CRM', description: 'Đồng bộ dữ liệu hai chiều với CRM.', type: 'api', isPartnerOnly: true, productId: 'p3', content: '/docs/d11.md' },

  // Booking App
  { id: 'd12', slug: 'huong-dan-dat-lich-thanh-toan-tren-app', title: 'Hướng dẫn Đặt lịch & Thanh toán trên App', description: 'Quy trình đặt dịch vụ cho khách hàng.', type: 'guide', isPartnerOnly: false, productId: 'p4', content: '/docs/d12.md' },
  { id: 'd13', slug: 'quan-ly-lich-hen-nhan-vien', title: 'Quản lý Lịch hẹn & Nhân viên', description: 'Sắp xếp ca làm việc cho nhân sự.', type: 'guide', isPartnerOnly: false, productId: 'p4', content: '/docs/d13.md' },
  { id: 'd14', slug: 'huong-dan-tich-hop-cong-thanh-toan-quoc-te', title: 'Hướng dẫn Tích hợp Cổng Thanh toán Quốc tế', description: 'Kết nối Stripe/PayPal.', type: 'api', isPartnerOnly: true, productId: 'p4', content: '/docs/d14.md' },

  // Marketing Tool
  { id: 'd15', slug: 'huong-dan-tao-chien-dich-email-marketing', title: 'Hướng dẫn Tạo Chiến dịch Email Marketing', description: 'Thiết kế và gửi email hàng loạt.', type: 'guide', isPartnerOnly: false, productId: 'p5', content: '/docs/d15.md' },
  { id: 'd16', slug: 'quan-ly-danh-sach-khach-hang-phan-khuc', title: 'Quản lý Danh sách Khách hàng & Phân khúc', description: 'Phân loại khách hàng theo hành vi.', type: 'guide', isPartnerOnly: false, productId: 'p5', content: '/docs/d16.md' },
  { id: 'd17', slug: 'theo-doi-hieu-qua-chien-dich-bao-cao', title: 'Theo dõi Hiệu quả Chiến dịch & Báo cáo', description: 'Đo lường tỷ lệ mở, click.', type: 'guide', isPartnerOnly: false, productId: 'p5', content: '/docs/d17.md' },
  { id: 'd18', slug: 'huong-dan-su-dung-api-gui-tin-nhan-zalo-sms', title: 'Hướng dẫn Sử dụng API gửi Tin nhắn Zalo/SMS', description: 'Tích hợp gửi tin nhắn tự động.', type: 'api', isPartnerOnly: true, productId: 'p5', content: '/docs/d18.md' },

  // Project Tool
  { id: 'd19', slug: 'huong-dan-tao-du-an-quan-ly-nhiem-vu', title: 'Hướng dẫn Tạo Dự án & Quản lý Nhiệm vụ', description: 'Khởi tạo dự án và giao việc.', type: 'guide', isPartnerOnly: false, productId: 'p6', content: '/docs/d19.md' },
  { id: 'd20', slug: 'quan-ly-thanh-vien-trao-doi-cong-viec', title: 'Quản lý Thành viên & Trao đổi Công việc', description: 'Thêm thành viên và thảo luận.', type: 'guide', isPartnerOnly: false, productId: 'p6', content: '/docs/d20.md' },
  { id: 'd21', slug: 'huong-dan-ket-noi-tool-voi-google-calendar', title: 'Hướng dẫn Kết nối Tool với Google Calendar', description: 'Đồng bộ deadline lên lịch Google.', type: 'api', isPartnerOnly: true, productId: 'p6', content: '/docs/d21.md' },

  // TOPMUS
  { id: 'd22', slug: 'dang-tin-tuc-bai-viet', title: 'Đăng tin tức bài viết', description: 'Khởi tạo các tin tức và bài viết về TOPMUS.', type: 'guide', isPartnerOnly: false, productId: 'p7', content: '/topmus/dang-tin-tuc-bai-viet.md' },
  { id: 'd23', slug: 'dang-tin-tuyen-dung', title: 'Đăng tin tuyển dụng', description: 'Đăng tin tuyển dụng các vị trí tại TOPMUS.', type: 'guide', isPartnerOnly: false, productId: 'p7', content: '/topmus/dang-tin-tuyen-dung.md' },
  { id: 'd24', slug: 'tao-tai-khoan-phan-quyen-cho-nhan-vien', title: 'Tạo tài khoản phân quyền cho nhân viên', description: 'Tạo tài khoản truy cập trang admin và phân quyền quản trị website.', type: 'guide', isPartnerOnly: false, productId: 'p7', content: '/topmus/tao-tai-khoan-phan-quyen-cho-nhan-vien.md' },
  { id: 'd25', slug: 'huong-dan-thay-banner-website', title: 'Hướng dẫn thay banner website', description: 'Hướng dẫn thay banner website', type: 'guide', isPartnerOnly: false, productId: 'p7', content: '/topmus/huong-dan-thay-banner-website.md' },
  { id: 'd26', slug: 'huong-dan-thay-anh-tren-website', title: 'Hướng dẫn thay ảnh trên website', description: 'Hướng dẫn thay ảnh trên website', type: 'guide', isPartnerOnly: false, productId: 'p7', content: '/topmus/huong-dan-thay-anh-tren-website.md' },
  { id: 'd27', slug: 'huong-dan-sua-noi-dung-website', title: 'Hướng dẫn thay sửa các nội dung trên website', description: 'Hướng dẫn thay sửa các nội dung trên website', type: 'guide', isPartnerOnly: false, productId: 'p7', content: '/topmus/huong-dan-sua-noi-dung-website.md' },
  { id: 'd28', slug: 'huong-dan-sua-anh-noi-dung-mau', title: 'Hướng dẫn sửa ảnh/nội dung ở các mẫu section', description: 'Hướng dẫn thay banner website', type: 'guide', isPartnerOnly: false, productId: 'p7', content: '/topmus/huong-dan-sua-anh-noi-dung-mau.md' },
  { id: 'd29', slug: 'huong-dan-seo-website', title: 'Hướng dẫn SEO website', description: 'Hướng dẫn SEO website', type: 'guide', isPartnerOnly: false, productId: 'p7', content: '/topmus/huong-dan-seo-website.md' },

  // QC House
  { id: 'd30', slug: 'dang-tin-tuc-bai-viet', title: 'Đăng tin tức bài viết', description: 'Khởi tạo các tin tức và bài viết về QC House.', type: 'guide', isPartnerOnly: false, productId: 'p1', content: '/qchouse/dang-tin-tuc-bai-viet-qchouse.md' },
  { id: 'd31', slug: 'dang-tin-tuyen-dung', title: 'Đăng tin tuyển dụng', description: 'Đăng tin tuyển dụng các vị trí tại QC House.', type: 'guide', isPartnerOnly: false, productId: 'p1', content: '/qchouse/dang-tin-tuyen-dung-qchouse.md' },
  { id: 'd32', slug: 'dang-du-an', title: 'Đăng dự án QC House', description: 'Đăng tin tuyển dụng các vị trí tại QC House.', type: 'guide', isPartnerOnly: false, productId: 'p1', content: '/qchouse/dang-du-an-qchouse.md' },
  { id: 'd33', slug: 'huong-dan-sua-noi-dung-website', title: 'Hướng dẫn thay sửa các nội dung trên website', description: 'Hướng dẫn thay sửa các nội dung trên website', type: 'guide', isPartnerOnly: false, productId: 'p1', content: '/qchouse/huong-dan-sua-noi-dung-website-qchouse.md' },
  { id: 'd34', slug: 'huong-dan-seo-website', title: 'Hướng dẫn SEO website', description: 'Hướng dẫn SEO website', type: 'guide', isPartnerOnly: false, productId: 'p1', content: '/qchouse/huong-dan-seo-website-qchouse.md' },
  { id: 'd35', slug: 'tao-tai-khoan-phan-quyen-cho-nhan-vien', title: 'Tạo tài khoản phân quyền cho nhân viên', description: 'Tạo tài khoản truy cập trang admin và phân quyền quản trị website.', type: 'guide', isPartnerOnly: false, productId: 'p1', content: '/qchouse/tao-tai-khoan-phan-quyen-cho-nhan-vien-qchouse.md' },

  // PHUC BANI
  { id: 'd36', slug: 'dang-bai-viet', title: 'Hướng dẫn Đăng bài viết', description: 'Hướng dẫn Đăng bài viết', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/phucbani/dang-bai-viet.md' },
  { id: 'd37', slug: 'dang-cau-chuyen-thanh-cong', title: 'Hướng dẫn đăng câu chuyện thành công', description: 'Hướng dẫn đăng câu chuyện thành công', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/phucbani/dang-cau-chuyen-thanh-cong.md' },
  { id: 'd38', slug: 'dang-khoa-hoc', title: 'Hướng dẫn đăng khóa học', description: 'Hướng dẫn đăng khóa học', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/phucbani/dang-khoa-hoc.md' },
  { id: 'd39', slug: 'quan-ly-don-hang', title: 'Quản lý đơn hàng', description: 'Quản lý đơn hàng', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/phucbani/quan-ly-don-hang.md' },
  { id: 'd40', slug: 'quan-ly-khoa-hoc', title: 'Quản lý khóa học', description: 'Quản lý khóa học', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/phucbani/quan-ly-khoa-hoc.md' },
  { id: 'd41', slug: 'quan-ly-hoc-vien', title: 'Hướng dẫn quản lý học viên', description: 'Hướng dẫn quản lý học viên', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/phucbani/quan-ly-hoc-vien.md' },
  { id: 'd42', slug: 'sua-noi-dung-trang-web', title: 'Hướng dẫn sửa nội dung trang web', description: 'Hướng dẫn sửa nội dung trang web', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/phucbani/sua-noi-dung-trang-web.md' },
  { id: 'd43', slug: 'tao-tai-khoan-phan-quyen-cho-nhan-vien', title: 'Tạo tài khoản phân quyền cho nhân viên', description: 'Tạo tài khoản truy cập trang admin và phân quyền quản trị website.', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/phucbani/tao-tai-khoan-phan-quyen-cho-nhan-vien.md' },
  { id: 'd44', slug: 'tich-hop-cong-thanh-toan-sepay', title: 'Hướng dẫn tích hợp cổng thanh toán SePay', description: 'Hướng dẫn tích hợp cổng thanh toán SePay', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/phucbani/tich-hop-cong-thanh-toan-sepay.md' },
  { id: 'd45', slug: 'cach-lay-link-video-trong-loom', title: 'Hướng dẫn lấy link video trong Loom', description: 'Hướng dẫn lấy link video trong Loom', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/phucbani/cach-lay-link-video-trong-loom.md' },

  // FPT Telecom
  { id: 'd46', slug: 'dang-tin-tuc-bai-viet', title: 'Đăng tin tức bài viết', description: 'Khởi tạo các tin tức và bài viết về FPT Telecom.', type: 'guide', isPartnerOnly: false, productId: 'p8', content: '/fpt-telecom/dang-tin-tuc-bai-viet.md' },
  { id: 'd47', slug: 'dang-tin-tuyen-dung', title: 'Đăng tin tuyển dụng', description: 'Đăng tin tuyển dụng các vị trí tại FPT Telecom.', type: 'guide', isPartnerOnly: false, productId: 'p8', content: '/fpt-telecom/dang-tin-tuyen-dung.md' },
  { id: 'd49', slug: 'huong-dan-sua-noi-dung-website', title: 'Hướng dẫn thay sửa các nội dung trên website', description: 'Hướng dẫn thay sửa các nội dung trên website', type: 'guide', isPartnerOnly: false, productId: 'p8', content: '/fpt-telecom/huong-dan-sua-noi-dung-website.md' },
  { id: 'd50', slug: 'huong-dan-seo-website', title: 'Hướng dẫn SEO website', description: 'Hướng dẫn SEO website', type: 'guide', isPartnerOnly: false, productId: 'p8', content: '/fpt-telecom/huong-dan-seo-website.md' },
  { id: 'd51', slug: 'tao-tai-khoan-phan-quyen-cho-nhan-vien', title: 'Tạo tài khoản phân quyền cho nhân viên', description: 'Tạo tài khoản truy cập trang admin và phân quyền quản trị website.', type: 'guide', isPartnerOnly: false, productId: 'p8', content: '/fpt-telecom/tao-tai-khoan-phan-quyen-cho-nhan-vien.md' },
  { id: 'd52', slug: 'dang-tin-bao-tri-noi-ve-fpt', title: 'Đăng tin báo trí nói về FPT', description: 'Đăng tin báo trí nói về FPT', type: 'guide', isPartnerOnly: false, productId: 'p8', content: '/fpt-telecom/dang-tin-bao-tri-noi-ve-fpt.md' },

  // HOANGMINH
  { id: 'd53', slug: 'dang-tin-tuc-bai-viet', title: 'Đăng tin tức bài viết', description: 'Cập nhật các tin tức / bài viết về tin tức nhành và bản tin của hoàng minh.', type: 'guide', isPartnerOnly: false, productId: 'p9', content: '/hoangminh/dang-tin-tuc-bai-viet.md' },
  { id: 'd54', slug: 'dang-tin-tuyen-dung', title: 'Đăng tin tuyển dụng', description: 'Đăng tin tuyển dụng các vị trí tại Hoàng Minh.', type: 'guide', isPartnerOnly: false, productId: 'p9', content: '/hoangminh/dang-tin-tuyen-dung.md' },
  { id: 'd55', slug: 'tao-tai-khoan-phan-quyen-cho-nhan-vien', title: 'Tạo tài khoản phân quyền cho nhân viên', description: 'Tạo tài khoản truy cập trang admin và phân quyền quản trị website.', type: 'guide', isPartnerOnly: false, productId: 'p9', content: '/hoangminh/tao-tai-khoan-phan-quyen-cho-nhan-vien.md' },
  { id: 'd56', slug: 'huong-dan-thay-banner-va-anh-website', title: 'Hướng dẫn thay banner và ảnh trên website', description: 'Hướng dẫn thay banner và ảnh trên website website', type: 'guide', isPartnerOnly: false, productId: 'p9', content: '/hoangminh/huong-dan-thay-banner-website.md' },
  { id: 'd57', slug: 'huong-dan-sua-noi-dung-website', title: 'Hướng dẫn thay sửa các nội dung trên website', description: 'Hướng dẫn thay sửa các nội dung trên website', type: 'guide', isPartnerOnly: false, productId: 'p9', content: '/hoangminh/huong-dan-sua-noi-dung-website.md' },
  { id: 'd58', slug: 'them-mang-luoi-doi-tac', title: 'Thêm / sửa mạng lưới đối tác', description: 'Hướng dẫn thao tác thêm / sửa mạng lưới đối tác', type: 'guide', isPartnerOnly: false, productId: 'p9', content: '/hoangminh/them-mang-luoi-doi-tac.md' },
  { id: 'd59', slug: 'them-du-an', title: 'Thêm / sửa dự án', description: 'Hướng dẫn thao tác thêm / sửa dự án', type: 'guide', isPartnerOnly: false, productId: 'p9', content: '/hoangminh/them-du-an.md' },
  { id: 'd60', slug: 'them-cam-nang-tai-lieu', title: 'Thêm / sửa cẩm nang tài liệu', description: 'Hướng dẫn thao tác thêm / sửa cẩm nang tài liệu', type: 'guide', isPartnerOnly: false, productId: 'p9', content: '/hoangminh/them-cam-nang-tai-lieu.md' },
  { id: 'd61', slug: 'huong-dan-seo-website', title: 'Hướng dẫn SEO website', description: 'Hướng dẫn SEO website', type: 'guide', isPartnerOnly: false, productId: 'p9', content: '/hoangminh/huong-dan-seo-website.md' },
];

export const VALID_PARTNER_CODES = ['PARTNER2026', 'NEXTGENCY-VIP', 'DEV-ACCESS'];