# 🏥 HealthPulse

> A privacy-first Progressive Web App for anonymous symptom tracking, community health visualization, and automated health insights.

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8.svg)](https://web.dev/progressive-web-apps/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🌟 Overview

HealthPulse empowers users to log health symptoms, visualize community-level health trends, and receive personalized health insights—all without compromising privacy. No accounts, no personal data collection, just anonymous health awareness.

### Why HealthPulse?

- **🔒 Privacy by Design** – Zero personal identifiers, area-level aggregation only
- **📊 Smart Insights** – Rule-based analysis of symptom patterns and severity
- **🗺️ Community View** – Interactive maps showing ward-level health trends
- **📱 Works Everywhere** – PWA that functions offline and installs like a native app

---

## ✨ Features

### 📝 Health Diary
Track your symptoms privately with:
- Anonymous symptom logging with severity levels
- Optional contextual notes
- Timeline view of historical entries
- Persistent local storage

### 🧠 Automated Health Insights
Receive intelligent analysis including:
- Symptom frequency patterns
- Severity trend detection
- Recurring symptom identification
- Doctor consultation recommendations
- One-click Google Maps integration ("General Physician near me")

### 🗺️ Community Health Map
Visualize public health at scale:
- Interactive Leaflet-powered maps
- Ward-level health severity overlays
- Color-coded zones (Low, Moderate, High activity)
- Clickable regions with detailed symptom statistics

### 📱 Progressive Web App
Modern web app experience:
- Fully responsive (mobile, tablet, desktop)
- App-like navigation (top + bottom bars)
- Offline functionality for cached pages
- Smooth animations powered by Framer Motion
- Installable on any device

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **UI Library** | React 18 |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Maps** | Leaflet |
| **Icons** | Lucide React |
| **State** | React Hooks |
| **Platform** | Progressive Web App (PWA) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│         Frontend (PWA)              │
│  Next.js + React + Tailwind CSS     │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│        Logic Layer                  │
│  • Symptom ingestion                │
│  • Severity scoring                 │
│  • Insight generation (rule-based)  │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│      Data Layer (Demo)              │
│  • Local state & browser storage    │
│  • Symptom logs                     │
│  • Area aggregates                  │
└─────────────────────────────────────┘
```

**Key Design Principles:**
- Client-side processing (no external AI models in production)
- Rule-based insight engine
- No backend dependencies for core functionality
- Privacy-first data handling

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** v18 or later
- **npm** or **pnpm**

Verify installation:
```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd healthpulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

The app will hot-reload on code changes.

### Installing as PWA

1. Open HealthPulse in Chrome or Edge
2. Click the **Install** button in the address bar
3. Use HealthPulse like a native application

---

## 📂 Project Structure

```
healthpulse/
├── public/
│   ├── icon-144x144.png      # PWA icons
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   ├── manifest.json         # PWA manifest
│   └── offline.html          # Offline fallback
├── src/
│   ├── app/
│   │   ├── diary/           # Health diary feature
│   │   ├── login/           # Authentication page
│   │   ├── map/             # Community health map
│   │   ├── report/          # Health reports
│   │   ├── tools/           # Utility tools
│   │   ├── globals.css      # Global styles
│   │   ├── layout.jsx       # Root layout
│   │   └── page.jsx         # Home page
│   ├── components/
│   │   ├── background/      # Background components
│   │   ├── maps/            # Map components
│   │   ├── navigation/      # Nav components
│   │   ├── ui/              # UI primitives
│   │   └── TrendChart.jsx   # Data visualization
│   └── lib/                 # Utility functions
├── .gitignore
├── jsconfig.json
├── LICENSE
├── next.config.js           # Next.js configuration
├── package.json
├── package-lock.json
├── postcss.config.js        # PostCSS configuration
└── README.md
```

---

## 🔐 Privacy & Security

HealthPulse is built with privacy as the foundation:

- ✅ **No user accounts** required
- ✅ **No personal identifiers** collected or stored
- ✅ **Area-level aggregation** only (ward/district)
- ✅ **Client-side processing** for all sensitive operations
- ✅ **Local storage** for user data (remains on device)

All demo data is handled locally. No information is transmitted to external servers during normal operation.

---

## 🎯 Current Status

- ✅ Fully functional for demo and presentation
- ✅ All core features operational
- ✅ Client-side only (no backend required)
- ⏳ Production deployment pending
- ⏳ Backend integration optional for future scaling

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with modern web technologies and a commitment to user privacy. HealthPulse demonstrates how meaningful health awareness tools can be created without compromising individual privacy.

---

<div align="center">

**Made with ❤️ for healthier communities**

[Report Bug](https://github.com/JASHoswal1234/HealthPulse/issues) · [Request Feature](https://github.com/JASHoswal1234/HealthPulse/issues)

</div>