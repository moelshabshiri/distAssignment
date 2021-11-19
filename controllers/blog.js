const HttpError = require("../models/http-error");
const Blog = require("../models/blog");
const User = require("../models/user");

const createBlog = async (req, res, next) => {
  const id = req.params.id;
  let { title, description } = req.body;

  let user;
  try {
    user = await User.findOne({ username: id });
  } catch (err) {
      console.log(err);
    const error = new HttpError("Creating blog failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User does not exist, please try again.", 404);
    return next(error);
  }

  const createdBlog = new Blog({
    title,
    description,
  });

  try {
    await createdBlog.save();
  } catch (err) {
      console.log(err)
    const error = new HttpError("Creating blog failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ blog: createdBlog });
};

exports.createBlog = createBlog;
