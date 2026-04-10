---
phase: 5
plan: 1
wave: 1
---

# Plan 5.1: Polish, SEO & V1 Launch Preparation

## Objective
Implement comprehensive i18n SEO metadata (Option A) across all core pages, integrate Google Analytics support via environment variables, and prepare the project for a seamless Vercel deployment without custom domain configurations.

## Context
- `.gsd/SPEC.md`
- `.gsd/ROADMAP.md`
- `src/app/[locale]/layout.tsx`
- Active restaurant pages (`page.tsx`, `menu/page.tsx`, `about/page.tsx`, `gallery/page.tsx`)

## Tasks

<task type="auto">
  <name>Task 1: Install & Configure GA4 via @next/third-parties</name>
  <files>src/app/[locale]/layout.tsx, package.json</files>
  <action>
    - Install the `@next/third-parties` package for Next.js 15.
    - Update `src/app/[locale]/layout.tsx` to include the `<GoogleAnalytics />` component.
    - Ensure it conditionally loads only if `process.env.NEXT_PUBLIC_GA_ID` is present so it won't crash when empty.
  </action>
  <verify>yarn tsc && yarn build should not error out.</verify>
  <done>GA4 is gracefully integrated and reliant strictly on ENV variable presence.</done>
</task>

<task type="auto">
  <name>Task 2: Advanced i18n SEO Metadata (Option A)</name>
  <files>src/app/[locale]/(restaurant)/**/page.tsx, messages/*.json</files>
  <action>
    - Add localized SEO fields (title, description, openGraph tags) to `messages/vi.json`, `en.json`, `zh.json`.
    - Implement `generateMetadata` exports in all V1 user-facing pages:
      - `src/app/[locale]/(restaurant)/page.tsx` (Home)
      - `src/app/[locale]/(restaurant)/menu/page.tsx` (Menu)
      - `src/app/[locale]/(restaurant)/about/page.tsx` (About)
      - `src/app/[locale]/(restaurant)/gallery/page.tsx` (Gallery)
    - Ensure titles are suffixed with " - Hana Restaurant".
  </action>
  <verify>Check `yarn dev` to see if the `<title>` tag translates perfectly when switching between /vi, /en, /zh.</verify>
  <done>All V1 pages support granular SEO configurations managed through next-intl.</done>
</task>

<task type="checkpoint:human-verify">
  <name>Task 3: Go Live with Vercel Deploy</name>
  <files />
  <action>
    - Pause coding and switch to Deployment phase.
    - Push all recent commits to the remote GitHub repository.
    - Provide Vercel deployment checklist to the user (setting up `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_GA_ID`).
    - After deployment, user verifies the application runs correctly on Vercel's provided `{project-name}.vercel.app` domain.
  </action>
  <verify>User provides successful Vercel production URL.</verify>
  <done>V1 Launch completed on Vercel.</done>
</task>

## Success Criteria
- [ ] Vercel deployment works seamlessly out of the box.
- [ ] Google Analytics is ready and can be enabled just by adding `NEXT_PUBLIC_GA_ID` in Vercel settings.
- [ ] Dynamic SEO metadata correctly reflects the selected locale parameter.
