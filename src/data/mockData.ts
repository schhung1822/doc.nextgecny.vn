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
  { id: 'p1', slug: 'he-thong-quan-ly-noi-dung-cms', name: 'Hệ thống Quản lý Nội dung (CMS)', description: 'Nền tảng quản lý bài viết, trang và người dùng.', categoryId: 'c1', icon: 'LayoutTemplate' },
  { id: 'p2', slug: 'trang-thuong-mai-dien-tu-ecommerce', name: 'Trang Thương mại Điện tử (E-commerce)', description: 'Hệ thống bán hàng trực tuyến toàn diện.', categoryId: 'c1', icon: 'ShoppingCart' },
  { id: 'p3', slug: 'ung-dung-quan-ly-ban-hang-sales-app', name: 'Ứng dụng Quản lý Bán hàng (Sales App)', description: 'Ứng dụng di động hỗ trợ đội ngũ sales.', categoryId: 'c2', icon: 'Smartphone' },
  { id: 'p4', slug: 'ung-dung-dat-lich-dich-vu-booking-app', name: 'Ứng dụng Đặt lịch & Dịch vụ (Booking App)', description: 'Giải pháp đặt lịch hẹn thông minh.', categoryId: 'c2', icon: 'CalendarDays' },
  { id: 'p5', slug: 'cong-cu-tu-dong-hoa-marketing-marketing-tool', name: 'Công cụ Tự động hóa Marketing (Marketing Tool)', description: 'Tối ưu hóa các chiến dịch tiếp thị.', categoryId: 'c3', icon: 'Megaphone' },
  { id: 'p6', slug: 'cong-cu-quan-ly-du-an-project-tool', name: 'Công cụ Quản lý Dự án (Project Tool)', description: 'Theo dõi tiến độ và cộng tác nhóm.', categoryId: 'c3', icon: 'Kanban' },
  { id: 'p7', slug: 'website-topmus', name: 'Website TOPMUS', description: 'Web giới thiệu doanh nghiệp, blog & tuyển dụng', categoryId: 'c1', icon: 'LayoutTemplate' },
];

export const initialDocuments: Document[] = [
  // CMS
  { id: 'd1', slug: 'huong-dan-quan-ly-bai-viet-trang', title: 'Hướng dẫn Quản lý Bài viết & Trang', description: 'Cách tạo, chỉnh sửa và xuất bản nội dung.', type: 'guide', isPartnerOnly: false, productId: 'p1', content: '/docs/d1.md' },
  { id: 'd2', slug: 'cau-hinh-menu-giao-dien-website', title: 'Cấu hình Menu & Giao diện Website', description: 'Tùy chỉnh giao diện hiển thị cho người dùng.', type: 'installation', isPartnerOnly: false, productId: 'p1', content: '/docs/d2.md' },
  { id: 'd3', slug: 'quan-ly-nguoi-dung-phan-quyen', title: 'Quản lý Người dùng & Phân quyền', description: 'Thiết lập vai trò cho các thành viên.', type: 'guide', isPartnerOnly: false, productId: 'p1', content: '/docs/d3.md' },
  { id: 'd4', slug: 'huong-dan-tich-hop-api-cong-thanh-toan', title: 'Hướng dẫn Tích hợp API Cổng Thanh toán', description: 'Tài liệu kỹ thuật kết nối thanh toán.', type: 'api', isPartnerOnly: true, productId: 'p1', content: '/docs/d4.md' },

  // E-commerce
  { id: 'd5', slug: 'huong-dan-dang-san-pham-quan-ly-kho-hang', title: 'Hướng dẫn Đăng sản phẩm & Quản lý Kho hàng', description: 'Quản lý danh mục sản phẩm và tồn kho.', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/docs/d5.md' },
  { id: 'd6', slug: 'quan-ly-don-hang-van-chuyen', title: 'Quản lý Đơn hàng & Vận chuyển', description: 'Xử lý đơn hàng từ lúc đặt đến lúc giao.', type: 'guide', isPartnerOnly: false, productId: 'p2', content: '/docs/d6.md' },
  { id: 'd7', slug: 'huong-dan-toi-uu-hoa-seo-cho-trang-san-pham', title: 'Hướng dẫn Tối ưu hóa SEO cho Trang Sản phẩm', description: 'Kỹ thuật SEO nâng cao cho E-commerce.', type: 'guide', isPartnerOnly: true, productId: 'p2', content: '/docs/d7.md' },

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
];

export const VALID_PARTNER_CODES = ['PARTNER2026', 'NEXTGENCY-VIP', 'DEV-ACCESS'];