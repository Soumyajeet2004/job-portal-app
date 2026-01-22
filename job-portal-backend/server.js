const express = require("express");
const cors = require("cors");
const adminRoutes = require("./src/routes/adminRoutes");
const applicationRoutes = require("./src/routes/applicationRoutes");
require("dotenv").config();

const connectDB = require("./src/config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/jobs", require("./src/routes/jobRoutes"));
app.use("/api/apply", require("./src/routes/applicationRoutes"));
app.use("/api/admin", adminRoutes);
app.use("/applications",applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
