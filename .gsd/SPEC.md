# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision

Xây dựng một website Nhà hàng Chay phong cách An Nhiên, mang đến cảm giác an nhiên, thoải mái cho khách hàng. Sau những bộn bề mệt mỏi ngoài xã hội, quán chay Hana mong muốn khách đến và buông bỏ mọi lo toan, an nhiên trải nghiệm đồ ăn. Chủ quán xây nên quán chay với tâm kết nối thiện duyên và gửi tâm an nhiên đến mọi khách hàng. Hệ thống có khả năng mở rộng cao và nhiều ngôn ngữ, giúp quản lý thực đơn và nội dung dễ dàng.

## Goals

1. Cung cấp trải nghiệm Frontend xuất sắc, mượt mà chuẩn 60fps với các trang: Trang chủ, Menu, Giới thiệu, Bộ sưu tập, Blog, Đặt bàn.
2. Hỗ trợ đa ngôn ngữ (Tiếng Việt, Tiếng Anh, Tiếng Trung Quốc).
3. Footer có thông tin liên hệ và Header có tích hợp các liên kết mạng xã hội.
4. Xây dựng trang Quản trị (Admin Panel) bằng Supabase cho phép phân quyền: Admin (sửa Menu, quản lý nhân viên) và Staff (chỉ xem, cập nhật đơn hàng/đặt bàn - phục vụ cho tính năng tương lai).
5. Thiết kế UI/UX theo phong cách mộc mạc, tĩnh lặng, tham khảo <www.rauoi.vn> và asset thiết kế.

## Non-Goals (Out of Scope for v1.0)

- Hệ thống quản lý đặt bàn hoàn chỉnh (admin xác nhận, lịch, thông báo). Trang Đặt bàn cơ bản (form gửi yêu cầu) đã có trong v1.
- Thanh toán online (Online Payment).
- Đặt đồ ăn giao tận nơi (Delivery).
- Hệ thống thông báo theo thời gian thực cho yêu cầu đặt hàng/đặt bàn (Sẽ được mở rộng ở các phiên bản sau).

## Users

- Thực khách: Tìm hiểu nhà hàng, xem thực đơn, đọc blog bằng nhiều ngôn ngữ.
- Admin: Chủ nhà hàng hoặc quản lý, cần sửa thực đơn, quản lý nhân viên, viết blog.
- Staff: Nhân viên chạy bàn / Lễ tân (Chuẩn bị cho tính năng quản lý đơn tương lai).

## Constraints

- Next.js App Router, Tailwind CSS, Shadcn UI, Framer Motion.
- TypeScript (Strict Mode, không dùng `any`).
- Supabase PostgreSQL cho cơ sở dữ liệu và Auth.
- API-First & Component-Driven Design.
- **Hình ảnh Thuần Chay:** Đây là nhà hàng CHAY. Mọi hình ảnh (gen AI, stock photo, minh họa) **PHẢI** chỉ chứa thức ăn chay/thuần chay. **NGHIÊM CẤM** có thịt, cá, hải sản, hoặc thực phẩm động vật trong bất kỳ hình ảnh nào trên website.

## Định hướng Kiến trúc (Architecture Guidelines) — BẮT BUỘC

> **⚠️ QUAN TRỌNG:** Mọi Agent/Developer PHẢI tuân thủ nghiêm ngặt các nguyên tắc dưới đây khi làm việc trên dự án này.

### 1. Kiến trúc Module & Tái sử dụng (Lắp ráp kiểu Lego)

- **Chia để trị:** Tất cả thành phần giao diện PHẢI được tách thành Component độc lập, có thể tái sử dụng.
- **Tính linh hoạt:** Mỗi component (ví dụ: Nút Đặt Bàn, Card Món Ăn) phải có thể gắn vào bất kỳ trang nào mà không cần viết lại mã.

#### Quy tắc Reuse-First — BẮT BUỘC

Trước mỗi UI element, Agent/Developer **PHẢI** làm theo thứ tự:

1. **Kiểm tra `src/components/ui/`** → Có component rồi → **DÙNG LẠI** (thêm variant/className nếu cần)
2. **Chưa có** → Kiểm tra [Shadcn UI](https://ui.shadcn.com) → `npx shadcn@latest add <component>`
3. **Shadcn không đáp ứng** → Tự build mới trong `src/components/ui/` dùng `cva + Radix UI`

> **NGHIÊM CẤM** raw HTML `<button>`, `<input>`, `<select>`, `<textarea>`, `<label>` ngoài `src/components/ui/`.

#### UI Component Inventory (cập nhật khi thêm mới)

| Component | Variants đáng chú ý |
|-----------|---------------------|
| `Button` | `default`, `secondary`, `outline`, `ghost`, `ghost-nav` (header icon), `zen` (CTA vàng) |
| `Input` | `default` (form field), `underline` (newsletter) |
| `Textarea` | — |
| `Label` | `default`, `field` (uppercase gold, dùng cho form) |
| `Select` | Radix Portal — cần set màu tường minh khi dùng trong header dark |

### 2. Tách bạch Giao diện và Dữ liệu (API-First Design)

- **Nguyên tắc:** Frontend chỉ làm nhiệm vụ "hiển thị". Backend/Database chịu trách nhiệm "xử lý". Tuyệt đối **KHÔNG** nhồi logic gọi/xử lý dữ liệu trực tiếp vào component giao diện.
- **Khả năng mở rộng:** Khi phát triển Mobile App, chỉ cần gọi lại các API hiện có mà không cần xây dựng lại hệ thống.

### 3. Quản lý Design System Tập trung

- **CẤM** hard-code mã màu, font chữ rải rác trong code. Mọi giá trị thiết kế PHẢI được quy tụ về file cấu hình giao diện tập trung (ví dụ: `theme.config.ts` hoặc `tailwind.config.ts`).
- **Đồng bộ:** Khi thay đổi giao diện (ví dụ: đổi bảng màu theo mùa lễ), chỉ cần sửa tại file cấu hình, toàn bộ website tự động cập nhật.

### 4. Tiêu chuẩn hóa Dữ liệu với TypeScript

- **Bắt buộc** sử dụng TypeScript Strict Mode. Định nghĩa `Type` / `Interface` rõ ràng cho mọi entity (ví dụ: `MenuItem`, `BookingRequest`).
- **Cấm** sử dụng `any`. Mọi dữ liệu truyền giữa các component/API đều phải có kiểu dữ liệu tường minh để ngăn lỗi runtime.

### 5. Quản lý Trạng thái (State Management)

- Sử dụng thư viện state management chuyên nghiệp (Zustand) thay vì truyền dữ liệu thủ công (prop drilling) giữa các component.
- Phân biệt rõ: **Global State** (UI store, Auth store, Language) quản lý bởi Zustand và **Local State** (form input) quản lý bởi `useState` / `react-hook-form`.

### 6. Responsive Mobile-First

- Website **BẮT BUỘC** phải responsive trên tất cả thiết bị: Desktop, Tablet, Mobile.
- Thiết kế theo hướng **Mobile-First**: ưu tiên layout mobile trước, mở rộng lên desktop bằng các breakpoint Tailwind (`sm:`, `md:`, `lg:`, `xl:`).
- Mọi component mới PHẢI được kiểm tra hiển thị trên viewport 375px (iPhone SE) trước khi merge.

### 7. Đa ngôn ngữ (i18n) — Luôn kiểm tra & cập nhật

- **CẤM** hard-code text hiển thị trực tiếp trong component. Mọi chuỗi text phải nằm trong file dịch thuật (`messages/*.json`) và được gọi qua `useTranslations()`.
- Khi thêm tính năng mới hoặc sửa giao diện, **BẮT BUỘC** kiểm tra và cập nhật bản dịch cho **cả 3 ngôn ngữ** (VI, EN, ZH).
- Metadata SEO (`title`, `description`) cũng phải dùng `getTranslations()` theo locale.

---

## Success Criteria

- [ ] Website tải nhanh, tương thích tốt trên mọi thiết bị di động và máy tính.
- [ ] Tính năng chuyển đổi ngôn ngữ hoạt động mượt mà không lỗi.
- [ ] Giao diện có thẩm mỹ cao, hiệu ứng chuyển cảnh mượt mà.
- [ ] Admin có thể đăng nhập và cập nhật trạng thái món ăn (còn/hết), thêm món mới, thêm bài blog.
