import * as taskService from '../services/taskService.js';

// GET /tasks - List all tasks
export async function getTasks(req, res, next) {
  try {
    const { completed, limit } = req.query;

    const filters = {};
    if (completed !== undefined) {
      filters.completed = completed === 'true';
    }

    const tasks = await taskService.getAllTasks(filters, parseInt(limit));
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

// POST /tasks - Create a new task
export async function createTask(req, res, next) {
  try {
    const { title, completed } = req.body;

    if (!title || typeof completed !== 'boolean') {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['Title and completed (true/false) are required'],
      });
    }

    const task = await taskService.createTask({ title, completed });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

// GET /tasks/:id - Get a task by ID
export async function getTaskById(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['ID must be a number'],
      });
    }

    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

// PUT /tasks/:id - Update a task
export async function updateTask(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['ID must be a number'],
      });
    }

    const updatedTask = await taskService.updateTask(id, { title, completed });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
}

// DELETE /tasks/:id - Delete a task
export async function deleteTask(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['ID must be a number'],
      });
    }

    const deleted = await taskService.deleteTask(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}