const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    
    location: String,
    description: String,

    // 💰 Salary
    salaryMin: Number,
    salaryMax: Number,
    salaryUnit: {
      type: String,
      enum: ["month", "year"],
      default: "month",
    },

    // 🧑‍💼 Job Type
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
      required: true,
    },

    // ⏱ Work Schedule
    workSchedule: {
      type: String,
      enum: ["Monday–Friday", "Rotational", "Flexible"],
    },

    // 🏷 Tags
    isNew: {
      type: Boolean,
      default: true,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
