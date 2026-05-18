import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Employee from './models/Employee.js';

dotenv.config();

const dummyEmployees = [
  {
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    department: 'Engineering',
    skills: ['React', 'Node.js', 'MongoDB'],
    performanceScore: 92,
    experience: 5
  },
  {
    name: 'Bob Johnson',
    email: 'bob.j@example.com',
    department: 'Sales',
    skills: ['Communication', 'Negotiation', 'CRM'],
    performanceScore: 78,
    experience: 3
  },
  {
    name: 'Charlie Davis',
    email: 'cdavis@example.com',
    department: 'Marketing',
    skills: ['SEO', 'Content Creation', 'Google Ads'],
    performanceScore: 85,
    experience: 4
  },
  {
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    department: 'HR',
    skills: ['Recruitment', 'Employee Relations', 'Conflict Resolution'],
    performanceScore: 95,
    experience: 7
  },
  {
    name: 'Evan Wright',
    email: 'ewright@example.com',
    department: 'Engineering',
    skills: ['Python', 'Django', 'AWS'],
    performanceScore: 65,
    experience: 2
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
    
    await Employee.deleteMany();
    console.log('Existing employees removed.');
    
    await Employee.insertMany(dummyEmployees);
    console.log('Dummy employees seeded successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
