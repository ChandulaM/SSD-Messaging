const mongoose = require("mongoose");
const Message = require("../models/message");
var express = require("express");
var router = express.Router();

router.get("/", async function (req, res) {
  const allMessages = await Message.find();
  res.status(200).json({ messages: allMessages });
});

router.patch("/save/:id", async function (req, res) {
  console.log(req.body)
  console.log(req.params.id)
  Message.updateOne(
    { _id: req.params.id },
    { $push: { savedBy: req.body.userEmail } }
  ).then((data) => res.status(200).json(data));
});

module.exports = router;
