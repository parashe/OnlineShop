const express = require("express");

const cors = require("cors");
const app = express();

//middleware to show json
app.use(express.json());
var bodyParser = require("body-parser");

app.use(
  bodyParser.json({
    limit: "20mb",
  })
);

app.use(cors());

// routers
const authRoutes = require("./src/Router/auth_routes");

app.use(authRoutes);

///Routes
const { connectDB } = require("./src/Database/conn");

// Sample route to get started
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const port = process.env.port || 8000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
