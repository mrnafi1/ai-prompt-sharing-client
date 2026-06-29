# AI Prompt Sharing & Marketplace Platform — Client

## Project Overview
A community-driven marketplace for discovering, sharing, and managing AI prompts across multiple platforms including ChatGPT, Gemini, Claude, Midjourney, and DALL-E. Features role-based dashboards, premium content gating, and comprehensive analytics.

## Live URL
**Frontend**: https://ai-prompt-sharing-client-nine.vercel.app/

## Core Features

### Authentication & Authorization
- Firebase Authentication (Email/Password & Google OAuth)
- JWT-based session management with httpOnly cookies
- Role-based access control (User, Creator, Admin)
- Protected routes with automatic redirect handling

### Public Features
- Advanced search with server-side filtering by title, tags, and AI tools
- Multi-criteria filtering (category, AI tool, difficulty level)
- Sorting options (latest, most popular, most copied)
- Featured prompts showcase with dynamic content
- Top creators leaderboard
- Community reviews and ratings display

### User Dashboard
- Add new prompts (3-prompt limit for free tier)
- Manage personal prompts (update, delete, view analytics)
- Bookmark management for favorite prompts
- Review history tracking
- Profile management with subscription status

### Creator Dashboard
- Performance analytics with Recharts visualizations
- Copy count breakdown by prompt
- Prompt growth tracking over time
- Advanced prompt management tools

### Admin Dashboard
- User management (role assignment, user deletion)
- Prompt moderation (approve, reject with feedback, feature/unfeature)
- Payment transaction monitoring
- Content report handling (remove, warn, dismiss)
- Platform-wide analytics (users, prompts, reviews, copies)

### Premium Features
- Stripe integration for one-time $5 payment
- Access to all private/premium prompts
- Unlimited prompt creation
- No recurring charges

## Technology Stack

### Core Libraries
- **React 19.2** — UI framework
- **React Router DOM 7.18** — Client-side routing
- **Vite 8.1** — Build tool and dev server
- **TailwindCSS 4.3** — Utility-first styling
- **DaisyUI 5.5** — Component library

### State & Data Management
- **@tanstack/react-query 5.101** — Server state management
- **Axios 1.18** — HTTP client

### Authentication & Forms
- **Firebase 12.15** — Authentication service
- **React Hook Form 7.80** — Form validation

### UI Enhancement
- **Framer Motion 12.41** — Animation library
- **React Toastify 11.1** — Toast notifications
- **Recharts 3.9** — Data visualization

### Payment Processing
- **@stripe/stripe-js 9.8** — Stripe SDK
- **@stripe/react-stripe-js 6.6** — React Stripe components


## Project Structure
```
src/
├── components/       # Reusable UI components
├── layouts/          # Layout wrappers (Main, Dashboard)
├── pages/            # Page components organized by feature
│   ├── Auth/         # Login & Register
│   ├── Home/         # Landing page sections
│   ├── AllPrompts/   # Prompt listing
│   ├── PromptDetails/# Single prompt view
│   ├── Payment/      # Stripe checkout
│   └── Dashboard/    # User, Creator, Admin dashboards
├── hooks/            # Custom React hooks
├── router/           # Route configuration
├── providers/        # Context providers
└── firebase/         # Firebase configuration
```

## Key Features Implementation

### Framer Motion Animations
Applied to Banner, Featured Prompts, Reviews, How It Works, and Top Creators sections for smooth entrance animations.

### Server-Side Operations
All search, filtering, sorting, and pagination operations are handled server-side for optimal performance and scalability.

### Premium Content Gating
Locked prompts display blurred content with subscription prompts. Review and copy functionalities are disabled until premium access is granted.

### Responsive Design
Fully responsive layout supporting mobile (320px+), tablet (768px+), and desktop (1024px+) viewports with adaptive navigation and layouts.

## npm Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

