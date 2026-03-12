---
phase: 4-upgrade
plan: 3
wave: 2
---

# Plan 4U.3: Dashboard Stat Cards + Data Tables Upgrade

## Objective
Replace the empty Dashboard with stat cards showing menu metrics. Upgrade Categories and Menu Items tables with search, badges, and dropdown actions.

## Context
- src/app/[locale]/(admin)/admin/page.tsx (current — just "Welcome" text)
- src/app/[locale]/(admin)/admin/menu/items-client.tsx (current items table)
- src/app/[locale]/(admin)/admin/categories/categories-client.tsx (current categories table)
- src/components/ui/badge.tsx (from Plan 4U.1)
- src/components/ui/card.tsx (from Plan 4U.1)
- src/components/ui/dropdown-menu.tsx (from Plan 4U.1)

## Tasks

<task type="auto">
  <name>Dashboard stat cards</name>
  <files>
    src/app/[locale]/(admin)/admin/page.tsx
  </files>
  <action>
    1. Fetch dashboard stats from Supabase:
       - Total menu items count
       - Total categories count
       - Available (in stock) items count
       - Sold out items count
    2. Display as 4 stat cards using shadcn Card:
       - Icon + Label + Number
       - Clean grid layout (2x2 on mobile, 4x1 on desktop)
    3. Remove old "Welcome" text
    - Use server component (RSC) to fetch counts directly
  </action>
  <verify>Navigate to /vi/admin — 4 stat cards visible with numbers</verify>
  <done>Dashboard shows 4 stat cards with real data from Supabase</done>
</task>

<task type="auto">
  <name>Upgrade data tables</name>
  <files>
    src/app/[locale]/(admin)/admin/menu/items-client.tsx
    src/app/[locale]/(admin)/admin/categories/categories-client.tsx
  </files>
  <action>
    1. Menu Items table upgrades:
       - Add search Input above table (filter by name, debounced)
       - Replace inline status spans with shadcn Badge (variant: default for "In Stock", destructive for "Sold Out")
       - Replace Edit/Delete buttons with DropdownMenu (⋯ icon → Edit, Delete)
       - Better empty state with illustration text
    2. Categories table upgrades:
       - Add search Input above table (filter by name)
       - Replace Edit/Delete buttons with DropdownMenu
       - Better empty state
    - AVOID: Don't change form dialog logic — keep existing CRUD working
    - AVOID: Don't introduce TanStack Table — keep it simple with useState filter
  </action>
  <verify>
    Navigate to /vi/admin/menu — search filters items, badges show status, dropdown menu has Edit/Delete
    Navigate to /vi/admin/categories — search filters categories, dropdown menu has Edit/Delete
  </verify>
  <done>Both tables have search, badges, and dropdown actions. Existing CRUD still works.</done>
</task>

## Success Criteria
- [ ] Dashboard shows 4 stat cards with counts from database
- [ ] Menu Items table has search + badges + dropdown actions
- [ ] Categories table has search + dropdown actions
- [ ] All existing CRUD functionality preserved
- [ ] Tables responsive on mobile (375px)
