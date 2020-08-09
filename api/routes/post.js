const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

// const checkAuth = require("../middleware/check-auth");
const Posts = require("../../models/post");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/add-post", upload.single("post_image"), (req, res, next) => {
  const user = new Posts({
    caption: req.body.caption,
    created_at: new Date(),
    userId: req.body.userId,
    post_image: req.file.path,
  });

  user
    .save()
    .then((success) => {
      res.status(200).json(success);
    })
    .catch((e) => res.status(500).json({ error: e }));
});

router.get("/", (req, res) => {
  Posts.find()
    .populate({
      path: "userId",
      model: "Users",
    })
    .then((success) => res.json(success))
    .catch((e) => res.json(e));
});

module.exports = router;
