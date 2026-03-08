---
phase: 4
plan: 3
wave: 3
depends_on: ["2-PLAN.md"]
files_modified: ["src/lib/actions/item.ts", "src/app/[locale]/admin/menu/page.tsx", "src/components/admin/ImageUpload.tsx", "supabase/migrations/xxxx_storage.sql"]
autonomous: true
user_setup:
  - service: supabase
    why: "Create public storage bucket for menu images"
    dashboard_config:
      - task: "Create 'menu-images' bucket"
        location: "Supabase Dashboard -> Storage"
must_haves:
  truths:
    - "Menu items can be fully managed (CRUD)"
    - "Images can be uploaded to Supabase Storage"
  artifacts:
    - "src/app/[locale]/admin/menu/page.tsx exists"
    - "src/components/admin/ImageUpload.tsx exists"
---

# Plan 4.3: Menu Items CRUD & Image Upload

<objective>
Implement CRUD for Menu Items, including uploading images to Supabase Storage.
Purpose: Allow admins to completely manage the restaurant's menu items.
Output: Storage setup, Server actions for items, Menu Item table UI, Image Upload component.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- src/components/ui/table.tsx
- src/lib/api/menu.ts
</context>

<tasks>

<task type="auto">
  <name>Storage Setup & Image Upload Component</name>
  <files>supabase/migrations/20261010_storage.sql, src/components/admin/ImageUpload.tsx</files>
  <action>
    Create an SQL script to create the `menu-images` storage bucket and its RLS policies (public read, admin authenticated insert/update/delete).
    Create a client-side `ImageUpload.tsx` component that takes a file, uses `@supabase/supabase-js` browser client to upload to bucket, and returns the public URL.
    AVOID: Uploading files via Server Actions if it exceeds Vercel limits; direct client-to-Supabase upload is safer for images.
  </action>
  <verify>npm run build passes</verify>
  <done>ImageUpload component is ready to be embedded in forms</done>
</task>

<task type="auto">
  <name>Create Menu Item Server Actions</name>
  <files>src/lib/actions/item.ts</files>
  <action>
    Create Server Actions `createMenuItem`, `updateMenuItem`, `deleteMenuItem`.
    Must handle all i18n fields (name_en, name_vi, name_zh, description_en...), price, category_id, is_available, and image_url.
    Validate admin role before mutation. Call `revalidatePath('/[locale]/admin/menu')` and `revalidatePath('/[locale]/menu')`.
  </action>
  <verify>npm run build passes</verify>
  <done>Menu Item actions are complete and type-safe</done>
</task>

<task type="auto">
  <name>Build Menu Items Management UI</name>
  <files>src/app/[locale]/admin/menu/page.tsx</files>
  <action>
    Create the Admin Menu Items page with TanStack Table.
    Server-side fetch of menu items and categories.
    Columns: Image (thumbnail), Name VI, Category, Price, Status (Available/Sold Out), Actions.
    "Add Item" button opens a Dialog/Sheet with the comprehensive form.
    Integrate `ImageUpload` component into the form.
    Wire the form to the Server Actions.
  </action>
  <verify>UI renders and works properly</verify>
  <done>Add, Edit, and Delete workflows for menu items work via UI</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Menu items can be fully managed (CRUD)
- [ ] Images can be uploaded to Supabase Storage
</verification>

<success_criteria>

- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
