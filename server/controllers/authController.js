const User = require('../models/user')
const passport = require("passport");

const registerUser = async (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }
    if (user) {
      return res.status(403).json({success: false, message: "User already exists"});
    } else {
      const newUser = new User(req.body);
      newUser.setPassword(req.body.password);
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).json({success: false, err});
        }
        return res.status(201).json({
          success: true,
          user
        });
      })
    }
  })
}

const loginUser = async (req, res, next) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      return res.status(500).json({success: false, err});
    }
    if (!user) {
      return res.status(404).json({success: false, message: "User not found"});
    }
    if (!user.isValidPassword(req.body.password)) {
      return res.status(401).json({success: false, message: "Password incorrect"});
    }
    passport.authenticate("local", (err, user, info) => {
      req.logIn(user, (err) => {
        if (err) {
          throw err;
        }
        return res.status(200).json({
          success: true,
          user
        });
      });
    },)(req, res, next);
  })
}

const logoutUser = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // res.redirect('/login');
  });
  return res.status(200).json({success: true, message: "User logged out"});
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser
}
