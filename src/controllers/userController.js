const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getMe = (req, res) => {
  console.log("getME", req.user);
  res.json(req.user);
};

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { name, email } = req.query;

    const query = {};

    // Use text search instead of regex for better performance
    if (email || name) {
      const searchTerms = [];
      if (email) searchTerms.push(email);
      if (name) searchTerms.push(name);
      query.$text = { $search: searchTerms.join(' ') };
    }

    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(query),
    ]);

    res.json({
      data: users,
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

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existed = await User.findOne({ email });
  if (existed) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
  });

  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name ?? user.name;
    user.role = req.body.role ?? user.role;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.resource; // from checkOwnership middleware

    await user.deleteOne();
    res.status(204).send(); // No need body
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMe, getUsers, createUser, updateUser, deleteUser };
