---
phase: 1
plan: 1
wave: 1
depends_on: []
files_modified: []
autonomous: true

must_haves:
  truths:
    - "Dự án Next.js App Router được khởi tạo thành công bằng TypeScript."
    - "Tailwind CSS và Shadcn UI được cấu hình sẵn sàng sử dụng."
  artifacts:
    - "package.json chứa các dependencies cần thiết."
    - "components.json của shadcn tồn tại."
---

# Plan 1.1: Trụ cột (Foundation) Next.js & UI

<objective>
Khởi tạo dự án Next.js 14/15 App Router với TypeScript, cài đặt Tailwind CSS và cấu hình thư viện Shadcn UI.
Purpose: Tạo nền móng gốc vững chắc cho toàn bộ quá trình phát triển Component-Driven sau này.
Output: Source code Next.js cơ bản có khả năng chạy `npm run dev` không lỗi.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- Project_Spec.md
</context>

<tasks>

<task type="auto">
  <name>Khởi tạo Next.js & Tailwind CSS</name>
  <files>
    package.json
    tsconfig.json
    tailwind.config.ts
    postcss.config.mjs
    src/app/layout.tsx
    src/app/page.tsx
    src/app/globals.css
  </files>
  <action>
    Chạy lệnh `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm` để tạo dự án trong thư mục hiện tại. Bỏ qua nếu các file đã tồn tại. Dọn dẹp `src/app/page.tsx` thành trang rỗng cơ bản.
    AVOID: Tạo dự án vào một sub-folder. Phải tạo trực tiếp ở route hiện tại (.) vì thư mục root đã được Git track.
  </action>
  <verify>npm run build && npm run lint (Không có xuất hiện lỗi)</verify>
  <done>Dự án build thành công và xuất ra thông báo No linting errors.</done>
</task>

<task type="auto">
  <name>Cài đặt & Cấu hình Shadcn UI</name>
  <files>
    components.json
    src/lib/utils.ts
    tailwind.config.ts
  </files>
  <action>
    Chạy lệnh khởi tạo Shadcn UI (Ví dụ: `npx shadcn@latest init -d`). Cấu hình màu sắc theo tông Xanh lá cây tự nhiên (Màu zen như trong SPEC). Đảm bảo `src/lib/utils.ts` được tạo chuẩn với `clsx` và `tailwind-merge`. Cài đặt 1 component mẫu: `npx shadcn@latest add button`.
    AVOID: Ghi đè `globals.css` làm mất style mặc định của Tailwind mà chưa config lại màu. Hãy setup CSS variables cho Primary color: #2C5F2D (Xanh lá rừng sâu).
  </action>
  <verify>cat components.json (Xác nhận cấu hình shadcn tồn tại)</verify>
  <done>Thư mục components/ui/button có mặt và components.json được sinh ra đúng chuẩn.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Lệnh `npm run build` thành công.
- [ ] Thư mục `src/app` gọn gàng, file `page.tsx` cơ bản đã sẵn sàng cho bước tiếp theo.
</verification>

<success_criteria>

- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
