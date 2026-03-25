## Phase 4 Decisions

**Date:** 2026-03-08

### Scope

- **Menu Management only for v1.0**: CRUD operations for Menu Categories and Menu Items. Content management for static pages (Home, About, etc.) is dropped for v1.0 to save time.
- **Role Management**: Will implement 'Admin' and 'Staff' roles. Even though Staff is not strictly needed for v1.0 (since Booking/Orders are future phases), building the foundation now ensures easier scalability and proper RLS usage.

### Approach

- **Chose**: Option A (Custom Route `/admin` within Next.js) using **TanStack Table**.
- **Reason**: The Admin Panel will be used by non-technical staff eventually, making a user-friendly UI necessary. TanStack Table is highly recommended for building robust data grids (sorting, filtering, pagination) and pairs perfectly with Shadcn UI's `DataTable` component. Since the project anticipates complex tables (future orders, bookings), integrating TanStack Table now is an excellent architectural decision.

### Constraints / Technical Setup

- **Supabase Storage**: Will need to set up a new public bucket (e.g., `menu-images`) and handle file uploads via Supabase JS client inside the Admin Panel.
- **Security**: Must implement Next.js Middleware to protect `/admin` routes, verifying the user's role via Supabase Auth before rendering.

## Auth & Registration Decisions

**Date:** 2026-03-26

### Registration Model

- **Chose**: Admin-only account creation (no public registration)
- **Reason**: Nhà hàng chỉ cần một số ít tài khoản admin/staff. Tự đăng ký không cần thiết và là rủi ro bảo mật. Admin tạo tài khoản qua Supabase Dashboard, tương lai sẽ có Staff Management page (Phase 9).
- **Impact**: Xóa route `/register`, bỏ link "Đăng ký" trên login page.
