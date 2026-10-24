
const User = require('../models/user');
const passport = require("passport");

const registerUser = async (req, res) => {
    const { email, password } = req.body || {};

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        password.length === 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Correo o contrasena no validos"
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    User.findOne({ email: normalizedEmail }, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                err
            });
        }

        if (user) {
            return res.status(403).json({
                success: false,
                message: "User already exists"
            });
        }

        const newUser = new User({ email: normalizedEmail });
        newUser.setPassword(password);

        newUser.save((err, savedUser) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "No se pudo registrar el usuario"
                });
            }

            return res.status(201).json({
                success: true,
                user: savedUser
            });
        });
    });
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body || {};

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        return res.status(400).json({
            success: false,
            message: "Credenciales no validas"


        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    User.findOne({ email: normalizedEmail }, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                err
            });
        }


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.isValidPassword(password)) {
            return res.status(401).json({
                success: false,
                message: "Password incorrect"
            });
        }

        passport.authenticate("local", (authErr, authenticatedUser, info) => {
            if (authErr) {
                return next(authErr);
            }

            if (!authenticatedUser) {
                return res.status(401).json({
                    success: false,
                    message: (info && info.message) || "Credenciales no validas"
                });
            }

            req.logIn(authenticatedUser, (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }

                return res.status(200).json({
                    success: true,
                    user: authenticatedUser
                });
            });
        })(req, res, next);
    });
};

const logoutUser = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        return res.status(200).json({
            success: true,
            message: "User logged out"
        });
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
