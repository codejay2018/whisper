import mongoose from "mongoose";
import { User } from "../models/User";

const SEED_USERS = [
  {
    clerkId: 'clerk_1234567890',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    clerkId: 'clerk_0987654321',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    clerkId: 'clerk_1111111111',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    clerkId: 'clerk_2222222222',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    clerkId: 'clerk_3333333333',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    clerkId: 'clerk_4444444444',
    name: 'Diana Davis',
    email: 'diana.davis@example.com',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
  {
    clerkId: 'clerk_5555555555',
    name: 'Eve Miller',
    email: 'eve.miller@example.com',
    avatar: 'https://i.pravatar.cc/150?img=7',
  },
  {
    clerkId: 'clerk_6666666666',
    name: 'Frank Garcia',
    email: 'frank.garcia@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    clerkId: 'clerk_7777777777',
    name: 'Grace Lee',
    email: 'grace.lee@example.com',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    clerkId: 'clerk_8888888888',
    name: 'Henry Martinez',
    email: 'henry.martinez@example.com',
    avatar: 'https://i.pravatar.cc/150?img=10',
  },
  { 
    clerkId: 'clerk_9999999999',
    name: 'Ivy Anderson',
    email: 'ivy.anderson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    clerkId: 'clerk_0000000000',
    name: 'Jack Thomas',
    email: 'jack.thomas@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
  } 
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not set");
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // insert seed users into the database
    const users =await User.insertMany(SEED_USERS);
    console.log('Seeded users count:', users.length);
    users.forEach(user => {
      console.log(`Inserted user: ${user.name} (${user.email})`);
    });

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    process.exit(0);

  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } 
};

seed();

// console : 
// cd backend
// bun run src/scripts/seed.ts