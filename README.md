# SwiftGuide 🟢

> **AI-powered emergency evacuation assistant for regular citizens during disasters.**

SwiftGuide generates personalized, real-time escape routes during floods, fires, earthquakes, and chemical emergencies — in plain English, on your phone, in seconds.

Built at the **World Wide Vibes Hackathon** by GenAI Academy · March 5–9, 2025.

---

## The Problem

When disaster strikes, most people face the same terrifying reality:

- Google Maps doesn't know a road is flooded
- Emergency broadcasts are generic — not personalized to your location
- Following the crowd is often the most dangerous move
- Nobody is giving *you*, at *your exact location*, a route based on what's happening *right now*

**SwiftGuide fills that gap.**

---

## What It Does

1. You open SwiftGuide on your phone
2. It detects your location (or you type it in)
3. You select your disaster type — Flood, Fire, Earthquake, or Chemical
4. AI analyzes live disaster data, road conditions, shelter locations, and danger zones
5. You get **3 color-coded evacuation routes** with plain-English turn-by-turn instructions and a safety score
6. You can share your route via SMS to family in one tap

---

## Demo

> 🔗 **Live URL:** `......`
> 📹 **Demo Video:** `.........`

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | React + Tailwind CSS |
| Map | Mapbox GL JS |
| AI Engine | Claude API (Anthropic) |
| Backend | Node.js + Express |
| Database | Supabase |
| Disaster Data | OpenWeatherMap · NASA FIRMS · USGS *(mocked in MVP)* |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Accounts for: [Anthropic](https://console.anthropic.com), [Mapbox](https://mapbox.com), [Supabase](https://supabase.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-org/swiftguide.git
cd swiftguide

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```env
VITE_MAPBOX_TOKEN=your_mapbox_token_here
ANTHROPIC_API_KEY=your_claude_api_key_here
PORT=3001
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

### Run Locally

```bash
# Start the backend server
npm run server

# In a separate terminal, start the frontend
npm run start

# Or run both together
npm run dev
```

App runs at `http://localhost:3000` · API runs at `http://localhost:3001`

---

## Project Structure

```
swiftguide/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── LocationInput.jsx
│   │   ├── DisasterSelector.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── MapView.jsx
│   │   ├── RouteCard.jsx
│   │   ├── RouteList.jsx
│   │   ├── ShareButton.jsx
│   │   └── ErrorBanner.jsx
│   ├── App.jsx
│   └── index.js
├── api/
│   ├── generateRoute.js    ← Main API handler
│   ├── mockData.js         ← Mock disaster data (swap for real APIs here)
│   └── claudeClient.js     ← Claude API wrapper
├── .env.example
├── .gitignore
└── README.md
```

---

## Swapping Mock Data for Real APIs

All mock data lives in one file: `api/mockData.js`.

To connect real data sources, replace the mock functions with:

| Data | Real Source | Docs |
|------|-------------|------|
| Flood / Weather | OpenWeatherMap Alerts API | [docs](https://openweathermap.org/api/push-weather-alerts) |
| Fire locations | NASA FIRMS API | [docs](https://firms.modaps.eosdis.nasa.gov/api/) |
| Earthquakes | USGS Earthquake API | [docs](https://earthquake.usgs.gov/fdsnws/event/1/) |
| Road closures | HERE Maps / TomTom Traffic API | [docs](https://developer.here.com) |

No other files need to change.

---

## Challenge Area

**Public Safety & Emergency Response**
World Wide Vibes Hackathon — GenAI Academy

---

## Team

| Name | Role |
|------|------|
| Amaukoha Noble | PM |
| Hammed Tosin | AI Engineer |
| Fakayode Habeebah | Data verifier |
| Abdulraheem Nofisat | Prompt Engineer  |
| Lawal Ganiyat | Pitch/Presentation  |
---

## Roadmap (Post-Hackathon)

- [ ] Connect live disaster data APIs (replacing mocks)
- [ ] Voice-guided turn-by-turn navigation
- [ ] Offline mode with cached routes
- [ ] Multi-language support (starting with Yoruba, Hausa, French)
- [ ] SMS broadcast integration via Twilio
- [ ] Partnership with city emergency management agencies

---

## License

MIT License — free to use, modify, and build on.

---

<p align="center">
  Built with ❤️ at World Wide Vibes Hackathon · GenAI Academy · March 2025
</p>
