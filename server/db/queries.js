const express = require("express");
var app = require("../index.js");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bugs", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to mongoose");
});

var Schema = mongoose.Schema;

var bugSchema = new Schema({
  bugName: Number,
  bugDescription: String,
  reportedBy: String,
  createdDate: Date,
  assignedTo: String,
  threatLevel: String
});

var NewBug = mongoose.model("NewBug", bugSchema, "bugs");

module.exports = {
  NewBug
};