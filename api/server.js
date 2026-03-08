import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateRouteRouter from './generateRoute.js';

dotenv.config();

console.log('[SwiftGuide AI] USE_REAL_DATA =', 
  process.env.USE_REAL_DATA);
console.log('[SwiftGuide AI] ANTHROPIC_KEY loaded =', 
  !!process.env.ANTHROPIC_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'swiftguide-api' });
});

app.use('/api', generateRouteRouter);

app.use((err, _req, res, _next) => {
  console.error('Unexpected server error', err);
  res
    .status(500)
    .json({ error: 'Unexpected server error. Please try again shortly.' });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`SwiftGuide API listening on port ${port}`);
});

