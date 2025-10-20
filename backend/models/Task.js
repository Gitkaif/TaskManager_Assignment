import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    deadline: { type: Date },
    status: { type: String, enum: ['Incomplete', 'Completed'], default: 'Incomplete' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
