import React, { useState } from 'react';
import MapView from './components/MapView.jsx';
import RouteCard from './components/RouteCard.jsx';
import StatsBar from './components/StatsBar.jsx';
import TabNav from './components/TabNav.jsx';
import ShelterList from './components/ShelterList.jsx';
import ResourcesList from './components/ResourcesList.jsx';
import AlertsPanel from './components/AlertsPanel.jsx';
import ShareButton from './components/ShareButton.jsx';
import LoadingMessage from './components/LoadingMessage.jsx';



// ════════════════════════════════════════════════════════════════
// SCREEN COMPONENTS — Each screen is a self-contained component
// ════════════════════════════════════════════════════════════════

function InputScreen({
  location, setLocation, lat, setLat, lng, setLng,
  disasterType, setDisasterType, handleGPS, handleSubmit, error
}) {
  return (
    <div style={{ minHeight: "100vh", width: "100vw", background: "#c8d4df", display: "flex", justifyContent: "center" }}>
      <div className="app-shell">
        <div style={{
          minHeight: '100vh',
          background: `
            radial-gradient(ellipse at 15% 15%, 
              rgba(34,197,94,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 85%, 
              rgba(10,61,43,0.5) 0%, transparent 55%),
            linear-gradient(155deg, #0a0f1e 0%, #0A3D2B 100%)
          `,
          display: 'flex',
          flexDirection: 'column',
          padding: '0 0 env(safe-area-inset-bottom)',
        }}>

          {/* ── Header bar ── */}
          <div style={{
            padding: '20px 20px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}>
            <div style={{
              width: 38, height: 38,
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
              boxShadow: '0 4px 14px rgba(34,197,94,0.4)',
              flexShrink: 0,
            }}>🛣️</div>
            <div>
              <div style={{
                color: '#fff',
                fontSize: '1.15rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}>SwiftGuide AI</div>
              <div style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '1px',
              }}>Emergency Evacuation</div>
            </div>
          </div>

          {/* ── Hero text ── */}
          <div style={{
            padding: '24px 20px 20px',
            flexShrink: 0,
          }}>
            <h1 style={{
              color: '#fff',
              fontSize: 'clamp(1.6rem, 5vw, 2rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              margin: '0 0 6px',
            }}>
              Find your<br/>
              <span style={{ color: '#4ade80' }}>safe route</span> now.
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.85rem',
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.5,
            }}>
              Guiding You to Safety When Every Second Counts.
            </p>
          </div>

          {/* ── Input card ── */}
          <div style={{
            margin: '0 12px',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '18px',
            padding: '18px 16px',
            flexShrink: 0,
          }}>

            {/* Location field */}
            <div style={{ marginBottom: '14px' }}>
              <label className="sr-label">Your Location</label>
              <div style={{ position: 'relative' }}>
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Address or neighborhood..."
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 14px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => 
                    e.target.style.borderColor = '#22c55e'}
                  onBlur={e => 
                    e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
                <button
                  onClick={handleGPS}
                  title="Use my location"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    padding: '4px',
                    lineHeight: 1,
                    opacity: 0.8,
                  }}>📍</button>
              </div>
            </div>

            {/* Quick fill presets */}
            <div 
              className="hide-scrollbar"
              style={{
                display: 'flex',
                gap: '6px',
                overflowX: 'auto',
                marginBottom: '16px',
                paddingBottom: '2px',
                alignItems: 'center',
              }}>
              <span style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.62rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                flexShrink: 0,
                marginRight: '2px',
              }}>Quick:</span>
              {[
                { label: '🏛️ Lagos Island',
                  loc: 'Lagos Island, Lagos, Nigeria',
                  lat: 6.4541, lng: 3.3942 },
                { label: '🏠 Surulere',
                  loc: 'Surulere, Lagos, Nigeria',
                  lat: 6.5006, lng: 3.3584 },
                { label: '🌊 Victoria Island',
                  loc: 'Victoria Island, Lagos, Nigeria',
                  lat: 6.4281, lng: 3.4219 },
                { label: '🛣️ Ikeja',
                  loc: 'Ikeja, Lagos, Nigeria',
                  lat: 6.6018, lng: 3.3515 },
              ].map(p => (
                <button
                  key={p.label}
                  onClick={() => {
                    setLocation(p.loc);
                    setLat(p.lat);
                    setLng(p.lng);
                  }}
                  style={{
                    padding: '5px 11px',
                    background: location === p.loc
                      ? 'rgba(34,197,94,0.2)'
                      : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${location === p.loc
                      ? '#22c55e'
                      : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: '999px',
                    color: location === p.loc
                      ? '#86efac'
                      : 'rgba(255,255,255,0.55)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s',
                    fontFamily: 'var(--font-sans)',
                  }}>
                  {p.label}
                </button>
              ))}
            </div>

            {/* Emergency type */}
            <label className="sr-label">Emergency Type</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
            }}>
              {[
                { type: 'flood',      emoji: '🌊', label: 'Flood'      },
                { type: 'fire',       emoji: '🔥', label: 'Fire'       },
                { type: 'oilspill',   emoji: '🛢️', label: 'Oil Spill' },
                { type: 'chemical',   emoji: '☣️', label: 'Chemical'   },
              ].map(({ type, emoji, label }) => (
                <button
                  key={type}
                  onClick={() => setDisasterType(type)}
                  style={{
                    padding: '13px 8px',
                    background: disasterType === type
                      ? 'rgba(34,197,94,0.18)'
                      : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${disasterType === type
                      ? '#22c55e'
                      : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '12px',
                    color: disasterType === type
                      ? '#fff'
                      : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s',
                    fontFamily: 'var(--font-sans)',
                  }}>
                  <span style={{ fontSize: '1.35rem', lineHeight: 1 }}>
                    {emoji}
                  </span>
                  <span style={{
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.01em',
                  }}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div style={{
            padding: '14px 12px 20px',
            flexShrink: 0,
          }}>
            <button
              onClick={handleSubmit}
              disabled={!location || !disasterType}
              style={{
                width: '100%',
                padding: '15px',
                background: (!location || !disasterType)
                  ? 'rgba(255,255,255,0.07)'
                  : 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                color: (!location || !disasterType)
                  ? 'rgba(255,255,255,0.2)'
                  : '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: 800,
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.02em',
                cursor: (!location || !disasterType)
                  ? 'not-allowed' : 'pointer',
                boxShadow: (!location || !disasterType)
                  ? 'none'
                  : '0 4px 20px rgba(34,197,94,0.4)',
                transition: 'all 0.2s',
              }}>
              🚨 Find My Safe Route
            </button>

            {error && (
              <div style={{
                marginTop: '10px',
                padding: '11px 14px',
                background: 'rgba(220,38,38,0.12)',
                border: '1px solid rgba(220,38,38,0.25)',
                borderRadius: '10px',
                color: '#fca5a5',
                fontSize: '0.82rem',
                fontWeight: 500,
                textAlign: 'center',
              }}>
                ⚠️ {error}
              </div>
            )}

            <p style={{
              color: 'rgba(255,255,255,0.18)',
              fontSize: '0.62rem',
              textAlign: 'center',
              marginTop: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              Powered by AI · City of Montgomery Open Data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: "100vh", width: "100vw", background: "#c8d4df", display: "flex", justifyContent: "center" }}>
      <div className="app-shell">
        <div style={{
          width: '100%',
          minHeight: '100vh',
          background: `linear-gradient(155deg, 
            #0a0f1e 0%, #0A3D2B 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          gap: '20px',
        }}>

          {/* Animated logo */}
          <div style={{
            width: 72, height: 72,
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            animation: 'pulse 2s ease-in-out infinite',
            boxShadow: '0 0 48px rgba(34,197,94,0.45)',
          }}>🛣️</div>

          {/* Text */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              color: '#fff',
              fontSize: '1.35rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 8px',
            }}>
              Calculating your route
            </h2>
            <LoadingMessage />
          </div>

          {/* Progress bar */}
          <div style={{
            width: '100%',
            maxWidth: '220px',
            height: '3px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '999px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #16a34a, #4ade80)',
              borderRadius: '999px',
              animation: 'srProgress 3s ease-in-out infinite',
            }} />
          </div>

          {/* Sub text */}
          <p style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            Analyzing real city data
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultsScreen({
  lat, lng, routes, shelters, dangerZone, selectedRoute, setSelectedRoute,
  sirens, emergencyStations, pharmacies, activeTab, setActiveTab,
  blockedRoads, dataSource, setScreen, disasterType, location
}) {
  return (
    <div style={{ minHeight: "100vh", width: "100vw", background: "#c8d4df", display: "flex", justifyContent: "center" }}>
      <div className="app-shell">
        <div style={{
          minHeight: '100vh',
          background: 'var(--gray-100)',
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* ── Sticky header ── */}
          <header style={{
            height: 'var(--header-height)',
            minHeight: 'var(--header-height)',
            background: 'var(--gray-950)',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
          }}>

            {/* Logo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{
                width: 30, height: 30,
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
              }}>🛣️</div>
              <span style={{
                color: '#fff',
                fontWeight: 800,
                fontSize: '1rem',
                letterSpacing: '-0.02em',
              }}>SwiftGuide AI</span>
            </div>

            {/* Right side */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              {/* Data source badge */}
              <span className={
                dataSource === 'montgomery-open-data'
                  ? 'sr-badge sr-badge-live'
                  : 'sr-badge sr-badge-amber'
              }>
                {dataSource === 'montgomery-open-data'
                  ? '🟢 Live Data'
                  : '🟡 Demo'}
              </span>

              {/* Back button */}
              <button
                onClick={() => {
                  setScreen('input');
                  setRoutes([]);
                }}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.65)',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}>
                ← Back
              </button>
            </div>
          </header>

          {/* ── Map ── */}
          <MapView
            userLocation={{ lat, lng }}
            routes={routes}
            shelters={shelters}
            dangerZone={dangerZone}
            selectedRoute={selectedRoute}
            sirens={sirens}
            emergencyStations={emergencyStations}
            pharmacies={pharmacies}
          />

          {/* ── Stats bar ── */}
          <StatsBar
            shelters={shelters}
            stations={emergencyStations}
            sirens={sirens}
            blockedRoads={blockedRoads}
          />

          {/* ── Tab nav ── */}
          <TabNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* ── Tab content ── */}
          <div className="tab-content" style={{ flex: 1 }}>
            {activeTab === 'routes' && (
              <div className="animate-fade-in-up">
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                }}>
                  <h2 className="sr-section-title" 
                    style={{ margin: 0 }}>
                    Evacuation Routes
                  </h2>
                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--gray-400)',
                    fontWeight: 600,
                    background: 'var(--gray-200)',
                    padding: '3px 10px',
                    borderRadius: '999px',
                  }}>
                    {routes.length} found
                  </span>
                </div>
                {routes.map((route, i) => (
                  <RouteCard
                    key={i}
                    route={route}
                    index={i}
                    isSelected={selectedRoute === i}
                    onSelect={setSelectedRoute}
                  />
                ))}
              </div>
            )}

            {activeTab === 'shelters' && (
              <div className="animate-fade-in-up">
                <ShelterList
                  shelters={shelters}
                  userLat={lat}
                  userLng={lng}
                />
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="animate-fade-in-up">
                <ResourcesList
                  stations={emergencyStations}
                  pharmacies={pharmacies}
                  userLat={lat}
                  userLng={lng}
                />
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="animate-fade-in-up">
                <AlertsPanel
                  blockedRoads={blockedRoads}
                  disasterType={disasterType}
                  location={location}
                />
              </div>
            )}
          </div>

          {/* ── Share button ── */}
          <ShareButton route={routes[selectedRoute]} />
        </div>
      </div>
    </div>
  );
}


// Main App Component with unified shell
export default function App() {
  const [screen, setScreen] = useState('input');
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState(32.3668);   // Montgomery, AL
  const [lng, setLng] = useState(-86.2999);  // Montgomery, AL
  const [disasterType, setDisasterType] = useState('');

  const [routes, setRoutes] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [dangerZone, setDangerZone] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(0);

  const [emergencyStations, setEmergencyStations] = useState([]);
  const [sirens, setSirens] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [blockedRoads, setBlockedRoads] = useState([]);
  const [callStats, setCallStats] = useState([]);

  const [activeTab, setActiveTab] = useState('routes');
  const [dataSource, setDataSource] = useState(null);
  const [error, setError] = useState(null);

  const handleGPS = () => {
    setLat(32.3668);
    setLng(-86.2999);
    setLocation('Montgomery, AL');
    console.log('[SwiftGuide AI] 📍 Demo location: Montgomery, AL');
  };

  const handleSubmit = async () => {
    if (!location || !disasterType) {
      setError('Please enter location and select emergency type');
      return;
    }
    setError(null);
    setScreen('loading');

    try {
      const res = await fetch(`/api/generate-route`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng, disasterType, location }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server error ${res.status}`);
      }

      const data = await res.json();
      if (!data.routes?.length) throw new Error('No routes returned');

      setRoutes(data.routes);
      setShelters(data.shelters || []);
      setDangerZone(data.dangerZone || null);
      setEmergencyStations(data.emergencyStations || []);
      setSirens(data.sirens || []);
      setPharmacies(data.pharmacies || []);
      setBlockedRoads(data.blockedRoads || []);
      setCallStats(data.callStats || []);
      setDataSource(data.meta?.dataSource);
      setSelectedRoute(0);
      setScreen('results');
    } catch (err) {
      setError(err.message);
      console.error('App submit error', err);
      setScreen('input');
    }
  };

  // ════════════════════════════════════════════════════════════════
  // UNIFIED SHELL — Same wrapper for ALL screens
  // ════════════════════════════════════════════════════════════════
  return (
    <>
      {screen === 'input' && (
        <InputScreen
          location={location} setLocation={setLocation}
          lat={lat} setLat={setLat}
          lng={lng} setLng={setLng}
          disasterType={disasterType} setDisasterType={setDisasterType}
          handleGPS={handleGPS} handleSubmit={handleSubmit}
          error={error}
        />
      )}
      {screen === 'loading' && <LoadingScreen />}
      {screen === 'results' && (
        <ResultsScreen
          lat={lat} lng={lng} 
          routes={routes} shelters={shelters}
          dangerZone={dangerZone} selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          sirens={sirens} emergencyStations={emergencyStations}
          pharmacies={pharmacies} activeTab={activeTab}
          setActiveTab={setActiveTab} blockedRoads={blockedRoads}
          dataSource={dataSource} setScreen={setScreen}
          disasterType={disasterType} location={location}
        />
      )}
    </>
  );
}
