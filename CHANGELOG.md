# Changelog

Tất cả thay đổi đáng chú ý của dự án HanaVeg sẽ được ghi nhận trong file này.

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
