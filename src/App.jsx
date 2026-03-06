import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import LocationInput from './components/LocationInput.jsx';
import DisasterSelector from './components/DisasterSelector.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import MapView from './components/MapView.jsx';
import RouteList from './components/RouteList.jsx';
import ShareButton from './components/ShareButton.jsx';
import ErrorBanner from './components/ErrorBanner.jsx';

const INITIAL_STATE = {
  screen: 'input',
  locationText: '',
  coords: null,
  disasterType: null,
  routesResponse: null,
  selectedRouteIndex: 0,
  error: null,
  offlineCachedRoutes: null,
  gpsDenied: false,
  mapFailed: false
};

function App() {
  const [state, setState] = useState(INITIAL_STATE);

  const setPartial = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  useEffect(() => {
    window.addEventListener('offline', () =>
      setPartial({ error: 'No connection. Here are your last generated routes.' })
    );
  }, [setPartial]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setPartial({
        gpsDenied: true,
        error: 'Location not available. Enter your location manually above.'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPartial({
          coords: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          },
          gpsDenied: false,
          error: null
        });
      },
      () => {
        setPartial({
          gpsDenied: true,
          error: 'GPS permission denied. Enter your location manually above.'
        });
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleFindRoute = async () => {
    if (!state.locationText && !state.coords) {
      setPartial({
        error: 'Enter a location or use your current location.'
      });
      return;
    }
    if (!state.disasterType) {
      setPartial({
        error: 'Select the type of emergency you are facing.'
      });
      return;
    }

    const coords =
      state.coords ||
      ({
        lat: 6.5244,
        lng: 3.3792
      });

    setPartial({
      screen: 'loading',
      error: null,
      mapFailed: false
    });

    try {
      const res = await fetch('/api/generate-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: coords.lat,
          lng: coords.lng,
          disasterType: state.disasterType,
          location: state.locationText || 'Current location'
        })
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body?.error ||
          (res.status === 504
            ? 'Taking longer than usual. Tap to retry.'
            : 'Unable to generate routes. Please try again.')
        );
      }

      const data = await res.json();

      if (!data.routes || !Array.isArray(data.routes) || data.routes.length === 0) {
        throw new Error(
          'We could not find a safe route. Call emergency services: 112.'
        );
      }

      setPartial({
        screen: 'results',
        routesResponse: data,
        selectedRouteIndex: 0,
        offlineCachedRoutes: data,
        coords
      });
    } catch (err) {
      const message =
        err.message?.includes('Taking longer than usual')
          ? 'Taking longer than usual. Tap to retry.'
          : err.message ||
            'Unable to generate routes right now. Please try again in a moment.';

      setPartial({
        screen: state.offlineCachedRoutes ? 'results' : 'input',
        error: message
      });
    }
  };

  const handleRetry = () => {
    setPartial({ error: null });
    handleFindRoute();
  };

  const handleRouteSelect = (index) => {
    setPartial({ selectedRouteIndex: index });
  };

  const handleMapError = () => {
    setPartial({ mapFailed: true });
  };

  const selectedRoute = useMemo(() => {
    if (!state.routesResponse) return null;
    return state.routesResponse.routes[state.selectedRouteIndex] || null;
  }, [state.routesResponse, state.selectedRouteIndex]);

  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <Header />

      <main className="flex-1 px-4 pb-6 pt-2 max-w-md mx-auto w-full">
        {state.error && (
          <div className="mb-3">
            <ErrorBanner
              message={state.error}
              onRetry={
                state.error?.includes('Taking longer than usual') ? handleRetry : null
              }
            />
          </div>
        )}

        {state.screen === 'input' && (
          <div className="space-y-4 animate-fade-in-up">
            <p className="text-sm text-slate-600">
              Your AI guide out of danger. Calm, clear instructions when you need them
              most.
            </p>

            <LocationInput
              value={state.locationText}
              onChange={(value) => setPartial({ locationText: value })}
              onUseMyLocation={handleUseMyLocation}
              gpsDenied={state.gpsDenied}
            />

            <DisasterSelector
              selected={state.disasterType}
              onSelect={(type) => setPartial({ disasterType: type })}
            />

            <button
              type="button"
              onClick={handleFindRoute}
              className="w-full h-14 rounded-xl bg-primary text-white font-semibold text-base mt-2 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary animate-pulse-strong"
            >
              Find My Safe Route
            </button>

            <p className="text-xs text-slate-500 text-center mt-3">
              Powered by AI · Works in real time
            </p>
          </div>
        )}

        {state.screen === 'loading' && (
          <LoadingScreen onCancel={() => setPartial({ screen: 'input' })} />
        )}

        {state.screen === 'results' && state.routesResponse && (
          <div className="space-y-3 animate-fade-in-up">
            {!state.mapFailed && (
              <div className="h-64 rounded-2xl overflow-hidden border border-slate-200">
                <MapView
                  userCoords={state.coords}
                  routes={state.routesResponse.routes}
                  shelters={state.routesResponse.shelters}
                  dangerZone={state.routesResponse.dangerZone}
                  selectedRouteIndex={state.selectedRouteIndex}
                  onMapError={handleMapError}
                />
              </div>
            )}

            {state.mapFailed && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-700">
                Map is unavailable on this device. You can still follow the text
                instructions below. If you feel unsafe or unsure, call emergency
                services: <span className="font-semibold">112</span>.
              </div>
            )}

            <RouteList
              routes={state.routesResponse.routes}
              selectedIndex={state.selectedRouteIndex}
              onSelect={handleRouteSelect}
            />

            {selectedRoute && (
              <ShareButton
                route={selectedRoute}
                coords={state.coords}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

