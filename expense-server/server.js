// express server with mongodb
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const config = require("./mongodbconfig");

//API Routes added
const UserRoutes = require("./services/auth");
const ExpenseRoutes = require("./services/expense");
const CategoryRoutes = require("./services/category");
const IncomeRoutes = require("./services/income");
const DashRoutes = require("./services/dashboard");

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + config.database);
});

// On error
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

// Port Number
const port = 5555;

// CORS Middleware
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log = () => {};
  console.dir(req.url);
  console.dir(req.body);
  next();
});

// Index Route
app.get("/", (req, res) => {
  res.send("Server Working");
});

// Importing the Routes
app.use(UserRoutes);
app.use(ExpenseRoutes);
app.use(CategoryRoutes);
app.use(IncomeRoutes);
app.use(DashRoutes);

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
