const HttpError = require("../models/http-error");
const User = require("../models/user");

const signUp = async (req, res, next) => {
  let { username, password } = req.body;

  const createdUser = new User({
    username,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser });
};

const logIn = async (req, res, next) => {
  let { username, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({
      username: username,
    });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    console.log(error);
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      401
    );
    return next(error);
  } else if (existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      401
    );
    return next(error);
  }

  res.json({
    message: "Logged In",
    user: existingUser.toObject({ getters: true }),
  });
};

exports.signUp = signUp;
exports.logIn = logIn;
