require('dotenv').config();
const mongoose = require('mongoose');
const Expert = require('./models/Expert');
const connectDB = require('./config/db');

const experts = [
  { name: 'Dr. Jane Smith', category: 'Health', experience: 10, rating: 4.8, avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'John Doe', category: 'Finance', experience: 8, rating: 4.5, avatar: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Alice Johnson', category: 'Technology', experience: 5, rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Bob Williams', category: 'Career', experience: 12, rating: 4.7, avatar: 'https://i.pravatar.cc/150?img=8' },
  { name: 'Sarah Davis', category: 'Health', experience: 15, rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=9' },
  { name: 'Michael Chen', category: 'Technology', experience: 7, rating: 4.6, avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Emily White', category: 'Finance', experience: 4, rating: 4.3, avatar: 'https://i.pravatar.cc/150?img=13' },
  { name: 'David Lee', category: 'Career', experience: 9, rating: 4.8, avatar: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Jessica Brown', category: 'Health', experience: 11, rating: 4.7, avatar: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Chris Evans', category: 'Technology', experience: 6, rating: 4.5, avatar: 'https://i.pravatar.cc/150?img=16' },
  { name: 'Amanda Green', category: 'Finance', experience: 14, rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=17' },
  { name: 'Daniel Kim', category: 'Career', experience: 3, rating: 4.2, avatar: 'https://i.pravatar.cc/150?img=18' },
  { name: 'Sophia Taylor', category: 'Health', experience: 20, rating: 5.0, avatar: 'https://i.pravatar.cc/150?img=19' },
  { name: 'James Wilson', category: 'Technology', experience: 8, rating: 4.6, avatar: 'https://i.pravatar.cc/150?img=20' },
  { name: 'Olivia Martin', category: 'Finance', experience: 5, rating: 4.4, avatar: 'https://i.pravatar.cc/150?img=21' },
  { name: 'William Anderson', category: 'Career', experience: 10, rating: 4.8, avatar: 'https://i.pravatar.cc/150?img=22' },
  { name: 'Isabella Thomas', category: 'Health', experience: 6, rating: 4.5, avatar: 'https://i.pravatar.cc/150?img=23' },
  { name: 'Benjamin Moore', category: 'Technology', experience: 12, rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=24' },
  { name: 'Mia Jackson', category: 'Finance', experience: 7, rating: 4.7, avatar: 'https://i.pravatar.cc/150?img=25' },
  { name: 'Lucas Harris', category: 'Career', experience: 4, rating: 4.3, avatar: 'https://i.pravatar.cc/150?img=26' },
  { name: 'Charlotte Clark', category: 'Health', experience: 18, rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=27' },
  { name: 'Henry Lewis', category: 'Technology', experience: 9, rating: 4.6, avatar: 'https://i.pravatar.cc/150?img=28' },
  { name: 'Amelia Young', category: 'Finance', experience: 11, rating: 4.8, avatar: 'https://i.pravatar.cc/150?img=29' },
  { name: 'Ethan Walker', category: 'Career', experience: 5, rating: 4.5, avatar: 'https://i.pravatar.cc/150?img=30' },
  { name: 'Harper Hall', category: 'Health', experience: 13, rating: 4.7, avatar: 'https://i.pravatar.cc/150?img=31' }
];

const seedDB = async () => {
  await connectDB();
  try {
    await Expert.deleteMany();
    await Expert.insertMany(experts);
    console.log('Database seeded with experts!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
