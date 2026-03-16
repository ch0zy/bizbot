# Business Hub — Licences & Grants Dashboard

A Singapore business dashboard built with **React + Vite**, styled with the **Zero Foundation** design system (Teal / GB colour tokens, Lexend typography). It shows a user's active business licences, grant portfolio, and includes an AI-powered business advisor chat panel backed by the Claude API.

---

## Features

- **Licence management** — status tracking, validity progress bars, expiry alerts, direct links to GoBusiness renewal pages
- **Grant portfolio** — eligibility match scores, apply/learn links to the Business Grants Portal
- **AI Chat Advisor** — powered by Claude (`claude-sonnet-4-20250514`), answers questions about licences, grant eligibility, compliance and growth
- **Zero Design System** — Teal (GB) brand colour tokens, Lexend type scale, Zero component conventions throughout
- **GitHub Actions CI/CD** — auto-deploys to GitHub Pages on every push to `main`

---

## Project Structure

```
business-hub/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Full dashboard + chat UI (single component file)
│   └── main.jsx         # React entry point
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions → GitHub Pages
├── .env.example         # Environment variable template
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Local development

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/business-hub.git
cd business-hub

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and set VITE_ANTHROPIC_API_KEY=sk-ant-...

# 4. Start dev server
npm run dev
# → http://localhost:3000
```

### Production build

```bash
npm run build
# Output in dist/
npm run preview   # preview the production build locally
```

---

## Deploying to GitHub Pages

### One-time setup

1. Push this repo to GitHub.
2. Go to **Settings → Pages** and set Source to **GitHub Actions**.
3. Go to **Settings → Secrets and variables → Actions** and add:
   - `VITE_ANTHROPIC_API_KEY` — your Anthropic API key
4. If your repo is at `https://username.github.io/business-hub/` (i.e. a project page, not a user page), also add a repository variable:
   - `VITE_BASE_PATH` = `/business-hub/`

### Deploying

Every push to `main` triggers the workflow automatically. You can also trigger it manually from the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_ANTHROPIC_API_KEY` | Yes (self-hosted) | Anthropic API key for the chat advisor. Not needed in the Claude.ai artifact environment where the proxy handles auth. |
| `VITE_BASE_PATH` | No | Base URL path for GitHub Pages project deployments (e.g. `/business-hub/`). Defaults to `/`. |

> **Security:** Never commit a real API key to source control. The `.gitignore` already excludes `.env` files. Set secrets via GitHub's encrypted secrets UI.

---

## Customising

### Swapping in real data

Business data is currently hardcoded in `src/App.jsx`. To connect a real backend:

1. Replace the `licences` and `grants` arrays with API fetch calls (e.g. in a `useEffect`).
2. The component structure and card layouts require no changes.

### Updating the AI advisor context

The system prompt in the `ChatPanel` component (`send` function) defines the AI's knowledge of the business. Update it to match the actual business profile and current licence/grant data.

### Design tokens

All Zero Foundation tokens are defined at the top of `App.jsx` in the `brand`, `color`, `type`, and `sp` constants. Update these to match any future Zero Foundation updates from Figma.

---

## GoBusiness Links Reference

| Button | Destination |
|---|---|
| Renew (any licence) | `gobusiness.gov.sg/licences/renew-amend-licence/` |
| View Details — Food Business Licence | `gobusiness.gov.sg/browse-all-licences/singapore-food-agency-(sfa)/food-shop-licence` |
| View Details — Liquor Licence | `licensing.gobusiness.gov.sg/licence-directory/spf/liquor-licence` |
| Track Status (pending) | `dashboard.gobusiness.gov.sg` |
| Learn More — EDG | `grants.gobusiness.gov.sg/support/enterprise-development-grant` |
| Learn More — PSG | `grants.gobusiness.gov.sg/support/productivity-solutions-grant` |
| Learn More — MRA | `grants.gobusiness.gov.sg/support/market-readiness-assistance` |
| Apply Now / View on BGP | `grants.gobusiness.gov.sg` |
| Browse Grants | `gobusiness.gov.sg/gov-assist/grants/` |
| Book Advisory Session | `gobusiness.gov.sg/gov-assist/` |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build tool | Vite 6 |
| Design system | Zero Foundation (Teal/GB tokens) |
| Font | Lexend (Google Fonts) |
| AI | Claude API (`claude-sonnet-4-20250514`) |
| Deployment | GitHub Pages via GitHub Actions |

---

## License

MIT
