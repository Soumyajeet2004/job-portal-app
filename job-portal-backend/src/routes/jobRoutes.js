const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createJob,
  getAllJobs,
  getMyJobs,
  getJobById
} = require("../controllers/jobController");
const { getRecruiterStats } = require("../controllers/recruiterController");

/* ================= PUBLIC ================= */
router.get("/", getAllJobs);              // ✅ public jobs feed

/* ================= RECRUITER ================= */
router.post("/", auth, role(["recruiter"]), createJob);
router.get("/mine", auth, role(["recruiter"]), getMyJobs);
router.get(
  "/stats",
  auth,
  role(["recruiter"]),
  getRecruiterStats
);
/* ================= COMMON ================= */
router.get("/:id", auth, getJobById);     // MUST be last


module.exports = router;
