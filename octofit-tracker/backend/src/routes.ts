import { Router } from 'express';
import { getApiBaseUrl } from './config/api';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';

const router = Router();

router.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    baseUrl: getApiBaseUrl(),
  });
});

router.get('/api/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

router.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().lean();
  res.json(teams);
});

router.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().lean();
  res.json(activities);
});

router.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find().lean();
  res.json(leaderboard);
});

router.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

export default router;
