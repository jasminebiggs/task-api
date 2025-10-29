import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { validateTask } from '../middleware/validateTask.js';

const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/', validateTask, taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;


router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Validation failed",
      details: ["ID must be a number"]
    });
  }

  const task = taskController.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
});
