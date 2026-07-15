import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getApiBaseUrl } from './config/api';
import { connectDatabase } from './config/database';
import router from './routes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    baseUrl: getApiBaseUrl(),
  });
});

void connectDatabase();

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});

export default app;
