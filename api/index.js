import express from 'express';
import cors from 'cors';
import generateRouteRouter from './generateRoute.js';

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

export default app;
