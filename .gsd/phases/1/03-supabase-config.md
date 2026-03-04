---
phase: 1
plan: 3
wave: 2
depends_on: [1]
files_modified: []
autonomous: true

must_haves:
  truths:
    - "Client Next.js có thể kết nối thành công tới Project Supabase."
    - "Trạng thái Auth của Supabase có thể được truy xuất trên Server-side."
  artifacts:
    - "Các biến môi trường `.env.local` cho Supabase."
    - "Thư mục `src/lib/supabase` chứa các helper clients (server, client, middleware)."
---

# Plan 1.3: Tích hợp Supabase (Backend/Auth SDK)

<objective>
Khởi tạo cấu trúc giao tiếp giữa Next.js và Supabase. Cài đặt Supabase SSR packages để dễ dàng fetch data và quản lý session auth từ cả client lẫn server components.
Purpose: Cắm mốc kết nối DB chuẩn bị cho Phase 3 (Dữ liệu động) và Phase 4 (Admin Auth).
Output: App có các helper sẵn sàng `$ supabase.auth.getSession()` ở bất kì đâu.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
</context>

<tasks>

<task type="auto">
  <name>Cài đặt @supabase/ssr và tạo Helpers</name>
  <files>
    package.json
    src/utils/supabase/client.ts
    src/utils/supabase/server.ts
    src/utils/supabase/middleware.ts
    .env.example
  </files>
  <action>
    Cài đặt các thư viện `@supabase/supabase-js` và `@supabase/ssr`. Thực hiện copy các config tiêu chuẩn từ Supabase Docs để tạo 3 file helper (cho client browser, cho server components, và cho middleware). Cập nhật `.env.example`. Cập nhật `src/middleware.ts` (đã có từ plan 1.2) để vắt qua cả i18n middleware lẫn supabase session middleware.
    AVOID: Ghi đè file middleware của next-intl. Phải lồng (chain) middleware của supabase auth và next-intl lại với nhau một cách tinh tế.
  </action>
  <verify>npm run lint</verify>
  <done>File `src/utils/supabase/server.ts` export được createClient mà không báo lỗi TypeScript.</done>
</task>

<task type="checkpoint:human-verify">
  <name>Xác thực kết nối Supabase</name>
  <files>.env.local</files>
  <action>
    Người dùng (Human) cần cung cấp `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` thật vào `.env.local`. Test gọi một hàm query rỗng hoặc parse URL thành công.
  </action>
  <verify>cat .env.local chứa key supabase</verify>
  <done>Supabase Client sẵn sàng đọc/ghi dữ liệu ở các Phase sau.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Middleware hoạt động ổn định song song cả i18n và Supabase Auth.
- [ ] Typescript không báo lỗi thiếu Type cho database (Có thể tạo file `types_db.ts` rỗng chừa sẵn).
</verification>

<success_criteria>

- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
