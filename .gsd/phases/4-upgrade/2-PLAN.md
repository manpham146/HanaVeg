---
phase: 4-upgrade
plan: 2
wave: 1
---

# Plan 4U.2: Auth Pages Redesign

## Objective
Redesign the Login page and create new Register and Forgot Password pages matching the shadcnblocks-admin clean auth style. All auth pages use the (admin) route group layout (no restaurant Header/Footer).

## Context
- src/app/[locale]/(admin)/login/page.tsx (current login — basic form)
- src/utils/supabase/client.ts (Supabase client)
- Reference: shadcnblocks-admin login/register/forgot-password screenshots
- messages/vi.json, messages/en.json, messages/zh.json (i18n)

## Tasks

<task type="auto">
  <name>Redesign Login page</name>
  <files>src/app/[locale]/(admin)/login/page.tsx</files>
  <action>
    Redesign login page to shadcnblocks-admin style:
    1. Centered card with subtle border + rounded corners
    2. "Hana Admin" logo/text at top
    3. "Login" heading + "Enter your email and password below" subtitle
    4. Email field (shadcn Input) + Password field with show/hide toggle
    5. "Forgot password?" link next to Password label
    6. Primary "Login" button (full width)
    7. "Don't have an account? Register" link at bottom
    8. Error display with shadcn styling
    9. Use useTranslations for all text
    - AVOID: Social login buttons (not needed for v1)
    - AVOID: Restaurant Header/Footer (handled by route group layout)
  </action>
  <verify>Navigate to http://localhost:3000/vi/login — clean card form, no Header/Footer, links work</verify>
  <done>Login page matches shadcnblocks-admin style with email/password + forgot/register links</done>
</task>

<task type="auto">
  <name>Create Register and Forgot Password pages</name>
  <files>
    src/app/[locale]/(admin)/register/page.tsx [NEW]
    src/app/[locale]/(admin)/forgot-password/page.tsx [NEW]
    src/lib/actions/auth.ts [NEW — server actions for register/forgot-password]
    messages/vi.json, messages/en.json, messages/zh.json
  </files>
  <action>
    1. Create Register page:
       - Same centered card style as Login
       - "Create an account" heading
       - Email + Password + Confirm Password fields
       - "Create Account" button
       - "Already have an account? Log In" link
       - Server action: Supabase signUp — new users get role 'staff' by default
       - Client-side validation: password match, min 6 chars
    2. Create Forgot Password page:
       - "Forgot Password" heading + instruction text
       - Email field + "Continue" button
       - Server action: Supabase resetPasswordForEmail
       - Success state: "Check your email for reset link"
       - "Don't have an account? Register" link
    3. Add i18n keys for all 3 auth pages in vi/en/zh message files
    - AVOID: Social login (GitHub/Facebook) — not needed
    - Security: Register creates 'staff' role, NOT 'admin'. Admin role must be assigned manually via Supabase dashboard.
  </action>
  <verify>
    Navigate to /vi/register — form renders, fields present
    Navigate to /vi/forgot-password — form renders, email field present
  </verify>
  <done>Register + Forgot Password pages created, i18n keys for 3 languages added, navigation between auth pages works</done>
</task>

## Success Criteria
- [ ] Login page redesigned with clean card layout
- [ ] Register page created with email/password/confirm
- [ ] Forgot Password page created with email input
- [ ] All auth pages use Inter font, no restaurant Header/Footer
- [ ] Navigation links between Login ↔ Register ↔ Forgot Password work
- [ ] i18n translations added for VI, EN, ZH
