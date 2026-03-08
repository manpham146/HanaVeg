# DECISIONS.md

## Phase 3 — Dynamic Content (Menu & Blog)

**Date:** 2026-03-08

### Menu

- Đơn vị giá: **VNĐ** (format: `125.000 ₫`)
- Món hết: hiển thị **"Hết món"** (không ẩn)
- Danh mục: theo spec (Khai vị, Món chính, Canh, Nước uống) — có thể mở rộng sau
- Bố cục: chưa quyết cụ thể — sẽ quyết trong `/plan`

### Blog

- **Không làm cho v1** — tách sang version tương lai
- Lưu thông tin schema để dùng sau:
  - Nội dung: cách sống, tu tập, an nhiên, món ăn chay, phật pháp, tin tức quán
  - Fields: ảnh bìa, title, subtitle, content, ngày đăng
  - Người viết: Admin quyết định nội dung
- Gen ảnh AI tạm cho blog page (không cần cầu toàn, user sẽ up sau)

### Supabase Database

- Chưa tạo gì trên Supabase — cần tạo **toàn bộ tables** cho web database hoàn chỉnh
- Mock data cho tất cả bảng
- Ảnh: upload lên **Supabase Storage**

---

## Phase 2 — Social Icons Placement

**Date:** 2026-03-08
**Decision:** Social icons (Facebook, Instagram) chỉ cần ở Footer, không cần ở Header.
**Reason:** User xác nhận Footer đã đủ — Header giữ gọn gàng với nav + phone + language + CTA.

---

> Kiến trúc và quyết định kỹ thuật sẽ được ghi lại ở đây (ADRs).

| ID | Quyết định | Bối cảnh | Trạng thái |
|----|------------|----------|------------|
| 001 | Sử dụng Supabase làm Backend | Cần giải pháp full-stack nhanh chóng, quản lý Database và Auth rạch ròi. Tương lai cần hệ thống realtime cho đơn hàng. | Chấp nhận |
