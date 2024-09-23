import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/tasks', protect, getTasks);
router.post('/tasks', protect, createTask);
router.put('/tasks/:id', protect, updateTask);
router.delete('/tasks/:id', protect, deleteTask);

export default router;