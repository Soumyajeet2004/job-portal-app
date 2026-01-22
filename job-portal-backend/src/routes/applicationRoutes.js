const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { applyJob } = require("../controllers/applicationController");
const {
  getRecruiterApplicationStats,
} = require("../controllers/applicationController");

router.post("/:jobId", auth, role(["seeker"]), applyJob);
router.get(
  "/stats",
  auth,
  role(["recruiter"]),
  getRecruiterApplicationStats
);

module.exports = router;
