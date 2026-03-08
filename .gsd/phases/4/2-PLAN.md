---
phase: 4
plan: 2
wave: 2
depends_on: ["1-PLAN.md"]
files_modified: ["src/app/[locale]/admin/categories/page.tsx", "src/lib/actions/category.ts"]
autonomous: true
must_haves:
  truths:
    - "Categories can be read, created, updated, and deleted via Server Actions"
    - "Categories are displayed in a TanStack Table"
  artifacts:
    - "src/app/[locale]/admin/categories/page.tsx exists"
    - "src/lib/actions/category.ts exists"
---

# Plan 4.2: Menu Categories CRUD

<objective>
Implement full CRUD for Menu Categories in the Admin Panel using Server Actions and TanStack Table.
Purpose: Allow admins to manage categories.
Output: Server actions for categories, Category table UI.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- src/components/ui/table.tsx
- src/lib/api/menu.ts
</context>

<tasks>

<task type="auto">
  <name>Create Category Server Actions</name>
  <files>src/lib/actions/category.ts</files>
  <action>
    Create Server Actions `createCategory`, `updateCategory`, `deleteCategory`.
    Use the `createServerClient` from `src/utils/supabase/server`.
    Ensure user is admin before performing mutations.
    Call `revalidatePath('/[locale]/admin/categories')` and `revalidatePath('/[locale]/menu')` upon success.
    AVOID: Client-side Supabase mutations for administrative writes. Use Server Actions.
  </action>
  <verify>npm run build passes</verify>
  <done>CRUD server actions are type-safe and functional</done>
</task>

<task type="auto">
  <name>Build Category Management UI</name>
  <files>src/app/[locale]/admin/categories/page.tsx</files>
  <action>
    Create the Admin Categories page.
    Fetch categories server-side.
    Use `DataTable` (TanStack Table) to display categories (columns: Name EN, Name VI, Sort Order, Actions).
    Add "Add Category" button opening a Dialog with a form (Name EN, Name VI, Name ZH, Sort Order).
    Implement "Edit" and "Delete" actions in the table row payload.
    Wire the forms to the Server Actions.
  </action>
  <verify>UI renders and table displays categories</verify>
  <done>Add, Edit, and Delete workflows work via UI</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Categories can be read, created, updated, and deleted via Server Actions
- [ ] Categories are displayed in a TanStack Table
</verification>

<success_criteria>

- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
