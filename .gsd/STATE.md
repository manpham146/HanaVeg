# STATE.md

> **Current Context**: Phase 5 (Polish & V1 Launch) — Ready for planning.

## Current Position
- **Phase**: 5
- **Task**: Deploy & Verify
- **Status**: Pending Vercel Deployment

## Last Session Summary
Phase 5 automated execution completed.
1. Khởi tạo native GA4 Script, giải quyết vấn đề quản lý gói (không cần NPM).
2. Xây dựng Server-Layout pattern tại `menu`, `about`, `gallery` để override `generateMetadata` cho Client Components. Cấu hình i18n OpenGraph metadata hoàn chỉnh 3 ngôn ngữ.

## Next Steps
1. Push code lên Github (nếu chưa làm).
2. Kết nối repo lên nền tảng **Vercel**.
3. Cài đặt các biến môi trường sau trong Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GA_ID` (Nếu có, hoặc có thể thêm sau)
4. Verify link `*.vercel.app` trực tiếp và thông báo hoàn thành để kết thúc Phase 5.
