# prompt_ — AI Prompt Sharing & Marketplace Platform (Client)

## Purpose
A community marketplace where users discover, publish, bookmark, and review AI prompts
for tools like ChatGPT, Gemini, Claude, and Midjourney. Includes role-based dashboards
for Users, Creators, and Admins, plus a Stripe-powered Premium tier that unlocks
private prompts and removes the free 3-prompt limit.

## Live URL
> Add your deployed Vercel URL here once deployed.

## Key Features
- Email/Password + Google authentication (Firebase), with a server-issued JWT
  stored in an httpOnly cookie for protected API calls
- Role-based access control (User / Creator / Admin) with route guards that
  survive page reloads
- Home page with featured prompts, top creators, recent reviews, and search
- All Prompts page with fully server-side search, category/AI-tool/difficulty
  filters, sorting, and pagination
- Prompt Details with server-enforced premium content gating, bookmarking,
  copy-to-clipboard with copy-count tracking, reviews & ratings, and reporting
- Stripe Checkout for a one-time $5 Premium upgrade
- User Dashboard: Add Prompt (3-prompt free limit), My Prompts (update/delete/
  analytics), Saved Prompts, My Reviews, Profile
- Creator Dashboard: overview with Recharts visualizations (copies per prompt,
  prompt growth over time)
- Admin Dashboard: manage users & roles, approve/reject/feature prompts,
  view payments, moderate reported prompts, platform-wide analytics

## npm Packages Used
react, react-dom, react-router-dom, firebase, axios, @tanstack/react-query,
react-hook-form, react-toastify, framer-motion, recharts,
@stripe/react-stripe-js, @stripe/stripe-js, tailwindcss, @tailwindcss/vite,
daisyui

