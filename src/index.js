require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");
const trackRoutes = require("./routes/trackRoutes");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://Mukul:mukul@cluster0.azxd9.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected");
});

app.get("/", requireAuth, (req, res) => {
  console.log("App is running");
  res.send(`Your email is ${req.user.email}`);
});

app.listen(8000, () => {
  console.log("app is running");
});
