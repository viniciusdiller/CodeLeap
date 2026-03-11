# 🚀 CodeLeap Network - Advanced Frontend Challenge

[![Deploy Status](https://img.shields.io/badge/Deploy-Live_on_Vercel-success?style=for-the-badge&logo=vercel)](<[SEU_LINK_DA_VERCEL_AQUI](https://code-leap-test-pi.vercel.app/)>)

**🔗 Live Demo:** [https://code-leap-test-pi.vercel.app/](https://code-leap-test-pi.vercel.app/)

A modern, responsive, and highly interactive social feed application built for the CodeLeap recruitment process. This project goes beyond standard CRUD requirements to deliver a production-ready UX/UI, featuring advanced state management, dynamic SEO, and delightful micro-interactions.

> ### ⚠️ Important: API Configuration
>
> To run this project locally, create a `.env.local` file in the root directory and add the provided API endpoint:

## 🛠 Tech Stack & Architecture

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** Strict TypeScript
- **State Management:** Redux Toolkit (with `localStorage` persistence)
- **Styling:** Tailwind CSS + Shadcn/ui (Radix UI)
- **Icons:** Lucide React
- **API Consumption:** Native Fetch API with a custom service layer

## 🌟 "Surprise Us" Bonuses Implemented

II took the "Surprise us :)" prompt seriously. Here are the extra features built to ensure a premium user experience:

- 🌙 **Persistent Dark Mode:** Seamless, animated theme switching (`next-themes`) with system preference detection and hydration-safe rendering.
- 🔍 **Smart View Filtering:** Real-time client-side filtering of currently loaded posts. _Note: Designed specifically to act as a local view filter rather than a global search, ensuring compatibility with the API's cursor-based pagination without fetching the entire database at once._
- 🔔 **Robust Error Handling & Toasts:** Elegant, real-time feedback for all CRUD operations and API fallbacks using `sonner`.
- ❤️ **Interactive Social UI (Mock):** Added engaging micro-interactions including Likes, dynamic mock Comment counts with an animated slide-down input, and a "Share to Clipboard" feature.
- 🎉 **UX Delight:** Integrated `canvas-confetti` for a celebratory explosion when a user successfully creates a post.
- 🎨 **Dynamic Avatars & Smart Text:** Auto-generated user avatars via UI Avatars API, plus a Regex-powered "Smart Text" formatter that highlights `#hashtags` and `@mentions` in blue.
- 🚀 **Advanced Next.js SEO:** Programmatic Favicon generation and dynamic Open Graph (`og:image`) rendering using `next/og` for beautiful link previews on social media.
- ⬆️ **Scroll-to-Top:** A smooth, intersection-aware floating action button for long feeds.

## ✨ Core Features

- **Full CRUD:** Create, Read, Update, and Delete posts securely.
- **Session Persistence:** Redux state synced with `localStorage`—refreshing the page won't lose your username session.
- **Pagination (Load More):** Efficient data fetching using `limit` and `offset` endpoints.
- **Graceful Loading States:** Beautiful Skeleton loaders during initial fetch and spinner feedback during API mutations.
- **Responsive & Scalable:** Pixel-perfect adherence to the provided design, fully optimized from mobile to ultra-wide desktop displays (including global UI scaling).
