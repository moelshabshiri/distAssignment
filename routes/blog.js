const express = require("express");
const router = express.Router();
const controller = require("../controllers/blog");

router.post("/create/:id", controller.createBlog);

module.exports = router;
