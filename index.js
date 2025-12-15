const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

/**
 * CORS CONFIG
 * - localhost (development)
 * - Netlify frontend (production)
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://voluble-muffin-2c7b6d.netlify.app"
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Database connection
require("./DBConn/conn");

// Routes
const GymRoutes = require("./Routes/gym");
const MembershipRoutes = require("./Routes/membership");
const MemberRoutes = require("./Routes/member");

app.use("/auth", GymRoutes);
app.use("/plans", MembershipRoutes);
app.use("/members", MemberRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
