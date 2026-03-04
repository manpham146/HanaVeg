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

## Success Criteria

- [ ] Website tải nhanh, tương thích tốt trên mọi thiết bị di động và máy tính.
- [ ] Tính năng chuyển đổi ngôn ngữ hoạt động mượt mà không lỗi.
- [ ] Giao diện có thẩm mỹ cao, hiệu ứng chuyển cảnh mượt mà.
- [ ] Admin có thể đăng nhập và cập nhật trạng thái món ăn (còn/hết), thêm món mới, thêm bài blog.
