const Job = require("../models/Job");

/* ================= CREATE JOB ================= */
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      jobType
    } = req.body;

    if (!title || !company || !location || !jobType) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ message: "Failed to create job" });
  }
};

/* ================= GET ALL JOBS ================= */
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error("Get all jobs error:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/* ================= GET RECRUITER JOBS ================= */
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error("Get my jobs error:", error);
    res.status(500).json({ message: "Failed to fetch recruiter jobs" });
  }
};

/* ================= GET JOB BY ID ================= */
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Get job by ID error:", error);
    res.status(500).json({ message: "Failed to fetch job" });
  }
};
exports.getRecruiterStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments({
      postedBy: req.user.id
    });

    res.json({
      totalJobs
    });
  } catch (error) {
    console.error("Job stats error:", error);
    res.status(500).json({ message: "Failed to fetch job stats" });
  }
};
