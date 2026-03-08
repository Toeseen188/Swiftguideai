import { getMockDisasterData } from './mockData.js';
import { getMontgomeryDisasterData } from './montgomeryData.js';

export async function getDisasterData(lat, lng, disasterType, location) {
  console.log('[SwiftGuide AI] USE_REAL_DATA env value:', 
    process.env.USE_REAL_DATA);
  console.log('[SwiftGuide AI] USE_REAL evaluated as:', 
    process.env.USE_REAL_DATA === 'true');

  const USE_REAL = process.env.USE_REAL_DATA === 'true';
  
  if (!USE_REAL) {
    console.log('[SwiftGuide AI] 🟡 Mock mode — set USE_REAL_DATA=true to use live data');
    return { ...getMockDisasterData(lat, lng, disasterType), dataSource: 'mock' };
  }
  try {
    const data = await getMontgomeryDisasterData(lat, lng, disasterType);
    return data;
  } catch (err) {
    console.warn('[SwiftGuide AI] ❌ Real data failed, falling back:', err.message);
    return { ...getMockDisasterData(lat, lng, disasterType), dataSource: 'mock' };
  }
}
