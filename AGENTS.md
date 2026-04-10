# AGENTS.md — Quy tắc Bắt buộc cho Agent

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

| Component | File | Ghi chú |
|-----------|------|---------|
| Button | `button.tsx` | variants: default, secondary, outline, ghost, ghost-nav, zen, link, destructive |
| Input | `input.tsx` | variants: default, underline |
| Textarea | `textarea.tsx` | |
| Label | `label.tsx` | variants: default, field |
| Select | `select.tsx` | Radix Portal — popup không kế thừa CSS parent |
| AlertDialog | `alert-dialog.tsx` | Hỗ trợ `size="sm"`, `AlertDialogMedia`, `variant` trên Action/Cancel |
| Sheet | `sheet.tsx` | Dùng cho form tạo/sửa trong admin |
| Badge | `badge.tsx` | |
| Checkbox | `checkbox.tsx` | |
| Table | `table.tsx` | |
| Card | `card.tsx` | |
| Sidebar | `sidebar.tsx` | `SidebarProvider`, `SidebarInset`, `SidebarMenu`, `SidebarRail` |
| Avatar | `avatar.tsx` | |
| Breadcrumb | `breadcrumb.tsx` | |
| DropdownMenu | `dropdown-menu.tsx` | |
| Separator | `separator.tsx` | |
| Skeleton | `skeleton.tsx` | |
| Tooltip | `tooltip.tsx` | |
| Popover | `popover.tsx` | |
| Drawer | `drawer.tsx` | |

### Admin Theme — Bộ theme riêng biệt

Trang admin dùng **theme khác hoàn toàn** với trang restaurant:

- **Font:** Inter (wrap trong `.font-inter` class) — thay vì Playfair Display / Jost.
- **CSS Override:** `.font-inter` selector trong `globals.css` ghi đè toàn bộ CSS variables:
  - Background: `#FFFFFF` (trắng, không cream)
  - Primary: `#D4A100` (Gold)
  - Foreground: `#0f172a` (slate-900)
  - Border-radius: `0.5rem`
- **Sidebar Dark:** bg `#0B1C10`, text `#e8e8e0`, accent `#142a1a`, primary `#D4A100`.
- **Layout:** `(admin)/admin/layout.tsx` → `SidebarProvider` + `SidebarInset` + `AdminBreadcrumb`.
- **Auth:** Server-side check `supabase.auth.getUser()` + role `admin` từ bảng `profiles`.
- **Components Admin riêng:** `AdminSidebar.tsx`, `AdminBreadcrumb.tsx` trong `src/components/admin/`.

> **QUY TẮC:** Khi code admin, KHÔNG custom inline style. Dùng shadcn component props chuẩn (`variant`, `size`).

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
├── app/[locale]/
│   ├── (restaurant)/    # Trang khách (page, menu, booking, blog...)
│   ├── (admin)/
│   │   ├── layout.tsx   # font-inter wrapper
│   │   ├── admin/
│   │   │   ├── layout.tsx   # SidebarProvider + Auth Guard
│   │   │   ├── page.tsx     # Dashboard
│   │   │   ├── menu/        # CRUD Món ăn
│   │   │   └── categories/  # CRUD Danh mục
│   │   └── login/       # Admin login
│   └── layout.tsx       # Root layout (fonts, theme)
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── admin/           # AdminSidebar, AdminBreadcrumb
│   └── layout/          # Header, Footer, Navigation
├── lib/
│   └── actions/         # Server Actions (item, category)
├── types/               # TypeScript types/interfaces
├── stores/              # Zustand stores
├── i18n/                # i18n configuration
└── utils/               # Supabase client/server helpers
```

## 5. Quy trình Làm việc

1. **Đọc SPEC.md** trước mọi thay đổi.
2. **Kiểm tra Shadcn UI** trước khi tạo component mới.
3. **Định nghĩa Type/Interface** trước khi code logic.
4. **Không hard-code** — Dùng design tokens từ Tailwind config.
5. **Tách API layer** — Đặt logic gọi dữ liệu trong `lib/`, không trong component.
6. **⚠️ Cập nhật CHANGELOG — BẮT BUỘC sau MỌI thay đổi**:
   - **KHÔNG ĐƯỢC** báo hoàn thành task mà chưa cập nhật `.gsd/CHANGELOG.md`.
   - Đây là bước **CUỐI CÙNG** của mọi fix bug hoặc thêm feature mới — PHẢI thực hiện trước khi kết thúc.
   - Format entry theo nhóm ngày `## [YYYY-MM-DD] — Tên thay đổi`, gồm:
     - **Thêm mới** — Files/features/assets mới
     - **Sửa đổi** — Files đã thay đổi và lý do
     - **Xóa** — Files đã xóa (nếu có)
7. **Hỏi và Xác nhận (Giao tiếp với User)**:
   - Nếu requirement chưa rõ / thiếu thông tin: **PHẢI DỪNG LẠI VÀ HỎI USER**, không tự đoán mò.
   - Khi có thay đổi lớn (hoặc sinh hình ảnh/assets): Cần generate, show cho user xem qua, đợi **Xác nhận (Confirm)** rồi mới update trực tiếp vào code file. Tôn trọng luồng review.
8. **Hình ảnh — 100% Thuần Chay (Vegetarian/Vegan Only)**:
   - Đây là **Nhà hàng CHAY**. Khi gen hình ảnh hoặc chọn ảnh minh họa, **NGHIÊM CẤM** có thịt, cá, hải sản, hoặc bất kỳ thực phẩm động vật nào.
   - Prompt gen hình **BẮT BUỘC** ghi rõ: `strictly vegetarian/vegan food only, no meat, no seafood, no animal products`.
   - Thức ăn trong hình phải gắn liền với đồ chay: rau củ, đậu hũ, nấm, ngũ cốc, trái cây, thảo mộc, v.v.
