# CLAUDE.md — Quy tắc Bắt buộc cho Agent

> **File này được tự động nạp vào context mỗi phiên làm việc.**
> Mọi Agent/AI PHẢI tuân thủ các quy tắc dưới đây.

## 1. Đọc Đặc tả Trước khi Làm việc

**TRƯỚC KHI** viết bất kỳ dòng code nào, Agent PHẢI đọc và tuân thủ:

- `.gsd/SPEC.md` — Đặc tả dự án & **Định hướng Kiến trúc BẮT BUỘC**
- `.gsd/ARCHITECTURE_STATE_MACHINE.md` — Sơ đồ luồng trạng thái
- `.gsd/ROADMAP.md` — Lộ trình phát triển

## 2. Nguyên tắc Kiến trúc Cốt lõi (Tóm tắt từ SPEC.md)

### Component-Driven (Lego)

- Mọi UI phải là Component độc lập, tái sử dụng.
- **Ưu tiên Shadcn UI** — Kiểm tra thư viện Shadcn trước khi tự build component mới.

### API-First

- Frontend chỉ "hiển thị". Logic xử lý dữ liệu nằm ở Backend/API layer.
- KHÔNG nhồi logic gọi/xử lý dữ liệu trực tiếp vào component giao diện.

### Design System Tập trung

- **CẤM** hard-code mã màu, font chữ. Mọi giá trị thiết kế phải nằm trong `tailwind.config.ts`.

### TypeScript Strict

- Bắt buộc TypeScript Strict Mode. **CẤM** sử dụng `any`.
- Mọi entity phải có `Type` / `Interface` rõ ràng.

### State Management

- Global State: **Zustand** (`useUIStore`, `useAuthStore`).
- Local State: `useState` / `react-hook-form`.
- **KHÔNG** prop drilling.

### Responsive Mobile-First

- Mọi giao diện PHẢI responsive trên Mobile (375px), Tablet, Desktop.
- Thiết kế **Mobile-First** → mở rộng bằng breakpoint (`sm:`, `md:`, `lg:`).

### Đa ngôn ngữ (i18n)

- **CẤM** hard-code text trong component. Dùng `useTranslations()` / `getTranslations()`.
- Khi thêm/sửa UI, **BẮT BUỘC** cập nhật bản dịch cho cả 3 ngôn ngữ (VI, EN, ZH).

## 3. Tech Stack

- **Framework:** Next.js App Router
- **Styling:** Tailwind CSS + Shadcn UI + Framer Motion
- **Language:** TypeScript (Strict, no `any`)
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **i18n:** next-intl (VI, EN, ZH)
- **State:** Zustand

## 4. Cấu trúc Thư mục Chính

```
src/
├── app/[locale]/        # Pages (App Router + i18n)
├── components/          # UI Components (tái sử dụng)
│   ├── ui/              # Shadcn UI components
│   └── layout/          # Header, Footer, Navigation
├── lib/                 # API services, utilities
├── types/               # TypeScript types/interfaces
├── stores/              # Zustand stores
├── i18n/                # i18n configuration
└── utils/               # Helper functions
```

## 5. Quy trình Làm việc

1. **Đọc SPEC.md** trước mọi thay đổi.
2. **Kiểm tra Shadcn UI** trước khi tạo component mới.
3. **Định nghĩa Type/Interface** trước khi code logic.
4. **Không hard-code** — Dùng design tokens từ Tailwind config.
5. **Tách API layer** — Đặt logic gọi dữ liệu trong `lib/`, không trong component.
6. **Viết tài liệu sau mỗi thay đổi** — Sau khi hoàn thành fix bug hoặc feature mới, **BẮT BUỘC** cập nhật file `.gsd/CHANGELOG.md`. Ghi entry mới theo nhóm ngày `[YYYY-MM-DD]`, gồm:
   - **Thêm mới** — Files/features mới
   - **Sửa đổi** — Files đã thay đổi và lý do
   - **Xóa** — Files đã xóa (nếu có)
7. **Hỏi và Xác nhận (Giao tiếp với User)**:
   - Nếu requirement chưa rõ / thiếu thông tin: **PHẢI DỪNG LẠI VÀ HỎI USER**, không tự đoán mò.
   - Khi có thay đổi lớn (hoặc sinh hình ảnh/assets): Cần generate, show cho user xem qua, đợi **Xác nhận (Confirm)** rồi mới update trực tiếp vào code file. Tôn trọng luồng review.
