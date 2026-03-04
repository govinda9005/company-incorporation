const express = require("express");
const cors = require("cors");

// Import routes
const companyRoutes = require("./routes/companyRoutes");
const shareholderRoutes = require("./routes/shareholderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/companies", companyRoutes);
app.use("/shareholders", shareholderRoutes);

// Root route
app.get("/", (req, res) => res.send("Backend is running"));

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(500).json({
    error: "Internal Server Error",
  });
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
