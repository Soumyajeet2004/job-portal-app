const Application = require("../models/Application");
const Job = require("../models/Job");

exports.applyJob = async (req, res) => {
  const application = await Application.create({
    jobId: req.params.jobId,
    seekerId: req.user.id,
    resumeLink: req.body.resumeLink
  });
  res.json(application);
};

exports.getRecruiterApplicationStats = async (req, res) => {
  try {
    // get recruiter's job IDs
    const jobs = await Job.find({ postedBy: req.user.id }).select("_id");

    const jobIds = jobs.map(job => job._id);

    const totalApplications = await Application.countDocuments({
      jobId: { $in: jobIds },
    });

    res.json({
      totalApplications,
    });
  } catch (error) {
    console.error("Application stats error:", error);
    res.status(500).json({ message: "Failed to fetch application stats" });
  }
};