const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "My_hero_academia");
    res.send({ token });
  } catch (err) {
    res.statusCode = 422;
    res.send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Invalid email or password." });
  }

  try {
    var result = await user.comparePassword(password);
    if (!result) {
      res.status(422).send({ error: "Invalid email or password" });
    } else {
      const token = jwt.sign({ userId: user._id }, "My_hero_academia");
      res.send({ token });
    }
  } catch (err) {
    return res.status(422).send({ error: "Invalid email or password." });
  }
});

module.exports = router;
