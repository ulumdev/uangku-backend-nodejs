require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");

const app = express();
app.use(express.json());

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log("MySQL connected"))
  .catch((err) => console.log("Error connecting to MySQL:", err));

// Sync models with the database
const User = require("./models/User");
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database:", err));

app.get("/", (req, res) => {
  res.send("Uangku Backend API with MySQL is running");
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
