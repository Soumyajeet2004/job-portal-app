const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getRecruiterStats = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const jobs = await Job.find({ postedBy: recruiterId });
    const jobIds = jobs.map((job) => job._id);

    const applicationsCount = await Application.countDocuments({
      jobId: { $in: jobIds },
    });

    res.json({
      activeJobs: jobs.length,
      applications: applicationsCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load stats" });
  }
};
