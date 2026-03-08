import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet broken marker icons in React/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom colored icons
const makeIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

const blueIcon = makeIcon('blue');
const greenIcon = makeIcon('green');

// Route line colors
const ROUTE_COLORS = {
  0: '#16a34a', // green — safest
  1: '#d97706', // amber — moderate
  2: '#dc2626', // red   — least safe
};

// Flies map camera to user location
function FlyToLocation({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function MapView({
  userLocation,
  routes,
  shelters,
  dangerZone,
  selectedRoute,
  sirens = [],
  emergencyStations = [],
  pharmacies = [],
}) {
  const defaultCenter = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [32.3668, -86.2999];  // Montgomery, AL

  return (
    <div 
      className="map-wrapper"
      style={{
        width: '100%',
        height: '260px',
        position: 'relative',
        zIndex: 0,
        background: '#e2e8f0',
        flexShrink: 0,
      }}
    >
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ 
          height: '100%',
          width: '100%',
          minHeight: '260px'
        }}
        scrollWheelZoom={false}
      >
        {/* OpenStreetMap — completely free, no token */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Fly camera to user when location changes */}
        {userLocation && (
          <FlyToLocation
            center={[userLocation.lat, userLocation.lng]}
          />
        )}

        {/* User location — blue marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={blueIcon}
          >
            <Popup>📍 Your Location</Popup>
          </Marker>
        )}

        {/* Danger zone — red shaded circle */}
        {dangerZone?.center && (
          <Circle
            center={[
              dangerZone.center.lat,
              dangerZone.center.lng,
            ]}
            radius={(dangerZone.radiusKm || 2) * 1000}
            pathOptions={{
              color: '#dc2626',
              fillColor: '#dc2626',
              fillOpacity: 0.12,
              weight: 2,
              dashArray: '6 4',
            }}
          >
            <Popup>⚠️ Active Danger Zone</Popup>
          </Circle>
        )}

        {/* Evacuation route lines */}
        {routes?.map((route, index) => {
          if (!route?.waypoints?.length) return null;
          const isSelected = selectedRoute === index;
          const positions = route.waypoints.map(
            (wp) => [wp.lat, wp.lng]
          );
          return (
            <Polyline
              key={index}
              positions={positions}
              pathOptions={{
                color: ROUTE_COLORS[index],
                weight: isSelected ? 7 : 3,
                opacity: isSelected ? 1 : 0.55,
                dashArray: index === 2 ? '8 5' : null,
              }}
            >
              <Popup>
                🛣️ <strong>{route.route_name}</strong>
                <br />
                Safety: {route.safety_score}/10
                <br />~{route.estimated_minutes} mins ·{' '}
                {route.distance_km} km
              </Popup>
            </Polyline>
          );
        })}

        {/* Shelter markers — green */}
        {shelters?.map((shelter, index) => (
          <Marker
            key={`shelter-${index}`}
            position={[shelter.lat, shelter.lng]}
            icon={greenIcon}
          >
            <Popup>
              🏕️ <strong>{shelter.name}</strong>
              <br />
              {shelter.address}
              <br />
              Available: {shelter.available}/{shelter.capacity}
            </Popup>
          </Marker>
        ))}

        {/* Emergency stations — blue */}
        {emergencyStations.map((st, idx) => (
          <Marker
            key={`station-${idx}`}
            position={[st.lat, st.lng]}
            icon={blueIcon}
          >
            <Popup>🚓 <strong>{st.name || st.site_name}</strong></Popup>
          </Marker>
        ))}

        {/* Sirens — red icon */}
        {sirens.map((s, idx) => (
          <Marker
            key={`siren-${idx}`}
            position={[s.lat, s.lng]}
            icon={makeIcon('red')}
          >
            <Popup>🔊 Siren</Popup>
          </Marker>
        ))}

        {/* Pharmacies — violet icon */}
        {pharmacies.map((p, idx) => (
          <Marker
            key={`pharmacy-${idx}`}
            position={[p.lat, p.lng]}
            icon={makeIcon('violet')}
          >
            <Popup>💊 <strong>{p.name || p.site_name}</strong></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

