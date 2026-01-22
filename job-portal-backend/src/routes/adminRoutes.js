const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
const role = require("../middleware/roleMiddleware");


const {
  getAdminStats,
  getAllApplications,
  getAllUsers,
} = require("../controllers/adminController");

// Analytics
router.get("/stats", auth, adminOnly, getAdminStats);

// Lists
router.get("/applications", auth, adminOnly, getAllApplications);
router.get("/users", auth, adminOnly, getAllUsers);

module.exports = router;
