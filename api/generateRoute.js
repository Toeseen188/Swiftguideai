import express from 'express';
import { getMockDisasterData } from './mockData.js';

const router = express.Router();

router.post('/generate-route', async (req, res) => {
  const { lat, lng, disasterType, location } = req.body || {};

  const latNum = Number.isFinite(lat) ? lat : parseFloat(lat);
  const lngNum = Number.isFinite(lng) ? lng : parseFloat(lng);

  const safeLat = Number.isFinite(latNum) ? latNum : 6.5244;
  const safeLng = Number.isFinite(lngNum) ? lngNum : 3.3792;
  const type = String(disasterType || 'flood').toLowerCase();

  try {
    const mockData = getMockDisasterData(safeLat, safeLng, type);

    // Local AI-style mocked routes for reliable MVP behavior
    const baseShelters = mockData.shelters.slice(0, 3);

    const routes = baseShelters.map((shelter, idx) => {
      const safetyScores = [9, 7, 5];
      const minutes = [14, 11, 9];
      const distances = [8.2, 6.5, 4.1];
      const avoidReasons = [
        'Keeps you away from the deepest floodwater and steep bridge approaches.',
        'Avoids crowded inner streets that may be hard to pass quickly.',
        'Uses nearby streets as a last resort if faster options become unsafe.'
      ];
      const whySafeTexts = [
        'This route uses main roads that stay on higher ground and avoid the worst of the flooding. It keeps you away from narrow side streets where water can rise quickly.',
        'This path takes you along routes that emergency services commonly use and that are less likely to be blocked. It avoids low-lying intersections where water can collect suddenly.',
        'This option stays closest to you while still moving generally away from the danger zone. It should only be used if other options are not possible.'
      ];

      const steps = [
        'Move calmly to the main road outside your current location.',
        `Follow the road in the direction of ${shelter.address} and avoid any areas with fast-moving water.`,
        'Cross only where the water is below your knees and never on bridges that look damaged.',
        'Keep to well-lit, busy routes where you can see other people and vehicles.',
        `Continue straight until you reach ${shelter.name}.`,
        'Check in with staff or officials at the shelter and follow their instructions.'
      ];

      const waypoints = [
        { lat: safeLat, lng: safeLng },
        {
          lat: (safeLat + shelter.lat) / 2 + 0.01 * (idx - 1),
          lng: (safeLng + shelter.lng) / 2
        },
        { lat: shelter.lat, lng: shelter.lng }
      ];

      return {
        route_name:
          idx === 0
            ? 'Northern High Ground Route'
            : idx === 1
            ? 'Central Arterial Route'
            : 'Nearby Backup Route',
        safety_score: safetyScores[idx],
        estimated_minutes: minutes[idx],
        distance_km: distances[idx],
        why_safe: whySafeTexts[idx],
        avoid_reason: avoidReasons[idx],
        steps,
        waypoints,
        shelter: {
          name: shelter.name,
          address: shelter.address
        }
      };
    });

    const responsePayload = {
      routes,
      dangerZone: {
        center: mockData.dangerZone.center,
        radiusKm: mockData.dangerZone.radiusKm
      },
      shelters: mockData.shelters,
      blockedRoads: mockData.blockedRoads,
      disasterType: type,
      generatedAt: new Date().toISOString()
    };

    return res.json(responsePayload);
  } catch (error) {
    console.error('generate-route unexpected error', error);

    const fallbackPayload = {
      routes: [],
      dangerZone: {
        center: { lat: safeLat + 0.01, lng: safeLng + 0.01 },
        radiusKm: 2,
      },
      shelters: [],
      blockedRoads: [],
      disasterType: type,
      generatedAt: new Date().toISOString()
    };

    return res.json(fallbackPayload);
  }
});

export default router;

