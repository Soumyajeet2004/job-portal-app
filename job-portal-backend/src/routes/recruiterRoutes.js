const express = require("express");
const router = express.Router();
const { getRecruiterStats } = require("../controllers/recruiterController");
const auth = require("../middleware/auth");

router.get("/stats", auth, getRecruiterStats);

module.exports = router;
