const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,*"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/blog", blogRoutes);
app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  console.log(error);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    // fs.unlink(req.file.path, (err)=>{
    //   console.log(err);
    // });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://elshabshiri:distpassword@cluster0.xi5sx.mongodb.net/DistProject?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true,  }
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
