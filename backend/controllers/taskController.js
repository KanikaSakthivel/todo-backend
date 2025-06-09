import Task from '../datamodels/Task.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.uid });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const newTask = new Task({ ...req.body, userId: req.user.uid });
  await newTask.save();
  res.json(newTask);
};

export const updateTask = async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.uid },
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
  res.json({ message: "Deleted" });
};
