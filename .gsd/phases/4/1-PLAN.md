---
phase: 4
plan: 1
wave: 1
depends_on: []
files_modified: ["src/middleware.ts", "src/utils/supabase/middleware.ts", "src/app/[locale]/admin/layout.tsx", "src/app/[locale]/admin/page.tsx", "messages/vi.json", "messages/en.json", "messages/zh.json"]
autonomous: true
must_haves:
  truths:
    - "Non-admin users accessing /admin are redirected to home"
    - "Admin users can access /admin and see the admin sidebar"
  artifacts:
    - "src/app/[locale]/admin/layout.tsx exists"
---

# Plan 4.1: Auth Guard & Admin Layout

<objective>
Protect the `/admin` routes using Next.js middleware and Supabase Auth. Build the shared layout (Sidebar) for the Admin Panel.
Purpose: Secure the admin area and provide navigation.
Output: Middleware update and Admin layout component.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- src/middleware.ts
- src/utils/supabase/middleware.ts
</context>

<tasks>

<task type="auto">
  <name>Protect Admin Routes</name>
  <files>src/middleware.ts, src/utils/supabase/middleware.ts</files>
  <action>
    Update `updateSession` or `middleware` to check if the path starts with `/:locale/admin` or `/admin`.
    If yes, call `supabase.auth.getUser()`. Look up the user's role (either from `user_metadata` or by querying the `profiles` table to see if `role === 'admin'`).
    If not admin or not logged in, redirect to the localized home page (`/vi`, `/en`, etc.).
    AVOID: querying the database in edge middleware if it's not allowed; instead, `updateSession` can check `auth.getUser()`. Alternatively, build a Server Component layout check for `/admin/layout.tsx` if edge middleware DB querying fails. Relying on Server Component layout check might be safer for Supabase roles. Let's do the check in `src/app/[locale]/admin/layout.tsx` to be absolutely safe with Database queries.
  </action>
  <verify>Accessing /vi/admin while logged out redirects to /vi</verify>
  <done>Middleware/Layout protection successfully blocks non-admins</done>
</task>

<task type="auto">
  <name>Create Admin Layout and Dashboard Stub</name>
  <files>src/app/[locale]/admin/layout.tsx, src/app/[locale]/admin/page.tsx, messages/vi.json, messages/en.json, messages/zh.json</files>
  <action>
    Create a simple Sidebar + Main Content layout for the Admin area.
    Sidebar should have links to "Dashboard" (`/admin`), "Menu Categories" (`/admin/categories`), and "Menu Items" (`/admin/menu`).
    Use Shadcn components or standard Tailwind.
    Add translations for the sidebar links in `messages` files.
    The `page.tsx` should just render a welcome text.
  </action>
  <verify>npm run build passes without TS errors</verify>
  <done>Admin layout with sidebar renders successfully</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Non-admin users are redirected away from /admin routes
- [ ] Admin layout renders a sidebar/navigation
</verification>

<success_criteria>

- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
