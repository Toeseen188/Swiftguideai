import React, { useState, useEffect } from 'react';
import MapView from './components/MapView.jsx';
import RouteCard from './components/RouteCard.jsx';
import StatsBar from './components/StatsBar.jsx';
import TabNav from './components/TabNav.jsx';
import ShelterList from './components/ShelterList.jsx';
import ResourcesList from './components/ResourcesList.jsx';
import AlertsPanel from './components/AlertsPanel.jsx';
import ShareButton from './components/ShareButton.jsx';
import LoadingMessage from './components/LoadingMessage.jsx';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

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
    // DEMO MODE: Simulate location in Montgomery, AL
    // Real coordinates of downtown Montgomery
    setLat(32.3668);
    setLng(-86.2999);
    setLocation('Montgomery, AL');
    
    console.log('[SwiftRoute] 📍 Demo location: Montgomery, AL');
  };

  const handleSubmit = async () => {
    if (!location || !disasterType) {
      setError('Please enter location and select emergency type');
      return;
    }
    setError(null);
    setScreen('loading');

    try {
      const res = await fetch(`${API_URL}/api/generate-route`, {
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

  // loading screen message cycle handled by LoadingMessage

  if (screen === 'input') {
    return (
      <div className="app-shell">
        <div style={{
          height: '100vh',
          background: `
            radial-gradient(ellipse at 20% 20%, 
              rgba(34,197,94,0.12) 0%, transparent 55%),
            linear-gradient(160deg, #0a0f1e 0%, #0A3D2B 100%)
          `,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>

          {/* ── TOP — Logo block ── */}
          <div style={{
            padding: '20px 24px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}>
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              borderRadius: 12,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              boxShadow: '0 4px 16px rgba(34,197,94,0.35)',
              flexShrink: 0,
            }}>🛣️</div>
            <div>
              <h1 style={{
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 900,
                margin: 0,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}>SwiftRoute</h1>
              <p style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '0.7rem',
                margin: 0,
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                AI Emergency Evacuation
              </p>
            </div>
          </div>

          {/* ── MIDDLE — Input card (scrolls if needed) ── */}
          <div style={{
            flex: 1,
            overflow: 'hidden',
            padding: '0 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>

            {/* Location */}
            <div>
              <label style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '6px',
              }}>
                Your Location
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Enter address or neighborhood..."
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 14px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor='#22c55e'}
                  onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.15)'}
                />
                <button onClick={handleGPS}
                  style={{
                    position: 'absolute', right: 10,
                    top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    fontSize: '1.1rem', cursor: 'pointer', padding: 4,
                  }}>📍</button>
              </div>
            </div>

            {/* Quick fill */}
            <div style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '2px',
              scrollbarWidth: 'none',
            }}>
              <span style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                alignSelf: 'center',
                flexShrink: 0,
              }}>Quick:</span>
              {[
                { label: '🏛️ Downtown',   loc: 'Downtown Montgomery, AL',    lat: 32.3792, lng: -86.3077 },
                { label: '🏠 Midtown',    loc: 'Midtown Montgomery, AL',     lat: 32.3668, lng: -86.2999 },
                { label: '🌊 Riverfront', loc: 'Riverfront Montgomery, AL',  lat: 32.3712, lng: -86.2990 },
                { label: '🛣️ Auburn Rd',  loc: 'Auburn Road Montgomery, AL', lat: 32.3505, lng: -86.2431 },
              ].map(p => (
                <button key={p.label}
                  onClick={() => { setLocation(p.loc); setLat(p.lat); setLng(p.lng); }}
                  style={{
                    padding: '4px 10px',
                    background: location === p.loc
                      ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.07)',
                    border: `1px solid ${location === p.loc
                      ? '#22c55e' : 'rgba(255,255,255,0.15)'}`,
                    borderRadius: '999px',
                    color: location === p.loc
                      ? '#86efac' : 'rgba(255,255,255,0.6)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}>
                  {p.label}
                </button>
              ))}
            </div>

            {/* Emergency type label */}
            <label style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '-4px',
            }}>
              Emergency Type
            </label>

            {/* 2x2 disaster grid — FIXED */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              flex: 1,
            }}>
              {[
                { type: 'flood',      emoji: '🌊', label: 'Flood'      },
                { type: 'fire',       emoji: '🔥', label: 'Fire'       },
                { type: 'earthquake', emoji: '🌍', label: 'Earthquake' },
                { type: 'chemical',   emoji: '☣️', label: 'Chemical'   },
              ].map(({ type, emoji, label }) => (
                <button key={type}
                  onClick={() => setDisasterType(type)}
                  style={{
                    background: disasterType === type
                      ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.05)',
                    border: `1.5px solid ${disasterType === type
                      ? '#22c55e' : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: '10px',
                    color: disasterType === type
                      ? '#fff' : 'rgba(255,255,255,0.55)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.15s',
                    minHeight: '70px',
                  }}>
                  <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>
                    {emoji}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── BOTTOM — CTA always visible ── */}
          <div style={{
            padding: '12px 16px 24px',
            flexShrink: 0,
          }}>
            <button
              onClick={handleSubmit}
              disabled={!location || !disasterType}
              style={{
                width: '100%',
                padding: '15px',
                background: (!location || !disasterType)
                  ? 'rgba(255,255,255,0.08)'
                  : 'linear-gradient(135deg, #16a34a, #22c55e)',
                color: (!location || !disasterType)
                  ? 'rgba(255,255,255,0.25)' : '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: (!location || !disasterType)
                  ? 'not-allowed' : 'pointer',
                letterSpacing: '0.02em',
                boxShadow: (!location || !disasterType)
                  ? 'none' : '0 4px 20px rgba(34,197,94,0.4)',
                transition: 'all 0.2s',
              }}>
              🚨 Find My Safe Route
            </button>

            {error && (
              <div style={{
                marginTop: '8px',
                padding: '10px 14px',
                background: 'rgba(220,38,38,0.15)',
                border: '1px solid rgba(220,38,38,0.3)',
                borderRadius: '10px',
                color: '#fca5a5',
                fontSize: '0.8rem',
                textAlign: 'center',
              }}>
                ⚠️ {error}
              </div>
            )}

            <p style={{
              color: 'rgba(255,255,255,0.2)',
              fontSize: '0.65rem',
              textAlign: 'center',
              margin: '10px 0 0',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              Powered by AI · Real City Data
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0f172a, #0F4C35)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        color: '#fff', padding: '2rem',
      }}>
        <div style={{
          fontSize: '4rem', marginBottom: '1.5rem',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}>🟢</div>

        <h2 style={{ fontWeight: 800, marginBottom: '0.5rem',
                     fontSize: '1.5rem' }}>
          Finding your safe route...
        </h2>
        <LoadingMessage />

        <div style={{ display: 'flex', gap: '8px', marginTop: '2rem' }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: '10px', height: '10px',
              borderRadius: '50%', background: '#22c55e',
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>

        <style>{`@keyframes pulse { 0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.15);opacity:0.8;}}@keyframes bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#0f172a',
        padding: '0.875rem 1rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.3rem' }}>🟢</span>
          <span style={{ color: '#fff', fontWeight: 800, 
                         fontSize: '1.1rem' }}>SwiftRoute</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: 700,
            padding: '3px 10px', borderRadius: '999px',
            background: dataSource === 'montgomery-open-data' 
              ? '#dcfce7' : '#fef9c3',
            color: dataSource === 'montgomery-open-data' 
              ? '#16a34a' : '#a16207',
          }}>
            {dataSource === 'montgomery-open-data' 
              ? '🟢 Live City Data' : '🟡 Demo Data'}
          </span>
          <button onClick={() => { setScreen('input'); setRoutes([]); }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none', color: '#fff',
              padding: '6px 12px', borderRadius: '8px',
              cursor: 'pointer', fontSize: '0.82rem',
              fontWeight: 600,
            }}>
            ← New Search
          </button>
        </div>
      </div>

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

      <StatsBar
        shelters={shelters}
        stations={emergencyStations}
        sirens={sirens}
        blockedRoads={blockedRoads}
      />

      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ padding: '1rem' }}>
        {activeTab === 'routes' && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800,
                         marginBottom: '0.75rem', color: '#111827' }}>
              🛣️ Your Evacuation Routes
            </h2>
            {routes.map((route, i) => (
              <RouteCard key={i} route={route} index={i}
                isSelected={selectedRoute === i}
                onSelect={setSelectedRoute} />
            ))}
          </div>
        )}
        {activeTab === 'shelters' && (
          <ShelterList shelters={shelters} 
            userLat={lat} userLng={lng} />
        )}
        {activeTab === 'resources' && (
          <ResourcesList 
            stations={emergencyStations}
            pharmacies={pharmacies}
            userLat={lat} userLng={lng} />
        )}
        {activeTab === 'alerts' && (
          <AlertsPanel 
            blockedRoads={blockedRoads}
            disasterType={disasterType}
            location={location} />
        )}
      </div>

      {routes.length > 0 && (
        <ShareButton route={routes[selectedRoute]} />
      )}
    </div>
  );
}

