const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job"
    },
    seekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    resumeLink: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
