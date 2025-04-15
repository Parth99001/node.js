const express = require('express');
const router = express.Router();
const { verifyUser } = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

router.get('/tasks', verifyUser, taskController.getUserTasks);
router.get('/tasks/new', verifyUser, taskController.renderTaskForm);
router.post('/tasks', verifyUser, taskController.createTask);
router.post('/tasks/delete/:id', verifyUser, taskController.deleteTask);

module.exports = router;
