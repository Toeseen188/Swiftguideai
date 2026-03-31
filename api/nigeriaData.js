const BASE = 'https://services7.arcgis.com/xNUwUjOJqYE54USz/arcgis/rest/services';
const Q = '/query?where=1%3D1&outFields=*&f=json';

async function fetchArcGIS(url) {
  console.log('[ArcGIS] Fetching:', url);
  try {
    const res = await fetch(url);
    console.log('[ArcGIS] Status:', res.status, url);
    if (!res.ok) throw new Error(
      `HTTP ${res.status} from ${url}`
    );
    const data = await res.json();
    console.log('[ArcGIS] Features returned:', 
      data.features?.length ?? 'NO FEATURES KEY',
      '| Error:', data.error?.message || 'none'
    );
    if (!data.features) throw new Error(
      `No features in response: ${JSON.stringify(data).slice(0,200)}`
    );
    return data.features;
  } catch (err) {
    console.error('[ArcGIS] ❌ FAILED:', err.message);
    throw err;
  }
}

// 1. Tornado Shelters → SwiftGuide AI evacuation shelters
async function getTornadoShelters() {
  const features = await fetchArcGIS(
    `${BASE}/Tornado_Shelter/FeatureServer/0${Q}`
  );
  return features
    .map((f) => ({
      name:
        f.attributes.NAME ||
        f.attributes.FACILITYNAME ||
        'Emergency Shelter',
      address:
        f.attributes.ADDRESS ||
        f.attributes.FULLADDR ||
        'Montgomery, AL',
      lat: f.geometry?.y || f.attributes.LATITUDE,
      lng: f.geometry?.x || f.attributes.LONGITUDE,
      capacity: f.attributes.CAPACITY || 200,
      available: f.attributes.AVAILABLE || 150,
      type: 'tornado_shelter',
      source: 'City of Montgomery',
    }))
    .filter((s) => s.lat && s.lng);
}

// 2. Fire & Police Stations → emergency resources (Lagos mock)
async function getEmergencyStations() {
  // Lagos mock data
  return [
    {
      name: 'Lagos State Fire Service',
      address: 'Alausa, Ikeja, Lagos',
      lat: 6.6018,
      lng: 3.3515,
      type: 'fire_station',
    },
    {
      name: 'Area C Police Command',
      address: 'Ogunlana Dr, Surulere, Lagos',
      lat: 6.5006,
      lng: 3.3584,
      type: 'police_station',
    },
    {
      name: 'Victoria Island Police Station',
      address: 'Ahmadu Bello Way, Victoria Island, Lagos',
      lat: 6.4281,
      lng: 3.4219,
      type: 'police_station',
    },
  ];
}

// 3. Weather Sirens → warning infrastructure
async function getWeatherSirens() {
  // Placeholder: return empty array or mock data for now
  return [];
}

// 4. Pharmacies → medical aid during disaster
async function getPharmacies() {
  // Placeholder: return empty array or mock data for now
  return [];
}

// 5. 911 Calls → show recent emergency activity
async function get911Calls() {
  // Placeholder: return empty array or mock data for now
  return [];
}


import { getNigeriaMockDisasterData } from './mockData.js';


// MAIN EXPORT for Nigeria
async function getNigeriaDisasterData(lat, lng, disasterType) {
  console.log('[Nigeria] 🔄 Fetching real city data...');
  // Always return mock Nigeria data with resources
  return getNigeriaMockDisasterData(lat, lng, disasterType);
}

export { getNigeriaDisasterData };
