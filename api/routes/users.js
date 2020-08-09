const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const checkAuth = require("../middleware/check-auth");
const Users = require("../../models/users");

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

router.post("/register", upload.single("profile_image"), (req, res, next) => {
  Users.find({ email: req.body.email }).then((user) => {
    if (user.length >= 1) {
      return res.status(409).json({ message: "Email Already Exist!" });
    } else {
      req.body.password.length >= 8
        ? bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: err });
            } else {
              const user = new Users({
                email: req.body.email,
                password: hash,
                created_at: new Date(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                profile_image: req.file.path,
              });

              user
                .save()
                .then((success) => {
                  const {
                    email,
                    _id,
                    created_at,
                    firstName,
                    lastName,
                    profile_image,
                  } = success;

                  res.status(200).json({
                    _id,
                    email,
                    created_at,
                    firstName,
                    lastName,
                    profile_image,
                  });
                })
                .catch((e) => res.status(500).json({ error: e }));
            }
          })
        : res
            .status(400)
            .json({ message: "Password Should Be Atlease 8 Digits" });
    }
  });
});

// USER LOGIN ROUTE
router.post("/login", (req, res, next) => {
  Users.find({ email: req.body.email })
    .then((success) => {
      if (!success) {
        return res.status(401).json({ message: "Auth Fail!" });
      }

      bcrypt.compare(req.body.password, success[0].password, (err, result) => {
        // result == true
        if (err) {
          return res.status(401).json({ message: "Auth Fail!" });
        }
        if (result) {
          const token = jwt.sign(
            { email: success[0].email, _id: success[0]._id },
            "secret",
            {
              expiresIn: "1d",
            }
          );

          return res.status(200).json({
            message: "Auth Successful",
            token,
            login_user: success,
          });
        }
        res.status(401).json({ message: "Email or Password is incorrect!" });
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
  Users.find()
    .then((success) => res.json(success))
    .catch((e) => res.json(e));
});

router.delete("/", (req, res) => {
  Users.remove()
    .then((s) => res.json(s))
    .catch((e) => res.json(e));
});

module.exports = router;
