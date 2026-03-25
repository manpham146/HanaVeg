# Changelog

Tất cả thay đổi đáng chú ý của dự án HanaVeg sẽ được ghi nhận trong file này.

## [Unreleased] - 2026-03-26

### ✨ Tính năng mới

- **Login Page Redesign**: Split-layout mới — form bên trái (centered), hình nhà hàng bên phải với gradient overlay
- **Custom Logo Badge**: Logo tròn vàng (`hana-badge.png`) — viền vàng, nền `#0f1f15`, hoa sen + text, transparent background, anti-aliased edges
- **Forgot Password Page**: Redesign theo split-layout thống nhất với login
- **Branding đa ngôn ngữ**: Hiển thị tên nhà hàng theo locale (VI: Nhà hàng chay Hana, EN: Hana Vegetarian, ZH: Hana素食餐厅)

### 🔒 Bảo mật

- **Xóa trang Register public**: Tài khoản chỉ được tạo bởi Admin (qua Supabase Dashboard hoặc Staff Management tương lai)
- Bỏ link "Đăng ký" trên trang login

### 🎨 Giao diện

- **Logo 80px** với brand text 24px bold + subtitle "Admin Panel"
- **Form centered** trong left panel, logo canh trái cùng hàng với form fields
- **Gold button** (`#D4A100`) thống nhất trên tất cả auth pages
- **Password visibility toggle** (Eye/EyeOff icon)

### 🛠️ Cải tiến kỹ thuật

- **Supabase image hostname**: Thêm `njmzamjrwgbqtsjpqguz.supabase.co` vào `next.config.ts` remote patterns
- **Logo processing**: Python PIL flood-fill + Gaussian blur alpha channel cho smooth edges
- Thống nhất dùng `hana-badge.png` thay `logo-transparent.png` toàn project

---

## [Unreleased] - 2026-03-12

### ✨ Tính năng mới

- **Nâng cấp Admin Layout**: Chuyển từ route group `(admin)` sang cấu trúc riêng với `layout.tsx`, `AdminSidebar`, và `SidebarProvider`
- **Admin Sidebar**: Thanh điều hướng bên trái với logo, menu links (Dashboard, Categories, Menu Items), chọn ngôn ngữ, và user dropdown
- **CRUD Danh mục (Categories)**: Tạo, sửa, xóa danh mục với tên 3 ngôn ngữ (VI/EN/ZH), số thứ tự, tìm kiếm, phân trang
- **CRUD Món ăn (Menu Items)**: Tạo, sửa, xóa món ăn với tên/mô tả 3 ngôn ngữ, giá, danh mục, trạng thái, upload hình ảnh qua Supabase Storage
- **Upload hình ảnh**: Component `ImageUpload` hỗ trợ upload trực tiếp lên Supabase Storage với hiển thị preview
- **Auth Guard**: Middleware bảo vệ route `/admin/*`, redirect về trang login khi chưa đăng nhập
- **Cột STT**: Thêm cột số thứ tự (đếm tuần tự) vào bảng danh sách món ăn

### 🌐 Đa ngôn ngữ (i18n)

- **Admin i18n hoàn chỉnh**: Toàn bộ giao diện admin hỗ trợ 3 ngôn ngữ (Tiếng Việt, English, 中文)
- **Locale-aware display**: Bảng admin hiển thị tên/mô tả theo ngôn ngữ đang chọn (fallback về tiếng Việt nếu chưa có bản dịch)
- **Thêm translation keys**: `pageOf`, `language`, `adminLogin`, `loggingIn`, `login`, `password`, `priceSuffix`, `description`, `stt`, và nhiều key khác
- **Xóa hardcoded strings**: Tất cả text cứng tiếng Việt trong admin đã được thay bằng `t()` calls

### 🎨 Giao diện

- **Delete Confirm Dialog**: Nâng cấp dialog xóa dùng `AlertDialogMedia`, `size="sm"`, `variant="destructive"` theo chuẩn shadcn/ui mới
- **AlertDialog component**: Hỗ trợ `AlertDialogMedia`, `size` prop (`sm`/`default`), `variant` prop cho Action/Cancel buttons
- **Tăng kích thước logo** sidebar admin (36px → 48px)
- **Bỏ Tailwind class cố định** trên logo, sử dụng kích thước tự nhiên từ `width`/`height`
- **UI Components mới**: `Sheet`, `Select`, `Badge`, `Checkbox`, `Textarea`, `DropdownMenu` từ shadcn/ui

### 🛠️ Cải tiến kỹ thuật

- **Route group `(admin)`**: Tách biệt layout admin khỏi layout public, dùng `SidebarProvider` riêng
- **Server Actions**: `createMenuItem`, `updateMenuItem`, `deleteMenuItem`, `createCategory`, `updateCategory`, `deleteCategory`
- **API Layer**: `fetchMenuItems()`, `fetchCategories()` với Supabase client
- **Dark mode input/textarea**: Fix viền input/textarea khó nhìn trong dark mode bằng `border-input`

### 📦 Dependencies mới

- `@supabase/ssr` — Supabase server-side rendering support
- `uuid` + `@types/uuid` — Tạo unique filename cho upload hình ảnh
