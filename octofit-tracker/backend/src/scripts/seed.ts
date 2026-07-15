import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Alex Carter', email: 'alex.carter@example.com', role: 'member', team: 'Velocity' },
      { name: 'Morgan Lee', email: 'morgan.lee@example.com', role: 'coach', team: 'Summit' },
      { name: 'Priya Shah', email: 'priya.shah@example.com', role: 'member', team: 'Velocity' },
    ]);

    await Team.insertMany([
      { name: 'Velocity', members: 8, sport: 'Running' },
      { name: 'Summit', members: 6, sport: 'Cycling' },
    ]);

    await Activity.insertMany([
      {
        type: 'Run',
        duration: 35,
        calories: 320,
        userId: users[0]._id,
      },
      {
        type: 'Workout',
        duration: 45,
        calories: 410,
        userId: users[2]._id,
      },
      {
        type: 'Bike',
        duration: 55,
        calories: 380,
        userId: users[1]._id,
      },
    ]);

    await Leaderboard.insertMany([
      { name: 'Alex Carter', score: 980, userId: users[0]._id },
      { name: 'Priya Shah', score: 954, userId: users[2]._id },
      { name: 'Morgan Lee', score: 940, userId: users[1]._id },
    ]);

    await Workout.insertMany([
      { title: 'HIIT Blast', level: 'Intermediate', duration: 30, focus: 'Cardio' },
      { title: 'Mobility Reset', level: 'Beginner', duration: 20, focus: 'Recovery' },
      { title: 'Tempo Circuit', level: 'Advanced', duration: 40, focus: 'Performance' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
