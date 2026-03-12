---
phase: 4-upgrade
plan: 1
wave: 1
---

# Plan 4U.1: Shadcn Components + Admin Layout Overhaul

## Objective
Install required shadcn components and rebuild the admin layout as a separate app shell (no restaurant Header/Footer). Create collapsible sidebar with icons, user profile, and breadcrumbs.

## Context
- .gsd/SPEC.md
- src/app/[locale]/layout.tsx (current root layout — wraps ALL pages with Header/Footer)
- src/app/[locale]/admin/layout.tsx (current admin layout — basic sidebar)
- src/components/admin/ImageUpload.tsx (existing admin component)
- components.json (shadcn config — new-york style, lucide icons)

## Tasks

<task type="auto">
  <name>Install shadcn components</name>
  <files>components.json, src/components/ui/</files>
  <action>
    Run: npx shadcn@latest add sidebar avatar badge breadcrumb card checkbox dropdown-menu separator sheet tooltip
    This installs ~10 new components to src/components/ui/
    - Do NOT modify existing components
    - If prompted for overwrite, say no
  </action>
  <verify>ls src/components/ui/sidebar.tsx src/components/ui/avatar.tsx src/components/ui/badge.tsx</verify>
  <done>All 10 components exist in src/components/ui/</done>
</task>

<task type="auto">
  <name>Create admin route group layout</name>
  <files>
    src/app/[locale]/(admin)/layout.tsx [NEW]
    src/app/[locale]/(admin)/admin/layout.tsx [MOVE from src/app/[locale]/admin/layout.tsx]
    src/app/[locale]/(admin)/admin/page.tsx [MOVE]
    src/app/[locale]/(admin)/admin/menu/ [MOVE]
    src/app/[locale]/(admin)/admin/categories/ [MOVE]
    src/app/[locale]/(admin)/login/page.tsx [MOVE]
    src/components/admin/AdminSidebar.tsx [NEW]
    src/components/admin/AdminBreadcrumb.tsx [NEW]
  </files>
  <action>
    1. Install Inter font: npm install @fontsource/inter
    2. Create route group (admin) layout at src/app/[locale]/(admin)/layout.tsx that:
       - Imports Inter font (not Playfair Display)
       - Wraps children with NextIntlClientProvider
       - Does NOT import Header or Footer components
       - Sets body class with Inter font
    3. Create AdminSidebar component using shadcn Sidebar:
       - Logo: "Hana Admin" + Leaf icon
       - Nav groups: Dashboard (LayoutDashboard), Categories (FolderTree), Menu Items (UtensilsCrossed)
       - Footer: User avatar + name + email + LogOut dropdown
       - Collapsible on mobile via Sheet
    4. Create AdminBreadcrumb that parses pathname
    5. Update admin/layout.tsx to use new AdminSidebar + AdminBreadcrumb instead of old sidebar
    6. Move all admin routes into (admin) route group
    7. Move login page into (admin) route group
    - WHY route group: Next.js (admin) folder doesn't affect URL but allows a different layout
    - AVOID: Do not break existing /vi/admin URLs
  </action>
  <verify>Navigate to http://localhost:3000/vi/admin — no restaurant Header/Footer visible, sidebar with icons shown</verify>
  <done>Admin pages render with new sidebar layout, no restaurant Header/Footer, Inter font used throughout admin</done>
</task>

## Success Criteria
- [ ] 10 new shadcn components installed
- [ ] Admin pages no longer show restaurant Header/Footer
- [ ] Sidebar has icons, collapsible groups, user profile
- [ ] Breadcrumb visible on admin pages
- [ ] Inter font used for admin (not Playfair Display)
- [ ] Existing admin URLs still work (/vi/admin, /vi/admin/menu, etc.)
