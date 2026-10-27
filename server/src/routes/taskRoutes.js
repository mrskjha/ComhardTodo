const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTaskTimeline
} = require('../controllers/taskController');

const { protect } = require('../middlewares/authMiddleware');


router.use(protect);

// ==========================================
// 4. CRUD Routes Mapping
// ==========================================

// Create Task
// API: POST /api/tasks
router.post('/', createTask);

// Read Tasks
// API: GET /api/tasks
router.get('/', getTasks);

// Update Task
// API: PUT /api/tasks/:id
router.put('/:id', updateTask);

// Delete Task
// API: DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

router.patch('/:id/status', updateTaskStatus);

router.get('/:id/timeline', getTaskTimeline);

module.exports = router;