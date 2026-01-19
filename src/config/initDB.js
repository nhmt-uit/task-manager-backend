const Task = require("../models/Task");
const User = require("../models/User");

const createIndexes = async () => {
  try {
    // Task indexes
    await Task.collection.createIndex({ createdBy: 1 });
    await Task.collection.createIndex({ status: 1 });
    await Task.collection.createIndex({ createdBy: 1, status: 1 });
    await Task.collection.createIndex({ assignedTo: 1 });
    await Task.collection.createIndex({ title: "text", description: "text" });

    // User indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ role: 1 });
    await User.collection.createIndex({ isActive: 1 });
    await User.collection.createIndex({ name: "text", email: "text" });

    console.log("Database indexes created successfully!");
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
};

module.exports = createIndexes;