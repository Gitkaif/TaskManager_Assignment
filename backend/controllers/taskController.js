import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { user: req.user._id };
    if (status && ['Completed', 'Incomplete'].includes(status)) {
      query.status = status;
    }
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, status, priority } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'Title and description are required' });
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      deadline: deadline ? new Date(deadline) : undefined,
      status,
      priority
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const fields = ['title', 'description', 'deadline', 'status', 'priority'];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) {
        task[f] = f === 'deadline' && req.body[f] ? new Date(req.body[f]) : req.body[f];
      }
    });

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
