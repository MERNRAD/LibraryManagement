const LocalStrategy = require("passport-local");
const User = require("./models/user");

const initializePassport = (passport) => {
  const authenticateUser = (email, password, cb) => {
    User.findOne({email: email}, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false, {message: "User not found"});
      }
      if (!user.isValidPassword(password)) {
        return cb(null, false, {message: "Password incorrect"});
      } else {
        return cb(null, user);
      }
    });
  };
  passport.use(new LocalStrategy({usernameField: "email"}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => {
    User.findById(user._id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = initializePassport;
