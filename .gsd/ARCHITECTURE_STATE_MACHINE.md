# Sơ đồ Luồng trạng thái (State Machine) - Cấp độ Ứng dụng

> Sơ đồ này thể hiện các trạng thái chính và luồng chuyển đổi trạng thái của các thành phần cốt lõi trong hệ thống HanaVeg.

```mermaid
stateDiagram-v2
    %% Khai báo các trạng thái chính
    [*] --> Init: Truy cập Website

    state "Khởi tạo Ứng dụng (App Initialization)" as Init
    state "Trang Chủ tĩnh (Guest View)" as GuestView
    
    %% Phân luồng Ngôn ngữ
    state "Xử lý Ngôn ngữ (i18n)" as Language {
        state "Tiếng Việt (VI)" as LangVI
        state "Tiếng Anh (EN)" as LangEN
        state "Tiếng Trung (ZH)" as LangZH
        
        [*] --> LangVI: Mặc định
        LangVI --> LangEN: Chuyển đổi
        LangVI --> LangZH: Chuyển đổi
        LangEN --> LangVI: Chuyển đổi
        LangZH --> LangVI: Chuyển đổi
    }

    Init --> Language: Tải cấu hình
    Language --> GuestView: Hiển thị giao diện

    %% Luồng xem Menu
    state "Duyệt Thực Đơn (Menu Browsing)" as MenuFlow {
        state "Tải danh mục (Fetching Categories)" as FetchCategories
        state "Hiển thị các món (Displaying Items)" as DisplayItems
        state "Xem chi tiết món (Item Detail Modal)" as ItemDetail
        
        [*] --> FetchCategories
        FetchCategories --> DisplayItems: Lấy dữ liệu Supabase thành công
        DisplayItems --> FetchCategories: Thay đổi bộ lọc (Chay/Mặn, v.v)
        DisplayItems --> ItemDetail: Click vào thẻ món ăn
        ItemDetail --> DisplayItems: Đóng Modal
    }

    GuestView --> MenuFlow: Điều hướng sang /menu

    %% Luồng đặt bàn (Booking - v1.0 / Tương tự Checkout)
    state "Đặt Bàn (Booking Flow)" as BookingFlow {
        state "Nhập thông tin (Form Data Entry)" as FormData
        state "Xác thực dữ liệu (Validation)" as FormValidation
        state "Gửi yêu cầu (Submitting to Supabase)" as Submitting
        state "Thành công (Success State)" as BookingSuccess
        state "Thất bại (Error State)" as BookingError
        
        [*] --> FormData
        FormData --> FormValidation: Nhấn "Đặt bàn ngay"
        FormValidation --> FormData: Dữ liệu không hợp lệ (Báo lỗi UI)
        FormValidation --> Submitting: Dữ liệu hợp lệ
        Submitting --> BookingSuccess: Ghi DB Supabase thành công
        Submitting --> BookingError: Lỗi mạng/Hệ thống
        BookingError --> FormData: Thử lại
        BookingSuccess --> [*]: Hoàn tất (Đóng Form / Quay về Trang chủ)
    }

    GuestView --> BookingFlow: Click nút "Đặt bàn" (CTA)
    MenuFlow --> BookingFlow: Click đặt bàn từ Menu

    %% Luồng quản trị (Admin/Staff)
    state "Phiên làm việc Quản trị (Admin Session)" as AdminSession {
        state "Xác thực (Supabase Auth)" as Auth
        state "Bảng điều khiển (Dashboard Loader)" as Dashboard
        
        state "Phân quyền (RBAC)" as RoleCheck {
            state "Quyền Admin (Quản lý Menu/Blog/Nhân sự)" as RoleAdmin
            state "Quyền Staff (Cập nhật trạng thái Booking)" as RoleStaff
            
            [*] --> RoleAdmin: Kiểm tra User Role = Admin
            [*] --> RoleStaff: Kiểm tra User Role = Staff
        }

        [*] --> Auth
        Auth --> Dashboard: Đăng nhập thành công
        Auth --> Auth: Sai thông tin / Lỗi
        Dashboard --> RoleCheck: Khởi tạo Navigation
    }

    GuestView --> AdminSession: Điều hướng sang /admin
    AdminSession --> GuestView: Đăng xuất (Logout)

```

## Giải thích Luồng Trạng Thái & Quản lý State (Zustand/React Context)

### 1. `useUIStore` (Global UI State)

- Quản lý trạng thái mở/đóng của `ItemDetail` Modal trong MenuFlow.
- Quản lý trạng thái thông báo toast (Thành công/Thất bại) trong BookingFlow.
- Thiết lập trạng thái Loading chung toàn cục (khi Fetch dữ liệu lớn).

### 2. `useLanguageStore` hoặc thư viện i18n

- Giữ state của `Language` (VI/EN/ZH) đang được active.
- Trigger việc re-render lại các components khi ngôn ngữ thay đổi.

### 3. `useAuthStore` (Supabase Auth Context)

- Giữ thông tin `user` và `role` hiện tại ở `AdminSession`.
- Bảo vệ (Protect) các routes `/admin/*`. Nếu state là `unauthenticated`, tự động chuyển hướng về trang Login.

### 4. Component Local State

- `FormData` trong form đặt bàn sử dụng `useState` hoặc `react-hook-form` để kiểm soát các field input liên tục mà không cần đưa lên Global state, tối ưu hóa re-render.
