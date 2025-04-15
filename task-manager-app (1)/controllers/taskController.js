const Task = require('../models/Task');

exports.getUserTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.render('taskList', { tasks, user: req.user });
};

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description, user: req.user.id });
    await task.save();
    res.redirect('/tasks');
};

exports.renderTaskForm = (req, res) => {
    res.render('taskForm', { user: req.user });
};

exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
};
