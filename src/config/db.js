const mongoose = require("mongoose");
const createIndexes = require("./initDB");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");

    // Create indexes for optimal performance
    await createIndexes();
  } catch (error) {
    console.error("MongoDB connection failed!", error);
    process.exit(1);
  }
};

module.exports = connectDB;
