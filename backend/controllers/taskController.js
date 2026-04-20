const Task = require('../models/Task')

const createTask = async (req, res) => {
    try {
        const task = new Task({ ...req.body, user: req.user })
        await task.save()
        res.status(201).json({ message: "New Task created", task })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user })
        res.json({ message: "Task fetched successfully", tasks })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.json({ message: "Task updated successfully", task })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        res.json({ message: "Task deleted successfully", task })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { createTask, getTasks, updateTask, deleteTask }