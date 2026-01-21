const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      createdBy: req.user._id,
      assignedTo: req.user.role === "admin" ? null : req.user._id, // Only auto-assign for members, not admins
      title,
      description,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { status, keyword } = req.query;

    let query = {};

    // Admin can see all tasks, members can see only tasks assigned to them
    if (req.user.role === "admin") {
      // Admins see all tasks (assigned or unassigned) for management
      query = {};
    } else {
      // Members see only tasks assigned to them (their responsibility)
      query = {
        assignedTo: req.user._id
      };
    }

    if (status) {
      query.status = status;
    }

    if (keyword) {
      query.$text = { $search: keyword }; // Use text index instead of regex
    }

    const [tasks, total] = await Promise.all([
      // Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
      Task.find(query)
        .populate('assignedTo', 'name email') // Populate assigned user data
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Task.countDocuments(query),
    ]);

    res.json({
      data: tasks,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.status = req.body.status ?? task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const assignTask = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // If assignedTo is null, unassign the task
    // If assignedTo is a user ID, assign to that user
    task.assignedTo = assignedTo || null;
    const updatedTask = await task.save();

    // Populate the assigned user data for the response
    await updatedTask.populate('assignedTo', 'name email');

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = req.resource; // from checkOwnership middleware

    await task.deleteOne();
    res.status(204).send(); // No need body
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  assignTask,
  deleteTask,
};
