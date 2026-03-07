# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision

Xây dựng một website Nhà hàng Chay phong cách Thiền (Zen) mang lại cảm giác bình yên, không gian mở và thiên nhiên, lấy cảm hứng từ hình ảnh hoa sen và màu xanh ngọc bích. Hệ thống có khả năng mở rộng cao và nhiều ngôn ngữ, giúp quản lý thực đơn và nội dung dễ dàng.

## Goals

1. Cung cấp trải nghiệm Frontend xuất sắc, mượt mà chuẩn 60fps với các trang: Trang chủ, Menu, Giới thiệu, Bộ sưu tập, Blog.
2. Hỗ trợ đa ngôn ngữ (Tiếng Việt, Tiếng Anh, Tiếng Trung Quốc).
3. Footer có thông tin liên hệ và Header có tích hợp các liên kết mạng xã hội.
4. Xây dựng trang Quản trị (Admin Panel) bằng Supabase cho phép phân quyền: Admin (sửa Menu, quản lý nhân viên) và Staff (chỉ xem, cập nhật đơn hàng/đặt bàn - phục vụ cho tính năng tương lai).
5. Thiết kế UI/UX theo phong cách mộc mạc, tĩnh lặng, tham khảo <www.rauoi.vn> và asset thiết kế.

## Non-Goals (Out of Scope for v1.0)

- Hệ thống đặt bàn (Booking) hoàn chỉnh ở phía khách hàng.
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

## Định hướng Kiến trúc (Architecture Guidelines) — BẮT BUỘC

> **⚠️ QUAN TRỌNG:** Mọi Agent/Developer PHẢI tuân thủ nghiêm ngặt các nguyên tắc dưới đây khi làm việc trên dự án này.

### 1. Kiến trúc Module & Tái sử dụng (Lắp ráp kiểu Lego)

- **Chia để trị:** Tất cả thành phần giao diện PHẢI được tách thành Component độc lập, có thể tái sử dụng.
- **Tính linh hoạt:** Mỗi component (ví dụ: Nút Đặt Bàn, Card Món Ăn) phải có thể gắn vào bất kỳ trang nào mà không cần viết lại mã.
- **Ưu tiên Shadcn UI:** Khi thiết kế component mới, **PHẢI** kiểm tra thư viện [Shadcn UI](https://ui.shadcn.com) trước. Nếu đã có component phù hợp thì sử dụng và tuỳ chỉnh, chỉ tự xây dựng từ đầu khi Shadcn không đáp ứng được yêu cầu.

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
