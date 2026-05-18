import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    skills: {
      type: [String],
      required: [true, 'At least one skill is required'],
    },
    performanceScore: {
      type: Number,
      required: [true, 'Performance score is required'],
      min: [1, 'Minimum score is 1'],
      max: [100, 'Maximum score is 100'],
    },
    experience: {
      type: Number,
      required: [true, 'Years of experience is required'],
      min: [0, 'Experience cannot be negative'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);
