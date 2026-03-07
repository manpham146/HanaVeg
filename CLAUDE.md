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

---

## ⚠️ QUY TẮC UI COMPONENT — BẮT BUỘC TUÂN THỦ

### Nguyên tắc Thứ tự Ưu tiên

Trước khi tạo bất kỳ UI element nào (`button`, `input`, `select`...), Agent **PHẢI** làm theo thứ tự sau:

```
1. Kiểm tra src/components/ui/ → Có component sẵn không?
   └─ Có → DÙNG LẠI. Chỉ thêm variant/className nếu cần.
   └─ Không có → Bước 2

2. Kiểm tra Shadcn UI registry (shadcn.com/docs/components)
   └─ Có → Cài bằng: npx shadcn@latest add <component>
   └─ Không có → Bước 3

3. Tự build base component mới trong src/components/ui/
   └─ Dùng cva + Radix UI làm nền
   └─ Đặt tên theo PascalCase chuẩn
```

> **NGHIÊM CẤM** dùng raw HTML (`<button>`, `<input>`, `<select>`, `<textarea>`, `<label>`)
> ngoài folder `src/components/ui/`. Mọi nơi khác phải dùng component.

### Inventory — Components Hiện có trong `src/components/ui/`

| Component | File | Import |
|-----------|------|--------|
| Button | `button.tsx` | `import { Button } from '@/components/ui/button'` |
| Input | `input.tsx` | `import { Input } from '@/components/ui/input'` |
| Textarea | `textarea.tsx` | `import { Textarea } from '@/components/ui/textarea'` |
| Label | `label.tsx` | `import { Label } from '@/components/ui/label'` |
| Select | `select.tsx` | `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'` |

### Variants Hiện có

**Button:**

- `default` — nền primary
- `secondary` — nền secondary
- `outline` — viền
- `ghost` — trong suốt
- `ghost-nav` — dùng trong Header/Nav (không có ring)
- `zen` — CTA vàng `bg-secondary`, `rounded-none`, `tracking-widest`
- `link` — text link

**Input:**

- `default` — form field đầy đủ (bg-surface, viền, focus ring)
- `underline` — chỉ gạch chân (dùng cho Newsletter)

**Label:**

- `default` — label thường
- `field` — uppercase gold dùng trong form (tracking-widest, text-secondary)

### Lưu ý Quan trọng về Context

Shadcn Select dùng Radix Portal — popup **không kế thừa CSS** từ parent.
Với element nằm trong header dark (`bg-primary`), dùng native `<select>` hoặc thêm màu tường minh vào SelectContent.

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
