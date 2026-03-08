# SwiftGuide AI 🛣️

> **AI-powered emergency evacuation assistant for regular citizens during disasters.**

SwiftGuide AI generates personalized, real-time escape routes during floods, fires, earthquakes, and chemical emergencies — in plain English, on your phone, in seconds.

Built at the **World Wide Vibes Hackathon** by GenAI Academy · March 5–9, 2025.

---

## The Problem

When disaster strikes, most people face the same terrifying reality:

- Google Maps doesn't know when a road is blocked or flash‑flooded
- Official alerts are generic and slow
- Following the crowd often leads into danger zones
- Nobody gives *you*, at *your exact location*, an evacuation route using live city data

**SwiftGuide AI fills that gap.**

---

## What It Does

1. You open SwiftGuide AI on your phone
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
| Map | Leaflet (react-leaflet) |
| AI Engine | Claude API (Anthropic) |
| Backend | Node.js + Express (Vercel-friendly API route) |
| Database | Supabase |
| Disaster Data | Montgomery, AL public ArcGIS services *(real‑data mode); fallback mock data for offline/demo* |
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
git clone https://github.com/your-org/swiftguide-ai.git
cd swiftguide-ai

# Install dependencies
npm install

# Copy example env file
cp .env.example .env
``` 

### Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```env
ANTHROPIC_API_KEY=your_claude_api_key_here
USE_REAL_DATA=true          # toggles live Montgomery data
# no map token needed – we use free OpenStreetMap tiles via Leaflet
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

### Run Locally

```bash
# Start both frontend and API together
npm run dev
```

Frontend will be available at `http://localhost:3000` and the API is proxied automatically (`/api` requests go to port 3001).

---

## Project Structure

```
swiftguide-ai/
├── src/
│   ├── components/
│   │   ├── MapView.jsx
│   │   ├── RouteCard.jsx
│   │   ├── StatsBar.jsx
│   │   ├── TabNav.jsx
│   │   ├── ShelterList.jsx
│   │   ├── ResourcesList.jsx
│   │   ├── AlertsPanel.jsx
│   │   ├── ShareButton.jsx
│   │   └── LoadingMessage.jsx
│   ├── App.jsx
│   └── index.css
├── api/
│   ├── generateRoute.js    ← Main API handler
│   ├── dataService.js      ← switches between mock/real data
│   ├── mockData.js         ← built‑in fallback data
│   └── montgomeryData.js   ← fetches from City of Montgomery ArcGIS
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
