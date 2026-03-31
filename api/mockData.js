// Nigeria-specific mock data for disaster response
export function getNigeriaMockDisasterData(lat, lng, type) {
  const baseLat = Number(lat);
  const baseLng = Number(lng);

  return {
    blockedRoads: [
      {
        name: 'Third Mainland Bridge',
        reason: type === 'flood' ? 'Flooded' : 'Blocked due to incident',
        coords: { lat: baseLat + 0.012, lng: baseLng + 0.018 }
      },
      {
        name: 'Ikorodu Road',
        reason: type === 'flood' ? 'Water level critical' : 'Impassable',
        coords: { lat: baseLat - 0.009, lng: baseLng + 0.007 }
      }
    ],
    dangerZone: {
      center: { lat: baseLat + 0.011, lng: baseLng + 0.012 },
      radiusKm: 3,
      severity: 'high'
    },
    shelters: [
      {
        name: 'Teslim Balogun Stadium Shelter',
        address: 'Surulere, Lagos',
        capacity: 1000,
        available: 600,
        lat: baseLat + 0.045,
        lng: baseLng + 0.025
      },
      {
        name: 'Eko Hotel Emergency Center',
        address: 'Victoria Island',
        capacity: 800,
        available: 500,
        lat: baseLat - 0.035,
        lng: baseLng + 0.055
      },
      {
        name: 'National Theatre Camp',
        address: 'Iganmu, Lagos',
        capacity: 600,
        available: 350,
        lat: baseLat + 0.018,
        lng: baseLng - 0.038
      }
    ],
    emergencyStations: [
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
    ],
    pharmacies: [
      {
        name: 'HealthPlus Pharmacy',
        address: 'The Palms Shopping Mall, Lekki, Lagos',
        lat: 6.4315,
        lng: 3.4642,
        type: 'pharmacy',
      },
      {
        name: 'Medplus Pharmacy',
        address: 'Ikeja City Mall, Alausa, Lagos',
        lat: 6.6018,
        lng: 3.3506,
        type: 'pharmacy',
      },
      {
        name: 'Alpha Pharmacy',
        address: 'Victoria Island, Lagos',
        lat: 6.4281,
        lng: 3.4219,
        type: 'pharmacy',
      },
    ],
    weatherCondition: type === 'flood' ? 'Heavy rainfall, 100mm/hr' : 'Conditions vary',
    spreadDirection: 'Southwest',
    dataSource: 'mock-nigeria — replace with NEMA, OpenWeatherMap, etc.'
  };
}
export function getMockDisasterData(lat, lng, type) {
  const baseLat = Number(lat);
  const baseLng = Number(lng);

  return {
    blockedRoads: [
      {
        name: 'Carter Bridge',
        reason: type === 'flood' ? 'Flooded' : 'Blocked due to incident',
        coords: { lat: baseLat + 0.01, lng: baseLng + 0.01 }
      },
      {
        name: 'Apongbon Road',
        reason: type === 'flood' ? 'Water level critical' : 'Impassable',
        coords: { lat: baseLat - 0.008, lng: baseLng + 0.006 }
      }
    ],
    dangerZone: {
      center: { lat: baseLat + 0.01, lng: baseLng + 0.01 },
      radiusKm: 2.5,
      severity: 'high'
    },
    shelters: [
      {
        name: 'Lagos City Hall Shelter',
        address: 'Lagos Island',
        capacity: 500,
        available: 320,
        lat: baseLat + 0.05,
        lng: baseLng + 0.03
      },
      {
        name: 'National Stadium Emergency Camp',
        address: 'Surulere',
        capacity: 1200,
        available: 800,
        lat: baseLat - 0.04,
        lng: baseLng + 0.06
      },
      {
        name: 'Tafawa Balewa Square',
        address: 'Lagos CBD',
        capacity: 700,
        available: 400,
        lat: baseLat + 0.02,
        lng: baseLng - 0.04
      }
    ],
    weatherCondition: type === 'flood' ? 'Heavy rainfall, 89mm/hr' : 'Conditions vary',
    spreadDirection: 'Southeast',
    dataSource: 'mock — replace with OpenWeatherMap + NASA FIRMS + USGS'
  };
}

