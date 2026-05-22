# 🌿 Anchorleaf

An ad-free, privacy-first, scientifically-grounded Dialectical Behavior Therapy (DBT) companion designed specifically to aid individuals managing Borderline Personality Disorder (BPD), intense emotions, and distress. Built on the clinical principles established by Dr. Marsha Linehan.

Live Repository: [https://github.com/bedigambar/Anchorleaf](https://github.com/bedigambar/Anchorleaf)

---

## ✨ Features

- **🧘 The Four Pillars of DBT**: Structured modules outlining key DBT skills:
  - **Mindfulness**: Being present, practicing the Wise Mind, and observing without judgment.
  - **Distress Tolerance**: Crisis survival skills, TIPP techniques, and self-soothing.
  - **Emotion Regulation**: Understanding, naming, and mitigating extreme emotional spikes.
  - **Interpersonal Effectiveness**: Navigating relationships with DEAR MAN, GIVE, and FAST frameworks.
- **⚡ Right-Now Crisis Toolkit**:
  - **Mammalian Dive Reflex Guide**: Instant instructions for physiological panic spikes (e.g., using cold water).
  - **Box Breathing Companion**: Smooth, visual, and rhythmic breathing guide to regulate the nervous system.
  - **Grounding 5-4-3-2-1**: Interactive sensory grounding tool to combat dissociation and anxiety.
  - **Self-Soothe Card**: A modular guide to recruit the 5 senses for emotional regulation.
- **📖 Integrated Skills Handbook**: An inline, responsive PDF reader featuring the official DBT Skills Training Handouts and Worksheets for easy study and review.
- **📓 Privacy-First Daily Journal**: A daily mood, behavior, and urge tracker stored entirely locally on your device (`localStorage`) with no server-side databases or trackers.
- **🔍 Quick Navigation Command Palette**: Press `Ctrl + K` or `⌘ + K` to search and jump to any skill, resource, or page instantly.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core Library**: React 19
- **Styling**: Tailwind CSS v4 & custom Vanilla CSS variables for optimal aesthetic flexibility.
- **Animations**: Framer Motion for smooth, soothing page transitions and micro-animations.
- **Icons**: Lucide React
- **Type Safety**: TypeScript

---

## 🎨 Design Philosophy & Aesthetics

Anchorleaf is designed with a **calming, premium aesthetic** intended to soothe the nervous system upon loading:
- **Color Palette**: Tailored HSL tones featuring soft creams, warm whites, organic sages, and grounding earth tones.
- **Motion Design**: Gentle animations with easing curves (`[0.25, 0.1, 0.25, 1]`) to provide interactive feedback without overwhelming the user.
- **Typography**: Sleek, legible serif headings paired with highly readable sans-serif body fonts for optimal readability.

---

## 📁 Codebase Architecture

```bash
Anchorleaf/
├── app/                  # Next.js App Router (Server wrappers & Client pages)
│   ├── about/            # Mission, origin, and ethics of Anchorleaf
│   ├── dbt/              # DBT hub, individual pillar routes, and cheat sheets
│   ├── journal/          # Local journal log entries and tracking page
│   ├── learn/            # Scientifically grounded BPD/DBT learning modules
│   ├── tools/            # Crisis toolkit, box breathing, and grounding cards
│   ├── handbook/         # DBT Skills Handbook PDF reader
│   └── globals.css       # Design tokens, custom HSL variables, and global classes
├── components/           # Reusable UI & Layout Components
│   ├── dbt/              # Acronym cards, Interactive Wise Mind diagram, filters
│   ├── sections/         # Home page presentation cards and BPD guides
│   ├── pdf/              # PDF reader controls
│   └── ui/               # Command palette, Navbar, Footer, and animated items
├── data/                 # Static data (e.g. learning articles, skill definitions)
├── lib/                  # Utilities, storage interfaces, helper hooks
└── public/               # static assets (PDF handbook, background video)
```

### 💡 Server Wrapper Pattern
To maximize SEO performance and initial load speeds while retaining rich Framer Motion animations, page routes use the **Server-Wrapper Component** pattern:
- **`page.tsx`**: A Server Component exporting static page `metadata` (SEO title, description, and open-graph parameters).
- **`*Client.tsx`**: A client-side component loaded by the page wrapper containing local state, interactive hooks, and animations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bedigambar/Anchorleaf.git
   cd Anchorleaf
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔒 Privacy & Ethics

* **Zero Tracking**: No Google Analytics, no tracking cookies, no external trackers.
* **Client-Only Storage**: All journal entries and bookmarks are stored strictly within the user's browser using `localStorage`. Your data never leaves your device.
* **No Paywalls**: Anchorleaf is 100% free, open-source, and dedicated to emotional health accessibility.
