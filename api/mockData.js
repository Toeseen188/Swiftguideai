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

