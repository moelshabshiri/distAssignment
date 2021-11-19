const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String },
  description: { type: String },
});

blogSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Blog", blogSchema);
