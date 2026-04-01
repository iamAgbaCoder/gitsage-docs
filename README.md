# GitSage Intelligence Portal

Welcome to the **GitSage Intelligence Portal** — the central hub for developers using GitSage, the AI-powered conventional commit assistant. This Next.js platform serves as the central landing page, documentation website, and dashboard for managing your GitSage API keys.

## 🚀 Overview

GitSage understands _why_ you coded, not just _what_ changed. This repository powers the marketing site and backend integration platform, offering:

- **Cloud Intelligence (GitSage API)**: Lightning-fast, hyper-accurate commit intent generation.
- **Stealth Mode (Ollama)**: Local privacy-first intelligence integration.
- **API Key Dashboard**: Secure management for GitSage developer accounts.
- **Documentation**: Comprehensive setup guides and troubleshooting resources.

## 💻 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS & Framer Motion
- **Icons**: Lucide React & React Icons
- **Fonts**: Outfit (Headings) & Fira Code (Monospace)
- **Integration**: Axios for API client mapping

## 🛠️ Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Repository Structure

- `src/app/` - The Next.js pages, including `/docs` and `/dashboard`.
- `src/components/` - Reusable UI primitives (Live Terminal, Code Blocks, Cards, Sidebar).
- `src/context/` - Auth Context and state management for user sessions.
- `src/lib/api.ts` - The core HTTP client that connects frontend to the GitSage Intelligence backend.

## 🔒 Environment Variables

To properly test the API integrations locally, create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/v1
```

## 📜 License

© 2026 GitSage. MIT License. Built for iamAgbaCoder, by developers.
