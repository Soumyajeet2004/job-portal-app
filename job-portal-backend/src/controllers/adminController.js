const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

// 📊 Dashboard Stats
exports.getAdminStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    const applications = await Application.countDocuments();
    const recruiters = await User.countDocuments({ role: "recruiter" });
    const seekers = await User.countDocuments({ role: "seeker" });

    res.json({
      users,
      jobs,
      applications,
      recruiters,
      seekers,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

// 📄 All Applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("seekerId", "email role")   // ✅ correct field
      .populate("jobId", "title company");  // ✅ correct field

    res.json(applications);
  } catch (error) {
    console.error("Admin applications error:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

// 👤 All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Users fetch failed" });
  }
};
