"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.Leaderboard.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const users = await user_1.User.insertMany([
            { name: 'Alex Carter', email: 'alex.carter@example.com', role: 'member', team: 'Velocity' },
            { name: 'Morgan Lee', email: 'morgan.lee@example.com', role: 'coach', team: 'Summit' },
            { name: 'Priya Shah', email: 'priya.shah@example.com', role: 'member', team: 'Velocity' },
        ]);
        await team_1.Team.insertMany([
            { name: 'Velocity', members: 8, sport: 'Running' },
            { name: 'Summit', members: 6, sport: 'Cycling' },
        ]);
        await activity_1.Activity.insertMany([
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
        await leaderboard_1.Leaderboard.insertMany([
            { name: 'Alex Carter', score: 980, userId: users[0]._id },
            { name: 'Priya Shah', score: 954, userId: users[2]._id },
            { name: 'Morgan Lee', score: 940, userId: users[1]._id },
        ]);
        await workout_1.Workout.insertMany([
            { title: 'HIIT Blast', level: 'Intermediate', duration: 30, focus: 'Cardio' },
            { title: 'Mobility Reset', level: 'Beginner', duration: 20, focus: 'Recovery' },
            { title: 'Tempo Circuit', level: 'Advanced', duration: 40, focus: 'Performance' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
