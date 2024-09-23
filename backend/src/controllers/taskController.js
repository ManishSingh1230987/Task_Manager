import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json({ tasks });
  } catch (error) {
    console.error('Error in getTasks:', error);
    res.status(500).json({ message: 'An error occurred while fetching tasks' });
  }
});

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const task = await Task.create({
      title,
      user: req.user._id
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error in createTask:', error);
    res.status(500).json({ message: 'An error occurred while creating the task' });
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    console.error('Error in updateTask:', error);
    res.status(500).json({ message: 'An error occurred while updating the task' });
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error in deleteTask:', error);
    res.status(500).json({ message: 'An error occurred while deleting the task' });
  }
});

// Add other task-related controller functions here