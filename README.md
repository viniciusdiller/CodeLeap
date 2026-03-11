# 🚀 CodeLeap Network - Advanced Frontend Challenge

A modern, responsive, and highly interactive social feed application built for the CodeLeap recruitment process. This project goes beyond standard CRUD requirements to deliver a production-ready UX/UI, featuring advanced state management, dynamic SEO, and delightful micro-interactions.

> ### ⚠️ Important: API Configuration
>
> To ensure the application functions correctly, you must configure the environment variable with the API endpoint provided in the CodeLeap Figma/Documentation.

## 🛠 Tech Stack & Architecture

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** Strict TypeScript
- **State Management:** Redux Toolkit (with `localStorage` persistence)
- **Styling:** Tailwind CSS + Shadcn/ui (Radix UI)
- **Icons:** Lucide React
- **API Consumption:** Native Fetch API with a custom service layer

## 🌟 "Surprise Us" Bonuses Implemented

I took the "Surprise us :)" prompt seriously. Here are the extra features built to ensure a premium user experience:

- 🌙 **Persistent Dark Mode:** Seamless, animated theme switching (`next-themes`) with system preference detection and hydration-safe rendering.
- 🔍 **Instant Client-Side Search:** Real-time filtering of posts by title or username without unnecessary API calls.
- ❤️ **Interactive Social UI (Mock):** Added engaging micro-interactions including Likes, dynamic mock Comment counts with an animated slide-down input, and a "Share to Clipboard" feature.
- 🎉 **UX Delight:** Integrated `canvas-confetti` for a celebratory explosion when a user successfully creates a post.
- 🎨 **Dynamic Avatars & Smart Text:** Auto-generated user avatars via UI Avatars API, plus a Regex-powered "Smart Text" formatter that highlights `#hashtags` and `@mentions` in blue.
- 🚀 **Advanced Next.js SEO:** Programmatic Favicon generation and dynamic Open Graph (`og:image`) rendering using `next/og` for beautiful link previews on social media.
- ⬆️ **Scroll-to-Top:** A smooth, intersection-aware floating action button for long feeds.
- 🔔 **Toast Notifications:** Elegant, real-time feedback for all CRUD operations using `sonner`.

## ✨ Core Features

- **Full CRUD:** Create, Read, Update, and Delete posts securely.
- **Session Persistence:** Redux state synced with `localStorage`—refreshing the page won't lose your username session.
- **Pagination (Load More):** Efficient data fetching using `limit` and `offset` endpoints.
- **Graceful Loading States:** Beautiful Skeleton loaders during initial fetch and spinner feedback during API mutations.
- **Responsive & Scalable:** Pixel-perfect adherence to the provided design, fully optimized from mobile to ultra-wide desktop displays (including global UI scaling).

## 💻 Getting Started

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
